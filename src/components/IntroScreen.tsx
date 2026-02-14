'use client';

import { motion } from 'framer-motion';

interface IntroScreenProps {
    title: string;
    message: string;
    hint?: string;
    onStart: () => void;
    onBack?: () => void;
}

export default function IntroScreen({ title, message, hint, onStart, onBack }: IntroScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
        >
            {/* Icono principal */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="text-8xl mb-8"
            >
                🎭
            </motion.div>

            {/* Título */}
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-5xl font-bold text-parchment mb-6 text-center"
            >
                {title}
            </motion.h1>

            {/* Mensaje */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="max-w-xl text-center mb-8"
            >
                <p className="text-lg md:text-xl text-moss-accent leading-relaxed">
                    {message}
                </p>
            </motion.div>

            {/* Hint sutil sobre la sorpresa */}
            {hint && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-parchment/60 text-sm italic text-center max-w-md mb-8"
                >
                    {hint}
                </motion.p>
            )}

            {/* Línea decorativa */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: '200px' }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent mb-12"
            />

            {/* Botón de inicio */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStart}
                className="
                    px-10 py-4
                    bg-gradient-to-r from-moss-light to-moss-medium
                    hover:from-moss-medium hover:to-moss-light
                    text-parchment text-xl font-bold uppercase tracking-widest
                    rounded-xl
                    shadow-2xl shadow-moss-dark/30
                    transition-all duration-300
                "
            >
                🔍 Comenzar Investigación
            </motion.button>

            {/* Instrucciones */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="mt-8 px-6 py-4 bg-moss-dark/50 border border-moss-light/30 rounded-xl text-center max-w-lg"
            >
                <p className="text-parchment text-base md:text-lg font-mono leading-relaxed">
                    📌 Pregunta a cada jugador su pista y descubre quién no conoce la temática
                </p>
            </motion.div>

            {/* Volver al inicio */}
            {onBack && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    onClick={onBack}
                    className="mt-6 text-moss-light/50 text-xs font-mono hover:text-moss-accent transition-colors duration-300"
                >
                    ← Volver al inicio
                </motion.button>
            )}
        </motion.div>
    );
}

