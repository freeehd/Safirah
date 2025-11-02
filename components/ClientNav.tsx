'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PillNav from '@/components/PillNav';
import logo from '@/public/assets/hf.svg';

// Next static imports are objects; we need the actual URL string:
const logoSrc = (logo as unknown as { src: string }).src;

export default function ClientNav() {
  const pathname = usePathname() ?? '/';

  const items = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Events', href: '/events' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
  <PillNav
  logo={logo}
  items={items}
  activeHref={pathname}
  baseColor="#FDD4E8"          // rail (soft pink)
  pillColor="#F8BaaA"          // pill background
  hoveredPillTextColor="#f8bdda"
  pillTextColor="grey"      // pill text
/>
  );
}
