import { Recommendations as RecommendationsData } from "@/lib/recommendations";

export default function Recommendations({ data }: { data: RecommendationsData }) {
  const notes = [
    data.bestEngagementNote,
    data.mostImpressionsNote,
    data.strongestTopicNote,
    data.mostCommentedNote,
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-xl2 bg-cream-light p-6 shadow-soft">
        <h3 className="font-semibold text-maroon">The Highlights</h3>
        <ul className="mt-4 space-y-3">
          {notes.map((note, index) => (
            <li key={index} className="flex gap-3 text-sm text-neutral-700">
              <span className="mt-0.5 text-mustard">●</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-xl bg-mustard/15 p-4">
          <p className="text-sm font-semibold text-maroon-dark">What to Post More Of</p>
          <p className="mt-1 text-sm text-neutral-700">{data.postMoreOf}</p>
        </div>
      </div>

      <div className="rounded-xl2 bg-cream-light p-6 shadow-soft">
        <h3 className="font-semibold text-maroon">What to Post Next</h3>
        <ol className="mt-4 space-y-4">
          {data.nextPostIdeas.map((idea, index) => (
            <li key={index} className="flex gap-3 text-sm text-neutral-700">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-maroon text-xs font-bold text-cream-light">
                {index + 1}
              </span>
              <span>{idea}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
