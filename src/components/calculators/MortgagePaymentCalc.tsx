import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

// Define form values and result types
interface FormValues {
  mortgageAmount: number;
  rate: number;
  rateTerm: number;
  amortization: number;
  paymentFrequency: string;
}

interface CalculationResults {
  monthlyPayment: number;
  principalPaid: number;
  interestPaid: number;
  balanceEndOfTerm: number;
}

// Validation schema for the form
const formSchema = Yup.object().shape({
  mortgageAmount: Yup.number().min(50000).max(2000000).required("Required"),
  rate: Yup.number().min(0).max(10).required("Required"),
  rateTerm: Yup.number().min(1).max(10).required("Required"),
  amortization: Yup.number().min(5).max(30).required("Required"),
  paymentFrequency: Yup.string().oneOf(["Monthly", "Bi-weekly", "Accelerated Bi-weekly"]).required("Required"),
});

export default function MortgageCalculator() {
  const [results, setResults] = useState<CalculationResults | null>(null);

  // Helper function to calculate mortgage payment
  const calculateMortgage = (values: FormValues): void => {
    const { mortgageAmount, rate, amortization, rateTerm } = values;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = amortization * 12;

    // Calculate the monthly mortgage payment
    const monthlyPayment =
      (mortgageAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate interest and principal paid
    const interestPaid = monthlyPayment * numberOfPayments - mortgageAmount;
    const principalPaid = mortgageAmount - interestPaid;

    // Balance at the end of the term
    const balanceEndOfTerm = mortgageAmount - (monthlyPayment * rateTerm * 12);

    // Set calculation results
    const calculationResults: CalculationResults = {
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      principalPaid: parseFloat(principalPaid.toFixed(2)),
      interestPaid: parseFloat(interestPaid.toFixed(2)),
      balanceEndOfTerm: parseFloat(balanceEndOfTerm.toFixed(2)),
    };
    setResults(calculationResults);
  };


  return (
    <div className="max-w-6xl mx-auto p-8 bg-white border border-4 rounded-xl shadow-lg">
      <h1 className="text-left text-2xl font-bold mb-2 text-black">
        Mortgage Payment Calculator
      </h1>
      <p className='mb-6 text-sm'>
         Want to estimate your monthly mortgage payments? This tool can help you figure out what your budget might look like!      
      </p>

      <Formik
        initialValues={{
          mortgageAmount: 500000,
          paymentFrequency: "Monthly",
          rate: 6.29,
          rateTerm: 5,
          amortization: 25,
        }}
        validationSchema={formSchema}
        onSubmit={calculateMortgage}
      >
        {({ values, setFieldValue }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mortgage Amount */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Mortgage Amount</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="50000"
                  max="2000000"
                  step="10000"
                  value={values.mortgageAmount}
                  className="w-full"
                  onChange={(e) =>
                    setFieldValue("mortgageAmount", parseFloat(e.target.value))
                  }
                />
                <input
                  type="number"
                  name="mortgageAmount"
                  min="50000"
                  max="2000000"
                  step="10000"
                  className="border p-2 rounded-lg w-1/2 border-gray"
                  value={values.mortgageAmount}
                  onChange={(e) =>
                    setFieldValue("mortgageAmount", parseFloat(e.target.value))
                  }
                />
              </div>
            </div>

            {/* Payment Frequency */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Payment Frequency</label>
              <Field
                as="select"
                name="paymentFrequency"
                className="border p-2 rounded-lg w-full border-gray"
              >
                <option value="Monthly">Monthly</option>
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Accelerated Bi-weekly">Accelerated Bi-weekly</option>
              </Field>
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
                  onChange={(e) => setFieldValue("rate", parseFloat(e.target.value))}
                />
                <input
                  type="number"
                  name="rate"
                  min="0"
                  max="10"
                  step="0.01"
                  className="border p-2 rounded-lg w-1/2 border-gray"
                  value={values.rate}
                  onChange={(e) => setFieldValue("rate", parseFloat(e.target.value))}
                />
              </div>
            </div>
            
           {/* Rate Term */}
           <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Rate Term (Years)</label>
              <Field
                as="select"
                name="rateTerm"
                className="border p-2 rounded-lg w-full border-gray"
              >
                {Array.from({ length: 10 }, (_, year) => (
                  <option key={year} value={year + 1}>
                    {year + 1}
                  </option>
                ))}
              </Field>
            </div>

            {/* Amortization Period */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Amortization Period (Years)
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={values.amortization}
                className="w-full"
                onChange={(e) =>
                  setFieldValue("amortization", parseFloat(e.target.value))
                }
              />
              <div className="text-right">{values.amortization} years</div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg font-bold hover:bg-white border border-black hover:text-black"
              >
                Calculate Mortgage
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
              <p className="font-bold">Monthly Payment:</p>
              <p>${results.monthlyPayment}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Principal Paid:</p>
              <p>${results.principalPaid}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Interest Paid:</p>
              <p>${results.interestPaid}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Balance End of Term:</p>
              <p>${results.balanceEndOfTerm}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
