"use client";

import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export const PostsWrapper = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  console.log(params);

  return (
    <div
      className={cn(
        "flex flex-col w-1/2 border-r border-input",
        params.id && "hidden lg:flex",
        !params.id && "w-full lg:w-1/2",
      )}
    >
      {children}
    </div>
  );
};
