import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://creatorlab.melive.co";
const TITLE = "Melive Creator Lab NYC — Get Signed. Get Funded. Scale to $100K GMV.";
const DESC = "Apply to Melive Creator Lab NYC. A 6-month live commerce incubator for serious TikTok Shop creators. We invest $8–15K per creator in equipment, ad budget, and a dedicated growth team. Class of 2026 — applications close May 31.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", url: SITE_URL, title: TITLE, description: DESC,
    siteName: "Melive Creator Lab",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Melive Creator Lab NYC" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og-image.jpg"] },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", name: "Melive", url: SITE_URL,
      parentOrganization: { "@type": "Organization", name: "The Metub Company" },
      contactPoint: { "@type": "ContactPoint", email: "creators@melive.co", contactType: "creator partnerships" } },
    { "@type": "Event", name: "Melive Creator Lab NYC — Class of 2026",
      description: "A 6-month live commerce incubator for US TikTok Shop creators.",
      startDate: "2026-07-01", endDate: "2026-12-31",
      location: { "@type": "VirtualLocation", url: SITE_URL },
      organizer: { "@type": "Organization", name: "Melive" },
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", validThrough: "2026-05-31", url: `${SITE_URL}/#apply` } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');` }} />
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
