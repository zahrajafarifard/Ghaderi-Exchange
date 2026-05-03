import type { Metadata } from "next";
import localFont from "next/font/local";

import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import "./globals.css";

const Peyda = localFont({
  src: "../public/fonts/PeydaFaNum-Regular.ttf",
});
const Hamrah = localFont({
  src: "../public/fonts/Hamrah.ttf",
});

export const metadata: Metadata = {
  title: "صرافی قادری - قیمت ارزو سکه",
  description: "صرافی قادری ارائه دهنده به روز ترین قیمت ارز و سکه",
  keywords:
    "صرافی قادری ، شرکت تضامنی فرهاد قادری و شرکاء ، فرهاد قادری ، قیمت ارز ، قیمت سکه ، قیمت ارز و سکه ، تلمیس ، شرکت داده پردازان تلمیس ، داد پردازان تلمیس، شرکت تلمیس",
  icons: {
    icon: "/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Peyda.className}>
        <header className="sticky z-40 top-0 bg-white">
          <Header />
        </header>
        {children}
        <div id="modal" />
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}

export { Hamrah };
