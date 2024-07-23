import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowUp, MoveLeft } from "lucide-react";

import { Comments } from "@/components/comments";
import { Separator } from "@/components/ui/separator";

import { getStoryWithComments } from "@/lib/api";
import { getTimeAgo } from "@/lib/utils";

export default async function PostPage({ params }: { params: { type: string; id: string } }) {
  const post = await getStoryWithComments(+params.id);
  if (!post) {
    return notFound();
  }

  return (
    <div className="flex-1 flex flex-col">
      <header className="w-full flex items-center justify-between lg:justify-end min-h-[52px] h-[52px] px-4 gap-4">
        <Link href={`/${params.type}`}>
          <MoveLeft className="lg:hidden" />
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
        <h1 className="text-2xl font-extrabold mb-2">{post.title}</h1>
        {post.url && (
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground break-all"
          >
            {post.url}
          </a>
        )}
        <div className="text-xs text-muted-foreground mt-4 font-bold flex gap-1">
          <span className="flex items-center gap-1">
            <ArrowUp size={14} />
            {post.score}
          </span>
          <span>•</span>
          <span>{post.by}</span>
          <span>•</span>
          <span>{getTimeAgo(post.time)}</span>
        </div>
        {post.text && (
          <div
            className="mt-4 text-sm post-text"
            dangerouslySetInnerHTML={{ __html: post.text }}
          ></div>
        )}
        {post.comments && post.comments.length > 0 && (
          <section className="mt-4">
            <h1 className="font-bold text-lg">Comments</h1>
            <Comments comments={post.comments} />
          </section>
        )}
      </div>
    </div>
  );
}
