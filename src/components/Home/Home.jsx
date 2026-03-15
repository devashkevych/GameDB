import Search from "../Search/Search";

export default function Home() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-400">
          Discover games
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-4xl">
          Search for any game
        </h1>
      </div>

      <Search />
    </section>
  );
}
