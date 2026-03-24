import { getContent } from "@/lib/content";
import { AdminLayout } from "./AdminLayout";
import { AdminToolsEditor } from "./AdminToolsEditor";
import { AdminContentEditor } from "./AdminContentEditor";
import { AdminUsersEditor } from "./AdminUsersEditor";

type PageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function AdminPage({ searchParams }: PageProps) {
  const { tab } = await searchParams;
  const currentTab = tab === "content" || tab === "users" ? tab : "tools";

  const [tools, hero, about, benefits, footer] = await Promise.all([
    getContent("tools"),
    getContent("hero"),
    getContent("about"),
    getContent("benefits"),
    getContent("footer"),
  ]);

  return (
    <AdminLayout>
      {currentTab === "tools" && (
        <AdminToolsEditor initialTools={tools} />
      )}
      {currentTab === "content" && (
        <AdminContentEditor
          initialHero={hero}
          initialAbout={about}
          initialBenefits={benefits}
          initialFooter={footer}
        />
      )}
      {currentTab === "users" && <AdminUsersEditor />}
    </AdminLayout>
  );
}
