// "use client";

// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import Link from "next/link";

// // Define spreads for both Tarot and Star Cards
// const spreads = [
//     {
//         id: "single",
//         name: "Single Card Draw",
//         cards: 1,
//         description: "A quick insight or daily guidance to focus your thoughts.",
//     },
//     {
//         id: "duality",
//         name: "Duality Spread",
//         cards: 2,
//         description: "Compare two options or aspects, such as pros and cons.",
//     },
//     {
//         id: "past-present-future",
//         name: "Past-Present-Future",
//         cards: 3,
//         description: "Explore the sequence of events shaping your journey.",
//     },
//     {
//         id: "elemental",
//         name: "Elemental Spread",
//         cards: 4,
//         description: "Each card represents an element or direction for balance.",
//     },
//     {
//         id: "cross-of-truth",
//         name: "Cross of Truth",
//         cards: 5,
//         description: "Gain deeper insight into a situation with nuanced perspectives.",
//     },
//     {
//         id: "relationship",
//         name: "Relationship Spread",
//         cards: 6,
//         description: "Dive into the dynamics of relationships or personal connections.",
//     },
//     {
//         id: "horseshoe",
//         name: "Horseshoe Spread",
//         cards: 7,
//         description: "Examine influences, obstacles, and potential outcomes.",
//     },
//     {
//         id: "celtic-cross",
//         name: "Celtic Cross",
//         cards: 10,
//         description: "A comprehensive view of your life or specific situation.",
//     },
//     {
//         id: "zodiac",
//         name: "Zodiac Spread",
//         cards: 12,
//         description: "Explore all areas of life, with one card per zodiac house.",
//     },
//     {
//         id: "year-ahead",
//         name: "Year Ahead Spread",
//         cards: 13,
//         description: "One card per month plus an overview for the year ahead.",
//     },
// ];

// export default function ReadingChoice() {
//     const router = useRouter();

//     const handleSpreadSelect = (type, spreadId, cardCount) => {
//         const basePath = type === "tarot" ? "/reading" : "/starcards/reading";
//         router.push(`${basePath}?spread=${spreadId}&cards=${cardCount}`);
//     };

//     return (
//         <div className="min-h-screen flex flex-col gradient-background2">
//             {/* Header */}
//             <header className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white py-6">
//                 <div className="container mx-auto px-4">
//                     <h1 className="text-3xl sm:text-4xl font-bold text-center">
//                         Choose Your Reading
//                     </h1>
//                 </div>
//             </header>

//             {/* Main */}
//             <main className="flex-grow">
//                 <section className="container mx-auto px-4 py-12 text-center">
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.8 }}
//                     >
//                         <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-200">
//                             Select a Spread for Your AI-Powered Reading
//                         </h2>
//                         <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
//                             Choose a star card spread that resonates with your question or intent. Each spread offers unique insights tailored to your needs.
//                         </p>

//                         {/* Star Card Reading Section */}
//                         <div className="flex items-center justify-center mb-4">
//                             <motion.span
//                                 animate={{ rotate: [0, 360] }}
//                                 transition={{
//                                     repeat: Infinity,
//                                     duration: 8,
//                                     ease: "linear",
//                                 }}
//                                 className="inline-block text-yellow-300 text-3xl mr-2"
//                             >
//                                 ✨
//                             </motion.span>
//                             <h2 className="text-2xl sm:text-3xl font-bold text-purple-100">
//                                 Star Card Reading
//                             </h2>
//                             <motion.span
//                                 animate={{ rotate: [360, 0] }}
//                                 transition={{
//                                     repeat: Infinity,
//                                     duration: 8,
//                                     ease: "linear",
//                                 }}
//                                 className="inline-block text-yellow-300 text-3xl ml-2"
//                             >
//                                 ✨
//                             </motion.span>
//                         </div>
//                         <p className="text-gray-300 max-w-xl mx-auto mb-6 text-base sm:text-lg">
//                             Tap into cosmic insight using your name, age, and star sign. Select a spread to guide your stellar journey.
//                         </p>

