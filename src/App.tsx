import { useEffect } from "react";

import { useReviewStore } from "./stores";
import { useGetData } from "./hooks";
import { HighlightedContent, Toolbar } from "./components";

function App() {
  const { initReview } = useReviewStore();
  const data = useGetData();

  useEffect(() => {
    initReview(data);
  }, [initReview]);

  return (
    <main className="p-8 lg:w-1/2 mx-auto">
      <Toolbar />
      <HighlightedContent />
    </main>
  );
}

export default App;
