'use client';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import ReviewsSection from '@/components/Testimonials';
import { useState } from 'react';
import { useReCaptcha } from 'next-recaptcha-v3';

interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  location: string;
  contactMethod: string[];
  services: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  location: Yup.string().required('Location is required'),
  contactMethod: Yup.array().min(1, 'Please select at least one contact method').required(),
  services: Yup.string().required('Services are required'),
});

const ContactPage = () => {
  const { executeRecaptcha } = useReCaptcha(); // Initialize reCaptcha

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    location: '',
    contactMethod: [],
    services: '',
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      // Generate reCAPTCHA token
      const token = await executeRecaptcha('contact_form'); 
      const formData = new FormData();
      formData.append('formType', 'contact');
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('phone', values.phone);
      formData.append('email', values.email);
      formData.append('location', values.location);
      formData.append('services', values.services);
      values.contactMethod.forEach((method) => formData.append('contactMethod', method));
      formData.append('token', token); // Append reCAPTCHA token

      const response = await fetch('/api/email', {
        method: 'POST',
        body: formData, // Send as FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong.');
      }

      alert('Email sent successfully!');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
    className="relative bg-[#E1C692] w-full min-h-screen p-4 md:p-8 py-8 md:py-16 shadow-lg text-black flex flex-col items-center"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="max-w-7xl w-full">
<div>
      {/* Title & Intro Text */}
      <h1 className="text-2xl md:text-4xl font-semibold mb-4 text-center px-4">
        WELCOME TO GET A BETTER MORTGAGE!
      </h1>
      <p className="text-sm md:text-lg font-medium mb-8 text-center">
        Our company is dedicated to finding the best mortgage solution for every client by
        providing personalized, unbiased advice. We work for our clients, not the lenders. Every
        mortgage decision is tailored to meet your individual goals and needs.
      </p>

      {/* Reviews Section */}
      <div className="w-full bg-white rounded-xl mb-8">
        <ReviewsSection />
      </div>

      {/* Header Section */}
      <h2 className="text-center text-xl font-semibold mb-2">
        READY TO GET IN TOUCH?
      </h2>
      <p className="text-center mb-8">
        Fill in the form below and someone will reach out to you!
      </p>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="bg-[#F5F5F5] p-6 md:p-8 rounded-xl space-y-6">
            {/* Personal Information & Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-sm">First Name</label>
                <Field type="text" name="firstName" placeholder="First Name" className="border p-2 rounded-md w-full" />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block font-semibold text-sm">Last Name</label>
                <Field type="text" name="lastName" placeholder="Last Name" className="border p-2 rounded-md w-full" />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block font-semibold text-sm">Phone</label>
                <Field type="text" name="phone" placeholder="(000)-000-0000" className="border p-2 rounded-md w-full" />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block font-semibold text-sm">Email</label>
                <Field type="email" name="email" placeholder="Email" className="border p-2 rounded-md w-full" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Location and Preferred Contact Method */}
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-sm">Where are you located?</label>
                <Field type="text" name="location" placeholder="City" className="border p-2 rounded-md w-full" />
                <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block font-semibold text-sm">Preferred Contact Method</label>
                <div className="flex flex-wrap gap-4">
                  {['Call', 'Email', 'Text'].map((method) => (
                    <label key={method}>
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
                      {method}
                    </label>
                  ))}
                </div>
                <ErrorMessage name="contactMethod" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Services Inquiry */}
            <div>
              <label className="block font-semibold text-sm">What services are you looking for?</label>
              <Field as="textarea" name="services" placeholder="Detail what we can do for you" rows={3} className="border p-2 rounded-md w-full" />
              <ErrorMessage name="services" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Business Information and Submit Button */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm">
                <p>642 The Queensway Main Floor</p>
                <p>Toronto, Ontario MBY 1KS</p>
                <p>Franchise Lic. # 10874</p>
                <p><strong>Phone:</strong> 416.252.9000</p>
                <p><strong>Fax:</strong> 647.352.9011</p>
                <p><strong>Email:</strong> <a href="mailto:info@getabettermortgage.com" className="underline">info@getabettermortgage.com</a></p>
              </div>

              <button type="submit" className="bg-black text-[#E1C692] text-lg px-6 py-3 rounded-lg font-bold">
                SUBMIT
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Two-Column Text Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-black rounded-xl">
          <h3 className="font-semibold text-lg mb-2">Unhappy with your current mortgage?</h3>
          <p>
            If you’re feeling frustrated or trapped in your current mortgage, we’d love the chance
            to help. Sometimes, a fresh set of eyes can uncover options that you didn’t even know
            were available. Let us take a look—there’s no obligation, just an opportunity to see if
            we can make things a little easier for you.
          </p>
        </div>

        <div className="p-4 border border-black rounded-xl">
          <h3 className="font-semibold text-lg mb-2">Looking for a new mortgage?</h3>
          <p>
            At Get A Better Mortgage, we understand how important it is to feel secure and
            supported when making big financial decisions. Whether you’re buying your first home or
            looking to refinance, we’re here to guide you with compassion and expertise.
          </p>
        </div>
      </div>

      <div className="mt-8 shadow-md p-4 border border-black rounded-xl">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">SERVICES OFFERED:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>First-Time Homebuyer Mortgages</li>
          <li>Mortgage Refinancing</li>
          <li>Mortgage Renewals</li>
          <li>Investment Property Loans</li>
          <li>Second Home Mortgages</li>
          <li>Reverse Mortgages</li>
          <li>Construction Loans</li>
          <li>Private Mortgages</li>
          <li>Debt Consolidation</li>
          <li>Commercial Loans</li>
        </ul>
      </div>

      <div className="mt-8 w-full rounded-lg overflow-hidden shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11551.926766297242!2d-79.497257!3d43.62774!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b363ebf91c861%3A0x5bbf2606eab8ae52!2s642%20The%20Queensway%2C%20Etobicoke%2C%20ON%20M8Y%201K5%2C%20Canada!5e0!3m2!1sen!2sus!4v1729529601176!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      </div>
    </div>
  
  </div>
  );
};

export default ContactPage;
