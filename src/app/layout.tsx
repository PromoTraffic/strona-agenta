import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getContent("hero");
  const title = `${hero.title} | PromoTraffic`;
  return {
    title,
    description:
      "Inteligentny agent AI w ekosystemie PromoTraffic — performance marketing, narzędzia i skalowalne wyniki.",
    openGraph: {
      title,
      description:
        "Inteligentny agent AI w ekosystemie PromoTraffic — performance marketing i zintegrowane narzędzia.",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${poppins.variable} h-full scroll-smooth`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
