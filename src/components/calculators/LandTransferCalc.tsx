import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

// Define form values and result types
interface FormValues {
  location: string;
  homePrice: number;
  downPayment: number | null;
  amortization: number | null;
  firstTimeBuyer: boolean;
  foreignBuyer: boolean;
}

interface CalculationResults {
  provincialLTT: number;
  municipalLTT?: number;
  totalLTT: number;
  firstTimeBuyerRebate: number;
  foreignBuyerTax: number;
  netLTT: number;
}

// Validation schema for form fields
const formSchema = Yup.object().shape({
  location: Yup.string().required("Required"),
  homePrice: Yup.number().min(50000).max(5000000).required("Required"),
  downPayment: Yup.number().min(0).optional(),
  amortization: Yup.number().min(0).optional(),
  firstTimeBuyer: Yup.boolean().required("Required"),
  foreignBuyer: Yup.boolean().required("Required"),
});

// Land transfer tax calculation function
// Land transfer tax calculation function
const calculateLandTransferTax = (values: FormValues): CalculationResults => {
  const { location, homePrice, firstTimeBuyer, foreignBuyer } = values;

  let provincialLTT = 0;
  let municipalLTT = 0;
  let foreignBuyerTax = 0;
  let firstTimeBuyerRebate = 0;

  // Ontario Provincial LTT Calculation (tiered system)
  if (location === "Ontario" || location === "Toronto") {
    if (homePrice > 2000000) {
      provincialLTT += (homePrice - 2000000) * 0.025;
    }
    if (homePrice > 400000) {
      provincialLTT += (Math.min(homePrice, 2000000) - 400000) * 0.02;
    }
    if (homePrice > 250000) {
      provincialLTT += (Math.min(homePrice, 400000) - 250000) * 0.015;
    }
    if (homePrice > 55000) {
      provincialLTT += (Math.min(homePrice, 250000) - 55000) * 0.01;
    }
    provincialLTT += Math.min(homePrice, 55000) * 0.005;

    // Toronto municipal LTT
    if (location === "Toronto") {
      if (homePrice > 2000000) {
        municipalLTT += (homePrice - 2000000) * 0.025;
      }
      if (homePrice > 400000) {
        municipalLTT += (Math.min(homePrice, 2000000) - 400000) * 0.02;
      }
      if (homePrice > 250000) {
        municipalLTT += (Math.min(homePrice, 400000) - 250000) * 0.015;
      }
      if (homePrice > 55000) {
        municipalLTT += (Math.min(homePrice, 250000) - 55000) * 0.01;
      }
      municipalLTT += Math.min(homePrice, 55000) * 0.005;
    }
  }

  // British Columbia Land Transfer Tax Calculation
  if (location === "British Columbia") {
    if (homePrice > 2000000) {
      provincialLTT += (homePrice - 2000000) * 0.03;
    }
    if (homePrice > 200000) {
      provincialLTT += (Math.min(homePrice, 2000000) - 200000) * 0.02;
    }
    provincialLTT += Math.min(homePrice, 200000) * 0.01;
  }

  // Manitoba LTT Calculation
  if (location === "Manitoba") {
    if (homePrice > 200000) {
      provincialLTT += (homePrice - 200000) * 0.02;
    }
    provincialLTT += Math.min(homePrice, 200000) * 0.01;
  }

  // Quebec LTT Calculation
  if (location === "Quebec") {
    if (homePrice > 500000) {
      provincialLTT += (homePrice - 500000) * 0.015;
    }
    if (homePrice > 250000) {
      provincialLTT += (Math.min(homePrice, 500000) - 250000) * 0.01;
    }
    provincialLTT += Math.min(homePrice, 250000) * 0.005;
  }

  // First-Time Buyer Rebates (Ontario and Toronto examples)
  if (firstTimeBuyer) {
    if (location === "Toronto") {
      firstTimeBuyerRebate = 4475;
    } else if (location === "Ontario") {
      firstTimeBuyerRebate = 4000;
    }
    firstTimeBuyerRebate = Math.min(firstTimeBuyerRebate, provincialLTT + municipalLTT);
  }

  // Foreign Buyer Tax (15% for Ontario, BC)
  if (foreignBuyer && (location === "Ontario" || location === "British Columbia")) {
    foreignBuyerTax = homePrice * 0.15;
  }

  // Calculate total LTT and net LTT after rebates
  const totalLTT = provincialLTT + municipalLTT;
  const netLTT = totalLTT + foreignBuyerTax - firstTimeBuyerRebate;

  return {
    provincialLTT,
    municipalLTT,
    totalLTT,
    firstTimeBuyerRebate,
    foreignBuyerTax,
    netLTT,
  };
};


// Main component
export default function LandTransferTaxCalculator() {
  const [results, setResults] = useState<CalculationResults | null>(null);

  const handleFormSubmit = (values: FormValues): void => {
    const calculatedResults = calculateLandTransferTax(values);
    setResults(calculatedResults);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white border border-4 rounded-xl shadow-lg">
      <h1 className="text-left text-2xl font-bold mb-2 text-black">Land Transfer Tax Calculator</h1>
      <p className='mb-6 text-sm'> Prepare for additional expenses after closing! Get an idea of the land transfer tax you will need to pay on your purchase. </p>
      <Formik
        initialValues={{
          location: "Ontario", // Default location
          homePrice: 888000,
          downPayment: null, // Make optional
          amortization: null, // Make optional
          firstTimeBuyer: false,
          foreignBuyer: false,
        }}
        validationSchema={formSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Location */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Location</label>
              <Field as="select" name="location" className="border p-2 rounded-lg w-full">
                <option value="Toronto">Toronto</option>
                <option value="Ontario">Ontario</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Manitoba">Manitoba</option>
                <option value="Quebec">Quebec</option>
                <option value="Other">Other</option>
              </Field>
            </div>

            {/* Home Price */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Home Price</label>
              <Field type="number" name="homePrice" className="border p-2 rounded-lg w-full" />
            </div>

            {/* Conditionally render Down Payment and Amortization fields for Ontario/Toronto */}
            {["Ontario", "Toronto"].includes(values.location) && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Down Payment</label>
                  <Field type="number" name="downPayment" className="border p-2 rounded-lg w-full" />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Amortization</label>
                  <Field type="number" name="amortization" className="border p-2 rounded-lg w-full" />
                </div>
              </>
            )}

            {/* First-Time Buyer */}
            <div className="mb-4 flex justify-around">
              <div>
                <label className="block text-sm font-bold mb-2">Are you a first-time home buyer?</label>
                <Field type="checkbox" name="firstTimeBuyer" />
              </div>

              {/* Foreign Buyer */}
              <div>
                <label className="block text-sm font-bold mb-2">Are you a foreign buyer?</label>
                <Field type="checkbox" name="foreignBuyer" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-bold">
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
              <p className="font-bold">Provincial LTT:</p>
              <p>${results.provincialLTT.toFixed(2)}</p>
            </div>
            {results.municipalLTT !== undefined && (
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="font-bold">Municipal LTT:</p>
                <p>${results.municipalLTT.toFixed(2)}</p>
              </div>
            )}
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Total LTT:</p>
              <p>${results.totalLTT.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">First-Time Buyer Rebate:</p>
              <p>${results.firstTimeBuyerRebate.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Foreign Buyer Tax:</p>
              <p>${results.foreignBuyerTax.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold">Net LTT:</p>
              <p>${results.netLTT.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
