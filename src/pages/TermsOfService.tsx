const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Acceptance of Terms</h2>
          <p>
            By accessing and using Nyrazari, you accept and agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Use of Service</h2>
          <p>
            You agree to use our service only for lawful purposes and in accordance with these Terms. 
            You must not use our service:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>In any way that violates any applicable law or regulation</li>
            <li>To transmit any harmful or malicious code</li>
            <li>To impersonate or attempt to impersonate another person</li>
            <li>To engage in any fraudulent activity</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Account Registration</h2>
          <p>
            To make purchases, you must create an account. You are responsible for maintaining the 
            confidentiality of your account credentials and for all activities under your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Product Information</h2>
          <p>
            We strive to provide accurate product descriptions and pricing. However, we do not warrant 
            that product descriptions or other content is accurate, complete, or error-free. We reserve 
            the right to correct any errors and to change or update information at any time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Orders and Payment</h2>
          <p>
            All orders are subject to acceptance and availability. We reserve the right to refuse or 
            cancel any order for any reason. Payment must be received before orders are processed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Intellectual Property</h2>
          <p>
            All content on this site, including text, graphics, logos, and images, is the property of 
            Nyrazari or its content suppliers and is protected by intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Nyrazari shall not be liable for any indirect, 
            incidental, special, or consequential damages arising out of or in connection with your use 
            of our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Modifications to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately 
            upon posting. Your continued use of the service after changes constitutes acceptance of the 
            modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without 
            regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Contact Information</h2>
          <p>
            For any questions regarding these Terms of Service, please contact us through our Contact page.
          </p>
        </section>

        <p className="text-sm mt-8">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default TermsOfService;
