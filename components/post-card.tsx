import Link from "next/link";

import { ArrowUp } from "lucide-react";

import { getTimeAgo } from "@/lib/utils";

type PostCardProps = {
  to: string;
  title: string;
  url: string;
  points: number;
  author: string;
  created_at: number;
  comment_count: number;
};

export const PostCard = ({
  to,
  title,
  url,
  points,
  author,
  created_at,
  comment_count,
}: PostCardProps) => {
  return (
    <div className="w-full hover:bg-accent border rounded-lg p-4">
      <div className="flex flex-col gap-1">
        <Link href={to}>
          <h1 className="font-semibold">{title}</h1>
        </Link>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted-foreground w-fit break-all hover:underline"
        >
          {url}
        </a>
      </div>
      <div className="flex gap-2 text-xs mt-2">
        <span className="flex items-center justify-center gap-1">
          <ArrowUp size={14} />
          {points}
        </span>
        <span>•</span>
        <span>{author}</span>
        <span>•</span>
        <span>{getTimeAgo(created_at)}</span>
        <span>•</span>
        <span>{comment_count} comments</span>
      </div>
    </div>
  );
};
