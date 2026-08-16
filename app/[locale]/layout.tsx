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

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale === "ko" ? "ko" : "en";
  
  if (locale === "ko") {
    return {
      title: 'K Select Hub - K-Beauty 리테일 성장 파트너',
      description: '미국 독립 Beauty Supply Retailer를 위한 최적의 K-Beauty 카테고리 솔루션. 상품 큐레이션, 맞춤형 디스플레이, 지속적 머천다이징 지원.',
      metadataBase: new URL('https://www.kselecthub.com'),
      alternates: {
        canonical: 'https://www.kselecthub.com/ko',
        languages: {
          'en-US': 'https://www.kselecthub.com',
          'ko-KR': 'https://www.kselecthub.com/ko',
        },
      },
      icons: {
        icon: [
          { url: '/favicon.ico', sizes: 'any' },
          { url: '/icon.png', type: 'image/png' },
        ],
      },
    };
  }
  
  return {
    title: 'K Select Hub - Retail Growth Partner for K-Beauty',
    description: 'The turn-key category management and retail growth platform for independent beauty supply stores in the U.S. Custom LED displays, high margins, and 90-day exchange credit protection.',
    metadataBase: new URL('https://www.kselecthub.com'),
    alternates: {
      canonical: 'https://www.kselecthub.com',
      languages: {
        'en-US': 'https://www.kselecthub.com',
        'ko-KR': 'https://www.kselecthub.com/ko',
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png' },
      ],
    },
  };
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale === 'ko' ? 'ko' : 'en';
  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${notoSansKR.variable} h-full antialiased`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
