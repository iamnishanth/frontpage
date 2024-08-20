"use client";

import { useParams } from "next/navigation";

import { cn } from "@/lib/utils";

export const PostsWrapper = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();

  return (
    <div
      className={cn(
        "flex flex-col w-1/2 max-w-2xl border-r border-input",
        params.id && "hidden lg:flex",
        !params.id && "w-full lg:w-1/2",
      )}
    >
      {children}
    </div>
  );
};
