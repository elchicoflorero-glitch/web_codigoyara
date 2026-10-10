import type { ReactNode } from "react";
import type { IconName } from "@/types";

const iconPaths: Record<IconName, ReactNode> = {
  arrow:    <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
  braces:   <><path d="M8 3H6a2 2 0 0 0-2 2v3l-2 2 2 2v3a2 2 0 0 0 2 2h2" /><path d="M16 3h2a2 2 0 0 1 2 2v3l2 2-2 2v3a2 2 0 0 1-2 2h-2" /></>,
  check:    <path d="m5 12 4 4L19 6" />,
  cloud:    <path d="M17.5 19H6a4 4 0 0 1-.8-7.9A7 7 0 0 1 18.7 9 5 5 0 0 1 17.5 19Z" />,
  code:     <><path d="m8 9-4 3 4 3" /><path d="m16 9 4 3-4 3" /><path d="m14 5-4 14" /></>,
  commerce: <><circle cx="9" cy="20" r="1" /><circle cx="19" cy="20" r="1" /><path d="M3 4h2l2.5 11h11L21 7H6" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
  layers:   <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></>,
  link:     <><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" /><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" /></>,
  menu:     <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  mobile:   <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 18h4" /></>,
  rocket:   <><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2" /><path d="m9 15-3-3s3-5 7-7c4-2 8-2 8-2s0 4-2 8c-2 4-7 7-7 7l-3-3Z" /><circle cx="15" cy="9" r="2" /></>,
  shield:   <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  spark:    <><path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3Z" /><path d="m5 16-.7 2.3L2 19l2.3.7L5 22l.7-2.3L8 19l-2.3-.7L5 16Z" /></>,
  support:  <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M18 19c0 1.7-1.3 3-3 3h-3" /><path d="M4 14h3v5H5a1 1 0 0 1-1-1v-4Z" /><path d="M20 14h-3v5h2a1 1 0 0 0 1-1v-4Z" /></>,
  web:      <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18" /><path d="M12 3a15 15 0 0 0 0 18" /></>,
  x:        <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
};

interface IconProps {
  name: IconName;
  size?: number;
}

export default function Icon({ name, size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}
