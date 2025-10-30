import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import "./swiper-custom.css";
import ThemeRegistry from '@/components/ThemeRegistry';

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "B8ONE - Ofertas da Semana",
  description: "As melhores ofertas em produtos selecionados. Aproveite descontos de até 40%!",
  keywords: "ofertas, produtos, descontos, e-commerce, loja online",
  authors: [{ name: "B8ONE" }],
  openGraph: {
    title: "B8ONE - Ofertas da Semana",
    description: "As melhores ofertas em produtos selecionados. Aproveite descontos de até 40%!",
    type: "website",
  },
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