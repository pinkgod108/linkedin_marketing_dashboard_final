export default function Header() {
  return (
    <header className="text-center sm:text-left">
      <p className="inline-block rounded-full bg-mustard/20 px-4 py-1 text-sm font-semibold text-maroon-dark">
        Summer of AI GTM · Learning Project
      </p>
      <h1 className="mt-4 text-3xl font-bold text-maroon sm:text-4xl">
        LinkedIn Marketing Dashboard
      </h1>
      <p className="mt-2 max-w-2xl text-neutral-700">
        A friendly look at how my LinkedIn posts are performing — impressions,
        engagement, and what to post next, all in one place.
      </p>
    </header>
  );
}
