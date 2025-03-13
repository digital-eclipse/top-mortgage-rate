'use client';

import Image from 'next/image';
import ThankYou from '../../../public/images/thank-you.png';

export default function TOS() {
  return (
    <div className="h-full flex flex-col justify-center items-center p-6 bg-gray-50">

      {/* Privacy Policy Content */}
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl w-full overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          This Privacy Policy (&quot;Policy&quot;) governs the manner in which <strong>Top Mortgage Rates</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, maintains, and discloses information collected from users (&quot;you&quot; or &quot;your&quot;) of the <strong>TopMortgageRates.Org</strong> website (&quot;Site&quot;) and any associated services. By accessing or using our Site and submitting your information through our forms, you agree to the terms outlined in this Policy. If you do not agree with these terms, please do not use our Site or provide your information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect the following types of personal information from you when you complete and submit forms on our Site:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li><strong>Personal Identifiers:</strong> Your name, email address, phone number, and physical address.</li>
          <li><strong>Demographic Information:</strong> Your age, gender, income level, and other relevant demographic details.</li>
          <li><strong>Financial Information:</strong> Information related to your credit score, employment status, and financial history.</li>
          <li><strong>Technical Data:</strong> Your IP address, browser type, operating system, and other technical information collected through cookies and similar technologies.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect for the following purposes:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li><strong>To Provide Services:</strong> To connect you with mortgage brokers and lenders who can assist you in finding suitable mortgage products.</li>
          <li><strong>Marketing and Communications:</strong> To contact you via phone calls, text messages, and emails regarding mortgage-related products, services, and promotions.</li>
          <li><strong>Sharing with Third Parties:</strong> To share your information with associated mortgage brokers, lenders, and other third-party partners who may market their products and services to you.</li>
          <li><strong>Improving Our Services:</strong> To analyze user behavior and improve the functionality and user experience of our Site.</li>
          <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">3. Consent to Contact</h2>
        <p className="mb-4">
          By completing and submitting any form on our Site and checking the consent box, you expressly agree to the following:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li><strong>Calls and Texts:</strong> You consent to receive autodialed, prerecorded, or artificial voice calls and text messages from us and our associated mortgage brokers at the phone number(s) you provide, even if the number is on a Do Not Call registry. Message and data rates may apply.</li>
          <li><strong>Email Communications:</strong> You consent to receive promotional emails and newsletters from us and our partners.</li>
          <li><strong>Third-Party Sharing:</strong> You consent to the sharing of your personal information with associated mortgage brokers, lenders, and other third-party partners for marketing and promotional purposes.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">4. Third-Party Sharing</h2>
        <p className="mb-4">
          We may share your personal information with the following categories of third parties:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li><strong>Mortgage Brokers and Lenders:</strong> To provide you with mortgage-related products and services.</li>
          <li><strong>Marketing Partners:</strong> To deliver targeted advertisements and promotional materials.</li>
          <li><strong>Service Providers:</strong> To assist us in operating our Site, conducting our business, and providing services to you.</li>
          <li><strong>Legal and Regulatory Authorities:</strong> To comply with legal obligations, enforce our policies, or protect our rights, property, or safety.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">5. Your Rights and Choices</h2>
        <p className="mb-4">
          You have the following rights regarding your personal information:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li><strong>Opt-Out of Communications:</strong> You may opt out of receiving calls, texts, and emails from us at any time by following the unsubscribe instructions included in our communications or by contacting us directly at <strong>info@topmortgagerates.org</strong>.</li>
          <li><strong>Access and Correction:</strong> You may request access to the personal information we hold about you and request corrections if necessary.</li>
          <li><strong>Data Deletion:</strong> You may request the deletion of your personal information, subject to certain legal and contractual obligations.</li>
          <li><strong>Withdrawal of Consent:</strong> If you are located in Canada, you may withdraw your consent to the collection, use, or disclosure of your personal information at any time, subject to legal or contractual restrictions.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">6. Data Security</h2>
        <p className="mb-4">
          We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">7. Retention of Information</h2>
        <p className="mb-4">
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Policy, unless a longer retention period is required or permitted by law.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">8. Children&apos;s Privacy</h2>
        <p className="mb-4">
          Our Site is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected such information, we will take steps to delete it.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">9. International Data Transfers</h2>
        <p className="mb-4">
          If you are located in Canada, please note that your personal information may be transferred to, stored, or processed in the United States or other countries outside of Canada. By using our Site and providing your information, you consent to such transfers. We will take all reasonable steps to ensure that your data is treated securely and in accordance with this Policy.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">10. Changes to This Policy</h2>
        <p className="mb-4">
          We reserve the right to update or modify this Policy at any time. Any changes will be posted on this page. Your continued use of the Site after any changes constitutes your acceptance of the revised Policy.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">Compliance with Canadian and U.S. Laws</h2>
        <p className="mb-4">
          This Policy complies with the <strong>Personal Information Protection and Electronic Documents Act (PIPEDA)</strong> in Canada and the <strong>Telephone Consumer Protection Act (TCPA)</strong>, <strong>CAN-SPAM Act</strong>, and other applicable federal and state privacy laws in the United States.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <strong>info@topmortgagerates.org</strong>.
        </p>
      </div>
      {/* Terms of Service Content */}
      <div className="bg-white mt-[2vw] p-8 rounded-lg shadow-md max-w-4xl w-full overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">
          Welcome to <strong>TopMortgageRates.Org</strong> (&quot;Site&quot;). These Terms of Service (&quot;Terms&quot;) govern your access to and use of our Site and services. By accessing or using the Site, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use the Site.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using the Site, you confirm that you are at least 18 years old and agree to comply with these Terms. If you are using the Site on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">2. User Responsibilities</h2>
        <p className="mb-4">
          You agree to use the Site only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of the Site. Prohibited activities include:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>Engaging in fraudulent or deceptive behavior.</li>
          <li>Uploading or transmitting malicious software.</li>
          <li>Violating any applicable laws or regulations.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">3. Intellectual Property</h2>
        <p className="mb-4">
          All content on the Site, including text, graphics, logos, and images, is the property of <strong>Top Mortgage Rates</strong> or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">4. Third-Party Links</h2>
        <p className="mb-4">
          The Site may contain links to third-party websites. We are not responsible for the content or practices of these websites and encourage you to review their terms and privacy policies.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">5. Limitation of Liability</h2>
        <p className="mb-4">
          To the fullest extent permitted by law, <strong>Top Mortgage Rates</strong> shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Site or services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">6. Termination</h2>
        <p className="mb-4">
          We reserve the right to terminate or suspend your access to the Site at any time, without notice, for any reason, including violation of these Terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">7. Governing Law</h2>
        <p className="mb-4">
          These Terms are governed by the laws of [Your Jurisdiction], without regard to its conflict of law principles.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">8. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms at any time. Your continued use of the Site after changes constitutes your acceptance of the revised Terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">9. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at <strong>info@topmortgagerates.org</strong>.
        </p>
      </div>
    </div>
  );
}