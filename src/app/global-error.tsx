"use client";

import Link from "next/link";

import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="bg-background font-sans text-foreground antialiased">
        <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16">
          <h1 className="text-2xl font-semibold text-page-title">
            Something went wrong
          </h1>
          <p className="mt-4 text-muted">
            ReadyGate could not load this page. Try again or return to the start.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
            >
              Try again
            </button>
            <Link
              href="/"
              className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground"
            >
              Back to start
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
