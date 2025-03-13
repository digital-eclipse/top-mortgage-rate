'use client';

import { useState } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Define the interface for form values
interface MortgageFormValues {
  grossIncome: number;
  gds: number;
  tds: number;
  debtPayments: number;
  propertyTax: number;
  condoFees: number;
  heat: number;
  rate: number;
  rateType: 'fixed' | 'variable';
  rateTerm: number;
  amortization: number;
  rentalIncome: number;
  rentalIncomeRule: 'addBack' | 'offset';
  loanType: 'regular' | 'interestOnly';
  loanCompounding: 'annual' | 'semiAnnual' | 'monthly' | 'daily';
  condoFeeInclusionType: 'B20' | 'contract';
  condoFeeInclusion: 50 | 80 | 100;
  rentalIncomePortion: 50 | 80 | 100;
  stressTestRule: boolean;
}

// Validation schema for form fields
const formSchema = Yup.object().shape({
  grossIncome: Yup.number().min(0, 'Income amount must be a positive number.').required('Required'),
  debtPayments: Yup.number().min(0, 'Debt payments must be a positive number.').required('Required'),
  
  // Optional numeric fields should default to 0
  propertyTax: Yup.number().min(0).default(0),
  condoFees: Yup.number().min(0).default(0),
  heat: Yup.number().min(0).default(0),

  gds: Yup.number().min(20).max(50).required('Required'),
  tds: Yup.number().min(30).max(50).required('Required'),
  rate: Yup.number().min(0).required('Required'),

  // Correct use of oneOf for string-based selections
  rateType: Yup.string().oneOf(['fixed', 'variable']).required('Required'),

  // Adjust the range for rate term if necessary
  rateTerm: Yup.number().min(1).max(10).required('Required'),
  amortization: Yup.number().min(0).max(50).required('Required'),

  // Optional rental income
  rentalIncome: Yup.number().min(0).default(0),
  rentalIncomeRule: Yup.string().oneOf(['addBack', 'offset']).required('Required'),

  // Loan type selection
  loanType: Yup.string().oneOf(['regular', 'interestOnly']).required('Required'),

  // Compounding frequency
  loanCompounding: Yup.string().oneOf(['annual', 'semiAnnual', 'monthly', 'daily']).required('Required'),

  // Condo Fee and Rental Income validation
  condoFeeInclusionType: Yup.string().oneOf(['B20', 'contract']).required('Required'),
  condoFeeInclusion: Yup.number().oneOf([50, 80, 100]).required('Required'),
  rentalIncomePortion: Yup.number().oneOf([50, 80, 100]).required('Required'),

  // Boolean for stress test
  stressTestRule: Yup.boolean().required('Required').default(false),
});

