import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projectRoutes, site } from "@/content";
import { ProjectPage } from "@/features/projects/ProjectPage";
import { SITE_URL } from "@/lib/site-url";

type ProjectRoutePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projectRoutes.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({
  params,
}: ProjectRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const path = `/work/${project.slug}/`;
  const title = `${project.metadata.title} — ${site.name}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: project.metadata.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description: project.metadata.description,
      type: "article",
      siteName: site.name,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.metadata.description,
    },
  };
}

export default async function WorkProjectPage({ params }: ProjectRoutePageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectPage project={project} />;
}
