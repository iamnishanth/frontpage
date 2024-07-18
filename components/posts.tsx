import { getPosts } from "@/lib/api";

import { PostCard } from "./post-card";

type Posts = {
  type: "news" | "newest" | "ask" | "show" | "jobs";
};

export const Posts = async ({ type }: Posts) => {
  const postData = await getPosts(type);

  return (
    <div className="flex-1 flex flex-col gap-4 p-4 overflow-scroll">
      {postData.hits.map((post) => (
        <PostCard
          key={post.story_id}
          to={`/${type}/${post.story_id}`}
          title={post.title}
          url={post.url}
          points={post.points}
          author={post.author}
          created_at={post.created_at_i}
          comment_count={post.num_comments}
        />
      ))}
    </div>
  );
};
