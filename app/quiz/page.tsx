'use client';

import { useRouter } from 'next/navigation';
import Quiz from '@/components/Quiz/Quiz';

const QuizPage = () => {
  const router = useRouter();

  return <Quiz onClose={() => router.push('/')} />;
};

export default QuizPage;
