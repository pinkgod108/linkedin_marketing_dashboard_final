export type RawCsvRow = Record<string, string>;

export interface Post {
  date: string;
  time: string;
  title: string;
  impressions: number;
  membersReached: number;
  articleViews: number;
  reactions: number;
  comments: number;
  shares: number;
  url: string;
  topic: string;
  engagementRate: number;
}

export interface SummaryStats {
  totalPosts: number;
  totalImpressions: number;
  totalReactions: number;
  totalComments: number;
  totalShares: number;
  averageEngagementRate: number;
  bestByEngagement: Post | null;
  mostViewed: Post | null;
  mostCommented: Post | null;
  topTopic: { topic: string; averageEngagementRate: number } | null;
}
