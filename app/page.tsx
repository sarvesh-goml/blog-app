import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: { likes: number; dislikes: number };
  views: number;
}

interface PostsResponse {
  posts: Post[];
  total: number;
}

// SSG: no `cache` option means Next.js defaults to caching this fetch at
// build time, producing a statically generated page.
async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://dummyjson.com/posts?limit=1");

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data: PostsResponse = await res.json();
  return data.posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      <h1 className="page-title">Latest Posts</h1>
      <p className="page-subtitle">
        Statically generated at build time from dummyjson.com/posts
      </p>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-card">
            <Link href={`/posts/${post.id}`} className="post-card-link">
              <h2>{post.title}</h2>
              <p>{post.body.slice(0, 140)}...</p>
              <div className="post-meta">
                <span>👁 {post.views} views</span>
                <span>👍 {post.reactions.likes}</span>
                <div className="post-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}