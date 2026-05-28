import { Suspense } from "react";

import { notFound } from "next/navigation";

import { PostsHeader } from "@/components/posts-header";
import { PostsLoading } from "@/components/posts-loading";
import { PostsServer } from "@/components/posts-server";
import { PostsWrapper } from "@/components/posts-wrapper";
import { Separator } from "@/components/ui/separator";

import type { PostType } from "@/lib/api";
import { VALID_POST_TYPES } from "@/lib/api";

export default async function PostsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ type: string }>;
}) {
  const { type: rawType } = await params;
  const type = rawType as PostType;
  if (!VALID_POST_TYPES.includes(type)) {
    return notFound();
  }

  return (
    <div className="flex-1 flex min-h-dvh max-h-dvh h-dvh">
      <PostsWrapper>
        <PostsHeader type={type} />
        <Separator />
        <Suspense fallback={<PostsLoading />}>
          <PostsServer type={type} />
        </Suspense>
      </PostsWrapper>
      {children}
    </div>
  );
}
