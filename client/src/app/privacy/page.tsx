export default function PrivacyPolicyPage() {
  return (
    <div className="max-h-screen overflow-y-auto">
      <div className="max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-10">

        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          TAC Farmer App – Privacy Policy
        </h1>

        <p className="text-sm sm:text-base mb-4">
          Applicable to all Farmers using the TAC Platform. This policy explains how TAC
          collects, stores, and protects your data.
        </p>

        {/* Sections */}
        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">1. Introduction</h2>
        <p className="text-sm sm:text-base mb-4">
          TAC follows the IT Act 2000, IT Rules 2011, and DPDP Act 2023.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
          2. Information We Collect
        </h2>

        {/* a */}
        <h3 className="font-semibold text-sm sm:text-base mb-2">
          a) Personal Identification Data
        </h3>
        <ul className="list-disc ml-5 sm:ml-6 space-y-1 text-sm sm:text-base mb-4">
          <li>Name</li>
          <li>Mobile Number</li>
          <li>Aadhaar / PAN</li>
        </ul>

        {/* b */}
        <h3 className="font-semibold text-sm sm:text-base mb-2">
          b) Contact Details
        </h3>
        <ul className="list-disc ml-5 sm:ml-6 space-y-1 text-sm sm:text-base mb-4">
          <li>Address</li>
          <li>Email (optional)</li>
          <li>Alternate phone</li>
        </ul>

        {/* c */}
        <h3 className="font-semibold text-sm sm:text-base mb-2">
          c) Farm & Location Information
        </h3>
        <ul className="list-disc ml-5 sm:ml-6 space-y-1 text-sm sm:text-base mb-4">
          <li>Farm address</li>
          <li>GPS / geolocation</li>
        </ul>

        {/* d */}
        <h3 className="font-semibold text-sm sm:text-base mb-2">
          d) Crop & Transaction Data
        </h3>
        <ul className="list-disc ml-5 sm:ml-6 space-y-1 text-sm sm:text-base mb-4">
          <li>Listings, auctions, bids</li>
          <li>Payments, settlements</li>
          <li>Delivery confirmations</li>
        </ul>

        {/* e */}
        <h3 className="font-semibold text-sm sm:text-base mb-2">
          e) Device & Usage Data
        </h3>
        <ul className="list-disc ml-5 sm:ml-6 space-y-1 text-sm sm:text-base mb-4">
          <li>IP address</li>
          <li>Device type</li>
          <li>App activity logs</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">3. How We Use Your Data</h2>
        <ul className="list-disc ml-5 sm:ml-6 space-y-1 text-sm sm:text-base mb-4">
          <li>KYC</li>
          <li>Auctions & transactions</li>
          <li>Logistics coordination</li>
          <li>Fraud prevention</li>
          <li>Legal compliance</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">4. Consent</h2>
        <p className="text-sm sm:text-base mb-4">
          Using the app means you consent to required data processing.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">5. Data Sharing</h2>
        <p className="text-sm sm:text-base mb-4">We never sell your data. We only share with:</p>
        <ul className="list-disc ml-5 sm:ml-6 space-y-1 text-sm sm:text-base mb-4">
          <li>TAC staff</li>
          <li>Buyers, transporters</li>
          <li>BDOs</li>
          <li>Payment gateways</li>
          <li>Government agencies (if required)</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">6. Data Security</h2>
        <ul className="list-disc ml-5 sm:ml-6 space-y-1 text-sm sm:text-base mb-4">
          <li>Encryption</li>
          <li>Access control</li>
          <li>Security audits</li>
          <li>Secure servers</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">7. Your Rights</h2>
        <ul className="list-disc ml-5 sm:ml-6 space-y-1 text-sm sm:text-base mb-4">
          <li>Access data</li>
          <li>Request corrections</li>
          <li>Request deletion (law-permitting)</li>
          <li>Withdraw consent</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
          8. Data Retention
        </h2>
        <p className="text-sm sm:text-base mb-4">
          Data is retained only as long as legally required.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
          9. Updates to This Policy
        </h2>
        <p className="text-sm sm:text-base mb-4">
          Using the app after updates means you accept the new policy.
        </p>

      </div>
    </div>
  );
}
