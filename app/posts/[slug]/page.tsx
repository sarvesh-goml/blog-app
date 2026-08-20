import { notFound } from "next/navigation";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  userId: number;
  reactions: { likes: number; dislikes: number };
  views: number;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`https://dummyjson.com/posts/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="post-detail">
      <Link href="/" className="back-link">
        ← Back to all posts
      </Link>

      <h1>{post.title}</h1>

      <div className="post-meta">
        <span>👁 {post.views} views</span>
        <span>
          👍 {post.reactions.likes} · 👎 {post.reactions.dislikes}
        </span>
      </div>

      <div className="post-tags">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <p className="post-body">{post.body}</p>
    </article>
  );
}