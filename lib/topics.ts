// The CSV doesn't include a Topic column, so we infer a friendly topic
// label from each post's title using simple keyword matching. This keeps
// Version 1 dependency-free (no NLP/AI calls) while still giving the
// "Topic Performance" section something meaningful to group on.
const TOPIC_RULES: { topic: string; keywords: string[] }[] = [
  { topic: "AI GTM Strategy", keywords: ["gtm", "framework", "tech stack", "plan"] },
  { topic: "Events", keywords: ["event", "aix", "conference", "summit"] },
  { topic: "Learning & Skills", keywords: ["skill", "challenge", "ibm", "course", "certification"] },
  { topic: "Community", keywords: ["humans", "community", "team", "people"] },
  { topic: "Seasonal", keywords: ["summer", "holiday", "season", "year"] },
];

export function inferTopic(title: string): string {
  const lower = title.toLowerCase();

  for (const rule of TOPIC_RULES) {
    if (rule.keywords.some((keyword) => lower.includes(keyword))) {
      return rule.topic;
    }
  }

  return "General";
}
