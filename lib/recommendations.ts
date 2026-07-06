import { Post, SummaryStats } from "./types";
import { TopicPerformance } from "./metrics";

export interface Recommendations {
  bestEngagementNote: string;
  mostImpressionsNote: string;
  strongestTopicNote: string;
  mostCommentedNote: string;
  postMoreOf: string;
  nextPostIdeas: string[];
}

export function buildRecommendations(
  summary: SummaryStats,
  topicPerformance: TopicPerformance[]
): Recommendations | null {
  if (!summary.bestByEngagement || !summary.mostViewed || !summary.topTopic || !summary.mostCommented) {
    return null;
  }

  const topTopic = topicPerformance[0];
  const secondTopic = topicPerformance[1];

  const nextPostIdeas = [
    `Write a follow-up to "${summary.bestByEngagement.title}" — it had your best engagement rate, so your audience wants more like it.`,
    `Create a "${topTopic.topic}" post that shares a lesson learned, since this topic has your strongest average engagement.`,
    secondTopic
      ? `Try mixing in a ${secondTopic.topic} post with a personal story or behind-the-scenes angle to see if it lifts engagement further.`
      : `Ask your audience a question related to "${summary.mostViewed.title}" to turn your highest-reach post into a conversation.`,
  ];

  return {
    bestEngagementNote: `"${summary.bestByEngagement.title}" performed best by engagement rate at ${summary.bestByEngagement.engagementRate.toFixed(2)}%.`,
    mostImpressionsNote: `"${summary.mostViewed.title}" had the most impressions with ${summary.mostViewed.impressions.toLocaleString()}.`,
    strongestTopicNote: `${summary.topTopic.topic} is your strongest topic, averaging ${summary.topTopic.averageEngagementRate.toFixed(2)}% engagement.`,
    mostCommentedNote: `"${summary.mostCommented.title}" sparked the most conversation with ${summary.mostCommented.comments} comments.`,
    postMoreOf: `Post more content in the "${topTopic.topic}" style — it's outperforming your other topics on average engagement.`,
    nextPostIdeas,
  };
}
