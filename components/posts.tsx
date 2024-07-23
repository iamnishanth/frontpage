import { getStories } from "@/lib/api";
import type { Item } from "@/lib/api";

import { PostCard } from "./post-card";

type PostsProps = {
  type: "news" | "newest" | "ask" | "show" | "jobs";
};

export const Posts = async ({ type }: PostsProps) => {
  let postType: "new" | "top" | "best" | "ask" | "show" | "job" = "best";

  if (type === "news") postType = "top";
  else if (type === "newest") postType = "new";
  else if (type === "ask") postType = "ask";
  else if (type === "show") postType = "show";
  else if (type === "jobs") postType = "job";

  const postData = await getStories(postType);

  return (
    <div className="flex-1 flex flex-col gap-2 lg:gap-4 p-2 lg:p-4 overflow-scroll">
      {postData.map((post: Item) => (
        <PostCard
          key={post.id}
          to={`/${type}/${post.id}`}
          title={post.title}
          url={post.url}
          score={post.score}
          by={post.by}
          time={post.time}
          descendants={post.descendants}
        />
      ))}
    </div>
  );
};
