import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Komlu Hukuk Bürosu - Av. Kürşat Komlu | Erzurum',
  description: 'Erzurum odaklı, güvenilir ve başarılı hukuki danışmanlık hizmetleri. Boşanma, Ceza, İş ve Miras hukuku alanlarında uzman kadro.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased text-foreground selection:bg-gold-100 selection:text-navy-900',
          playfair.variable,
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
