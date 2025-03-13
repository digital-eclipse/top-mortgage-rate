import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

interface CalculationResults {
  totalMonthlyCost: number;
  monthlyMortgagePayment: number;
  totalHomeExpenses: number;
  rentalIncome: number;
  netMortgage: number;
  mortgageInsurance: number;
  totalInterestPaid: number;
  balanceEndOfTerm: number;
  effectiveAmortization: number;
}

interface FormValues {
  homePrice: number;
  downPayment: number;
  rate: number;
  rateTerm: number;
  amortization: number;
  propertyTax: number;
  condoFees: number;
  heat: number;
  otherMonthlyExpenses: number;
  rentalIncome: number;
  paymentFrequency: "Monthly" | "Bi-weekly" | "Accelerated Bi-weekly";
  firstTimeHomeBuyer: boolean;
  newlyBuiltHome: boolean;
  enableDec15Rules: boolean;
  isFixedRate: boolean;
}

// Initial form schema validation
const formSchema = Yup.object().shape({
  homePrice: Yup.number().min(100000).max(2000000).required("Required"),
  downPayment: Yup.number().min(0).required("Required"),
  rate: Yup.number().min(0).max(10).required("Required"),
  rateTerm: Yup.number().min(1).max(10).required("Required"),
  amortization: Yup.number().min(0).max(30).required("Required"),
  propertyTax: Yup.number().min(0).required("Required"),
  condoFees: Yup.number().min(0).optional(),
  heat: Yup.number().min(0).optional(),
  otherMonthlyExpenses: Yup.number().min(0).optional(),
  rentalIncome: Yup.number().min(0).optional(),
  paymentFrequency: Yup.string().oneOf(["Monthly", "Bi-weekly", "Accelerated Bi-weekly"]).required("Required"),
  firstTimeHomeBuyer: Yup.boolean(),
  newlyBuiltHome: Yup.boolean(),
  enableDec15Rules: Yup.boolean(),
});

export default function MortgagePaymentCalculator() {
  const [results, setResults] = useState<CalculationResults | null>(null);

// Helper to calculate the minimum down payment based on home price
const calculateMinimumDownPayment = (homePrice: number): number => {
  if (homePrice <= 500000) {
    return homePrice * 0.05; // 5% on first $500,000
  } else if (homePrice <= 1000000) {
    return 500000 * 0.05 + (homePrice - 500000) * 0.1; // 10% on remaining
  }
  return homePrice * 0.2; // 20% for homes over $1,000,000
};

// Helper to calculate mortgage insurance (CMHC rates)
const calculateMortgageInsurance = (
  loanAmount: number,
  downPaymentPercentage: number
): number => {
  if (downPaymentPercentage < 20) {
    if (downPaymentPercentage >= 15) return loanAmount * 0.028;
    if (downPaymentPercentage >= 10) return loanAmount * 0.031;
    return loanAmount * 0.04;
  }
  return 0; // No insurance needed if down payment >= 20%
};

// Helper to calculate total interest paid and balance at end of term
const calculateTermInterestAndBalance = (
  loanAmount: number,
  monthlyPayment: number,
  termYears: number,
  rate: number
) => {
  let balance = loanAmount;
  let totalInterest = 0;
  const monthlyRate = rate / 100 / 12;
  const numberOfTermPayments = termYears * 12;

  for (let i = 0; i < numberOfTermPayments; i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    totalInterest += interestPayment;
    balance -= principalPayment;

    // Prevent negative balances
    if (balance <= 0) {
      balance = 0;
      break;
    }
  }

  return { totalInterest, balance };
};

// Adjust rate for variable interest scenarios
const getVariableRate = (baseRate: number): number => {
  const fluctuation = Math.random() * 0.5;
  return Math.random() > 0.5 ? baseRate + fluctuation : baseRate - fluctuation;
};

// Helper to calculate payment amount
const getPaymentAmount = (
  loanAmount: number,
  rate: number,
  totalPayments: number
): number => {
  if (rate <= 0 || totalPayments <= 0) {
    throw new Error("Interest rate and number of payments must be greater than 0.");
  }

  const monthlyRate = Math.pow(1 + rate / 100 / 2, 1 / 6) - 1;
  return (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));
};

