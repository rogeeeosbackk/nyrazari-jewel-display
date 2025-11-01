const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Information We Collect</h2>
          <p>
            We collect information you provide directly to us when you create an account, place an order, 
            or communicate with us. This includes your name, email address, phone number, shipping address, 
            and payment information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders and our services</li>
            <li>Send you promotional communications (with your consent)</li>
            <li>Improve our products and services</li>
            <li>Detect and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Information Sharing</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your information 
            with service providers who assist us in operating our business, such as payment processors and 
            shipping companies, under strict confidentiality agreements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. However, no 
            method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. You may also opt out 
            of marketing communications at any time. To exercise these rights, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your browsing experience and analyze site traffic. 
            You can control cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting 
            the new policy on this page with an updated effective date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us through our Contact page.
          </p>
        </section>

        <p className="text-sm mt-8">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
