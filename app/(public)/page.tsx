import Articles from "./_components/Articles";
import WelcomeHero from "./_components/WelcomeHero";
const data = [
  {
    id: 1,
    image: "https://via.assets.so/movie.png?id=1&q=95&w=360&h=360&fit=fill",
    title: "Blog 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2023-01-01",
    author: "Tanya Mekanik",
    category: "Blog",
    tags: ["Blog", "Tanya Mekanik"],
  },
  {
    id: 2,
    image: "https://via.assets.so/movie.png?id=2&q=95&w=360&h=360&fit=fill",
    title: "Blog 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2023-01-02",
    author: "Tanya Mekanik",
    category: "Blog",
    tags: ["Blog", "Tanya Mekanik"],
  },
  {
    id: 3,
    image: "https://via.assets.so/movie.png?id=3&q=95&w=360&h=360&fit=fill",
    title: "Blog 3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2023-01-03",
    author: "Tanya Mekanik",
    category: "Blog",
    tags: ["Blog", "Tanya Mekanik"],
  },
  {
    id: 4,
    image: "https://via.assets.so/movie.png?id=4&q=95&w=360&h=360&fit=fill",
    title: "Blog 4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2023-01-04",
    author: "Tanya Mekanik",
    category: "Blog",
    tags: ["Blog", "Tanya Mekanik"],
  },
  {
    id: 5,
    image: "https://via.assets.so/movie.png?id=5&q=95&w=360&h=360&fit=fill",
    title: "Blog 5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2023-01-05",
    author: "Tanya Mekanik",
    category: "Blog",
    tags: ["Blog", "Tanya Mekanik"],
  },
];
const categories = [
  "View All",
  "Interior",
  "Exterior",
  "Machine",
  "Maintainence",
];
export default function Home() {
  return (
    <main className="">
      <WelcomeHero />

      <Articles articles={data} categories={categories} />
    </main>
  );
}
