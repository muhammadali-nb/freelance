"use client";

import { Badge } from "@/components/ui/badge";

interface ResponsesBadgeProps {
  count: number;
}

export function ResponsesBadge({ count }: ResponsesBadgeProps) {
  if (count === 0) return null;

  return (
    <Badge variant="secondary" className="ml-2">
      {count}
    </Badge>
  );
} 