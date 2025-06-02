// components/CardSpread.jsx
import { Card } from './Card';

export default function CardSpread({ cards, flippedStates, handleCardClick }) {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {cards.map((card, index) => (
                <div key={card.id} className="flex flex-col items-center">
                    <Card
                        card={card}
                        isFlipped={flippedStates[index]}
                        onClick={() => handleCardClick(index)}
                    />
                    {card.position && (
                        <p className="text-gray-300 text-sm mt-1">{card.position}</p>
                    )}
                </div>
            ))}
        </div>
    );
}