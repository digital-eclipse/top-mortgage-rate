'use client';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useReCaptcha } from 'next-recaptcha-v3';
import { useState } from 'react';
// Define Form Values
interface FormValues {
  name: string;
  email: string;
  mobile: string;
  stage: string;
}

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobile: Yup.string().required('Mobile number is required'),
  stage: Yup.string().required('Please select your current stage'),
});

const RefinanceMortgageContent: React.FC = () => {
    const { executeRecaptcha } = useReCaptcha(); // Initialize reCaptcha
    const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
    const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  
    const initialValues: FormValues = {
      name: '',
      email: '',
      mobile: '',
      stage: '',
    };
  
    const handleSubmit = async (
      values: FormValues,
      { setSubmitting, resetForm }: FormikHelpers<FormValues>
    ) => {
      try {
        setIsSubmitting(true); // Show loading indicator
        const token = await executeRecaptcha('learn_more'); // Generate reCAPTCHA token
  
        const formData = new FormData();
        formData.append('formType', 'learnMore');
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('mobile', values.mobile);
        formData.append('stage', values.stage);
        formData.append('mortgageType', 'Refinance Mortgage');
        formData.append('token', token);
  
        const response = await fetch('/api/email', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          setSubmissionStatus('success');
          resetForm();
        } else {
          setSubmissionStatus('error');
        }
      } catch (error) {
        console.error('Error occurred during form submission:', error);
        setSubmissionStatus('error');
      } finally {
        setSubmitting(false);
        setIsSubmitting(false); // Hide loading indicator
        setTimeout(() => setSubmissionStatus(null), 5000); // Reset status after 5 seconds
      }
    };


  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Learn More: Refinancing</h4>
      <p className="mb-4">
        A mortgage refinance allows you to replace your existing mortgage with a new one—often to 
        secure a lower interest rate, access equity, or adjust the terms of your mortgage.
      </p>
      <p className="mb-4">
        Refinancing can help consolidate debt, fund renovations, or lower monthly payments. We will 
        shop around and find the best option for you, whether with your current lender or a new one.
      </p>
      <p className="mb-4">
        Note that refinancing may involve fees such as legal costs, appraisal fees, or prepayment penalties, 
        depending on the terms of your existing mortgage.
      </p>
      <p className="mb-4">
        When you reach out to us, we’ll start with an intake call to understand your situation, the services 
        you need, and your mortgage priorities.
      </p>
      <p className="mb-4">
        Afterward, a mortgage specialist will guide you through the application process, gathering 
        detailed information to determine the best products for your needs.
      </p>
      <p className="mb-4">
        You’ll then be assigned an expert to manage your case from start to finish, advocating on your behalf 
        to secure the best mortgage solution for you.
      </p>
      <p className="font-semibold mb-4">
        Submit a call request form to explore your options—no commitment required.
      </p>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-6">
          <div>
            <label className="block font-semibold text-sm">Name</label>
            <Field
              name="name"
              type="text"
              className="border p-2 rounded-md w-full"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold text-sm">Email</label>
            <Field
              name="email"
              type="email"
              className="border p-2 rounded-md w-full"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold text-sm">Mobile</label>
            <Field
              name="mobile"
              type="text"
              className="border p-2 rounded-md w-full"
            />
            <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold text-sm">Stage in the Process</label>
            <Field
              as="select"
              name="stage"
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select Stage</option>
              <option value="just looking at my options">Just Looking at My Options</option>
              <option value="getting a second opinion">Getting a Second Opinion</option>
              <option value="ready to refinance">I Am Ready to Refinance</option>
              <option value="other">Other</option>
            </Field>
            <ErrorMessage name="stage" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-md font-semibold transition ${
              isSubmitting
                ? 'bg-gray-500 cursor-not-allowed'
                : submissionStatus === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Submitting...'
              : submissionStatus === 'success'
              ? 'Request Submitted!'
              : 'Submit Request'}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RefinanceMortgageContent;