import { roboto } from "@/components/font";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {};

export default function NavigationMenu({}: Props) {
  return (
    <nav className={cn("hidden md:block", roboto.className)}>
      {/* <ul className="flex space-x-4">
        <li>
          <Link
            href="/"
            className="hover:text-accent-foreground transition-colors"
          >
            Halaman Utama
          </Link>
        </li>
        <li>
          <Link
            href="/categories"
            className="hover:text-accent-foreground transition-colors"
          >
            Categories
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-foreground transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:text-accent-foreground transition-colors"
          >
            Contact
          </Link>
        </li>
      </ul> */}
    </nav>
  );
}
