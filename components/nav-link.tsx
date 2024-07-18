"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  href: string;
  exact?: boolean;
  children: React.ReactNode;
}

export const NavLink = ({ href, exact = false, children, ...props }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} {...props} data-active={isActive} data-pathname={pathname}>
      {children}
    </Link>
  );
};
