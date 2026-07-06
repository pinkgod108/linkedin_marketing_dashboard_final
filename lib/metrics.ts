import { Post, SummaryStats } from "./types";

export function computeSummary(posts: Post[]): SummaryStats {
  if (posts.length === 0) {
    return {
      totalPosts: 0,
      totalImpressions: 0,
      totalReactions: 0,
      totalComments: 0,
      totalShares: 0,
      averageEngagementRate: 0,
      bestByEngagement: null,
      mostViewed: null,
      mostCommented: null,
      topTopic: null,
    };
  }

  const totalImpressions = posts.reduce((sum, p) => sum + p.impressions, 0);
  const totalReactions = posts.reduce((sum, p) => sum + p.reactions, 0);
  const totalComments = posts.reduce((sum, p) => sum + p.comments, 0);
  const totalShares = posts.reduce((sum, p) => sum + p.shares, 0);
  const averageEngagementRate =
    posts.reduce((sum, p) => sum + p.engagementRate, 0) / posts.length;

  const bestByEngagement = [...posts].sort(
    (a, b) => b.engagementRate - a.engagementRate
  )[0];
  const mostViewed = [...posts].sort((a, b) => b.impressions - a.impressions)[0];
  const mostCommented = [...posts].sort((a, b) => b.comments - a.comments)[0];

  const topicGroups = new Map<string, { sum: number; count: number }>();
  for (const post of posts) {
    const group = topicGroups.get(post.topic) ?? { sum: 0, count: 0 };
    group.sum += post.engagementRate;
    group.count += 1;
    topicGroups.set(post.topic, group);
  }

  let topTopic: { topic: string; averageEngagementRate: number } | null = null;
  for (const [topic, { sum, count }] of topicGroups.entries()) {
    const avg = sum / count;
    if (!topTopic || avg > topTopic.averageEngagementRate) {
      topTopic = { topic, averageEngagementRate: avg };
    }
  }

  return {
    totalPosts: posts.length,
    totalImpressions,
    totalReactions,
    totalComments,
    totalShares,
    averageEngagementRate,
    bestByEngagement,
    mostViewed,
    mostCommented,
    topTopic,
  };
}

export interface TopicPerformance {
  topic: string;
  averageEngagementRate: number;
  postCount: number;
}

export function computeTopicPerformance(posts: Post[]): TopicPerformance[] {
  const groups = new Map<string, { sum: number; count: number }>();
  for (const post of posts) {
    const group = groups.get(post.topic) ?? { sum: 0, count: 0 };
    group.sum += post.engagementRate;
    group.count += 1;
    groups.set(post.topic, group);
  }

  return Array.from(groups.entries())
    .map(([topic, { sum, count }]) => ({
      topic,
      averageEngagementRate: sum / count,
      postCount: count,
    }))
    .sort((a, b) => b.averageEngagementRate - a.averageEngagementRate);
}
