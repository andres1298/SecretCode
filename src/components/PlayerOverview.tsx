'use client';

import { motion } from 'framer-motion';
import { Player } from '@/config/config';

interface PlayerOverviewProps {
    players: Player[];
    currentIndex: number;
    completedIndices: number[];
    onSelectPlayer: (index: number) => void;
}

export default function PlayerOverview({
    players,
    currentIndex,
    completedIndices,
    onSelectPlayer
}: PlayerOverviewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-7xl mx-auto mb-6"
        >
            <p className="text-xs font-mono text-moss-accent uppercase tracking-widest mb-3 text-center">
                👥 Jugadores ({completedIndices.length}/{players.length} completados)
            </p>

            {/* Single row on desktop, wrapping grid on mobile */}
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 justify-items-center">
                {players.map((player, index) => {
                    const isCompleted = completedIndices.includes(index);
                    const isCurrent = index === currentIndex;

                    return (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelectPlayer(index)}
                            className={`
                                relative flex flex-col items-center p-1.5 rounded-lg
                                transition-all duration-300 w-full
                                ${isCurrent
                                    ? 'bg-gold-accent/30 ring-2 ring-gold-accent'
                                    : isCompleted
                                        ? 'bg-green-600/30 border border-green-500/50'
                                        : 'bg-moss-dark/50 border border-moss-light/30 hover:bg-moss-medium/50'
                                }
                            `}
                        >
                            {/* Foto */}
                            <div className={`
                                w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden mb-1
                                border-2 transition-colors duration-300
                                ${isCurrent
                                    ? 'border-gold-accent'
                                    : isCompleted
                                        ? 'border-green-500'
                                        : 'border-moss-light/50'
                                }
                            `}>
                                <img
                                    src={player.photo}
                                    alt={player.name}
                                    className="w-full h-full object-cover player-photo"
                                />
                            </div>

                            {/* Nombre */}
                            <p className={`text-xs truncate max-w-full ${isCurrent ? 'text-gold-accent font-bold' :
                                isCompleted ? 'text-green-400' : 'text-parchment/80'
                                }`}>
                                {player.name.split(' ')[0]}
                            </p>

                            {/* Indicador de estado */}
                            {isCompleted && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                            )}
                            {isCurrent && !isCompleted && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gold-accent rounded-full flex items-center justify-center">
                                    <span className="text-moss-dark text-xs">→</span>
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
}
