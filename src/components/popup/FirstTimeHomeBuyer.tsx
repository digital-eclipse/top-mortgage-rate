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

const FirstTimeHomeBuyerContent: React.FC = () => {
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
        formData.append('mortgageType', 'First Time Home Buyer');
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
      <h4 className="text-lg font-semibold mb-4">Learn More: FTHB / New Mortgage</h4>
      <p className="mb-4">
        No matter where you are in your home-buying process, we are here to help. It can be
        confusing to navigate this process alone. That&apos;s why working with a mortgage broker
        can be so helpful—we do all the work to find the right mortgage solution, tailored for you.
      </p>
      <p className="mb-4">
        When you reach out to us, you will have an intake call with a team member to gather
        general information about your situation, what services you need, and your mortgage priorities.
      </p>
      <p className="mb-4">
        Then, we connect you with a mortgage specialist to complete an application with detailed
        information. This helps us assess which products you qualify for and who can best manage your file.
      </p>
      <p className="mb-4">
        Finally, you&apos;ll be paired with the expert who will handle your file from start to finish, advocating
        on your behalf to the lenders to secure the best solution for you.
      </p>
      <p className="font-semibold mb-4">Submit a call request form to start the process—no commitment required.</p>

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
              <option value="just looking">Just Looking</option>
              <option value="second opinion">Getting a Second Opinion</option>
              <option value="pre-approval">Need Pre-Approval / Have a House in Mind</option>
              <option value="ready to buy">I am Ready to Buy</option>
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

export default FirstTimeHomeBuyerContent;
