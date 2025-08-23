import { Suspense } from "react";

import { notFound } from "next/navigation";

import { PostsHeader } from "@/components/posts-header";
import { PostsLoading } from "@/components/posts-loading";
import { PostsServer } from "@/components/posts-server";
import { PostsWrapper } from "@/components/posts-wrapper";
import { Separator } from "@/components/ui/separator";

import type { PostType } from "@/lib/api";
import { VALID_POST_TYPES } from "@/lib/api";

export default function PostsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { type: PostType };
}) {
  if (!VALID_POST_TYPES.includes(params.type)) {
    return notFound();
  }

  return (
    <div className="flex-1 flex min-h-[100dvh] max-h-[100dvh] h-[100dvh]">
      <PostsWrapper>
        <PostsHeader type={params.type} />
        <Separator />
        <Suspense fallback={<PostsLoading />}>
          <PostsServer type={params.type} />
        </Suspense>
      </PostsWrapper>
      {children}
    </div>
  );
}
