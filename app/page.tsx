'use client';

import { useRouter } from 'next/navigation';
import Hero from '@/components/Hero';
import ShiftToSuccess from '@/components/ShiftToSuccess';
import Benefits from '@/components/Benefits';
import Footer from '@/components/Footer';
import QuizCTA from '@/components/QuizCTA';
import Services from '@/components/Services';

const HomePage = () => {
  const router = useRouter();
 

  return (
    <div className="page-wrapper">
     
  
      <Hero />
      <Services />
         <QuizCTA onStartQuiz={() => router.push('/quiz')} />
            <Benefits />
      <ShiftToSuccess />
   
    
      <Footer />
    </div>
  );
};

export default HomePage;
