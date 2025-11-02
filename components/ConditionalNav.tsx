'use client';

import { usePathname } from 'next/navigation';
import ClientNav from '@/components/ClientNav';

const ConditionalNav = () => {
  const pathname = usePathname();
  
  // Hide navigation on quiz page
  if (pathname === '/quiz') {
    return null;
  }
  
  return <ClientNav />;
};

export default ConditionalNav;