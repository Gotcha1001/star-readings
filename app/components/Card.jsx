



// import { motion } from 'framer-motion';
// import ReactCardFlip from 'react-card-flip';

// export function Card({ card, isFlipped, onClick }) {
//     const imagePath = card.image ? `/assets/cards/${card.image}` : '/assets/cards/fallback.jpg';
//     console.log('Card Image Path:', imagePath);

//     return (
//         <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="m-4 flex flex-col items-center"
//         >
//             <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
//                 <div
//                     className="w-48 h-72 bg-yellow-300 rounded-lg cursor-pointer"
//                     onClick={onClick}
//                     style={{
//                         backgroundImage: `url(${imagePath})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                     }}
//                 />
//                 <div
//                     className="w-48 h-72 bg-indigo-700 rounded-lg flex items-center justify-center p-4 cursor-pointer text-center"
//                     onClick={onClick}
//                 >
//                     <p className="text-white font-semibold text-sm">{card.meaning}</p>
//                 </div>
//             </ReactCardFlip>
//             <p className="text-white font-bold text-lg mt-2 text-center">{card.name}</p>
//         </motion.div>
//     );
// }




// import { motion } from 'framer-motion';
// import ReactCardFlip from 'react-card-flip';

// export function Card({ card, isFlipped, onClick }) {
//     // Use the card.image path directly, fallback if undefined
//     const imagePath = card.image ? card.image : '/cards1/fallback.jpg';
//     // Enhanced logging with card details
//     console.log('Card Details:', {
//         id: card.id,
//         name: card.name,
//         originalImage: card.image,
//         resolvedImagePath: imagePath
//     });

//     return (
//         <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="m-4 flex flex-col items-center"
//         >
//             <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
//                 <div
//                     className="w-48 h-72 bg-yellow-300 rounded-lg cursor-pointer"
//                     onClick={onClick}
//                     style={{
//                         backgroundImage: `url(${imagePath})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                     }}
//                 />
//                 <div
//                     className="w-48 h-72 bg-indigo-700 rounded-lg flex items-center justify-center p-4 cursor-pointer text-center"
//                     onClick={onClick}
//                 >
//                     <p className="text-white font-semibold text-sm">{card.meaning}</p>
//                 </div>
//             </ReactCardFlip>
//             <p className="text-white font-bold text-lg mt-2 text-center">{card.name}</p>
//         </motion.div>
//     );
// }

import { motion } from 'framer-motion';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';

