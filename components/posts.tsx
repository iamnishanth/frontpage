"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { loadMorePosts } from "@/lib/api";
import type { Item, PostType } from "@/lib/api";

import { PostCard } from "./post-card";
import { Button } from "./ui/button";

type PostsProps = {
  type: PostType;
  initialPosts: Item[];
};

function LoadMoreButton({ hasMore }: { hasMore: boolean }) {
  const { pending } = useFormStatus();

  if (!hasMore) {
    return (
      <div className="flex justify-center py-4">
        <p className="text-sm text-muted-foreground">You&apos;ve reached the end!</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-4">
      <Button type="submit" disabled={pending} variant="outline" size="sm">
        {pending ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
}

export const Posts = ({ type, initialPosts }: PostsProps) => {
  const [posts, setPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(initialPosts.length >= 30);

  // Reset state when type or initialPosts change
  useEffect(() => {
    setPosts(initialPosts);
    setHasMore(initialPosts.length >= 30);
  }, [type, initialPosts]);

  const handleLoadMore = async () => {
    try {
      const newPosts = await loadMorePosts(type, posts.length, 30);
      if (newPosts.length > 0) {
        setPosts((prev) => [...prev, ...newPosts]);
        // If we got fewer posts than requested, we've reached the end
        if (newPosts.length < 30) {
          setHasMore(false);
        }
      } else {
        // No new posts returned, we've reached the end
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more posts:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-2 lg:gap-4 p-2 lg:p-4 overflow-scroll">
      {posts.map((post: Item) => (
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
      {hasMore ? (
        <form action={handleLoadMore}>
          <LoadMoreButton hasMore={hasMore} />
        </form>
      ) : (
        <LoadMoreButton hasMore={hasMore} />
      )}
    </div>
  );
};
