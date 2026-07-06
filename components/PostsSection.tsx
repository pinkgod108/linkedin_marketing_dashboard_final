import { Post } from "@/lib/types";

function formatDate(dateStr: string): string {
  return dateStr || "—";
}

export default function PostsSection({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-4">
      {/* Card layout on small screens */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {posts.map((post, index) => (
          <div key={index} className="rounded-xl2 bg-cream-light p-5 shadow-soft">
            <p className="text-xs font-medium text-sienna-dark">{formatDate(post.date)}</p>
            <h3 className="mt-1 font-semibold text-maroon">{post.title}</h3>
            <span className="mt-1 inline-block rounded-full bg-mustard/20 px-2.5 py-0.5 text-xs font-medium text-maroon-dark">
              {post.topic}
            </span>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm text-neutral-700">
              <div>
                <dt className="text-xs">Impressions</dt>
                <dd className="font-semibold text-maroon">{post.impressions.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-xs">Engagement Rate</dt>
                <dd className="font-semibold text-maroon">{post.engagementRate.toFixed(2)}%</dd>
              </div>
              <div>
                <dt className="text-xs">Reactions</dt>
                <dd className="font-semibold text-maroon">{post.reactions.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-xs">Comments</dt>
                <dd className="font-semibold text-maroon">{post.comments.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-xs">Shares</dt>
                <dd className="font-semibold text-maroon">{post.shares.toLocaleString()}</dd>
              </div>
            </dl>
            {post.url && (
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm font-medium text-sienna-dark underline decoration-sienna underline-offset-2 hover:text-maroon"
              >
                View post →
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Table layout on larger screens */}
      <div className="hidden overflow-x-auto rounded-xl2 bg-cream-light shadow-soft lg:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-700">
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Topic</th>
              <th className="px-4 py-3 font-semibold text-right">Impressions</th>
              <th className="px-4 py-3 font-semibold text-right">Reactions</th>
              <th className="px-4 py-3 font-semibold text-right">Comments</th>
              <th className="px-4 py-3 font-semibold text-right">Shares</th>
              <th className="px-4 py-3 font-semibold text-right">Engagement Rate</th>
              <th className="px-4 py-3 font-semibold">Link</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index} className="border-b border-neutral-200 last:border-0">
                <td className="px-4 py-3 text-neutral-700">{formatDate(post.date)}</td>
                <td className="px-4 py-3 max-w-xs font-medium text-maroon">{post.title}</td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-full bg-mustard/20 px-2.5 py-0.5 text-xs font-medium text-maroon-dark">
                    {post.topic}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-neutral-700">{post.impressions.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-neutral-700">{post.reactions.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-neutral-700">{post.comments.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-neutral-700">{post.shares.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-semibold text-maroon">
                  {post.engagementRate.toFixed(2)}%
                </td>
                <td className="px-4 py-3">
                  {post.url && (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-sienna-dark underline decoration-sienna underline-offset-2 hover:text-maroon"
                    >
                      View →
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