export function Card({ card, isFlipped, onClick }) {
    // Use the card.image path directly, fallback if undefined
    const imagePath = card.image ? card.image : '/cards1/fallback.jpg';

    // Enhanced logging with card details
    console.log('Card Details:', {
        id: card.id,
        name: card.name,
        originalImage: card.image,
        resolvedImagePath: imagePath
    });

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="m-4 flex flex-col items-center"
        >
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                {/* Front of card */}
                <div
                    className="w-64 h-96 bg-yellow-300 rounded-lg cursor-pointer"  // Changed from w-48 h-72
                    onClick={onClick}
                    style={{
                        backgroundImage: `url(${imagePath})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Back of card */}
                <div
                    className="w-64 h-96 rounded-lg flex items-center justify-center p-4 cursor-pointer text-center relative overflow-hidden border-2"  // Changed from w-48 h-72
                    onClick={onClick}
                    style={{
                        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 25%, #0a0a1a 50%, #1a1a0a 75%, #0a0a0a 100%)',
                        borderColor: '#2a2a2a'
                    }}
                >
                    {/* Animated dark gothic rainbow gradient overlay */}
                    <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{
                            background: 'linear-gradient(45deg, #1a0000, #330000, #1a001a, #2d0040, #001a33, #0a0a2a, #2d0040, #1a001a, #330000, #1a0000)',
                            backgroundSize: '400% 400%'
                        }}
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Floating star particles effect */}
                    {[...Array(15)].map((_, i) => {
                        const size = Math.random() * 3 + 1;
                        const x = Math.random() * 100;
                        const y = Math.random() * 100;
                        const delay = Math.random() * 4;

                        return (
                            <motion.div
                                key={i}
                                className="absolute opacity-60"
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    width: `${size}px`,
                                    height: `${size}px`
                                }}
                                animate={{
                                    scale: [0, 1, 0],
                                    rotate: [0, 180, 360],
                                    opacity: [0, 0.8, 0]
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: delay
                                }}
                            >
                                {/* Star shape using CSS */}
                                <div
                                    className="relative"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        background: `linear-gradient(45deg, #8b5cf6, #a855f7, #c084fc)`,
                                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                                        filter: 'drop-shadow(0 0 2px rgba(139, 92, 246, 0.8))'
                                    }}
                                />
                            </motion.div>
                        );
                    })}

                    {/* Additional twinkling dots */}
                    {[...Array(20)].map((_, i) => {
                        const x = Math.random() * 100;
                        const y = Math.random() * 100;
                        const delay = Math.random() * 5;

                        return (
                            <motion.div
                                key={`dot-${i}`}
                                className="absolute w-0.5 h-0.5 bg-purple-300 rounded-full"
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    boxShadow: '0 0 4px rgba(196, 181, 253, 0.8)'
                                }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1.5, 0.5]
                                }}
                                transition={{
                                    duration: 1.5 + Math.random() * 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: delay
                                }}
                            />
                        );
                    })}

                    {/* Dark shimmer sweep */}
                    <motion.div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background: 'linear-gradient(110deg, transparent, rgba(75,0,130,0.4), rgba(139,0,139,0.4), rgba(25,25,112,0.4), transparent)',
                            width: '300%'
                        }}
                        animate={{
                            x: ['-200%', '200%']
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Pulsing mystical aura */}
                    <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(75,0,130,0.15) 0%, rgba(139,0,139,0.1) 40%, transparent 70%)',
                        }}
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Rotating gothic texture */}
                    <motion.div
                        className="absolute inset-0 rounded-lg opacity-10"
                        style={{
                            background: 'conic-gradient(from 0deg, transparent, rgba(139,0,139,0.1), transparent, rgba(75,0,130,0.1), transparent)'
                        }}
                        animate={{
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Subtle cross-hatch gothic pattern */}
                    <div className="absolute inset-0 rounded-lg opacity-15" style={{
                        background: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(139,0,139,0.1) 3px, rgba(139,0,139,0.1) 6px), repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(75,0,130,0.1) 3px, rgba(75,0,130,0.1) 6px)'
                    }} />

                    {/* Breathing text with multiple animations */}
                    <motion.p
                        className="text-gray-200 font-semibold text-sm relative z-10 px-2 leading-relaxed"
                        style={{
                            textShadow: '2px 2px 6px rgba(0,0,0,0.9), 0 0 15px rgba(139,0,139,0.6), 0 0 25px rgba(75,0,130,0.4)'
                        }}
                        animate={{
                            scale: [1, 1.02, 1],
                            opacity: [0.9, 1, 0.9],
                            textShadow: [
                                '2px 2px 6px rgba(0,0,0,0.9), 0 0 15px rgba(139,0,139,0.6), 0 0 25px rgba(75,0,130,0.4)',
                                '2px 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(139,0,139,0.8), 0 0 35px rgba(75,0,130,0.6)',
                                '2px 2px 6px rgba(0,0,0,0.9), 0 0 15px rgba(139,0,139,0.6), 0 0 25px rgba(75,0,130,0.4)'
                            ]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <motion.span
                            animate={{
                                y: [0, -1, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.2
                            }}
                        >
                            {card.meaning}
                        </motion.span>
                    </motion.p>

                    {/* Corner gothic ornaments */}
                    {[
                        { top: '8px', left: '8px', rotate: 0 },
                        { top: '8px', right: '8px', rotate: 90 },
                        { bottom: '8px', right: '8px', rotate: 180 },
                        { bottom: '8px', left: '8px', rotate: 270 }
                    ].map((pos, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-4 h-4 opacity-30"
                            style={{
                                ...pos,
                                background: 'radial-gradient(circle, rgba(139,0,139,0.6) 0%, transparent 70%)',
                                transform: `rotate(${pos.rotate}deg)`
                            }}
                            animate={{
                                opacity: [0.2, 0.5, 0.2],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5
                            }}
                        />
                    ))}
                </div>
            </ReactCardFlip>

            {/* Card name below with subtle glow */}
            <motion.p
                className="text-white font-bold text-lg mt-2 text-center"
                style={{
                    textShadow: '0 0 10px rgba(139,0,139,0.5)'
                }}
                animate={{
                    textShadow: [
                        '0 0 10px rgba(139,0,139,0.5)',
                        '0 0 15px rgba(139,0,139,0.7)',
                        '0 0 10px rgba(139,0,139,0.5)'
                    ]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {card.name}
            </motion.p>
        </motion.div>
    );
}

// Demo component to test the card
export default function CardDemo() {
    const [isFlipped, setIsFlipped] = useState(false);

    const sampleCard = {
        id: 1,
        name: "The Magician",
        meaning: "Manifestation, resourcefulness, power, inspired action. You have the tools and ability to create your reality.",
        image: "/cards1/magician.jpg"
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 p-8 flex items-center justify-center">
            <div className="text-center">
                <motion.h1
                    className="text-4xl font-bold text-white mb-8"
                    style={{
                        textShadow: '0 0 20px rgba(139,0,139,0.6)'
                    }}
                    animate={{
                        textShadow: [
                            '0 0 20px rgba(139,0,139,0.6)',
                            '0 0 30px rgba(139,0,139,0.8)',
                            '0 0 20px rgba(139,0,139,0.6)'
                        ]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    Enhanced Gothic Card
                </motion.h1>
                <Card
                    card={sampleCard}
                    isFlipped={isFlipped}
                    onClick={() => setIsFlipped(!isFlipped)}
                />
                <motion.p
                    className="text-gray-300 mt-4"
                    animate={{
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    Click the card to experience the dark gothic atmosphere!
                </motion.p>
            </div>
        </div>
    );
}