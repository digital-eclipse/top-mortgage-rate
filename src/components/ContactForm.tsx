'use client';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useReCaptcha } from 'next-recaptcha-v3';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  location: Yup.string().required('Location is required'),
  contactMethod: Yup.array().of(Yup.string()).min(1, 'Please select at least one contact method').required(),
  services: Yup.string().required('Services are required'),
});

const ContactForm = ({ onClose }: { onClose: () => void }) => {
  const { executeRecaptcha } = useReCaptcha(); // Initialize reCaptcha

  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    location: '',
    contactMethod: [] as string[],
    services: '',
  };

  const handleSubmit = async (values: any, { setSubmitting }: FormikHelpers<any>) => {
    try {
      const token = await executeRecaptcha('contact_form'); // Generate reCAPTCHA token
      const formData = new FormData();
      formData.append('formType', 'contact');
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('phone', values.phone);
      formData.append('email', values.email);
      formData.append('location', values.location);
      formData.append('services', values.services);
      values.contactMethod.forEach((method: string) => formData.append('contactMethod', method));
      formData.append('token', token);

      const response = await fetch('/api/email', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong.');
      }

      console.log('Email sent successfully');
      onClose();
    } catch (error) {
      console.error('An error occurred while sending the email', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div
        className="relative bg-[#E1C692] max-w-3xl w-full p-6 md:p-8 rounded-lg shadow-lg text-black overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-black font-semibold">
          X
        </button>

        <h1 className="text-2xl md:text-4xl font-semibold mb-8 text-center">REACH OUT TO US!</h1>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-sm">First Name</label>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="border p-2 rounded-md w-full"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className="block font-semibold text-sm">Last Name</label>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="border p-2 rounded-md w-full"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className="block font-semibold text-sm">Phone</label>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    className="border p-2 rounded-md w-full"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className="block font-semibold text-sm">Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border p-2 rounded-md w-full"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-sm">Location</label>
                <Field
                  type="text"
                  name="location"
                  placeholder="City"
                  className="border p-2 rounded-md w-full"
                />
                <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block font-semibold text-sm">Services</label>
                <Field
                  as="textarea"
                  name="services"
                  placeholder="What services are you looking for?"
                  rows={3}
                  className="border p-2 rounded-md w-full"
                />
                <ErrorMessage name="services" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block font-semibold text-sm">Preferred Contact Method</label>
                <div className="flex flex-wrap gap-4">
                  {['Call', 'Email', 'Text'].map((method) => (
                    <label key={method} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="contactMethod"
                        value={method}
                        checked={values.contactMethod.includes(method)}
                        onChange={(e) => {
                          const { checked, value } = e.target;
                          setFieldValue(
                            'contactMethod',
                            checked
                              ? [...values.contactMethod, value]
                              : values.contactMethod.filter((v) => v !== value)
                          );
                        }}
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
                <ErrorMessage name="contactMethod" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mt-6 bg-[#F5F5F5] p-4 rounded-xl">
                <p className='font-bold'>Address: 642 The Queensway Main Floor, Toronto, Ontario M8Y 1K5</p>
                <p className='font-bold'>Franchise Lic. #10874</p>
                <p>
                  <strong>Phone:</strong> 416.252.9000 | <strong>Fax:</strong> 647.352.9011
                </p>
                <p>
                  <strong>Email:</strong>
                  <a href="mailto:info@getabettermortgage.com" className="underline">
                    info@getabettermortgage.com
                  </a>
                </p>
              </div>
              
              <div className='w-full flex justify-end'>
                <button
                  type="submit"
                  className="w-full md:w-auto bg-black text-[#E1C692] text-lg px-6 py-3 rounded-lg font-bold"
                >
                  SUBMIT
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
