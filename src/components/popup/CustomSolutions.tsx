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
  services: string[];
  stage: string;
}

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobile: Yup.string().required('Mobile number is required'),
  services: Yup.array().min(1, 'Please select at least one service'),
  stage: Yup.string().required('Please select your current stage'),
});

const CustomSolutionsForm: React.FC = () => {
  const { executeRecaptcha } = useReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const initialValues: FormValues = {
    name: '',
    email: '',
    mobile: '',
    services: [],
    stage: '',
  };
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      setIsSubmitting(true);
      const token = await executeRecaptcha('custom_solutions_form');
  
      const formData = new FormData();
      formData.append('formType', 'learnMore');
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('mobile', values.mobile);
      formData.append('mortgageType', 'Custom Solutions Inquiry');
      formData.append('stage', values.stage);
      formData.append('token', token);
  
      // Append each service individually
      values.services.forEach((service) => {
        formData.append('service', service);
      });
  
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
      setIsSubmitting(false);
      setTimeout(() => setSubmissionStatus(null), 5000);
    }
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Learn More: Custom Mortgage Solutions</h4>
      <p className="mb-4">
        Whether you are purchasing a second home, investment property, are self-employed, 
        or looking for commercial or construction financing, we know there are custom mortgage 
        solutions you need.
      </p>
      <p className="mb-4">
        When you reach out to us, you will have an intake call with someone on our team to get general 
        information about your situation, the services you&apos;re looking for, and your mortgage priorities.
      </p>
      <p className="mb-4">
        We will connect you with a specialist who will ask you to complete an application with in-depth 
        information so we can accurately assess which products you may qualify for and who is best suited 
        to manage your file.
      </p>
      <p className="mb-4">
        Finally, you&apos;ll be paired with the expert who will handle your file from start to finish, advocating 
        on your behalf to lenders to secure the best solution tailored to you.
      </p>
      <p className="font-semibold mb-4">
        Submit a call request form to start the process and explore your options—no commitment required.
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
            <label className="block font-semibold text-sm">Service</label>
            <div className="space-y-2">
              {[
                'Construction Loan',
                'Commercial Loan',
                'Self-employed',
                'Private Mortgage',
                'Investment',
                'Multiple Properties',
                'Debt Consolidation',
                'Other',
              ].map((service, index) => (
                <div key={index} className="flex items-center">
                  <Field
                    type="checkbox"
                    name="services"
                    value={service}
                    className="mr-2"
                  />
                  <span>{service}</span>
                </div>
              ))}
            </div>
            <ErrorMessage name="services" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold text-sm">Stage in the Process</label>
            <Field
              as="select"
              name="stage"
              className="border p-2 rounded-md w-full"
            >
              <option value="">Select Stage</option>
              <option value="just looking at my options">Just looking at my options</option>
              <option value="getting a second opinion">Getting a second opinion, I’ve already looked into this</option>
              <option value="ready to move forward">I’m ready to move forward</option>
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

export default CustomSolutionsForm;
