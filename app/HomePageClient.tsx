'use client';

import { useRouter } from 'next/navigation';
import Hero from '@/components/Hero';
import ShiftToSuccess from '@/components/ShiftToSuccess';
import Benefits from '@/components/Benefits';
import Footer from '@/components/Footer';
import QuizCTA from '@/components/QuizCTA';
import Services from '@/components/Services';
import Script from 'next/script';
import TestimonialSection from '@/components/TestimonialSection';

const HomePageClient = () => {
  const router = useRouter();
 

  return (
    <div className="page-wrapper">
     
  {/* ConvertKit/Kit popup form */}
        <Script
          id="kit-popup-beed771b1c"
          src="https://hirah-safi-coach.kit.com/beed771b1c/index.js"
          strategy="afterInteractive"
          data-uid="beed771b1c"
        />
      <Hero />
      <Services />
         <QuizCTA onStartQuiz={() => router.push('/quiz')} />
            <Benefits />
<TestimonialSection />
      <ShiftToSuccess />
   
    
      <Footer />
    </div>
  );
};

export default HomePageClient;
