import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import LayoutContent from "../components/LayoutContent";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "TAC Admin Panel",
  description:
    "TAC Admin Panel is a web application that allows administrators to manage the TAC platform.",
  icons: {
    icon: "/Images/TAC.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased overflow-x-hidden`}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
