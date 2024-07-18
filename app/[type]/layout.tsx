import { notFound } from "next/navigation";

import { Posts } from "@/components/posts";
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
    <div className="flex-1 flex">
      <div className="flex flex-col w-1/2 border-r border-input">
        <header className="w-full flex items-center justify-between h-[52px] px-4">
          <h1 className="text-xl font-bold">{params.type}</h1>
        </header>
        <Separator />
        <Posts type={params.type} />
      </div>
      {children}
    </div>
  );
}
