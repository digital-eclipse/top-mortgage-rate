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

const RenewMortgageContent: React.FC = () => {
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
      formData.append('mortgageType', 'Renew Mortgage');
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
      <h4 className="text-lg font-semibold mb-4">Learn More: Renewing</h4>
      <p className="mb-4">
        A mortgage renewal happens when the term of your current mortgage ends, and you need to
        either renew it with the same lender or switch to a new one. During the renewal process, you
        can negotiate new terms such as the interest rate, payment frequency, and mortgage type.
      </p>
      <p className="mb-4">
        It&apos;s a good idea to explore options with other lenders to ensure you get the best terms,
        especially if your financial situation or the mortgage market has changed.
      </p>
      <p className="mb-4">
        If you switch lenders, you&apos;ll need to reapply as it will be considered a new mortgage. Ensure your
        documents are in order a few months before renewal, as changes in your employment or financial
        situation may impact your options.
      </p>
      <p className="mb-4">
        Our team will start with an intake call to understand your needs and priorities. Then, a mortgage
        specialist will guide you through an application to determine the best products available to you.
      </p>
      <p className="mb-4">
        You&apos;ll be assigned an expert who will manage your case from start to finish and advocate on your
        behalf to secure the best solution.
      </p>
      <p className="font-semibold mb-4">Submit a call request form to explore your options—no commitment required.</p>

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
              <option value="getting a second opinion but I have a renewal option lined up">
                Getting a Second Opinion but I Have a Renewal Option Lined Up
              </option>
              <option value="I want to switch lenders / I’m not renewing with my current lender">
                I Want to Switch Lenders / I’m Not Renewing with My Current Lender
              </option>
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

export default RenewMortgageContent;
