import { Copyright } from "lucide-react";
import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <section className="bg-white/20 dark:bg-gray-900/20 w-full border-t-2 ">
      <p className="text-xs text-black/50 my-3 px-2">
        Copyright © 2023 Tanya Mekanik. All rights reserved.
      </p>
    </section>
  );
}
