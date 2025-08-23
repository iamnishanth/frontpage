import { ArrowUp } from "lucide-react";

import { getTimeAgo, truncateUrl } from "@/lib/utils";

import { NavLink } from "./nav-link";

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
    <div className="w-full hover:bg-accent border rounded-lg p-4 has-[a[data-active='true']]:bg-accent">
      <div className="flex flex-col gap-1">
        <NavLink href={to}>
          <h1 className="font-semibold break-all">{title || ""}</h1>
        </NavLink>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted-foreground w-fit break-all hover:underline"
            title={url}
          >
            {truncateUrl(url)}
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
          </>
        )}
        {by && (
          <>
            <span>•</span>
            <span>{by}</span>
          </>
        )}
        {time && (
          <>
            <span>•</span>
            <span>{getTimeAgo(time)}</span>
          </>
        )}
        {descendants !== undefined && (
          <>
            <span>•</span>
            <span>{descendants} comments</span>
          </>
        )}
      </div>
    </div>
  );
};
