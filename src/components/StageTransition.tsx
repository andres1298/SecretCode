'use client';

import { motion } from 'framer-motion';

interface StageTransitionProps {
    emoji: string;
    title: string;
    message: string;
    buttonText: string;
    onContinue: () => void;
}

export default function StageTransition({ emoji, title, message, buttonText, onContinue }: StageTransitionProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-6"
        >
            {/* Celebración */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
                className="text-7xl mb-6"
            >
                {emoji}
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl font-bold text-gold-accent text-center mb-4"
            >
                {title}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-parchment/80 text-center text-base md:text-lg max-w-md mb-10 leading-relaxed"
            >
                {message}
            </motion.p>

            {/* Línea decorativa */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: '120px' }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="h-px bg-gradient-to-r from-transparent via-gold-accent to-transparent mb-10"
            />

            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContinue}
                className="
                    px-10 py-4
                    bg-gradient-to-r from-moss-light to-moss-medium
                    hover:from-moss-medium hover:to-moss-light
                    text-parchment text-lg font-bold uppercase tracking-widest
                    rounded-xl shadow-2xl shadow-moss-dark/30
                    transition-all duration-300
                "
            >
                {buttonText}
            </motion.button>
        </motion.div>
    );
}