const calculateMaxMortgage = (values: MortgageFormValues) => {
  const {
    grossIncome = 0,
    debtPayments = 0,
    propertyTax = 0,
    condoFees = 0,
    heat = 0,
    gds,
    tds,
    rate,
    amortization,
    rentalIncome = 0,
    rentalIncomeRule,
    rentalIncomePortion,
    condoFeeInclusion,
    loanType,
    loanCompounding,
    stressTestRule,
    // Remove rateTerm here
  } = values;

  // Parse values
  const parsedGrossIncome = Number(grossIncome);
  const parsedDebtPayments = Number(debtPayments);
  const parsedPropertyTax = Number(propertyTax);
  const parsedCondoFees = Number(condoFees);
  const parsedHeat = Number(heat);
  const parsedRate = Number(rate);
  const parsedAmortization = Number(amortization);
  const parsedRentalIncome = Number(rentalIncome);
  const parsedRateTerm = Number(values.rateTerm); // Parsed rateTerm

  // Apply stress test rate if enabled
  const effectiveRate = stressTestRule ? Math.max(parsedRate, 5.25) : parsedRate;

  // Adjust the interest rate based on loan compounding period
  const adjustForCompounding = (rate: number, period: string) => {
    switch (period) {
      case 'annual':
        return rate;
      case 'semiAnnual':
        return Math.pow(1 + rate / 2, 2) - 1;
      case 'monthly':
        return Math.pow(1 + rate / 12, 12) - 1;
      case 'daily':
        return Math.pow(1 + rate / 365, 365) - 1;
      default:
        return rate;
    }
  };

  const compoundedRate = adjustForCompounding(effectiveRate / 100, loanCompounding);
  const monthlyRate = compoundedRate / 12;

  // Monthly property tax, condo fees, and heat
  const monthlyPropertyTax = parsedPropertyTax / 12;
  const adjustedCondoFees = (parsedCondoFees * condoFeeInclusion) / 100;
  let totalMonthlyHousingCosts = monthlyPropertyTax + adjustedCondoFees + parsedHeat;

  // Adjust rental income based on rule and portion
  let adjustedGrossIncome = parsedGrossIncome;
  if (parsedRentalIncome > 0) {
    const rentalAdjustment = (parsedRentalIncome * rentalIncomePortion) / 100;

    if (rentalIncomeRule === 'addBack') {
      adjustedGrossIncome += rentalAdjustment * 12; // Add to gross income
    } else if (rentalIncomeRule === 'offset') {
      totalMonthlyHousingCosts -= rentalAdjustment; // Offset against housing costs
    }
  }

  // Calculate housing affordability using GDS and TDS
  const affordableHousingPayment = (adjustedGrossIncome * (gds / 100)) / 12 - totalMonthlyHousingCosts;
  const affordableDebtPayment = (adjustedGrossIncome * (tds / 100)) / 12 - totalMonthlyHousingCosts - parsedDebtPayments;

  // Calculate maximum mortgage based on payment
  const calculateMortgageFromPayment = (payment: number) => {
    if (loanType === 'interestOnly') {
      return payment / monthlyRate;
    }
    return (payment * (Math.pow(1 + monthlyRate, parsedAmortization * 12) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, parsedAmortization * 12));
  };

  const maxMortgageByGDS = calculateMortgageFromPayment(affordableHousingPayment);
  const maxMortgageByTDS = calculateMortgageFromPayment(affordableDebtPayment);
  const maxMortgage = Math.min(maxMortgageByGDS, maxMortgageByTDS);

  // Monthly mortgage payment over the rate term (using parsedRateTerm)
  const monthlyMortgagePayment = maxMortgage * monthlyRate;

  // GDS & TDS calculations
  const gdsResult = calculateGDS(monthlyMortgagePayment, totalMonthlyHousingCosts, adjustedGrossIncome);
  const tdsResult = calculateTDS(monthlyMortgagePayment, totalMonthlyHousingCosts + parsedDebtPayments, adjustedGrossIncome);

  return {
    maxMortgage: isNaN(maxMortgage) ? 0 : parseFloat(maxMortgage.toFixed(2)),
    stressTestRate: effectiveRate,
    gds: isNaN(gdsResult) ? "0.00" : gdsResult.toFixed(2),
    tds: isNaN(tdsResult) ? "0.00" : tdsResult.toFixed(2),
    adjustedMonthlyMortgage: isNaN(monthlyMortgagePayment) ? 0 : parseFloat(monthlyMortgagePayment.toFixed(2)),
    debtPayments: parsedDebtPayments,
    totalHomeExpenses: totalMonthlyHousingCosts,
    totalExpenses: totalMonthlyHousingCosts + parsedDebtPayments,
    rentalAdjustment: parsedRentalIncome,
    cashLeft: isNaN(calculateCashLeft(monthlyMortgagePayment, totalMonthlyHousingCosts + parsedDebtPayments, parsedRentalIncome))
      ? 0
      : calculateCashLeft(monthlyMortgagePayment, totalMonthlyHousingCosts + parsedDebtPayments, parsedRentalIncome),
  };
};

// Helper functions for GDS and TDS
const calculateGDS = (monthlyMortgagePayment: number, totalHomeExpenses: number, grossIncome: number) => {
  if (grossIncome === 0) return 0;
  return ((monthlyMortgagePayment + totalHomeExpenses) / grossIncome) * 100;
};

const calculateTDS = (monthlyMortgagePayment: number, totalExpenses: number, grossIncome: number) => {
  if (grossIncome === 0) return 0;
  return ((monthlyMortgagePayment + totalExpenses) / grossIncome) * 100;
};

const calculateCashLeft = (monthlyMortgagePayment: number, totalExpenses: number, rentalAdjustment: number) => {
  return monthlyMortgagePayment + rentalAdjustment - totalExpenses;
};

