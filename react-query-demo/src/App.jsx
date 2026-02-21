import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsComponent from "./components/PostsComponent";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // Data stays fresh for 1 minute (shows caching)
    },
  },
});

function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: "2rem" }}>
        <h1>React Query Demo</h1>
        <nav style={{ marginBottom: "1.5rem" }}>
          <button
            onClick={() => setShowPosts(true)}
            style={{ marginRight: "0.5rem" }}
          >
            Show Posts
          </button>
          <button onClick={() => setShowPosts(false)}>Hide Posts</button>
        </nav>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1rem" }}>
          {showPosts
            ? "Posts are visible. Click 'Hide Posts' then 'Show Posts' to see caching - data loads instantly from cache."
            : "Posts are hidden. Click 'Show Posts' to fetch/cache data."}
        </p>
        {showPosts && <PostsComponent />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
