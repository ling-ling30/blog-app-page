import Articles from "./_components/Articles";
import WelcomeHero from "./_components/WelcomeHero";

export default function Home() {
  return (
    <main className="max-w-full">
      <WelcomeHero />
      <Articles />
    </main>
  );
}
