import Link from "next/link";

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          My Blog
        </Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
        </nav>
      </div>
    </header>
  );
}