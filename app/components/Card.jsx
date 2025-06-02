



import { motion } from 'framer-motion';
import ReactCardFlip from 'react-card-flip';

export function Card({ card, isFlipped, onClick }) {
    const imagePath = card.image ? `/assets/cards/${card.image}` : '/assets/cards/fallback.jpg';
    console.log('Card Image Path:', imagePath);

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="m-4 flex flex-col items-center"
        >
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div
                    className="w-48 h-72 bg-yellow-300 rounded-lg cursor-pointer"
                    onClick={onClick}
                    style={{
                        backgroundImage: `url(${imagePath})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div
                    className="w-48 h-72 bg-indigo-700 rounded-lg flex items-center justify-center p-4 cursor-pointer text-center"
                    onClick={onClick}
                >
                    <p className="text-white font-semibold text-sm">{card.meaning}</p>
                </div>
            </ReactCardFlip>
            <p className="text-white font-bold text-lg mt-2 text-center">{card.name}</p>
        </motion.div>
    );
}