import { ScrollControllerProvider } from "@lib/hooks/useScrollPositionBlocker";
import { CustomSearchParamsProvider } from "@lib/hooks/useSearchParams";
import MainLayout from "@components/MainLayout";
import type { Metadata, Viewport } from "next";
import "../global.scss";
import "normalize.css";
import localFont from "next/font/local";

const munroFont = localFont({
  src: "../Munro.woff2",
  display: "swap",
  fallback: ["Munro"],
  declarations: [
    { prop: "font-smooth", value: "never" },
    { prop: "-webkit-font-smoothing", value: "none" },
    { prop: "-moz-osx-font-smoothing", value: "none" },
    { prop: "text-rendering", value: "optimizeSpeed" },
  ],
});

export const metadata: Metadata = {
  title: {
    template: "%s | RogueLibs Web",
    default: "RogueLibs Web",
    absolute: "RogueLibs Web",
  },
  description: "A mod-sharing platform for Streets of Rogue.",
  applicationName: "RogueLibs Web",
  authors: [{ name: "Abbysssal", url: "/users/Abbysssal" }],
  openGraph: {
    type: "website",
    title: "RogueLibs Web",
    siteName: "RogueLibs Web",
    description: "A mod-sharing platform for Streets of Rogue.",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "RogueLibs Web",
    description: "A mod-sharing platform for Streets of Rogue.",
    images: ["/logo.png"],
  },
  generator: "Next.js",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#fbb946",
};

if (process.env.NODE_ENV === "development") {
  metadata.metadataBase = new URL("http://localhost:3000");
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={munroFont.className} suppressHydrationWarning>
      <body>
        <ScrollControllerProvider>
          <CustomSearchParamsProvider>
            <MainLayout>{children}</MainLayout>
          </CustomSearchParamsProvider>
        </ScrollControllerProvider>
      </body>
    </html>
  );
}
