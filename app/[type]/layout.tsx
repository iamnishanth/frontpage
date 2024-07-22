import { Suspense } from "react";

import { notFound } from "next/navigation";

import { Posts } from "@/components/posts";
import { PostsHeader } from "@/components/posts-header";
import { PostsLoading } from "@/components/posts-loading";
import { PostsWrapper } from "@/components/posts-wrapper";
import { Separator } from "@/components/ui/separator";

export default function PostsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { type: "news" | "newest" | "ask" | "show" | "jobs" };
}) {
  if (["news", "newest", "ask", "show", "jobs"].indexOf(params.type) === -1) {
    return notFound();
  }

  return (
    <div className="flex-1 flex min-h-[100dvh] max-h-[100dvh] h-[100dvh]">
      <PostsWrapper>
        <PostsHeader type={params.type} />
        <Separator />
        <Suspense fallback={<PostsLoading />}>
          <Posts type={params.type} />
        </Suspense>
      </PostsWrapper>
      {children}
    </div>
  );
}
