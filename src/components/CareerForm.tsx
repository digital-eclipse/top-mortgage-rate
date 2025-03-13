import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Career from '../../public/images/career.svg';
import { useReCaptcha } from 'next-recaptcha-v3';

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
  cv: File[] ;
}

interface CareerFormProps {
  closeModal: () => void;
}

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  streetAddress: Yup.string().required("Street Address is required"),
  city: Yup.string().required("City is required"),
  stateProvince: Yup.string().required("State/Province/Region is required"),
  zip: Yup.string().required("ZIP / Postal Code is required"),
  country: Yup.string().required("Country is required"),
  cv: Yup.array()
  .of(Yup.mixed().nullable().required("CV is required"))
  .min(1, "At least one file is required"),
});

export default function CareerForm({ closeModal }: CareerFormProps) {
  const { executeRecaptcha } = useReCaptcha(); 
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    streetAddress: "",
    addressLine2: "",
    city: "",
    stateProvince: "",
    zip: "",
    country: "",
    cv: [], // Store multiple files as an array
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
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
  
      // Append multiple files to FormData
      values.cv.forEach((file) => {
        formData.append('cv', file); // Use the same 'cv' key for each file
      });
  
      formData.append('token', token); // Add reCAPTCHA token
  
      const response = await fetch('/api/email', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Email sent successfully');
        closeModal();
      } else {
        console.error('Error sending email');
      }
    } catch (error) {
      console.error('An error occurred while sending the email:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      {/* Modal Content */}
      <div className="relative bg-[#E1C692] max-w-2xl w-full p-6 md:p-8 rounded-lg shadow-lg text-black overflow-y-auto max-h-[90vh]">

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-black font-bold"
        >
          X
        </button>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold mb-6">JOIN OUR TEAM</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              {/* Row 1 - Inputs and SVG */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="font-semibold text-sm">First Name</label>
                    <Field
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="border p-2 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="font-semibold text-sm">Last Name</label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="border p-2 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="font-semibold text-sm">Phone</label>
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      className="border p-2 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-semibold text-sm">Email</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="border p-2 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center relative">
                    <Career className="md:max-h-[150px] hidden md:block" /> {/* Restrict the max height */}
                </div>
              </div>

              {/* Row 2 - Street Address */}
              <div className="mb-4">
                <label htmlFor="streetAddress" className="font-semibold text-sm">Street Address</label>
                <Field
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  className="border p-2 rounded-md w-full mb-4"
                />
                <ErrorMessage
                  name="streetAddress"
                  component="div"
                  className="text-red-500 text-sm"
                />
                <label htmlFor="addressLine2" className="font-semibold text-sm">Address Line 2</label>
                <Field
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  className="border p-2 rounded-md w-full"
                />
              </div>

              {/* Row 3 - City, State, ZIP, Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="font-semibold text-sm">City</label>
                    <Field
                      type="text"
                      id="city"
                      name="city"
                      className="border p-2 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="stateProvince" className="font-semibold text-sm">State/Province/Region</label>
                    <Field
                      type="text"
                      id="stateProvince"
                      name="stateProvince"
                      className="border p-2 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="stateProvince"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zip" className="font-semibold text-sm">ZIP / Postal Code</label>
                    <Field
                      type="text"
                      id="zip"
                      name="zip"
                      className="border p-2 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="zip"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="font-semibold text-sm">Country</label>
                    <Field
                      as="select"
                      id="country"
                      name="country"
                      className="border p-2 rounded-md w-full"
                    >
                      <option value="" disabled>
                        Country
                      </option>
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                    </Field>
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4 - Upload CV and Submit */}
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <label htmlFor="cv" className="block font-bold mb-2 text-sm">Upload CV</label>
                  <input
                    id="cv"
                    name="cv"
                    type="file"
                    accept=".pdf"
                    multiple // Allow multiple files
                    onChange={(event) => {
                      const files = event.currentTarget.files ? Array.from(event.currentTarget.files) : [];
                      setFieldValue("cv", files); // Set the array of files in Formik state
                    }}
                    className="border p-2 rounded-lg border-black"
                  />
                  <ErrorMessage
                    name="cv"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <small className="block text-gray-600">
                    Accepted file types: pdf, Max. file size: 100 MB
                  </small>
                </div>
                <button
                  type="submit"
                  className="bg-black text-[#E1C692] text-xl mt-4 md:mt-0 px-6 py-2 rounded-lg font-bold w-full md:w-auto"
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
}
