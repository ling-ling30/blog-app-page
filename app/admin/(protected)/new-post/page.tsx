import React from "react";
import ArticleForm from "./_components/ArticleForm";

type Props = {};

export default function Page({}: Props) {
  return (
    <main className="p-10 w-full">
      <ArticleForm />
    </main>
  );
}
