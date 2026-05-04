export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-4xl font-heading font-bold text-royal-blue mb-8">Terms of Service</h1>
        <p className="text-gray-500 mb-12 italic">Last Updated: May 4, 2026</p>
        
        <div className="prose prose-blue max-w-none text-gray-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Use of Service</h2>
            <p>By using ProspectFlow, you agree to use the provided lead data responsibly and in compliance with local laws (such as GDPR or CAN-SPAM). You are solely responsible for the outreach conducted using this data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. One-Time Purchase</h2>
            <p>Every search unlock is a one-time transaction. ProspectFlow does not offer subscriptions. Once a lead list is unlocked, it is accessible for the duration of your browser session.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Accuracy</h2>
            <p>While we pull data from high-authority business registries, we cannot guarantee 100% accuracy of business operating hours, phone numbers, or website URLs. No refunds are provided based on the accuracy of individual leads.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Liability</h2>
            <p>ProspectFlow shall not be held liable for any damages resulting from your sales outreach or business decisions made using our data.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
