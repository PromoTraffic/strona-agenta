import { About } from "@/components/About";
import { Benefits } from "@/components/Benefits";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { SiteHeader } from "@/components/SiteHeader";
import { ToolsGrid } from "@/components/ToolsGrid";
import { getAllContent } from "@/lib/content";

export default async function Home() {
  const content = await getAllContent();

  return (
    <div className="pt-page-bg relative z-10 flex min-h-full flex-col">
      <SiteHeader primarySiteUrl={content.footer.primarySiteUrl} />
      <main className="flex-1">
        <Hero content={content.hero} />
        <About content={content.about} />
        <Benefits content={content.benefits} />
        <ToolsGrid tools={content.tools} />
      </main>
      <Footer content={content.footer} />
    </div>
  );
}
