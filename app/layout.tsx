import { Toaster } from "@/shared/components/ui/toast";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  getSiteUrl,
} from "@/shared/constants/seo.consts";
import { ThemeProvider } from "@/shared/providers/theme-provider";
import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#171717",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            color="oklch(0.7334 0.0489 285.1325)"
            height={3}
            showSpinner={false}
          />
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
