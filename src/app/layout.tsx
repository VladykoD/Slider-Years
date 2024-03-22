import type { Metadata } from "next";
import "../styles/global.scss";
import { Sprite } from "@/components/ui-kit/sprite/Sprite";

export const metadata: Metadata = {
  title: "I am a slider :D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        {children}
        <Sprite />
      </body>
    </html>
  );
}
