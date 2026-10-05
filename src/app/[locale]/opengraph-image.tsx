import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { isLocale, locales } from "@/i18n/config";

export const alt = profile.fullName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Social sharing card, generated at build time (no image file to maintain). */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "fr";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0b111a",
          color: "#ece9e1",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 24, color: "#cda868", letterSpacing: 2 }}>
          <div style={{ width: 48, height: 2, background: "#cda868" }} />
          {profile.kicker[locale].toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05, maxWidth: 960, letterSpacing: -1.5 }}>
          {profile.fullName}
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-end" }}>
          {[38, 62, 50, 88, 70, 112, 96, 140].map((h, i) => (
            <div
              key={i}
              style={{ width: 18, height: h, background: i === 7 ? "#cda868" : "#34465c", borderRadius: 2 }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
