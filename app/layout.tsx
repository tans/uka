import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "uka - 开源加密货币支付发卡系统",
  description: "开源发卡商城，使用USDT作为购买货币",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  );
}
