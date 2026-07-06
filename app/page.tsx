"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import UploadCsv from "@/components/UploadCsv";
import SummaryCards from "@/components/SummaryCards";
import SectionDivider from "@/components/SectionDivider";
import PostsSection from "@/components/PostsSection";
import Recommendations from "@/components/Recommendations";
import EmptyState from "@/components/EmptyState";
import ImpressionsChart from "@/components/charts/ImpressionsChart";
import EngagementRateChart from "@/components/charts/EngagementRateChart";
import EngagementBreakdownChart from "@/components/charts/EngagementBreakdownChart";
import TopicChart from "@/components/charts/TopicChart";
import { parseCsvText } from "@/lib/parseCsv";
import { computeSummary, computeTopicPerformance } from "@/lib/metrics";
import { buildRecommendations } from "@/lib/recommendations";
import { Post } from "@/lib/types";

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isUsingUploadedData, setIsUsingUploadedData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    loadDefaultCsv();
  }, []);

  async function loadDefaultCsv() {
    setIsLoading(true);
    setLoadError(null);
    try {
      const response = await fetch("/linkedin-posts.csv", { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load the default CSV file.");
      const text = await response.text();
      setPosts(parseCsvText(text));
      setIsUsingUploadedData(false);
    } catch (err) {
      setLoadError(
        err instanceof Error ? err.message : "Something went wrong loading the CSV."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleUpload(csvText: string) {
    try {
      const newPosts = parseCsvText(csvText);
      setPosts(newPosts);
      setIsUsingUploadedData(true);
      setLoadError(null);
    } catch {
      setLoadError("That file couldn't be read as a CSV. Please check the format and try again.");
    }
  }

  const summary = useMemo(() => computeSummary(posts), [posts]);
  const topicPerformance = useMemo(() => computeTopicPerformance(posts), [posts]);
  const recommendations = useMemo(
    () => buildRecommendations(summary, topicPerformance),
    [summary, topicPerformance]
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Header />

      <div className="mt-8">
        <UploadCsv
          onUpload={handleUpload}
          isUsingUploadedData={isUsingUploadedData}
          onResetToDefault={loadDefaultCsv}
        />
      </div>

      {isLoading && (
        <div className="mt-10">
          <EmptyState message="Loading your LinkedIn post data..." />
        </div>
      )}

      {!isLoading && loadError && (
        <div className="mt-10">
          <EmptyState message={loadError} />
        </div>
      )}

      {!isLoading && !loadError && posts.length === 0 && (
        <div className="mt-10">
          <EmptyState message="No posts found yet. Upload a CSV to see your dashboard come to life." />
        </div>
      )}

      {!isLoading && !loadError && posts.length > 0 && (
        <>
          <SectionDivider
            title="Overall Summary"
            description="A quick pulse check on how your LinkedIn posts are doing overall."
          />
          <SummaryCards summary={summary} />

          <SectionDivider
            title="Visual Performance"
            description="Simple charts to spot trends across your posts and topics."
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ImpressionsChart posts={posts} />
            <EngagementRateChart posts={posts} />
            <EngagementBreakdownChart posts={posts} />
            <TopicChart data={topicPerformance} />
          </div>

          <SectionDivider
            title="Performance by Post"
            description="Every post, with the metrics and engagement rate behind it."
          />
          <PostsSection posts={posts} />

          <SectionDivider
            title="Recommendations"
            description="What's working, and ideas for what to post next."
          />
          {recommendations && <Recommendations data={recommendations} />}
        </>
      )}

      <footer className="mt-16 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-700">
        Built as part of the Summer of AI GTM learning project.
      </footer>
    </main>
  );
}
