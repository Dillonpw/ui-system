import type React from "react";

interface PreviewCardProps {
  className?: string;
  children: React.ReactNode;
}

export function PreviewCard({ className, children }: PreviewCardProps) {
  return (
    <div
      className={`bg-card border-2 p-6 ${className}`}
      style={{
        borderRadius: "0.5rem",
        boxShadow: "var(--shadow-default)",
      }}
    >
      {children}
    </div>
  );
}
