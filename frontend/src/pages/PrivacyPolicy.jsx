import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto my-10 p-5 text-gray-700">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p>Effective Date: March 29, 2025</p>
      <p>
        Doczy ("we," "our," or "us") is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, and safeguard your
        personal information when you use our platform.
      </p>

      <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
      <ul className="list-disc ml-5">
        <li>
          <strong>Personal Information:</strong> Name, email address, phone
          number, and other details provided during account registration.
        </li>
        <li>
          <strong>Medical Information:</strong> Health-related data shared for
          doctor consultations.
        </li>
        <li>
          <strong>Usage Data:</strong> Information about how you use our
          platform, including IP address, browser type, and device information.
        </li>
        <li>
          <strong>Payment Information:</strong> We collect billing details but
          do not store your credit/debit card information.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc ml-5">
        <li>Provide and improve our services.</li>
        <li>Schedule doctor appointments.</li>
        <li>Facilitate teleconsultations and digital prescriptions.</li>
        <li>Respond to customer support inquiries.</li>
        <li>Send important updates and notifications.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">
        3. How We Share Your Information
      </h2>
      <ul className="list-disc ml-5">
        <li>
          <strong>Healthcare Providers:</strong> To facilitate appointments and
          consultations.
        </li>
        <li>
          <strong>Service Providers:</strong> Third-party vendors that assist
          with payment processing, hosting, and analytics.
        </li>
        <li>
          <strong>Legal Authorities:</strong> If required by law or to protect
          our platform from fraud and security threats.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">4. Data Security</h2>
      <p>
        We implement robust security measures to protect your data, including
        encryption and secure storage. However, no system is completely secure,
        so we encourage users to take precautions with their personal
        information.
      </p>

      <h2 className="text-xl font-semibold mt-6">5. Your Rights</h2>
      <ul className="list-disc ml-5">
        <li>Access, update, or delete your personal data.</li>
        <li>Opt-out of marketing communications.</li>
        <li>Request a copy of your stored data.</li>
      </ul>
      <p>
        For any data-related requests, contact us at{" "}
        <strong>Doczy@gmail.com</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6">
        6. Cookies and Tracking Technologies
      </h2>
      <p>
        We use cookies and tracking technologies to enhance your user
        experience. You can manage your cookie preferences in your browser
        settings.
      </p>

      <h2 className="text-xl font-semibold mt-6">
        7. Changes to This Privacy Policy
      </h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page, and we will notify users of significant updates.
      </p>

      <h2 className="text-xl font-semibold mt-6">8. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at:
      </p>
      <p>
        <strong>Email:</strong> Doczy@gmail.com
        <br />
        <strong>Phone:</strong> +91 9090909090
      </p>
    </div>
  );
};

export default PrivacyPolicy;
