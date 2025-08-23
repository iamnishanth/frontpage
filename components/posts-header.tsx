"use client";

import { useRouter } from "next/navigation";

import { ChevronDown } from "lucide-react";

import type { PostType } from "@/lib/api";

import { NAVLINKS } from "./sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const PostsHeader = ({ type }: { type: PostType }) => {
  const router = useRouter();

  return (
    <header className="w-full flex items-center justify-between h-[52px] px-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="font-bold text-xl w-fit flex items-center gap-2 !outline-none !ring-0 !border-0 !ring-offset-0">
          {type} <ChevronDown size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {NAVLINKS.map((link) => (
            <DropdownMenuItem key={link.title} onClick={() => router.push(link.url)}>
              {link.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
