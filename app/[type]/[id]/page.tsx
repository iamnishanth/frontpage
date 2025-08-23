import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowUp, MoveLeft } from "lucide-react";

import { Comments } from "@/components/comments";
import { Separator } from "@/components/ui/separator";

import { getItem } from "@/lib/api";
import { getTimeAgo } from "@/lib/utils";

export default async function PostPage({ params }: { params: { type: string; id: string } }) {
  const post = await getItem(+params.id);
  if (!post) {
    return notFound();
  }

  return (
    <div className="flex-1 flex flex-col">
      <header className="w-full flex items-center justify-between min-h-[52px] h-[52px] px-4 gap-4">
        <Link href={`/${params.type}`}>
          <MoveLeft />
        </Link>
        <a
          className="text-xs hover:underline"
          href={`https://news.ycombinator.com/item?id=${params.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in hackernews
        </a>
      </header>
      <Separator />
      <div className="p-4 overflow-scroll">
        <h1 className="text-2xl font-extrabold mb-2 break-all">{post.title || ""}</h1>
        {post.url && (
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground break-all hover:underline"
          >
            {post.url}
          </a>
        )}
        <div className="text-xs text-muted-foreground mt-4 font-bold flex gap-1">
          <span className="flex items-center gap-1">
            <ArrowUp size={14} />
            {post.points}
          </span>
          <span>•</span>
          <span>{post.author}</span>
          <span>•</span>
          <span>{getTimeAgo(post.created_at_i)}</span>
        </div>
        {post.text && (
          <div
            className="mt-4 text-sm post-text"
            dangerouslySetInnerHTML={{ __html: post.text }}
          ></div>
        )}
        {post.children && post.children.length > 0 && (
          <section className="mt-4">
            <h1 className="font-bold text-lg">Comments</h1>
            <Comments comments={post.children} />
          </section>
        )}
      </div>
    </div>
  );
}
