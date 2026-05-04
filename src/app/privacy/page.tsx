export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-4xl font-heading font-bold text-royal-blue mb-8">Privacy Policy</h1>
        <p className="text-gray-500 mb-12 italic">Last Updated: May 4, 2026</p>
        
        <div className="prose prose-blue max-w-none text-gray-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Data Collection</h2>
            <p>ProspectFlow does not require user accounts. We do not store your personal browsing history. We only collect the necessary information to process payments via Paystack and to deliver the lead search results you requested.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Search Data</h2>
            <p>Lead data is sourced from public business registries via the TomTom Search API. We do not scrape private social media profiles or non-public data. Our service acts as a real-time indexer for publicly available business information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Payment Security</h2>
            <p>All payments are processed by Paystack. ProspectFlow never sees or stores your credit card details or bank information. Your transaction data is encrypted and handled by Paystack according to their industry-standard security protocols.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies</h2>
            <p>We use essential cookies to maintain your search session and unlock your purchased leads. These cookies are deleted after your session ends.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
