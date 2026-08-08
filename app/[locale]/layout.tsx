import type { Metadata } from 'next';
import { Space_Grotesk, Noto_Sans_KR } from 'next/font/google';
import '../globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'K Select Hub - Retail Growth Partner for K-Beauty',
  description: '미국 독립 Beauty Supply Retailer를 위한 최적의 K-Beauty 카테고리 솔루션. 상품 큐레이션, 맞춤형 디스플레이, 지속적 머천다이징 지원.',
  metadataBase: new URL('https://kselecthub.com'),
};

export async function generateStaticParams() {
  return [{ locale: 'ko' }];
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  return (
    <html
      lang={locale === 'ko' ? 'ko' : 'en'}
      className={`${spaceGrotesk.variable} ${notoSansKR.variable} h-full antialiased`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