// Main form submission handler with error handling
const handleFormSubmit = (values: FormValues): void => {
  try {
    const { homePrice, downPayment, amortization, rentalIncome } = values;

    const downPaymentPercentage = (downPayment / homePrice) * 100;
    const minimumDownPayment = calculateMinimumDownPayment(homePrice);

    if (downPayment < minimumDownPayment) {
      alert(`Minimum down payment required: ${minimumDownPayment.toFixed(2)}`);
      return;
    }

    const amortizationYears =
      values.enableDec15Rules && values.firstTimeHomeBuyer && values.newlyBuiltHome && homePrice <= 1500000
        ? 30
        : amortization;

    if (amortizationYears <= 0) {
      alert("Amortization period must be greater than 0.");
      return;
    }

    const loanAmount = homePrice - downPayment;
    const mortgageInsurance = calculateMortgageInsurance(loanAmount, downPaymentPercentage);
    const loanAmountWithInsurance = loanAmount + mortgageInsurance;

    const effectiveRate = values.isFixedRate ? values.rate : getVariableRate(values.rate);

    const paymentsPerYear = values.paymentFrequency === "Monthly" ? 12 : 26;
    const totalPayments = amortizationYears * paymentsPerYear;

    const paymentAmount = getPaymentAmount(loanAmountWithInsurance, effectiveRate, totalPayments);

    const { totalInterest, balance } = calculateTermInterestAndBalance(
      loanAmountWithInsurance,
      paymentAmount,
      values.rateTerm,
      effectiveRate
    );

    const totalHomeExpenses =
      values.propertyTax / 12 + values.condoFees + values.heat + values.otherMonthlyExpenses;

    const totalMonthlyCost = Math.max(paymentAmount + totalHomeExpenses - rentalIncome, 0);

    const calculationResults: CalculationResults = {
      totalMonthlyCost,
      monthlyMortgagePayment: paymentAmount,
      totalHomeExpenses,
      rentalIncome,
      netMortgage: loanAmount,
      mortgageInsurance,
      totalInterestPaid: totalInterest,
      balanceEndOfTerm: balance,
      effectiveAmortization: amortizationYears,
    };

    setResults(calculationResults);
  } catch (error) {
    console.error("Error during calculation:", error);
    alert("An error occurred during the calculation. Please review your inputs.");
  }
};


  return (
    <div className="max-w-6xl mx-auto p-8 bg-white border border-4 rounded-xl shadow-lg">
      <h1 className="text-left text-2xl font-bold mb-2 text-black">Monthly Cost Calculator</h1>
      <p className="text-sm mb-6">
        Curious about the total monthly costs? Use this tool to factor in mortgage payments, property taxes, and other expenses to see what your monthly budget will look like.
      </p>      
      <Formik
        initialValues={{
          homePrice: 1000000, // Example default
          downPayment: 75000,
          paymentFrequency: "Monthly",
          firstTimeHomeBuyer: false,
          newlyBuiltHome: false,
          enableDec15Rules: false,
          rate: 6.29,
          rateTerm: 5,
          amortization: 25,
          propertyTax: 10000,
          condoFees: 0,
          heat: 200,
          otherMonthlyExpenses: 0,
          rentalIncome: 0,
          isFixedRate: true, // Default to fixed rate
        }}
        validationSchema={formSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Home Price */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Home Price</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  step="10000"
                  value={values.homePrice}
                  className="w-full"
                  onChange={(e) => setFieldValue("homePrice", e.target.value)}
                />
                <input
                  type="number"
                  name="homePrice"
                  min="100000"
                  max="2000000"
                  step="10000"
                  className="border p-2 rounded-lg w-1/2 border-gray"
                  value={values.homePrice}
                  onChange={(e) => setFieldValue("homePrice", e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Down Payment</label>

              {/* Calculate minimum down payment based */}
              {(() => {
                const minDownPayment = calculateMinimumDownPayment(values.homePrice);
                return (
                  <div>
                    {/* Display down payment amount */}
                    <div className="flex justify-between items-center">
                      {/* Input to enter the actual down payment amount */}
                      <input
                        type="number"
                        name="downPayment"
                        min={minDownPayment}
                        max={values.homePrice}
                        step="100"
                        className="border p-2 rounded-lg border-gray"
                        value={values.downPayment}
                        onChange={(e) => setFieldValue("downPayment", parseFloat(e.target.value))}
                      />

                      {/* Display percentage next to the down payment */}
                      <div>
                        <p className="text-sm">
                          {((values.downPayment / values.homePrice) * 100).toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    {/* Slider to adjust the down payment */}
                    <input
                      type="range"
                      min={minDownPayment}
                      max={values.homePrice}
                      step="100"
                      value={values.downPayment}
                      className="w-full"
                      onChange={(e) => setFieldValue("downPayment", parseFloat(e.target.value))}
                    />
                  </div>
                );
              })()}
            </div>



            {/* Payment Frequency */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Payment Frequency</label>
              <Field as="select" name="paymentFrequency" className="border p-2 rounded-lg w-full border-gray">
                <option value="Monthly">Monthly</option>
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Accelerated Bi-weekly">Accelerated Bi-weekly</option>
              </Field>
            </div>

            {/* Checkboxes */}
            <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Options</label>
            <div className="flex items-start space-x-4 text-xs">
              <label>
                <Field type="checkbox" name="firstTimeHomeBuyer" className="mr-2" />
                First-time Homebuyer
              </label>
              <label>
                <Field type="checkbox" name="newlyBuiltHome" className="mr-2" />
                Newly Built Home
              </label>
              <label>
                <Field type="checkbox" name="enableDec15Rules" className="mr-2" />
                Enable December 15 Rules
              </label>
            </div>

            {/* Explanatory Section */}
            <div className="text-xs text-gray-600 mt-1">
              <p className="italic">
                * December 15 Rules: all first-time homebuyers and buyers of newly built properties can benefit from a 30-year insured mortgage for properties valued up to $1,500,000, starting December 15, 2024.
              </p>
            </div>
          </div>

            {/* Rate */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Rate (%)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.01"
                  value={values.rate}
                  className="w-full"
                  onChange={(e) => setFieldValue("rate", e.target.value)}
                />
                <input
                  type="number"
                  name="rate"
                  min="0"
                  max="10"
                  step="0.01"
                  className="border p-2 rounded-lg w-1/2 border-gray"
                  value={values.rate}
                  onChange={(e) => setFieldValue("rate", e.target.value)}
                />
              </div>
            </div>

            {/* Rate Term */}
            <div className="mb-4 flex w-full gap-4">
              <div className="">
                <label className="block text-sm font-bold mb-2">Rate</label>
                <div className="flex items-center space-x-4">
                  <label>
                  <Field
                    type="radio"
                    name="isFixedRate"
                    value="true"
                    className="mr-2"
                    checked={values.isFixedRate === true}
                  />                    Fixed
                  </label>
                  <label>
                    <Field type="radio" name="isFixedRate" value="false" className="mr-2" />
                    Variable
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Rate Term (Years)</label>
                <Field as="select" name="rateTerm" className="border p-2 rounded-lg w-full border-gray">
                  {Array.from({ length: 10 }, (_, year) => (
                    <option key={year} value={year + 1}>
                      {year + 1}
                    </option>
                  ))}
                </Field>
              </div>
            </div>

            {/* Amortization */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Amortization Period (Years)</label>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={values.amortization}
                className="w-full"
                onChange={(e) => setFieldValue("amortization", e.target.value)}
              />
              <div className="text-right">{values.amortization} years</div>
            </div>

            {/* Home Expenses */}
              <div>
                <label className="block text-sm font-bold mb-2">Property Tax (Yearly)</label>
                <Field type="number" name="propertyTax" className="border p-2 rounded-lg w-full border-gray" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Condo Fees (Monthly)</label>
                <Field type="number" name="condoFees" className="border p-2 rounded-lg w-full border-gray" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Heat (Monthly)</label>
                <Field type="number" name="heat" className="border p-2 rounded-lg w-full border-gray" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Other Monthly Expenses</label>
                <Field type="number" name="otherMonthlyExpenses" className="border p-2 rounded-lg w-full border-gray" />
              </div>

            {/* Add Rental Income */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Add Rental Income</label>
              <Field type="number" name="rentalIncome" className="border p-2 rounded-lg w-full border-gray" />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg font-bold hover:bg-white border border-gray hover:text-black"
              >
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
              <p className="font-bold">Total Monthly Cost:</p>
              <p>${results.totalMonthlyCost.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Monthly Mortgage Payment:</p>
              <p>${results.monthlyMortgagePayment.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Home Expenses:</p>
              <p>${results.totalHomeExpenses.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Net Mortgage:</p>
              <p>${results.netMortgage.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Mortgage Insurance:</p>
              <p>${results.mortgageInsurance.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Interest Paid Over Term:</p>
              <p>${results.totalInterestPaid.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Balance at End of Term:</p>
              <p>${results.balanceEndOfTerm.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