//                         {/* Star Card Spread Grid */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-20">
//                             {spreads.map((spread) => (
//                                 <motion.div
//                                     key={`starcards-${spread.id}`}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{
//                                         duration: 0.5,
//                                         delay: 0.1 * spreads.indexOf(spread),
//                                     }}
//                                     className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-purple-300/30 cursor-pointer hover:bg-white/20 transition-all duration-300"
//                                     onClick={() =>
//                                         handleSpreadSelect("starcards", spread.id, spread.cards)
//                                     }
//                                 >
//                                     <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
//                                         {spread.name}
//                                     </h3>
//                                     <p className="text-sm text-gray-300 mb-2">
//                                         {spread.cards} Card{spread.cards > 1 ? "s" : ""}
//                                     </p>
//                                     <p className="text-sm text-gray-300">{spread.description}</p>
//                                 </motion.div>
//                             ))}
//                         </div>

//                         {/* Back Button */}
//                         <Link href="/">
//                             <button className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
//                                 Back to Home
//                             </button>
//                         </Link>
//                     </motion.div>
//                 </section>
//             </main>

//             {/* Footer */}
//             <footer className="bg-gray-800 text-white py-4">
//                 <div className="container mx-auto px-4 text-center">
//                     <p>© 2025 AI Tarot Insights. Your path illuminated by AI wisdom.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// }




// "use client";

// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { ParticlesDemo } from "../components/ParticlesDemo";

// const spreads = [
//     {
//         id: "single",
//         name: "Single Card Draw",
//         cards: 1,
//         description: "A quick insight or daily guidance to focus your thoughts.",
//     },
//     {
//         id: "duality",
//         name: "Duality Spread",
//         cards: 2,
//         description: "Compare two options or aspects, such as pros and cons.",
//     },
//     {
//         id: "past-present-future",
//         name: "Past-Present-Future",
//         cards: 3,
//         description: "Explore the sequence of events shaping your journey.",
//     },
//     {
//         id: "elemental",
//         name: "Elemental Spread",
//         cards: 4,
//         description: "Each card represents an element or direction for balance.",
//     },
//     {
//         id: "cross-of-truth",
//         name: "Cross of Truth",
//         cards: 5,
//         description: "Gain deeper insight into a situation with nuanced perspectives.",
//     },
//     {
//         id: "relationship",
//         name: "Relationship Spread",
//         cards: 6,
//         description: "Dive into the dynamics of relationships or personal connections.",
//     },
//     {
//         id: "horseshoe",
//         name: "Horseshoe Spread",
//         cards: 7,
//         description: "Examine influences, obstacles, and potential outcomes.",
//     },
//     {
//         id: "celtic-cross",
//         name: "Celtic Cross",
//         cards: 10,
//         description: "A comprehensive view of your life or specific situation.",
//     },
//     {
//         id: "zodiac",
//         name: "Zodiac Spread",
//         cards: 12,
//         description: "Explore all areas of life, with one card per zodiac house.",
//     },
//     {
//         id: "year-ahead",
//         name: "Year Ahead Spread",
//         cards: 13,
//         description: "One card per month plus an overview for the year ahead.",
//     },
// ];

// export default function ReadingChoice() {
//     const router = useRouter();

//     const handleSpreadSelect = (type, spreadId, cardCount) => {
//         const basePath = type === "tarot" ? "/reading" : "/starcards/reading";
//         router.push(`${basePath}?spread=${spreadId}&cards=${cardCount}`);
//     };

