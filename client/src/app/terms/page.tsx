export default function TermsPage() {
  return (
    <div className="max-h-screen overflow-y-auto">
      <div className="max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-10">

        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          TAC Farmer App – Terms & Conditions
        </h1>

        <p className="text-sm sm:text-base mb-4">
          Applicable to all Farmers using the Technology Agriculture Creator (TAC) Platform.
        </p>

        {/* SECTIONS */}
        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">1. General Terms</h2>
        <ul className="list-disc ml-5 sm:ml-6 space-y-2 text-sm sm:text-base mb-4">
          <li>Farmers must register using valid identity and land details.</li>
          <li>Providing false or misleading information may lead to penalties.</li>
          <li>All Indian agriculture & trade laws must be followed.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">2. Farmer Registration & Listing</h2>
        <ul className="list-disc ml-5 sm:ml-6 space-y-2 text-sm sm:text-base mb-4">
          <li>Correct crop details must be provided.</li>
          <li>Only genuine produce can be listed.</li>
          <li>TAC may verify details through officers.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">3. Auction Rules</h2>
        <ul className="list-disc ml-5 sm:ml-6 space-y-2 text-sm sm:text-base mb-4">
          <li>Base price may be set by TAC.</li>
          <li>Highest bid is final & binding.</li>
          <li>No cancellations after auction closes.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">4. Quality Standards</h2>
        <ul className="list-disc ml-5 sm:ml-6 space-y-2 text-sm sm:text-base mb-4">
          <li>Produce must meet TAC quality standards.</li>
          <li>Failed quality checks may result in rejection.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">5. Delivery Responsibilities</h2>
        <ul className="list-disc ml-5 sm:ml-6 space-y-2 text-sm sm:text-base mb-4">
          <li>Produce must be delivered within 48 hours.</li>
          <li>Delays may cause penalties or cancellation.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">6. Payments</h2>
        <ul className="list-disc ml-5 sm:ml-6 space-y-2 text-sm sm:text-base mb-4">
          <li>Payment released after buyer payment & quality approval.</li>
          <li>Payments through TAC-approved banking channels only.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">7. Role of Officers</h2>
        <ul className="list-disc ml-5 sm:ml-6 space-y-2 text-sm sm:text-base mb-4">
          <li>BDOs may conduct verification & monitoring.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">8. Fraud & Penalties</h2>
        <ul className="list-disc ml-5 sm:ml-6 space-y-2 text-sm sm:text-base mb-4">
          <li>Fake listings</li>
          <li>Manipulating prices</li>
          <li>Using false identity</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">9. Dispute Resolution</h2>
        <p className="text-sm sm:text-base mb-4">
          Disputes resolved by Local Resolution Committee. Decision is final.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">10. Platform Rights</h2>
        <ul className="list-disc ml-5 sm:ml-6 space-y-2 text-sm sm:text-base mb-4">
          <li>TAC may modify features anytime.</li>
          <li>TAC may suspend accounts violating policies.</li>
        </ul>

      </div>
    </div>
  );
}
