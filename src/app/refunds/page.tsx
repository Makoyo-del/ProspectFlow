export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-4xl font-heading font-bold text-royal-blue mb-8">Refund Policy</h1>
        <p className="text-gray-500 mb-12 italic">Last Updated: May 4, 2026</p>
        
        <div className="prose prose-blue max-w-none text-gray-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Digital Goods Policy</h2>
            <p>Due to the nature of digital data, all sales on ProspectFlow are final. Once a lead list has been unlocked and the contact information is revealed, we cannot offer a refund, as the digital goods have been consumed.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Technical Issues</h2>
            <p>If you have paid for a search but the system failed to unlock the data due to a technical error, please contact our support team at <a href="mailto:support@prospectflow.com" className="text-royal-blue font-bold">support@prospectflow.com</a> or via our WhatsApp support button.</p>
            <p>In such cases, we will manually verify your transaction via Paystack and either unlock the data for you or provide a full refund if the data is no longer available.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Accuracy Disclaimer</h2>
            <p>We do not provide refunds based on the accuracy of individual leads. Business data changes rapidly; while we use high-authority sources, we cannot guarantee that every phone number or website is active at the time of your search.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Duplicate Purchases</h2>
            <p>If you accidentally pay for the same lead list twice within a 24-hour period, please contact support with your Paystack transaction references, and we will refund the duplicate payment.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
