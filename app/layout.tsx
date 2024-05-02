import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
export const metadata: Metadata = {
  title: "uka - USDT卡密商城",
  description: "开源发卡商城，使用USDT作为购买货币，免登录。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ViewTransitions>
  );
}