//     return (
//         <div className="min-h-screen flex flex-col gradient-background2">
//             {/* Header */}
//             <header className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white py-6">
//                 <div className="container mx-auto px-4">
//                     <h1 className="text-3xl sm:text-4xl font-bold text-center">
//                         Choose Your Reading
//                     </h1>
//                 </div>
//             </header>
//             {/* Main */}
//             <main className="flex-grow">
//                 <ParticlesDemo />
//                 <section className="container mx-auto px-4 py-12 text-center">
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.8 }}
//                     >
//                         <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-200">
//                             Select a Spread for Your AI-Powered Reading
//                         </h2>
//                         <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
//                             Choose a star card spread that resonates with your question or intent. Each spread offers unique insights tailored to your needs.
//                         </p>
//                         {/* Star Card Reading Section */}
//                         <div className="flex items-center justify-center mb-4">
//                             <motion.span
//                                 animate={{ rotate: [0, 360] }}
//                                 transition={{
//                                     repeat: Infinity,
//                                     duration: 8,
//                                     ease: "linear",
//                                 }}
//                                 className="inline-block text-yellow-300 text-3xl mr-2"
//                             >
//                                 ✨
//                             </motion.span>
//                             <h2 className="text-2xl sm:text-3xl font-bold text-purple-100">
//                                 Star Card Reading
//                             </h2>
//                             <motion.span
//                                 animate={{ rotate: [360, 0] }}
//                                 transition={{
//                                     repeat: Infinity,
//                                     duration: 8,
//                                     ease: "linear",
//                                 }}
//                                 className="inline-block text-yellow-300 text-3xl ml-2"
//                             >
//                                 ✨
//                             </motion.span>
//                         </div>
//                         <p className="text-gray-300 max-w-xl mx-auto mb-6 text-base sm:text-lg">
//                             Tap into cosmic insight using your name, birth date, and star sign. Select a spread to guide your stellar journey.
//                         </p>
//                         {/* Star Card Spread Grid */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-20">
//                             {spreads.map((spread) => (
//                                 <motion.div
//                                     key={`starcards-${spread.id}`}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{
//                                         duration: 0.5,
//                                         delay: 0.1 * spreads.indexOf(spread),
//                                     }}
//                                     className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-purple-300/30 cursor-pointer hover:bg-white/20 transition-all duration-300"
//                                     onClick={() =>
//                                         handleSpreadSelect("starcards", spread.id, spread.cards)
//                                     }
//                                 >
//                                     <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
//                                         {spread.name}
//                                     </h3>
//                                     <p className="text-sm text-gray-300 mb-2">
//                                         {spread.cards} Card{spread.cards > 1 ? "s" : ""}
//                                     </p>
//                                     <p className="text-sm text-gray-300">{spread.description}</p>
//                                 </motion.div>
//                             ))}
//                         </div>
//                         {/* Star Cards Description */}
//                         <div className="max-w-4xl mx-auto mb-20">
//                             <h2 className="text-2xl sm:text-3xl font-bold text-purple-100 mb-6">
//                                 Understanding Star Cards
//                             </h2>
//                             <p className="text-base sm:text-lg text-gray-300 mb-4">
//                                 The Star Cards deck is a unique, AI-powered divination system comprising 100 cards across 10 distinct themes, or "families," each offering profound insights into different aspects of your life. Unlike traditional tarot, Star Cards integrate your name's numerology, birth date, and zodiac sign to create a deeply personalized reading, a pioneering approach that blends cosmic wisdom with modern technology.
//                             </p>
//                             <h3 className="text-xl font-semibold text-white mb-4">The Ten Families</h3>
//                             <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
//                                 <li><strong>Destiny:</strong> Guides your life's purpose, pivotal choices, and soul contracts (e.g., Cycle of Fire, Starseed Contract).</li>
//                                 <li><strong>Emotion:</strong> Reflects your emotional landscape, from hidden joys to deep connections (e.g., Heart Wide Open, Sacred Bond).</li>
//                                 <li><strong>Mind:</strong> Illuminates mental clarity, intuition, and thought patterns (e.g., Crystalline Clarity, Third Eye Spark).</li>
//                                 <li><strong>Body:</strong> Focuses on physical health, energy, and grounding (e.g., Vital Pulse, Healing Waters).</li>
//                                 <li><strong>Shadow:</strong> Explores hidden fears, inner blocks, and unresolved wounds (e.g., Inner Saboteur, The Wound).</li>
//                                 <li><strong>Light:</strong> Highlights your strengths, creativity, and inner wisdom (e.g., Radiant Soul, Inner Guide).</li>
//                                 <li><strong>Past Life:</strong> Uncovers karmic lessons and soul memories (e.g., Unfinished Thread, Karmic Debt).</li>
//                                 <li><strong>Cosmos:</strong> Connects to celestial energies and planetary influences (e.g., Moonlight Mirror, Solar Gate).</li>
//                                 <li><strong>Relationships:</strong> Examines connections with others, from soulmates to family ties (e.g., Soulmate Link, Family Flame).</li>
//                                 <li><strong>Transition:</strong> Represents transformation, new beginnings, and life shifts (e.g., Phoenix Rise, New Dawn).</li>
//                             </ul>
//                             <h3 className="text-xl font-semibold text-white mb-4">How Star Cards Work</h3>
//                             <p className="text-base sm:text-lg text-gray-300 mb-4">
//                                 Each reading begins by calculating your numerology number from your name, which influences card selection and interpretation, emphasizing themes that resonate with your core essence. Your birth date determines your age and zodiac sign, aligning the cards with your life stage and astrological energies. The AI selects cards weighted by these factors, ensuring a tailored experience. For example, an Aries might draw more "Mind" or "Destiny" cards, reflecting their bold, action-oriented nature.
//                             </p>
//                             <h3 className="text-xl font-semibold text-white mb-4">Why Star Cards Are Unique</h3>
//                             <p className="text-base sm:text-lg text-gray-300 mb-4">
//                                 For the first time, Star Cards combine numerology, astrology, and AI-driven insights to create a reading that’s uniquely yours. This innovative approach weaves your personal data into each card’s meaning, offering guidance that feels both cosmic and deeply personal. The final advice synthesizes your numerology, zodiac traits, and card meanings into a cohesive narrative, guiding you toward clarity and transformation.
//                             </p>
//                         </div>
//                         {/* Back Button */}
//                         <Link href="/">
//                             <button className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
//                                 Back to Home
//                             </button>
//                         </Link>
//                     </motion.div>
//                 </section>
//             </main>
//             {/* Footer */}
//             <footer className="bg-gray-800 text-white py-4">
//                 <div className="container mx-auto px-4 text-center">
//                     <p>© 2025 AI Tarot Insights. Your path illuminated by AI wisdom.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// }



