"use client";

import { ErrorView } from "@/components/errors/ErrorView";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return <ErrorView reset={reset} />;
}
