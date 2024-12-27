import React from "react";

type Props = {};

export default function ArticleNotFound({}: Props) {
  return (
    <div className="w-[100vw] h-[70vh] items-center justify-center flex">
      <div className="container bg-green text-center">
        <h1 className="font-bold text-xl">404</h1>
        <p className="font-bold">
          Article that you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
