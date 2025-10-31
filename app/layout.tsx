import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import "./swiper-custom.css";
import ThemeRegistry from "@/components/ThemeRegistry";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "B8ONE - Ofertas Imperdíveis",
  description: "As melhores ofertas em produtos selecionados com até 40% de desconto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} antialiased`}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}