// Main component
export default function MortgageCalculator() {
    const [results, setResults] = useState<{
    maxMortgage: number;
    stressTestRate: number;
    gds: string;
    tds: string;
    adjustedMonthlyMortgage: number;
    debtPayments: number;
    totalHomeExpenses: number;
    totalExpenses: number;
    rentalAdjustment: number;
    cashLeft: number;
  } | null>(null);
  

  const handleFormSubmit = (values: MortgageFormValues, actions: FormikHelpers<MortgageFormValues>) => {
    const parsedValues = {
      ...values,
      grossIncome: Number(values.grossIncome),
      debtPayments: Number(values.debtPayments),
      propertyTax: Number(values.propertyTax),
      condoFees: Number(values.condoFees),
      heat: Number(values.heat),
      rate: Number(values.rate),
      rentalIncome: Number(values.rentalIncome),
      rateTerm: Number(values.rateTerm),
      amortization: Number(values.amortization)
    };
  
    const calculatedResults = calculateMaxMortgage(parsedValues);
    setResults(calculatedResults);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white border border-4 rounded-xl shadow-lg">
      <h1 className="text-left text-2xl mb-2 font-bold text-black">Max Mortgage Calculator</h1>
      <p className='mb-6 text-sm'>
        Want to see the maximum loan amount you could qualify for? This can help you decide what your ideal purchase price should be.
      </p>
      <Formik
  initialValues={{
    grossIncome: 100000,
    gds: 35,
    tds: 42,
    debtPayments: 0,
    propertyTax: 10000,
    condoFees: 0,
    heat: 200,
    rate: 6.29,
    rateType: 'fixed',
    rateTerm: 5,
    amortization: 25,
    rentalIncome: 0,
    rentalIncomeRule: 'addBack',
    loanType: 'regular',
    loanCompounding: 'semiAnnual',
    condoFeeInclusionType: 'B20',
    condoFeeInclusion: 50,
    rentalIncomePortion: 50,
    stressTestRule: false,
  }}
  validationSchema={formSchema}
  onSubmit={handleFormSubmit}
>
  {({ values, setFieldValue }) => (
    <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Gross Annual Income */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Gross Annual Income</label>
        <input
          type="number"
          name="grossIncome"
          min="0"
          step="1000"
          className="border p-2 rounded-lg w-full"
          value={values.grossIncome}
          onChange={(e) => setFieldValue('grossIncome', Number(e.target.value))}
        />
      </div>

      {/* Debt Payments */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Monthly Debt Payments</label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={values.debtPayments}
            className="w-full"
            onChange={(e) => setFieldValue('debtPayments', Number(e.target.value))}
          />
          <input
            type="number"
            name="debtPayments"
            min="0"
            max="5000"
            step="100"
            className="border p-2 rounded-lg w-1/2"
            value={values.debtPayments}
            onChange={(e) => setFieldValue('debtPayments', Number(e.target.value))}
          />
        </div>
      </div>

      {/* Property Tax */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Property Tax (Yearly)</label>
        <Field
          type="number"
          name="propertyTax"
          className="border p-2 rounded-lg w-full"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValue('propertyTax', Number(e.target.value))
          }
        />
      </div>

      {/* Condo Fees */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Condo Fees (Monthly)</label>
        <Field
          type="number"
          name="condoFees"
          className="border p-2 rounded-lg w-full"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValue('condoFees', Number(e.target.value))
          }
        />
      </div>

      {/* Heat */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Heating Costs (Monthly)</label>
        <Field
          type="number"
          name="heat"
          className="border p-2 rounded-lg w-full"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValue('heat', Number(e.target.value))
          }
        />
      </div>

      {/* GDS Slider and Input */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">
          Gross Debt Service (GDS)
          <span className="text-gray-500 text-xs ml-2">
            Percentage of your gross income spent on housing costs.
          </span>
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="20"
            max="50"
            step="1"
            value={values.gds}
            className="w-full"
            onChange={(e) => setFieldValue('gds', Number(e.target.value))}
          />
          <input
            type="number"
            name="gds"
            min="20"
            max="50"
            step="1"
            className="border p-2 rounded-lg w-1/2"
            value={values.gds}
            onChange={(e) => setFieldValue('gds', Number(e.target.value))}
          />
        </div>
      </div>

      {/* TDS Slider and Input */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">
          Total Debt Service (TDS)
          <span className="text-gray-500 text-xs ml-2">
            Percentage of your income spent on total debt payments.
          </span>
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="30"
            max="50"
            step="1"
            value={values.tds}
            className="w-full"
            onChange={(e) => setFieldValue('tds', Number(e.target.value))}
          />
          <input
            type="number"
            name="tds"
            min="30"
            max="50"
            step="1"
            className="border p-2 rounded-lg w-1/2"
            value={values.tds}
            onChange={(e) => setFieldValue('tds', Number(e.target.value))}
          />
        </div>
      </div>

      {/* Rate */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Mortgage Rate (%)</label>
        <Field
          type="number"
          name="rate"
          step="0.01"
          className="border p-2 rounded-lg w-full"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValue('rate', Number(e.target.value))
          }
        />
      </div>

      {/* Rate Type */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Rate Type</label>
        <Field
          as="select"
          name="rateType"
          className="border p-2 rounded-lg w-full"
        >
          <option value="fixed">Fixed</option>
          <option value="variable">Variable</option>
        </Field>
      </div>

      {/* Rate Term */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Rate Term (Years)</label>
        <Field
          as="select"
          name="rateTerm"
          className="border p-2 rounded-lg w-full"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFieldValue('rateTerm', Number(e.target.value))
          }
        >
          {Array.from({ length: 10 }, (_, year) => (
            <option key={year} value={year + 1}>
              {year + 1}
            </option>
          ))}
        </Field>
      </div>

      {/* Amortization */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Amortization Period (Years)</label>
        <Field
          type="range"
          name="amortization"
          min="0"
          max="50"
          className="w-full"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('amortization', Number(e.target.value))}
        />
        <div className="text-right">{values.amortization} years</div>
      </div>

      {/* Rental Income */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Rental Income (Monthly)</label>
        <Field
          type="number"
          name="rentalIncome"
          className="border p-2 rounded-lg w-full"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValue('rentalIncome', Number(e.target.value))
          }
        />
      </div>

      {/* Loan Type */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Loan Type</label>
        <Field
          as="select"
          name="loanType"
          className="border p-2 rounded-lg w-full"
        >
          <option value="regular">Regular</option>
          <option value="interestOnly">Interest Only</option>
        </Field>
      </div>

      {/* Loan Compounding */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Loan Compounding</label>
        <Field
          as="select"
          name="loanCompounding"
          className="border p-2 rounded-lg w-full"
        >
          <option value="annual">Annual</option>
          <option value="semiAnnual">Semi-Annual</option>
          <option value="monthly">Monthly</option>
          <option value="daily">Daily</option>
        </Field>
      </div>

      {/* Stress Test Rule */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Stress Test Rule</label>
        <Field
          as="select"
          name="condoFeeInclusionType"
          className="border p-2 rounded-lg w-full"
        >
          <option value="B20">B20</option>
          <option value="contract">Contract</option>
        </Field>
      </div>

      {/* Condo Fee Inclusion */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Condo Fee Inclusion</label>
        <Field
          as="select"
          name="condoFeeInclusion"
          className="border p-2 rounded-lg w-full"
        >
          <option value={50}>50%</option>
          <option value={80}>80%</option>
          <option value={100}>100%</option>
        </Field>
      </div>

      {/* Rental Income Rule */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Rental Income Rule</label>
        <Field
          as="select"
          name="rentalIncomeRule"
          className="border p-2 rounded-lg w-full"
        >
          <option value="addBack">Add Back</option>
          <option value="offset">Offset</option>
        </Field>
      </div>

      {/* Rental Income Portion */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Rental Income Portion</label>
        <Field
          as="select"
          name="rentalIncomePortion"
          className="border p-2 rounded-lg w-full"
        >
          <option value={50}>50%</option>
          <option value={80}>80%</option>
          <option value={100}>100%</option>
        </Field>
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg font-bold hover:bg-white border border-white hover:text-black hover:border-black"
        >
          Calculate
        </button>
      </div>
    </Form>
  )}
</Formik>

      {/* Display results */}
     {/* Display Results */}
{results && (
  <div className="mt-8">
    <h2 className="text-xl font-bold">Calculation Results</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      
      {/* Maximum Mortgage Amount */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="font-bold">Maximum Mortgage Amount:</p>
        <p>${Number(results.maxMortgage).toFixed(2)}</p> {/* Cast to Number */}
      </div>

      {/* Stress Test Rate */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="font-bold">Stress Test Rate:</p>
        <p>{Number(results.stressTestRate).toFixed(2)}%</p> {/* Cast to Number */}
      </div>

      {/* GDS and TDS */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="font-bold">GDS / TDS Ratios:</p>
        <p>{Number(results.gds).toFixed(2)}% / {Number(results.tds).toFixed(2)}%</p> {/* Cast to Number */}
      </div>

      {/* Monthly Mortgage */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="font-bold">Monthly Mortgage:</p>
        <p>${Number(results.adjustedMonthlyMortgage).toFixed(2)}</p> {/* Cast to Number */}
      </div>

      {/* Debt Payments */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="font-bold">Debt Payments:</p>
        <p>${Number(results.debtPayments).toFixed(2)}</p> {/* Cast to Number */}
      </div>

      {/* Home Expenses */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="font-bold">Home Expenses:</p>
        <p>${Number(results.totalHomeExpenses).toFixed(2)}</p> {/* Cast to Number */}
      </div>

      {/* Cash Left (Gross) */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="font-bold">Cash Left (Gross):</p>
        <p>${Number(results.cashLeft).toFixed(2)}</p> {/* Cast to Number */}
      </div>

    </div>
  </div>
)}




    </div>
  );
}
