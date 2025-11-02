import React, { useState, useEffect } from 'react';
import FlowerBloom from '../../components/FlowerBloom';

// Animation data embedded directly
const animationData = [
    {"v":"5.5.7","fr":30,"ip":0,"op":90,"w":400,"h":400,"nm":"Flower 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Petals","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[200,200,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0,0,100]},{"t":30,"s":[100,100,100]}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,-27.614],[27.614,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,27.614],[0,0],[0,0],[-27.614,0],[0,0],[0,0]],"v":[[-50,50],[50,50],[50,-50],[0,-100],[-50,-50],[-50,50],[-50,50],[50,50]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[1,0.71,0.655,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group"}],"ip":0,"op":90,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Stem","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[200,200,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0,0,100]},{"t":20,"s":[100,100,100]}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[10,150],"ix":2},"p":{"a":0,"k":[0,75],"ix":3},"r":{"a":0,"k":0,"ix":4},"nm":"Rectangle Path 1","mn":"ADBE Vector Shape - Rect"},{"ty":"fl","c":{"a":0,"k":[0.427,0.624,0.443,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"}],"nm":"Stem","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group"}],"ip":0,"op":90,"st":0,"bm":0}] },
    {"v":"5.5.7","fr":60,"ip":0,"op":120,"w":400,"h":400,"nm":"Flower 2","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Layer","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[200,380,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"sh","ks":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[{"i":[[0,0]],"o":[[0,0]],"v":[[0,0]],"c":false}]},{"t":45,"s":[{"i":[[-27.614,0],[0,44.183],[27.614,0]],"o":[[27.614,0],[0,-44.183],[-27.614,0]],"v":[[0,-50],[-50,0],[0,50]],"c":true}]}]}},{"ty":"sh","ks":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[{"i":[[0,0]],"o":[[0,0]],"v":[[0,0]],"c":false}]},{"t":45,"s":[{"i":[[0,-27.614],[44.183,0],[0,27.614]],"o":[[0,27.614],[-44.183,0],[0,-27.614]],"v":[[50,0],[0,50],[-50,0]],"c":true}]}]}},{"ty":"tr","p":{"a":0,"k":[0,-100]},"s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":15,"s":[0,0]},{"t":60,"s":[100,100]}]}},{"ty":"fl","c":{"a":0,"k":[1,0.835,0.486,1]}}],"nm":"Petal"},{"ty":"gr","it":[{"ty":"el","p":{"a":0,"k":[0,0]},"s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":30,"s":[0,0]},{"t":75,"s":[60,60]}]}},{"ty":"fl","c":{"a":0,"k":[0.941,0.596,0.333,1]}}],"nm":"Center"},{"ty":"tr","p":{"a":0,"k":[0,-200]}},{"ty":"gr","it":[{"ty":"sh","ks":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[{"i":[[0,-2.761]],"o":[[0,2.761]],"v":[[0,-5],[0,5]],"c":false}]},{"t":30,"s":[{"i":[[0,-82.843]],"o":[[0,82.843]],"v":[[0,-150],[0,150]],"c":false}]}]}},{"ty":"st","c":{"a":0,"k":[0.329,0.58,0.329,1]},"w":{"a":0,"k":10}}],"nm":"Stem"}],"ip":0,"op":120,"st":0,"bm":0}]},
    {"v":"5.5.9","fr":30,"ip":0,"op":120,"w":512,"h":512,"nm":"Flower 3","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Stem","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[256,512,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[1,1,1],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"sh","ks":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":0,"s":[{"i":[[0,0]],"o":[[0,0]],"v":[[0,0]],"c":false}]},{"t":45,"s":[{"i":[[0,-110.457]],"o":[[0,110.457]],"v":[[0,-200],[0,200]],"c":false}]}]},"nm":"Path 1"},{"ty":"st","c":{"a":0,"k":[0.4,0.8,0.4,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":15,"ix":5},"lc":2,"lj":2,"ml":4,"nm":"Stroke 1"}],"nm":"Stem Group"}],"ip":0,"op":120,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Petal 1","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":30,"s":[-120]},{"t":90,"s":[0]}]},"p":{"a":0,"k":[0,-200,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":30,"s":[0,0,1]},{"t":90,"s":[1,1,1]}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"el","p":{"a":0,"k":[0,-50,0]},"s":{"a":0,"k":[80,120]}},{"ty":"fl","c":{"a":0,"k":[0.9,0.5,0.7,1]}}]}],"ip":0,"op":120,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"Petal 2","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":30,"s":[120]},{"t":90,"s":[0]}]},"p":{"a":0,"k":[0,-200,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":30,"s":[0,0,1]},{"t":90,"s":[1,1,1]}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"el","p":{"a":0,"k":[0,-50,0]},"s":{"a":0,"k":[80,120]}},{"ty":"fl","c":{"a":0,"k":[0.9,0.5,0.7,1]}}]}],"ip":0,"op":120,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"Center","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0},"p":{"a":0,"k":[0,-200,0]},"a":{"a":0,"k":[0,0,0]},"s":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":60,"s":[0,0,1]},{"t":120,"s":[1,1,1]}]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"el","p":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[60,60]}},{"ty":"fl","c":{"a":0,"k":[1,0.8,0.2,1]}}]}],"ip":0,"op":120,"st":0,"bm":0}]},
    {"v":"5.6.10","fr":60,"ip":0,"op":150,"w":512,"h":512,"nm":"Vine flower","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Path 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[256,256,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"sh","ks":{"a":0,"k":{"i":[[0,0],[-13.807,-33.137],[0,0],[38.66,16.568]],"o":[[13.807,33.137],[0,0],[-38.66,-16.568],[0,0]],"v":[[-150,150],[0,50],[150,150],[0,-150]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[0.360784313725,0.721568627451,0.360784313725,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":10,"ix":5},"lc":2,"lj":2,"ml":4,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[0,50],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":6},"r":{"a":0,"k":0,"ix":10},"o":{"a":0,"k":100,"ix":11},"sk":{"a":0,"k":0,"ix":12},"sa":{"a":0,"k":0,"ix":13},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ty":"el","d":1,"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":60,"s":[0,0]},{"t":105,"s":[50,50]}],"ix":2},"p":{"a":0,"k":[0,-150],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"fl","c":{"a":0,"k":[0.933333333333,0.486274509804,0.654901960784,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":6},"r":{"a":0,"k":0,"ix":10},"o":{"a":0,"k":100,"ix":11},"sk":{"a":0,"k":0,"ix":12},"sa":{"a":0,"k":0,"ix":13},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":0,"s":0},{"t":60,"s":100}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim"}],"ip":0,"op":150,"st":0,"bm":0}]}
];

const availableAnimations = [animationData[0], animationData[1], animationData[2], animationData[3]];

interface QuizProps {
    onClose: () => void;
}

type OptionKey = 'A' | 'B' | 'C' | 'D';

const quizData: { question: string; answers: { text: string; type: OptionKey }[] }[] = [
    {
        question: "When you face a major business challenge, what's your first instinct?",
        answers: [
            { text: "Insha’Allah, I’ll achieve this with effort and Allah’s help.", type: 'A' },
            { text: "I hope this works, but what if I fail like before?", type: 'B' },
            { text: "It’s probably too big for me, but I’ll try anyway.", type: 'C' },
            { text: "I don’t even know where to start; it feels overwhelming.", type: 'D' },
        ],
    },
    {
        question: "How do you typically react to unexpected challenges or setbacks in a major business project?",
        answers: [
            { text: "I see them as a calculated risk or an opportunity to learn and grow.", type: 'A' },
            { text: "I get severely discouraged and wonder if the universe/God is telling me to give up.", type: 'B' },
            { text: "I blame external market circumstances or my own poor planning.", type: 'C' },
            { text: "I feel overwhelmed and procrastinate on finding the solution, hoping it resolves itself.", type: 'D' },
        ],
    },
    {
        question: "When a peer or competitor shares news of her major, visible success, what’s your predominant feeling?",
        answers: [
            { text: "Genuinely inspired and motivated — her success shows what’s possible for all of us, Mashallah.", type: 'A' },
            { text: "A little jealous or wondering why it’s not happening for me yet.", type: 'B' },
            { text: "Happy for them, but secretly feel I could never sustain that level of visibility.", type: 'C' },
            { text: "Indifferent — I’m too busy putting out my own daily fires.", type: 'D' },
        ],
    },
    {
        question: "How often do you make time for personal reflection, gratitude (Shukr), or spiritual connection?",
        answers: [
            { text: "Daily — a non-negotiable part of my success strategy and mental health.", type: 'A' },
            { text: "A few times a week when I remember or have spare time.", type: 'B' },
            { text: "Rarely — I’m too busy with business or family responsibilities.", type: 'C' },
            { text: "Only when I hit burnout and desperately need to recover.", type: 'D' },
        ],
    },
    {
        question: "What’s your biggest internal barrier to putting yourself and your services out there?",
        answers: [
            { text: "Fear of not being qualified enough / Imposter Syndrome.", type: 'A' },
            { text: "Procrastination and difficulty getting the logistics started perfectly.", type: 'B' },
            { text: "Worry about what friends, family, or strangers will think of my ambition.", type: 'C' },
            { text: "Fear of financial failure — losing money or wasting time.", type: 'D' },
        ],
    },
    {
        question: "How do you typically talk to yourself when you make a costly mistake?",
        answers: [
            { text: "Alright, that was expensive. What can I learn for next time?", type: 'A' },
            { text: "Ugh, I knew I’d mess that up. Why am I like this?", type: 'B' },
            { text: "It’s fine — everyone makes mistakes, but I really need to do better.", type: 'C' },
            { text: "I feel intense shame and avoid processing it.", type: 'D' },
        ],
    },
    {
        question: "When you think about raising your prices to match your current value and skill, how do you feel?",
        answers: [
            { text: "Confident and strategic — it’s necessary for growth and reflects my transformation.", type: 'A' },
            { text: "Guilty or nervous — clients might leave or think I’m greedy.", type: 'B' },
            { text: "Paralysed — I overthink the perfect number and do nothing.", type: 'C' },
            { text: "Determined, but only after another course/certification.", type: 'D' },
        ],
    },
    {
        question: "What does ‘abundance’ truly mean to you right now?",
        answers: [
            { text: "More than enough in wealth, health, time, peace, and blessings from Allah.", type: 'A' },
            { text: "Mainly financial security and material comfort.", type: 'B' },
            { text: "Being content with what I have, even if it’s not much.", type: 'C' },
            { text: "Something others have; hard to imagine for myself.", type: 'D' },
        ],
    },
    {
        question: "When you advocate for yourself or your team, how often do you feel heard and respected?",
        answers: [
            { text: "Always — I’ve cultivated a professional presence that commands respect.", type: 'A' },
            { text: "Usually, but I often over-explain or justify decisions.", type: 'B' },
            { text: "Rarely — I feel I must be overly tough to be taken seriously.", type: 'C' },
            { text: "I avoid confrontations/negotiations to keep the peace.", type: 'D' },
        ],
    },
    {
        question: "When considering future growth of your business, which statement is most true?",
        answers: [
            { text: "I have a 3–5 year plan, but I’m adaptable and trust my intuition to pivot.", type: 'A' },
            { text: "I hesitate to commit to long-term plans — fear of getting it ‘wrong’.", type: 'B' },
            { text: "I fear scaling — losing control and burning out.", type: 'C' },
            { text: "I only plan month-to-month focused on immediate income.", type: 'D' },
        ],
    },
    {
        question: "How do you view taking time off when business is demanding?",
        answers: [
            { text: "Mandatory for long-term success, creativity, and avoiding burnout.", type: 'A' },
            { text: "I feel guilty, but take it — while checking emails.", type: 'B' },
            { text: "I don’t — the business depends on me.", type: 'C' },
            { text: "I take time off, then crash for days.", type: 'D' },
        ],
    },
    {
        question: "How do you handle the energy demands of balancing business with personal life?",
        answers: [
            { text: "I have clear systems and healthy boundaries protecting my energy in both.", type: 'A' },
            { text: "I feel torn and worry I’m disappointing someone.", type: 'B' },
            { text: "I prioritise business for the family’s sake but feel exhausted.", type: 'C' },
            { text: "My personal life suffers because I feel the need to be ‘on’ 24/7.", type: 'D' },
        ],
    },
];

// Results mapping by dominant option
const resultsData: Record<OptionKey, { title: string; description: string; nextStep: string }> = {
    A: {
        title: 'The "Faith-Fueled Visionary" Blueprint',
        description:
            'Mashallah! Your mindset is firmly rooted in Tawakkul (reliance on Allah) and a deep understanding of abundance as a holistic blessing. You view challenges as opportunities, embrace growth, and consistently nurture your spiritual well-being. You\'re already manifesting a powerful abundance mindset!',
        nextStep:
            'You\'re on a magnificent path! To elevate your success even further and fully unleash your potential, we\'ve created a special resource just for Visionaries like you.'
    },
    B: {
        title: 'The "Emerging Empress" Blueprint',
        description:
            'You have a strong desire for abundance and often feel inspired, but sometimes self-doubt or the fear of failure creeps in, dimming your light. You\'re open to growth and learning, but need practical tools to consistently align your actions with your aspirations and overcome those internal barriers.',
        nextStep:
            'You\'re on the cusp of something incredible! To truly step into your power and turn your desires into reality, you need a clear roadmap.'
    },
    C: {
        title: 'The "Resilient Riser" Blueprint',
        description:
            'You are incredibly strong and resilient, especially when facing life\'s inevitable tests. However, you might find yourself feeling overwhelmed or prone to self-blame when things don\'t go as planned. Your focus on daily responsibilities might sometimes overshadow the importance of consistent spiritual and mental nourishment.',
        nextStep:
            'Your resilience is a superpower! Now, let\'s channel that strength into proactive growth and consistent inner peace.'
    },
    D: {
        title: 'The "Seeking Serenity" Blueprint',
        description:
            'You\'re on a journey to find more peace and abundance in your life, but currently, you might be feeling stuck, overwhelmed, or unsure how to begin. Limiting beliefs or external pressures might be holding you back from fully embracing your potential and Allah\'s vast blessings.',
        nextStep:
            'Every great journey begins with a single step. You\'re in the right place to begin transforming your mindset and opening doors to new possibilities.'
    }
};

interface AnimationState {
    animationData: any;
    style: React.CSSProperties;
}


const Quiz: React.FC<QuizProps> = ({ onClose }) => {
    const [isActive, setIsActive] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isIntroLeaving, setIsIntroLeaving] = useState(false);
    const [questionEntered, setQuestionEntered] = useState(false);
    const [questionLeaving, setQuestionLeaving] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [progressPulse, setProgressPulse] = useState(false);
    const TRANSITION_MS = 360;
    const [startBloomTrigger, setStartBloomTrigger] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<OptionKey[]>([]);
    const [optionCounts, setOptionCounts] = useState<Record<OptionKey, number>>({ A: 0, B: 0, C: 0, D: 0 });
    const [isComplete, setIsComplete] = useState(false);
    const [showCapture, setShowCapture] = useState(false);
    const [leadName, setLeadName] = useState('');
    const [leadEmail, setLeadEmail] = useState('');
    const [result, setResult] = useState<OptionKey | null>(null);
    const [animations, setAnimations] = useState<AnimationState[]>([]);
    const [resultsEntered, setResultsEntered] = useState(false);

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setOptionCounts({ A: 0, B: 0, C: 0, D: 0 });
        setIsComplete(false);
        setResult(null);
        setAnimations([]);
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsActive(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const handleAnswerClick = (answerType: OptionKey, idx: number) => {
        // Micro-feedback: mark clicked briefly
        setSelectedIndex(idx);
        setTimeout(() => setSelectedIndex(null), 240);

        const newAnswers = [...userAnswers, answerType];
        setUserAnswers(newAnswers);
        setOptionCounts(prev => ({ ...prev, [answerType]: prev[answerType] + 1 }));

        // Removed distracting answer bloom animations for a cleaner experience

        const nextQuestionIndex = currentQuestionIndex + 1;

        // Animate out current question, then switch
        setQuestionLeaving(true);
        setQuestionEntered(false);
        setTimeout(() => {
            if (nextQuestionIndex < quizData.length) {
                setCurrentQuestionIndex(nextQuestionIndex);
                setQuestionLeaving(false);
                // Allow CSS to apply, then animate in
                requestAnimationFrame(() => setQuestionEntered(true));
                // Trigger a small progress pulse
                setProgressPulse(true);
                setTimeout(() => setProgressPulse(false), 520);
            } else {
                const counts = newAnswers.reduce((acc, type) => {
                    acc[type] = (acc[type] || 0) + 1;
                    return acc;
                }, { A: 0, B: 0, C: 0, D: 0 } as Record<OptionKey, number>);
                const finalResult = (Object.keys(counts) as OptionKey[]).reduce((a, b) => counts[a] >= counts[b] ? a : b);
                setResult(finalResult);
                setShowCapture(true);
            }
        }, TRANSITION_MS);
    };
    
    const handleClose = () => {
        setIsActive(false);
        setTimeout(onClose, 500);
    }
    
    const totalSteps = Math.max(quizData.length - 1, 1);
    const progress = hasStarted ? Math.max(0, Math.min(100, (currentQuestionIndex / totalSteps) * 100)) : 0;

    useEffect(() => {
        // Kick a subtle bloom on mount for the start screen
        setStartBloomTrigger((v) => v + 1);
    }, []);

    useEffect(() => {
        if (hasStarted) {
            // Allow CSS enter animation for the first question
            const t = setTimeout(() => setQuestionEntered(true), 30);
            return () => clearTimeout(t);
        } else {
            setQuestionEntered(false);
        }
    }, [hasStarted]);

    const [submitting, setSubmitting] = useState(false);

    const captureLead = async () => {
        try {
            const payload = {
                name: leadName,
                email: leadEmail,
                result,
                answers: userAnswers,
                counts: optionCounts,
                ts: new Date().toISOString()
            };
            if (typeof window !== 'undefined' && window.localStorage) {
                window.localStorage.setItem('safirah_quiz_lead', JSON.stringify(payload));
            }
            // Best-effort server submit to Systeme.io via API route
            setSubmitting(true);
            try {
                await fetch('/api/lead', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: leadName,
                        email: leadEmail,
                        debug: (process.env.NEXT_PUBLIC_LEAD_DEBUG === '1'),
                        meta: {
                            entry_point: 'quiz',
                            result,
                            answers: userAnswers,
                            counts: optionCounts,
                        },
                    }),
                });
            } catch (err) {
                // ignore; local capture already stored
                console.error('Lead submit failed', err);
            } finally {
                setSubmitting(false);
            }
        } catch {}
    };

    return (
        <div className={`quiz-container ${isActive ? 'active' : ''} ${hasStarted ? 'phase-quiz' : 'phase-intro'}`}>
            <button onClick={handleClose} className="close-quiz-button" aria-label="Close quiz">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            {(hasStarted && !isComplete) && (
                <div className="progress-fixed" style={{ ['--progress' as any]: `${progress}%` }}>
                    <div className="progress-bar-container">
                        <div className={`progress-bar${progressPulse ? ' pulse' : ''}`}></div>
                        <div className="progress-dots dots-base">
                            {Array.from({ length: quizData.length }).map((_, i) => {
                                const pct = (quizData.length > 1 ? (i / (quizData.length - 1)) : 0) * 100;
                                return (<span key={i} className="dot" style={{ left: `${pct}%` }} />);
                            })}
                        </div>
                        <div className="progress-dots dots-fill">
                            {Array.from({ length: quizData.length }).map((_, i) => {
                                const pct = (quizData.length > 1 ? (i / (quizData.length - 1)) : 0) * 100;
                                return (<span key={`f-${i}`} className="dot" style={{ left: `${pct}%` }} />);
                            })}
                        </div>
                    </div>
                </div>
            )}
            
            {!hasStarted ? (
                <div className={`quiz-content intro-screen ${isIntroLeaving ? 'leaving' : ''}`}>
                    <h2 className="quiz-question">Welcome — let’s create space for insight</h2>
                    <p style={{ maxWidth: 600, margin: '0 auto 1.25rem', opacity: 0.9 }}>
                        You’re in a safe, gentle place. This short mindset quiz is here to help you notice what’s already within you, with warmth and zero judgment.
                    </p>
                    <p style={{ maxWidth: 620, margin: '0 auto 2rem' }}>
                        <strong>Instructions:</strong> Read each statement and choose the option that is your most honest, immediate thought. Don’t overthink it!
                    </p>
                    <div className="start-area" onMouseEnter={() => setStartBloomTrigger((v) => v + 1)}>
                        <div className="start-bloom">
                            <FlowerBloom playTrigger={startBloomTrigger} size={260} className="start-bloom-svg" idSuffix="start" showRing={true} glow={true} />
                        </div>
                        <button
                            className="cta-button start-button"
                            onClick={() => { setIsIntroLeaving(true); setTimeout(() => setHasStarted(true), 260); }}
                            onFocus={() => setStartBloomTrigger((v) => v + 1)}
                            onTouchStart={() => setStartBloomTrigger((v) => v + 1)}
                        >
                            Start Quiz
                        </button>
                    </div>
                </div>
            ) : !isComplete && !showCapture ? (
                <div className={`quiz-content quiz-questions ${questionEntered ? 'entered' : ''} ${questionLeaving ? 'leaving' : ''}`}>
                    <h2 className="quiz-question">{quizData[currentQuestionIndex].question}</h2>
                    <div className="quiz-answers">
                        {quizData[currentQuestionIndex].answers.map((answer, index) => (
                            <button 
                                key={index} 
                                className={`answer-button ${selectedIndex === index ? 'clicked' : ''}`}
                                onClick={() => handleAnswerClick(answer.type, index)}
                                disabled={questionLeaving}
                            >
                                {answer.text}
                            </button>
                        ))}
                    </div>
                </div>
            ) : showCapture ? (
                <div className="quiz-content">
                    <h2 className="quiz-question">You’re one step away from your personalized blueprint</h2>
                    <p style={{ maxWidth: 640, margin: '0 auto 1.25rem', opacity: 0.9 }}>
                        Enter your name and email to receive your tailored blueprint in your inbox. We’ll personalize it just for you.
                    </p>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            await captureLead();
                            setIsComplete(true);
                            setShowCapture(false);
                            // allow layout to settle then animate results
                            setTimeout(() => setResultsEntered(true), 30);
                        }}
                        style={{ display: 'grid', gap: '0.8rem', maxWidth: 520, margin: '0 auto' }}
                    >
                        <input
                            type="text"
                            placeholder="Your name"
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            required
                            style={{ padding: '0.9rem 1rem', borderRadius: 10, border: '1px solid rgba(0,0,0,0.15)' }}
                        />
                        <input
                            type="email"
                            placeholder="Your email"
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            required
                            style={{ padding: '0.9rem 1rem', borderRadius: 10, border: '1px solid rgba(0,0,0,0.15)' }}
                        />
                        <button
                            type="submit"
                            className="cta-button"
                            disabled={submitting || !leadName.trim() || !/^\S+@\S+\.\S+$/.test(leadEmail)}
                        >
                            {submitting ? 'Sending…' : 'Send My Blueprint'}
                        </button>
                    </form>
                </div>
            ) : (
                 <div className={`quiz-content quiz-results ${resultsEntered ? 'entered' : ''}`}>
                    {result && (
                        <>
                            <div className="results-bloom">
                                <FlowerBloom playTrigger={resultsEntered ? 1 : 0} size={360} idSuffix="results" glow={true} showRing={true} />
                            </div>
                            <h2 className="results-title">{leadName ? `${leadName}, ` : ''}Your Blueprint: <strong>{resultsData[result].title}</strong></h2>
                            <p style={{ margin: '0 auto 1.25rem', maxWidth: 700 }}>{resultsData[result].description}</p>
                            <p className="results-next" style={{ margin: '0 auto 1.75rem', maxWidth: 700 }}><strong>Your Next Step:</strong> {resultsData[result].nextStep}</p>
                            <div className="results-actions">
                                <button onClick={onClose} className="cta-button results-cta">Go Back Home</button>
                                <a href="/events" className="cta-button results-cta">See Upcoming Events</a>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Removed Lottie answer blooms */}


            
        </div>
    );
};

export default Quiz;
