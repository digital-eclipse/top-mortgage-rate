'use client';

import { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Define the interface for form values
interface MortgageFormValues {
  mortgageAmount: number;
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

const CMHCRates: { [key: number]: number } = {
  5: 0.04,
  10: 0.031,
  15: 0.028,
  20: 0,
};

const amortizationOptions = [10, 15, 20, 25, 30, 40, 50];

// Validation schema for form fields
const formSchema = Yup.object().shape({
  mortgageAmount: Yup.number().min(0, "Mortgage amount must be a positive number.").required("Required"),
  debtPayments: Yup.number().min(0, "Debt payments must be a positive number.").required("Required"),
  propertyTax: Yup.number().min(0).optional(),
  condoFees: Yup.number().min(0).optional(),
  heat: Yup.number().min(0).optional(),
  gds: Yup.number().min(20, "Minimum GDS is 20").max(50, "Maximum GDS is 50").required('Required'),
  tds: Yup.number().min(30, "Minimum TDS is 30").max(50, "Maximum TDS is 50").required('Required'),  
  rate: Yup.number().min(0).required("Required"),
  rateType: Yup.string().oneOf(['fixed', 'variable']).required('Required'),
  rateTerm: Yup.number().min(1).max(10).required('Required'),
  amortization: Yup.number().oneOf(amortizationOptions, "Select a valid amortization period").required('Required'),
  rentalIncome: Yup.number().min(0).optional(),
  rentalIncomeRule: Yup.string().oneOf(['addBack', 'offset']).required('Required'),
  loanType: Yup.string().oneOf(['regular', 'interestOnly']).required('Required'),
  loanCompounding: Yup.string().oneOf(['annual', 'semiAnnual', 'monthly', 'daily']).required('Required'),
  condoFeeInclusionType: Yup.string().oneOf(['B20', 'contract']).required('Required'),
  condoFeeInclusion: Yup.number().oneOf([50, 80, 100]).required('Required'),
  rentalIncomePortion: Yup.number().oneOf([50, 80, 100]).required('Required'),
  stressTestRule: Yup.boolean().required('Required'),
});

// Main function for calculating mortgage
// Main function for calculating mortgage
const calculateMortgage = (values: MortgageFormValues) => {
  const {
    mortgageAmount,
    rate,
    amortization,
    debtPayments = 0, // Default to 0 if undefined
    propertyTax = 0,  // Default to 0 if undefined
    condoFees = 0,    // Default to 0 if undefined
    heat = 0,         // Default to 0 if undefined
    rentalIncome = 0, // Default to 0 if undefined
    rentalIncomeRule,
    loanType,
    condoFeeInclusion,
    rentalIncomePortion,
    stressTestRule,
    gds, // Dynamic GDS from form
    tds, // Dynamic TDS from form
  } = values;

  const effectiveRate = stressTestRule ? Math.max(rate, 5.25) : rate;
  const monthlyRate = effectiveRate / 100 / 12;
  const totalPayments = amortization * 12;
  
  const monthlyMortgage =
    mortgageAmount * monthlyRate * (Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);

  const adjustedMonthlyMortgage = loanType === 'interestOnly' ? mortgageAmount * monthlyRate : monthlyMortgage;

  // Calculate total home expenses including defaults for optional fields
  const totalHomeExpenses = (propertyTax / 12) + (condoFees * (condoFeeInclusion / 100)) + heat;

  // Calculate total expenses
  const totalExpenses = totalHomeExpenses + debtPayments;

  // Handle rental income adjustment
  const rentalAdjustment = rentalIncomeRule === 'offset' ? rentalIncome * (rentalIncomePortion / 100) : rentalIncome;

  return {
    adjustedMonthlyMortgage,
    totalHomeExpenses,
    totalExpenses,
    rentalAdjustment,
    requiredIncome: calculateRequiredIncome(adjustedMonthlyMortgage, totalExpenses, rentalAdjustment, gds, tds), // Pass dynamic GDS and TDS here
    gds: calculateGDS(adjustedMonthlyMortgage, totalExpenses),
    tds: calculateTDS(adjustedMonthlyMortgage, totalExpenses, debtPayments),
  };
};

const calculateRequiredIncome = (
  adjustedMonthlyMortgage: number,
  totalExpenses: number,
  rentalAdjustment: number,
  gds: number,
  tds: number
) => {
  const validGDS = gds > 0 ? gds : 35;  // Default to 35 if gds is invalid
  const validTDS = tds > 0 ? tds : 42;  // Default to 42 if tds is invalid

  const incomeRequiredForGDS = (adjustedMonthlyMortgage + totalExpenses) / (validGDS / 100);
  const incomeRequiredForTDS = (adjustedMonthlyMortgage + totalExpenses + rentalAdjustment) / (validTDS / 100);

  return Math.max(incomeRequiredForGDS, incomeRequiredForTDS) * 12;
};




const calculateGDS = (adjustedMonthlyMortgage: number, totalExpenses: number) => {
  return (adjustedMonthlyMortgage / totalExpenses).toFixed(2);
};

const calculateTDS = (adjustedMonthlyMortgage: number, totalExpenses: number, debtPayments: number) => {
  return ((adjustedMonthlyMortgage + debtPayments) / totalExpenses).toFixed(2);
};

// Main component
export default function MortgageCalculator() {
  const [results, setResults] = useState<{
    adjustedMonthlyMortgage: number;
    totalHomeExpenses: number;
    totalExpenses: number;
    rentalAdjustment: number;
    requiredIncome: number;
    gds: string;
    tds: string;
  } | null>(null);

  const handleFormSubmit = (values: MortgageFormValues, actions: FormikHelpers<MortgageFormValues>) => {
    const calculatedResults = calculateMortgage(values);
    setResults(calculatedResults);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white border border-4 rounded-xl shadow-lg">
      <h1 className="text-left text-2xl font-bold mb-2 text-black">Required Income Calculator</h1>
      <p className='mb-6 text-sm'>
       Want to see how much income you’ll need to buy your dream home? Use this tool to help you plan and set realistic financial goals  
      </p>
      <Formik
        initialValues={{
          mortgageAmount: 500000,
          gds: 35, // Starting with baseline GDS
          tds: 42, // Starting with baseline TDS
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
          condoFeeInclusion: 100,
          rentalIncomePortion: 100,
          stressTestRule: false,
        }}
        validationSchema={formSchema}
        onSubmit={handleFormSubmit}
      >
         {({ values, setFieldValue }) => (
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Mortgage Amount Slider and Input */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Mortgage Amount</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="100000"
                max="2000000"
                step="10000"
                value={values.mortgageAmount}
                className="w-full"
                onChange={(e) => setFieldValue('mortgageAmount', Number(e.target.value))}
                />
              <input
                type="number"
                name="mortgageAmount"
                min="100000"
                max="2000000"
                step="10000"
                className="border p-2 rounded-lg w-1/2"
                value={values.mortgageAmount}
                onChange={(e) => setFieldValue('mortgageAmount', Number(e.target.value))}
                />
            </div>
          </div>

          {/* Monthly Debt Payments Slider and Input */}
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
              <Field type="number" name="propertyTax" className="border p-2 rounded-lg w-full" />
            </div>

            {/* Condo Fees */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Condo Fees (Monthly)</label>
              <Field type="number" name="condoFees" className="border p-2 rounded-lg w-full" />
            </div>

            {/* Heat */}
            <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Heating Costs (Monthly) 
              <span className="text-gray-500 text-xs ml-2">
                Monthly heating costs
              </span>
            </label>
            <Field 
              type="number" 
              name="heat" 
              className="border p-2 rounded-lg w-full" 
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
                  onChange={(e) => setFieldValue('tds', e.target.value)}
                />
                <input
                  type="number"
                  name="tds"
                  min="30"
                  max="50"
                  step="1"
                  className="border p-2 rounded-lg w-1/2"
                  value={values.tds}
                  onChange={(e) => setFieldValue('tds', e.target.value)}
                />
              </div>
            </div>

            {/* Rate */} 
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Mortgage Rate (%)</label>
              <Field type="number" name="rate" step="0.01" className="border p-2 rounded-lg w-full" />
            </div>

            {/* Rate Type */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Rate Type</label>
              <Field as="select" name="rateType" className="border p-2 rounded-lg w-full">
                <option value="fixed">Fixed</option>
                <option value="variable">Variable</option>
              </Field>
            </div>

            {/* Rate Term */}
            <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Rate Term (Years)</label>
            <Field as="select" name="rateTerm" className="border p-2 rounded-lg w-full">
              {Array.from({ length: 10 }, (_, year) => (
                <option key={year} value={year + 1}>{year + 1}</option>
              ))}
            </Field>
          </div>

            {/* Amortization */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Amortization Period (Years)</label>
              <Field type="range" name="amortization" min="0" max="50" className="w-full" />
              <div className="text-right">{values.amortization} years</div>
            </div>

            {/* Rental Income */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Rental Income (Monthly)</label>
              <Field type="number" name="rentalIncome" className="border p-2 rounded-lg w-full" />
            </div>

            {/* Loan Type */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Loan Type</label>
              <Field as="select" name="loanType" className="border p-2 rounded-lg w-full">
                <option value="regular">Regular</option>
                <option value="interestOnly">Interest Only</option>
              </Field>
            </div>

            {/* Loan Compounding */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Loan Compounding</label>
              <Field as="select" name="loanCompounding" className="border p-2 rounded-lg w-full">
                <option value="annual">Annual</option>
                <option value="semiAnnual">Semi-Annual</option>
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
              </Field>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-bold hover:bg-white border border-white hover:text-black hover:border-black">
                Calculate
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Display results */}
      {results && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Calculation Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Monthly Mortgage:</p> 
              <p>${results.adjustedMonthlyMortgage.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Total Home Expenses:</p> 
              <p>${results.totalHomeExpenses.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Required Income:</p> 
              <p>${results.requiredIncome.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
