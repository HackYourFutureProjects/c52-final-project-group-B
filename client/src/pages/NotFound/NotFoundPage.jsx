import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-background text-foreground min-h-screen px-6 py-24 text-center sm:py-32 lg:px-8">
      <p className="text-primary text-5xl font-semibold">404</p>
      <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="text-secondary mt-6 text-base leading-7">
        Sorry, the page you&apos;re looking for doesn’t exist.
      </p>
      <div className="mt-10">
        <Link
          to="/"
          className="text-primary hover:text-secondary text-sm font-semibold transition"
        >
          ⬅ Go back home
        </Link>
      </div>
    </div>
  );
}
