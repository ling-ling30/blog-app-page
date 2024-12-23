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
import { useRouter } from "next/navigation";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();
  const [query, setQuery] = useState("");
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
              <p className=" uppercase font-bold">Tanya Mekanik</p>
            </Link>
          </div>
          <NavigationMenu />

          {/* Accessibility */}

          <div className="flex items-center space-x-2">
            <form className="flex items-center space-x-2">
              <Input
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className="max-w-32 sm:max-w-xs shadow-none border-primary text-xs md:text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                className="border-primary text-primary-foreground hover:text-accent-foreground hover:bg-accent-foreground"
                aria-label="Search"
                onClick={(e) => {
                  e.preventDefault();
                  const slug = query.replaceAll(" ", "-").toLowerCase();
                  router.push(`/articles/search/${slug}`);
                }}
              >
                <Search className="h-5 w-5 text-primary" />
              </Button>
            </form>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="border-[1px] border-black rounded-sm md:hidden"
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5 text-black" />
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
            </DropdownMenu> */}
          </div>
        </div>
      </div>
    </header>
  );
}
