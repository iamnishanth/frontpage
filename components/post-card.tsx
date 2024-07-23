import Link from "next/link";

import { ArrowUp } from "lucide-react";

import { getTimeAgo } from "@/lib/utils";

type PostCardProps = {
  to: string;
  title?: string;
  url?: string;
  score?: number;
  by?: string;
  time: number;
  descendants?: number;
};

export const PostCard = ({ to, title, url, score, by, time, descendants }: PostCardProps) => {
  return (
    <div className="w-full hover:bg-accent border rounded-lg p-4">
      <div className="flex flex-col gap-1">
        <Link href={to}>
          <h1 className="font-semibold">{title || ""}</h1>
        </Link>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted-foreground w-fit break-all hover:underline"
          >
            {url}
          </a>
        )}
      </div>
      <div className="flex gap-2 text-xs mt-2">
        {score && (
          <>
            <span className="flex items-center justify-center gap-1">
              <ArrowUp size={14} />
              {score}
            </span>
            <span>•</span>
          </>
        )}
        {by && (
          <>
            <span>{by}</span>
            <span>•</span>
          </>
        )}
        {time && (
          <>
            <span>{getTimeAgo(time)}</span>
            <span>•</span>
          </>
        )}
        {descendants !== undefined && <span>{descendants} comments</span>}
      </div>
    </div>
  );
};