"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ParticlesDemo } from "../components/ParticlesDemo";
import FeatureMotionWrapper from "../components/FramerMotion/FeatureMotionWrapperMap";
import MotionWrapperDelay from "../components/FramerMotion/MotionWrapperDelay";

const spreads = [
    {
        id: "single",
        name: "Single Card Draw",
        cards: 1,
        description: "A quick insight or daily guidance to focus your thoughts.",
    },
    {
        id: "duality",
        name: "Duality Spread",
        cards: 2,
        description: "Compare two options or aspects, such as pros and cons.",
    },
    {
        id: "past-present-future",
        name: "Past-Present-Future",
        cards: 3,
        description: "Explore the sequence of events shaping your journey.",
    },
    {
        id: "elemental",
        name: "Elemental Spread",
        cards: 4,
        description: "Each card represents an element or direction for balance.",
    },
    {
        id: "cross-of-truth",
        name: "Cross of Truth",
        cards: 5,
        description: "Gain deeper insight into a situation with nuanced perspectives.",
    },
    {
        id: "relationship",
        name: "Relationship Spread",
        cards: 6,
        description: "Dive into the dynamics of relationships or personal connections.",
    },
    {
        id: "horseshoe",
        name: "Horseshoe Spread",
        cards: 7,
        description: "Examine influences, obstacles, and potential outcomes.",
    },
    {
        id: "celtic-cross",
        name: "Celtic Cross",
        cards: 10,
        description: "A comprehensive view of your life or specific situation.",
    },
    {
        id: "zodiac",
        name: "Zodiac Spread",
        cards: 12,
        description: "Explore all areas of life, with one card per zodiac house.",
    },
    {
        id: "year-ahead",
        name: "Year Ahead Spread",
        cards: 13,
        description: "One card per month plus an overview for the year ahead.",
    },
];

