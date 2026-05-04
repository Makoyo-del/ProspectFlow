import { Suspense } from "react";
import SearchResults from "./SearchResults";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <main className="flex-1 bg-white">
      <Suspense fallback={
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-royal-blue border-t-transparent" />
        </div>
      }>
        <SearchResults />
      </Suspense>
    </main>
  );
}
