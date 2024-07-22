import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import { NavLink } from "./nav-link";
import { buttonVariants } from "./ui/button";

export const Sidebar = () => {
  return (
    <aside className="border-r border-input hidden lg:block relative">
      <header className="w-[256px] h-[52px] px-2 flex items-center gap-2">
        <Link
          href="/"
          className="h-9 w-full rounded-md flex items-center gap-2 text-xl font-bold shadow-sm px-3"
        >
          frontpage.
        </Link>
      </header>
      <Separator />
      <section className="flex flex-col gap-4 py-2">
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center">
          {NAVLINKS.map((link, index) => (
            <NavLink
              key={index}
              href={link.url}
              exact={link.url === "/"}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "justify-start data-[active='true']:dark:bg-muted data-[active='true']:dark:text-white data-[active='true']:dark:hover:bg-muted data-[active='true']:dark:hover:text-white",
              )}
            >
              {link.title}
            </NavLink>
          ))}
        </nav>
      </section>
      <section className="absolute bottom-0 w-full flex flex-col gap-2 items-center justify-center p-6">
        <p className="text-xs">
          Made with ♥ by{" "}
          <a className="hover:underline" href="https://github.com/iamnishanth">
            @iamnishanth
          </a>
        </p>
        <p className="text-xs">
          Open Source{" "}
          <a
            className="text-xs hover:underline"
            href="https://github.com/iamnishanth/frontpage"
            target="_blank"
            rel="noreferrer"
          >
            @Github
          </a>
        </p>
      </section>
    </aside>
  );
};

export const NAVLINKS = [
  {
    url: "/news",
    title: "news",
  },
  {
    url: "/newest",
    title: "newest",
  },
  {
    url: "/ask",
    title: "ask",
  },
  {
    url: "/show",
    title: "show",
  },
];