export default function ReadingChoice() {
    const router = useRouter();

    const handleSpreadSelect = (type, spreadId, cardCount) => {
        const basePath = type === "tarot" ? "/reading" : "/starcards/reading";
        router.push(`${basePath}?spread=${spreadId}&cards=${cardCount}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black">
            {/* Header */}
            <header className="bg-gradient-to-r from-purple-700 via-indigo-600 to-black text-white py-6 shadow-lg">
                <div className="container mx-auto px-4">
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        variants={{
                            hidden: { opacity: 0, y: 100 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >        <h1 className="text-3xl sm:text-4xl font-extrabold text-center tracking-tight">
                            Choose Your Cosmic Reading
                        </h1>  </MotionWrapperDelay>

                </div>
            </header>
            {/* Main */}
            <main className="flex-grow relative">
                <ParticlesDemo />
                <section className="container mx-auto px-4 py-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        <MotionWrapperDelay
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            variants={{
                                hidden: { opacity: 0, x: 100 },
                                visible: { opacity: 1, x: 0 },
                            }}
                        >    <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-purple-100 drop-shadow-md">
                                Select a Spread for Your AI-Powered Journey
                            </h2> </MotionWrapperDelay>
                        <MotionWrapperDelay
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.7, delay: 0.7 }}
                            variants={{
                                hidden: { opacity: 0, x: -100 },
                                visible: { opacity: 1, x: 0 },
                            }}
                        >     <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Choose a star card spread that resonates with your question or intent. Each spread offers unique insights tailored to your cosmic path.
                            </p></MotionWrapperDelay>

                        {/* Star Card Reading Section */}
                        <div className="flex items-center justify-center mb-4">
                            <motion.span
                                animate={{ rotate: [0, 360] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 8,
                                    ease: "linear",
                                }}
                                className="inline-block text-yellow-300 text-3xl mr-2"
                            >
                                ✨
                            </motion.span>
                            <MotionWrapperDelay
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.7, delay: 0.7 }}
                                variants={{
                                    hidden: { opacity: 0, y: -100 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >    <h2 className="text-2xl sm:text-3xl font-bold text-purple-100 drop-shadow-lg">
                                    Star Card Reading
                                </h2> </MotionWrapperDelay>

                            <motion.span
                                animate={{ rotate: [360, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 8,
                                    ease: "linear",
                                }}
                                className="inline-block text-yellow-300 text-3xl ml-2"
                            >
                                ✨
                            </motion.span>
                        </div>
                        <p className="text-gray-300 max-w-xl mx-auto mb-6 text-base sm:text-lg leading-relaxed">
                            Tap into cosmic insight using your name, birth date, and star sign. Select a spread to guide your stellar journey.
                        </p>
                        {/* Star Card Spread Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-20">
                            {spreads.map((spread) => (
                                <motion.div
                                    key={`starcards-${spread.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.1 * spreads.indexOf(spread),
                                    }}
                                    className="relative bg-gradient-to-br from-purple-900/30 via-indigo-900/30 to-black/30 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-purple-400/50 cursor-pointer overflow-hidden group shadow-lg hover:shadow-purple-500/50 transition-all duration-500"
                                    onClick={() =>
                                        handleSpreadSelect("starcards", spread.id, spread.cards)
                                    }
                                >
                                    {/* Hover Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-indigo-600/0 to-black/0 group-hover:from-purple-600/50 group-hover:via-indigo-600/50 group-hover:to-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white tracking-wide drop-shadow-sm">
                                        {spread.name}
                                    </h3>
                                    <p className="text-sm text-gray-200 mb-2 font-medium">
                                        {spread.cards} Card{spread.cards > 1 ? "s" : ""}
                                    </p>
                                    <p className="text-sm text-gray-300 leading-tight">
                                        {spread.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                        {/* Star Cards Description */}
                        <div className="max-w-4xl mx-auto mb-20 relative bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-black/20 backdrop-blur-lg rounded-xl p-6 sm:p-8 border border-purple-400/40 shadow-lg hover:shadow-purple-500/40 transition-all duration-500">
                            <h2 className="text-2xl sm:text-3xl font-bold text-purple-100 mb-6 drop-shadow-md tracking-tight">
                                Understanding Star Cards
                            </h2>
                            <p className="text-base sm:text-lg text-gray-200 mb-6 leading-relaxed font-light">
                                The Star Cards deck is a unique, AI-powered divination system comprising 100 cards across 10 distinct themes, or "families," each offering profound insights into different aspects of your life. Unlike traditional tarot, Star Cards integrate your name's numerology, birth date, and zodiac sign to create a deeply personalized reading, a pioneering approach that blends cosmic wisdom with modern technology.
                            </p>
                            <h3 className="text-xl font-semibold text-white mb-4 tracking-wide">The Ten Families</h3>
                            <ul className="list-none text-gray-200 space-y-3 mb-6">
                                {[
                                    { name: "Destiny", desc: "Guides your life's purpose, pivotal choices, and soul contracts (e.g., Cycle of Fire, Starseed Contract)." },
                                    { name: "Emotion", desc: "Reflects your emotional landscape, from hidden joys to deep connections (e.g., Heart Wide Open, Sacred Bond)." },
                                    { name: "Mind", desc: "Illuminates mental clarity, intuition, and thought patterns (e.g., Crystalline Clarity, Third Eye Spark)." },
                                    { name: "Body", desc: "Focuses on physical health, energy, and grounding (e.g., Vital Pulse, Healing Waters)." },
                                    { name: "Shadow", desc: "Explores hidden fears, inner blocks, and unresolved wounds (e.g., Inner Saboteur, The Wound)." },
                                    { name: "Light", desc: "Highlights your strengths, creativity, and inner wisdom (e.g., Radiant Soul, Inner Guide)." },
                                    { name: "Past Life", desc: "Uncovers karmic lessons and soul memories (e.g., Unfinished Thread, Karmic Debt)." },
                                    { name: "Cosmos", desc: "Connects to celestial energies and planetary influences (e.g., Moonlight Mirror, Solar Gate)." },
                                    { name: "Relationships", desc: "Examines connections with others, from soulmates to family ties (e.g., Soulmate Link, Family Flame)." },
                                    { name: "Transition", desc: "Represents transformation, new beginnings, and life shifts (e.g., Phoenix Rise, New Dawn)." },
                                ].map((family, index) => (
                                    <FeatureMotionWrapper index={index} key={index}>

                                        <motion.li
                                            key={family.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.1 * index }}
                                            className="relative pl-6 text-base sm:text-lg group"
                                        >
                                            <span className="absolute left-0 top-1.5 text-purple-400 group-hover:text-purple-300 transition-colors duration-300">✨</span>
                                            <span className="font-semibold text-white">{family.name}:</span> {family.desc}
                                        </motion.li>
                                    </FeatureMotionWrapper>

                                ))}
                            </ul>
                            <h3 className="text-xl font-semibold text-white mb-4 tracking-wide">How Star Cards Work</h3>
                            <p className="text-base sm:text-lg text-gray-200 mb-6 leading-relaxed font-light">
                                Each reading begins by calculating your numerology number from your name, which influences card selection and interpretation, emphasizing themes that resonate with your core essence. Your birth date determines your age and zodiac sign, aligning the cards with your life stage and astrological energies. The AI selects cards weighted by these factors, ensuring a tailored experience. For example, an Aries might draw more "Mind" or "Destiny" cards, reflecting their bold, action-oriented nature.
                            </p>
                            <h3 className="text-xl font-semibold text-white mb-4 tracking-wide">Why Star Cards Are Unique</h3>
                            <p className="text-base sm:text-lg text-gray-200 mb-6 leading-relaxed font-light">
                                For the first time, Star Cards combine numerology, astrology, and AI-driven insights to create a reading that’s uniquely yours. This innovative approach weaves your personal data into each card’s meaning, offering guidance that feels both cosmic and deeply personal. The final advice synthesizes your numerology, zodiac traits, and card meanings into a cohesive narrative, guiding you toward clarity and transformation.
                            </p>
                        </div>
                        {/* Back Button */}
                        {/* <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 sm:px-10 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
                            >
                                Back to Home
                            </motion.button>
                        </Link> */}
                    </motion.div>
                </section>
            </main>
            {/* Footer */}
            <footer className="bg-gradient-to-t from-purple-900/50 to-black text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-200 text-sm sm:text-base">© 2025 AI Tarot Insights. Your path illuminated by AI wisdom.</p>
                </div>
            </footer>
        </div>
    );
}