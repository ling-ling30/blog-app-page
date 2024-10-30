"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, Moon, Sun, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavigationMenu from "./NavigationMenu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { roboto } from "@/components/font";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //
  return (
    <header
      className={cn(
        "fixed w-full z-10 transition-all duration-300 bg-white/20",
        scrollY > 50 &&
          "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-primary">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <svg
                className="h-8 w-8 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L3 9L12 14L21 9L12 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 14L12 19L21 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className={cn("font-bold text-xs md:text-md", roboto.className)}
              >
                Tanya Mekanik
              </span>
            </Link>
          </div>
          <NavigationMenu />

          {/* Accessibility */}
          <div className="flex items-center space-x-2">
            <Input className=" shadow-none border-primary" />
            <Button
              variant="outline"
              size="icon"
              className="border-primary text-primary-foreground hover:text-accent-foreground hover:bg-accent-foreground"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-primary" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:text-accent-foreground md:hidden"
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/categories">Categories</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about">About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact">Contact</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
