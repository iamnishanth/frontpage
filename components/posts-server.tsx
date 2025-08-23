import { loadMorePosts } from "@/lib/api";
import type { PostType } from "@/lib/api";

import { Posts } from "./posts";

type PostsServerProps = {
  type: PostType;
};

export const PostsServer = async ({ type }: PostsServerProps) => {
  const initialPosts = await loadMorePosts(type, 0, 30);

  return <Posts type={type} initialPosts={initialPosts} />;
};
