'use client';

import { motion } from 'framer-motion';

interface ModeSelectorProps {
    onSelectMari: () => void;
    onSelectSecondary: () => void;
    onSelectAdmin: () => void;
}

export default function ModeSelector({ onSelectMari, onSelectSecondary, onSelectAdmin }: ModeSelectorProps) {
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
                className="text-4xl md:text-5xl font-bold text-parchment mb-4 text-center"
            >
                El Impostor
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-moss-accent text-sm font-mono uppercase tracking-widest mb-12"
            >
                Mari Special Edition
            </motion.p>

            {/* Línea decorativa */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: '200px' }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent mb-12"
            />

            {/* Botón principal para Mari */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSelectMari}
                className="
                    px-12 py-5
                    bg-gradient-to-r from-moss-light to-moss-medium
                    hover:from-moss-medium hover:to-moss-light
                    text-parchment text-xl font-bold uppercase tracking-widest
                    rounded-xl
                    shadow-2xl shadow-moss-dark/30
                    transition-all duration-300
                    glow-effect
                "
            >
                ✨ Jugar como Mari
            </motion.button>

            {/* Modos secundarios */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-14 flex gap-4"
            >
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onSelectSecondary}
                    className="px-4 py-2 text-xs font-mono text-moss-accent/70 border border-moss-light/25 rounded-lg hover:border-moss-accent/40 hover:text-moss-accent transition-all duration-300 bg-moss-dark/30"
                >
                    👥 Otros jugadores
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onSelectAdmin}
                    className="px-4 py-2 text-xs font-mono text-moss-accent/70 border border-moss-light/25 rounded-lg hover:border-moss-accent/40 hover:text-moss-accent transition-all duration-300 bg-moss-dark/30"
                >
                    🔧 Admin
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
