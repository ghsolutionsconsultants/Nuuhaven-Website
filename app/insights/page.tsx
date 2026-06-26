import { getAllPosts } from "@/lib/content";
import InsightsFeed from "@/components/insights/InsightsFeed";

export default function InsightsPage() {
  const posts = getAllPosts();
  return <InsightsFeed posts={posts} />;
}
