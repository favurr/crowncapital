"use client";

export default function CopyUserId({ value }: { value: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(value)}
      className="text-xs underline"
    >
      Copy
    </button>
  );
}
