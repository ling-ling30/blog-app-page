import React from "react";
import ArticleForm from "./[slug]/_components/ArticleForm";
import ArticleList from "./_components/ArticleList";

type Props = {};

export default function Page({}: Props) {
  return (
    <main className="p-10 w-full">
      <ArticleList />
    </main>
  );
}
