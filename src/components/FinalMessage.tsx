'use client';

import { motion } from 'framer-motion';
import { Player } from '@/config/config';

type FinalMessageType = {
    victory: string;
    defeat: string;
    [key: string]: string;
};

interface FinalMessageProps {
    isVictory: boolean;
    message: FinalMessageType;
    impostor?: Player;
    theme?: string;
    onRestart?: () => void;
    onViewStages?: () => void;
}

export default function FinalMessage({
    isVictory,
    message,
    impostor,
    theme,
    onRestart,
    onViewStages
}: FinalMessageProps) {
    const title = isVictory ? message.winTitle : message.loseTitle;
    const subtitle = isVictory ? message.winSubtitle : message.loseSubtitle;
    const text = isVictory ? message.winMessage : message.loseMessage;

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.3
                }}
                className="glass rounded-2xl p-8 md:p-12 max-w-2xl w-full text-center relative"
            >
                {/* Decoración superior */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className={`h-1 mx-auto mb-8 ${isVictory
                        ? 'bg-gradient-to-r from-transparent via-gold-accent to-transparent'
                        : 'bg-gradient-to-r from-transparent via-red-500 to-transparent'
                        }`}
                />

                {/* Icono */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.6,
                        type: 'spring',
                        stiffness: 200
                    }}
                    className="text-6xl mb-6"
                >
                    {isVictory ? '🏆' : '😔'}
                </motion.div>

                {/* Título */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className={`text-3xl md:text-4xl font-bold mb-4 ${isVictory ? 'text-gold-accent' : 'text-red-400'
                        }`}
                >
                    {title}
                </motion.h1>

                {/* Subtítulo */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="text-lg text-moss-accent mb-6 font-mono uppercase tracking-widest"
                >
                    {subtitle}
                </motion.p>

                {/* Mensaje principal */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    className="text-xl text-parchment leading-relaxed mb-6"
                >
                    {text}
                </motion.p>

                {/* Info del impostor y temática */}
                {impostor && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                        className="bg-moss-dark/50 rounded-xl p-4 mb-6"
                    >
                        <div className="flex items-center justify-center gap-4 mb-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-500">
                                <img src={impostor.photo} alt={impostor.name} className="w-full h-full object-cover player-photo" />
                            </div>
                            <div className="text-left">
                                <p className="text-parchment font-bold">El impostor era: {impostor.name}</p>
                                <p className="text-moss-accent text-sm">Pista: "{impostor.clue}"</p>
                            </div>
                        </div>
                        {theme && (
                            <p className="text-gold-accent text-lg font-bold">
                                La temática era: {theme}
                            </p>
                        )}
                    </motion.div>
                )}

                {/* Decoración inferior */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1, delay: 1.7 }}
                    className={`h-1 mx-auto mb-6 ${isVictory
                        ? 'bg-gradient-to-r from-transparent via-gold-accent to-transparent'
                        : 'bg-gradient-to-r from-transparent via-red-500 to-transparent'
                        }`}
                />

                {/* Botones */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    {onViewStages && isVictory && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onViewStages}
                            className="py-3 px-6 bg-moss-medium/80 hover:bg-moss-light 
                                text-parchment font-mono text-sm uppercase tracking-widest
                                rounded-lg border border-gold-accent/30 transition-all duration-300"
                        >
                            📋 Revisar Pistas
                        </motion.button>
                    )}

                    {onRestart && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onRestart}
                            className="py-3 px-6 bg-gradient-to-r from-moss-light to-moss-medium
                                hover:from-moss-medium hover:to-moss-light
                                text-parchment font-mono text-sm uppercase tracking-widest
                                rounded-lg transition-all duration-300"
                        >
                            🔄 Jugar de Nuevo
                        </motion.button>
                    )}
                </motion.div>

                {/* Sello */}
                <motion.div
                    initial={{ opacity: 0, rotate: -20, scale: 0 }}
                    animate={{ opacity: 1, rotate: 12, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: 1.9,
                        type: 'spring'
                    }}
                    className={`absolute -top-4 -right-4 px-4 py-2 rounded shadow-lg ${isVictory ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                        }`}
                >
                    <span className="font-mono text-sm font-bold tracking-widest">
                        {isVictory ? '✓ VICTORIA' : '✗ DERROTA'}
                    </span>
                </motion.div>
            </motion.div>
        </div>
    );
}
