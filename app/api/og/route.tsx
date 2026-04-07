import { ImageResponse } from 'next/og';
import { SITE_URL } from '@/lib/site';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 'home';
    const title = searchParams.get('title') || 'Hirah Safi Coaching';

    // Fetch the Inter font
    const [interLight, interRegular, interBold] = await Promise.all([
      fetch(new URL(`${SITE_URL}/fonts/Inter-Light.ttf`)).then((res) => res.arrayBuffer()),
      fetch(new URL(`${SITE_URL}/fonts/Inter-Regular.ttf`)).then((res) => res.arrayBuffer()),
      fetch(new URL(`${SITE_URL}/fonts/Inter-Bold.ttf`)).then((res) => res.arrayBuffer()),
    ]);

    // Page-specific configurations
    const pageConfig: Record<string, { subtitle: string; gradient: string }> = {
      home: {
        subtitle: 'Faith-Aligned Life & Success Coach',
        gradient: 'linear-gradient(135deg, #FDE2E4 0%, #FAD2E1 50%, #F9DCC4 100%)',
      },
      about: {
        subtitle: 'Meet Hirah Safi',
        gradient: 'linear-gradient(135deg, #FCD5CE 0%, #FEC89A 50%, #F9DCC4 100%)',
      },
      services: {
        subtitle: 'Coaching & Workshops',
        gradient: 'linear-gradient(135deg, #FDE2E4 0%, #FEC89A 50%, #F9DCC4 100%)',
      },
      events: {
        subtitle: 'Workshops & Events',
        gradient: 'linear-gradient(135deg, #F5EAC8 0%, #EAD7A1 50%, #D4AF37 100%)',
      },
      contact: {
        subtitle: 'Book Your Session',
        gradient: 'linear-gradient(135deg, #FDE2E4 0%, #FAD2E1 50%, #F9DCC4 100%)',
      },
    };

    const config = pageConfig[page] || pageConfig.home;

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: config.gradient,
            padding: '60px',
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D4AF37, #F5EAC8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <span style={{ fontSize: '40px' }}>✨</span>
            </div>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 600,
                color: '#57534E',
                letterSpacing: '-1px',
              }}
            >
              Hirah Safi Coaching
            </span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#2a1f29',
              marginBottom: '20px',
              textAlign: 'center',
              letterSpacing: '-2px',
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '36px',
              fontWeight: 400,
              color: '#57534E',
              textAlign: 'center',
              marginBottom: '60px',
              letterSpacing: '-0.5px',
            }}
          >
            {config.subtitle}
          </p>

          {/* Decorative Line */}
          <div
            style={{
              width: '200px',
              height: '4px',
              background: 'linear-gradient(90deg, #D4AF37, #F5EAC8)',
              borderRadius: '2px',
              marginBottom: '40px',
            }}
          />

          {/* Tagline */}
          <p
            style={{
              fontSize: '28px',
              fontWeight: 400,
              color: '#57534E',
              textAlign: 'center',
              opacity: 0.8,
            }}
          >
            Faith-Aligned Coaching for Muslim Women Entrepreneurs
          </p>

          {/* URL */}
          <p
            style={{
              fontSize: '24px',
              fontWeight: 400,
              color: '#57534E',
              textAlign: 'center',
              marginTop: '20px',
              opacity: 0.6,
            }}
          >
            www.hirahsaficoach.com
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interLight,
            weight: 300,
          },
          {
            name: 'Inter',
            data: interRegular,
            weight: 400,
          },
          {
            name: 'Inter',
            data: interBold,
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate OG image`, {
      status: 500,
    });
  }
}
