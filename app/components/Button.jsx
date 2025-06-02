import { motion } from 'framer-motion';

export default function Button({ text, onClick, disabled }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold m-2 disabled:opacity-50 disabled:bg-indigo-600 "
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </motion.button>
    );
}