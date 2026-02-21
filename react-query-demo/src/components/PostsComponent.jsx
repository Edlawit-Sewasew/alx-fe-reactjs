import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

function PostsComponent() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <div className="posts-container">Loading posts...</div>;
  }

  if (isError) {
    return (
      <div className="posts-container">
        <p style={{ color: "#ff6b6b" }}>Error: {error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="nav-buttons">
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Refetching..." : "Refetch Data"}
        </button>
      </div>
      <h2>Posts from JSONPlaceholder API</h2>
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsComponent;
