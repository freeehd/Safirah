export type OptionKey = 'A' | 'B' | 'C' | 'D';

export const quizData: { question: string; answers: { text: string; type: OptionKey }[] }[] = [
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

export const resultsData: Record<OptionKey, { title: string; description: string; nextStep: string }> = {
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
