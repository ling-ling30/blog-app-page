import Image from "next/image";
import { title } from "process";
import React from "react";
import car from "@/public/car.avif";
type Props = {};

const headlines = {
  title: "Perawatan Mobil Jeep",
  description:
    "Cara perawatan jeep yang direkomendasikan oleh para ahli serta, bagian-bagian yang direkomendasikan",
  date: "2023-01-01",
  author: "Tanya Mekanik",
  category: "Blog",
  tags: ["Blog", "Tanya Mekanik"],
};

export default function WelcomeHero({}: Props) {
  return (
    <section className="w-full relative px-2 rounded-md aspect-[4/3] xl:aspect-[4/2] bg-cover flex flex-col-reverse group bg-[url('/car.avif')]">
      {/* <Image
        src={car.src}
        alt="car mechanic"
        width={1000}
        height={1000}
        className="rounded-md object-fill w-full h-full absolute"
      /> */}
      <div
        className=" transition-opacity duration-500 ease-in-out opacity-50 group-hover:opacity-100
      max-w-full md:max-w-screen-sm  h-32 md:h-40 lg:h-48 bg-black/10 dark:bg-gray-900/70 backdrop-blur-md shadow-sm p-4 md:p-8 rounded-md"
      >
        <h1 className="text-sm lg:text-3xl font-semibold text-[#f1f1f1] mb-4">
          {headlines.title}
        </h1>
        <p className=" text-xs lg:text-sm text-white line-clamp-3">
          {headlines.description}
        </p>
      </div>
    </section>
  );
}
