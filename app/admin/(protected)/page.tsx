import ArticleList from "./_components/Article/ArticleList";
import Test from "./_components/Article/test";

type Props = {};

export default function Page({}: Props) {
  return (
    <main>
      <Test />
      <ArticleList />
    </main>
  );
}
