import { redirect } from "next/navigation";
import { getAllPosts } from "@/lib/content";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default function PostPage() {
  redirect("/");
}
