'use client';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useReCaptcha } from 'next-recaptcha-v3';
import Career from '../../../public/images/career-page.svg'
import BrokerageVideo from '@/components/videos/BrokerageVideo';
// Define Form Values
interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  streetAddress: string;
  addressLine2?: string;
  city: string;
  stateProvince: string;
  zip: string;
  country: string;
  experience: number;
  cv: File[];
}

// Define Validation Schema
const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  streetAddress: Yup.string().required('Street Address is required'),
  city: Yup.string().required('City is required'),
  stateProvince: Yup.string().required('State/Province/Region is required'),
  zip: Yup.string().required('ZIP / Postal Code is required'),
  country: Yup.string().required('Country is required'),
  experience: Yup.number().required('Experience is required').min(0, 'Experience must be at least 0 years'),
  cv: Yup.array().of(Yup.mixed().required('CV is required')).min(1, 'At least one CV file is required'),
});

export default function CareersPage() {
  const { executeRecaptcha } = useReCaptcha(); // Initialize reCaptcha

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    streetAddress: '',
    addressLine2: '',
    city: '',
    stateProvince: '',
    zip: '',
    country: '',
    experience: 0,
    cv: [], // Multiple CVs as array
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      const token = await executeRecaptcha('career_form'); // Generate reCAPTCHA token

      const formData = new FormData();
      formData.append('formType', 'career');
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('phone', values.phone);
      formData.append('email', values.email);
      formData.append('streetAddress', values.streetAddress);
      formData.append('addressLine2', values.addressLine2 || '');
      formData.append('city', values.city);
      formData.append('stateProvince', values.stateProvince);
      formData.append('zip', values.zip);
      formData.append('country', values.country);
      formData.append('experience', String(values.experience));

      // Append multiple CV files to FormData
      values.cv.forEach((file) => {
        formData.append('cv', file);
      });

      formData.append('token', token); // Add reCAPTCHA token

      const response = await fetch('/api/email', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Application submitted successfully');
      } else {
        console.error('Error submitting application');
      }
    } catch (error) {
      console.error('An error occurred while submitting the application:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative bg-[#E1C692] w-full h-full rounded-lg shadow-lg text-black flex flex-1 justify-center items-center">
      <div className="max-w-7xl h-full py-8 px-4 md:px-0">
        <Career className="w-full h-40 md:h-80" />
        <h1 className="text-2xl md:text-4xl font-semibold mb-4 text-center">GET A BETTER BROKERAGE, You’ll be glad you did.</h1>
        <p className="text-sm md:text-lg font-medium mb-4 text-center">
          Enjoy a rewarding and fulfilling career with a brokerage that supports and rewards your growth.
        </p>
        <p className="text-sm md:text-lg font-medium mb-4 text-center">
          Joining our team means unparalleled access to the best support, resources, compensation, team events, lender networking, and industry leaders.
        </p>
        <p className="text-sm md:text-lg font-medium mb-4 text-center font-semibold">
          A happy team is the best team. Take the first step today!
        </p>
      
        <div className='py-8 md:px-8 text-center flex flex-col items-center w-full justify-center'>
         <BrokerageVideo/>
      </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
             <Form className="p-5 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label className="block font-semibold text-sm">First Name</label>
                 <Field
                   name="firstName"
                   type="text"
                   className="border p-2 rounded-md w-full"
                 />
                 <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
               </div>
               <div>
                 <label className="block font-semibold text-sm">Last Name</label>
                 <Field
                   name="lastName"
                   type="text"
                   className="border p-2 rounded-md w-full"
                 />
                 <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
               </div>
               <div>
                 <label className="block font-semibold text-sm">Phone</label>
                 <Field
                   name="phone"
                   type="text"
                   className="border p-2 rounded-md w-full"
                 />
                 <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
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
             </div>
 
             <div>
               <label className="block font-semibold text-sm">Street Address</label>
               <Field
                 name="streetAddress"
                 type="text"
                 className="border p-2 rounded-md w-full"
               />
               <ErrorMessage name="streetAddress" component="div" className="text-red-500 text-sm" />
               <label className="block font-semibold text-sm mt-2">Address Line 2</label>
               <Field
                 name="addressLine2"
                 type="text"
                 className="border p-2 rounded-md w-full"
               />
             </div>
 
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label className="block font-semibold text-sm">City</label>
                 <Field
                   name="city"
                   type="text"
                   className="border p-2 rounded-md w-full"
                 />
                 <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
               </div>
               <div>
                 <label className="block font-semibold text-sm">State/Province</label>
                 <Field
                   name="stateProvince"
                   type="text"
                   className="border p-2 rounded-md w-full"
                 />
                 <ErrorMessage name="stateProvince" component="div" className="text-red-500 text-sm" />
               </div>
               <div>
                 <label className="block font-semibold text-sm">ZIP / Postal Code</label>
                 <Field
                   name="zip"
                   type="text"
                   className="border p-2 rounded-md w-full"
                 />
                 <ErrorMessage name="zip" component="div" className="text-red-500 text-sm" />
               </div>
               <div>
                 <label className="block font-semibold text-sm">Country</label>
                 <Field
                   as="select"
                   name="country"
                   className="border p-2 rounded-md w-full"
                 >
                   <option value="">Select Country</option>
                   <option value="USA">USA</option>
                   <option value="Canada">Canada</option>
                 </Field>
                 <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
               </div>
             </div>
 
             <div>
               <label className="block font-semibold text-sm">Years of Experience</label>
               <Field
                 as="select"
                 name="experience"
                 className="border p-2 rounded-md w-full"
               >
                 <option value="">Select Experience</option>
                 <option value="0">0 years</option>
                 <option value="1">1 year</option>
                 <option value="2">2 years</option>
                 <option value="3">3 years</option>
                 <option value="4">4 years</option>
                 <option value="5">5+ years</option>
               </Field>
               <ErrorMessage name="experience" component="div" className="text-red-500 text-sm" />
             </div>
 
             <div className="flex flex-col space-y-2">
               <label className="block font-semibold text-sm">Upload CV</label>
               <input
                 type="file"
                 name="cv"
                 multiple
                 onChange={(e) => {
                   const files = e.currentTarget.files ? Array.from(e.currentTarget.files) : [];
                   setFieldValue('cv', files);
                 }}
                 className="border p-2 rounded-md w-full"
               />
               <ErrorMessage name="cv" component="div" className="text-red-500 text-sm" />
             </div>
 
             <button
               type="submit"
               className="w-full mt-4 bg-black text-[#E1C692] py-3 rounded-md font-semibold"
             >
               Submit Application
             </button>
           </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
