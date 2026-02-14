'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/config/config';

interface PlayerOverviewProps {
    players: Player[];
    currentIndex: number;
    completedIndices: number[];
    onSelectPlayer: (index: number) => void;
    unlockedCount?: number; // How many players are unlocked (undefined = all)
}

export default function PlayerOverview({
    players,
    currentIndex,
    completedIndices,
    onSelectPlayer,
    unlockedCount
}: PlayerOverviewProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const totalUnlocked = unlockedCount ?? players.length;

    const handleSelect = (index: number) => {
        if (index >= totalUnlocked) return; // Can't select locked players
        onSelectPlayer(index);
    };

    const renderPlayer = (player: Player, index: number, compact: boolean = false) => {
        const isLocked = index >= totalUnlocked;
        const isCompleted = completedIndices.includes(index);
        const isCurrent = index === currentIndex;

        if (isLocked) {
            // Locked player — silhouette with lock
            return (
                <div
                    key={index}
                    className={`
                        relative flex flex-col items-center ${compact ? 'p-1' : 'p-1.5'} rounded-lg
                        bg-moss-dark/30 border border-moss-light/10 cursor-default
                    `}
                >
                    <div className={`
                        ${compact ? 'w-10 h-10' : 'w-14 h-14 xl:w-16 xl:h-16'}
                        rounded-full overflow-hidden mb-${compact ? '0.5' : '1'}
                        border-2 border-moss-light/15
                        bg-gradient-to-br from-gray-700/60 to-gray-800/60
                        flex items-center justify-center
                    `}>
                        <span className={`${compact ? 'text-base' : 'text-xl'} opacity-60`}>🔒</span>
                    </div>
                    <p className={`${compact ? 'text-[10px]' : 'text-xs'} text-moss-light/25 font-mono`}>
                        ???
                    </p>
                </div>
            );
        }

        // Unlocked player
        return compact ? (
            <button
                key={index}
                onClick={() => {
                    handleSelect(index);
                    setIsExpanded(false);
                }}
                className={`
                    relative flex flex-col items-center p-1 rounded-lg
                    transition-all duration-200
                    ${isCurrent
                        ? 'bg-gold-accent/30 ring-2 ring-gold-accent'
                        : isCompleted
                            ? 'bg-green-600/30 border border-green-500/50'
                            : 'bg-moss-dark/50 border border-moss-light/20'
                    }
                `}
            >
                <div className={`
                    w-10 h-10 rounded-full overflow-hidden mb-0.5
                    border-2 transition-colors duration-200
                    ${isCurrent ? 'border-gold-accent' :
                        isCompleted ? 'border-green-500' : 'border-moss-light/40'}
                `}>
                    <img src={player.photo} alt={player.name} className="w-full h-full object-cover player-photo" />
                </div>
                <p className={`text-[10px] truncate max-w-full ${isCurrent ? 'text-gold-accent font-bold' :
                        isCompleted ? 'text-green-400' : 'text-parchment/70'
                    }`}>
                    {player.name.split(' ')[0]}
                </p>
                {isCompleted && (
                    <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-[8px]">✓</span>
                    </div>
                )}
            </button>
        ) : (
            <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(index)}
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
                <div className={`
                    w-14 h-14 xl:w-16 xl:h-16 rounded-full overflow-hidden mb-1
                    border-2 transition-colors duration-300
                    ${isCurrent ? 'border-gold-accent' :
                        isCompleted ? 'border-green-500' : 'border-moss-light/50'}
                `}>
                    <img
                        src={player.photo}
                        alt={player.name}
                        className="w-full h-full object-cover player-photo"
                    />
                </div>
                <p className={`text-xs truncate max-w-full ${isCurrent ? 'text-gold-accent font-bold' :
                    isCompleted ? 'text-green-400' : 'text-parchment/80'
                    }`}>
                    {player.name.split(' ')[0]}
                </p>
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
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-7xl mx-auto mb-4"
        >
            {/* Mobile: compact collapsible bar */}
            <div className="lg:hidden">
                {/* Compact summary — always visible */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-moss-dark/60 border border-moss-light/20 rounded-xl"
                >
                    <div className="flex items-center gap-2">
                        {/* Mini avatars of unlocked players */}
                        <div className="flex -space-x-2">
                            {players.slice(0, Math.min(5, totalUnlocked)).map((p, i) => (
                                <div
                                    key={i}
                                    className={`w-6 h-6 rounded-full overflow-hidden border-2 ${completedIndices.includes(i) ? 'border-green-500' :
                                            i === currentIndex ? 'border-gold-accent' : 'border-moss-light/30'
                                        }`}
                                >
                                    <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                                </div>
                            ))}
                            {players.length > totalUnlocked && (
                                <div className="w-6 h-6 rounded-full bg-gray-700/60 border-2 border-moss-light/15 flex items-center justify-center">
                                    <span className="text-[8px]">🔒</span>
                                </div>
                            )}
                        </div>
                        <span className="text-xs font-mono text-moss-accent">
                            👥 {completedIndices.length}/{players.length}
                            {totalUnlocked < players.length && (
                                <span className="text-moss-light/40 ml-1">• {totalUnlocked} visibles</span>
                            )}
                        </span>
                    </div>
                    <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-moss-accent text-sm"
                    >
                        ▼
                    </motion.span>
                </button>

                {/* Expanded grid */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                        >
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 pt-2">
                                {players.map((player, index) => renderPlayer(player, index, true))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Desktop: always visible single-row grid */}
            <div className="hidden lg:block">
                <p className="text-xs font-mono text-moss-accent uppercase tracking-widest mb-3 text-center">
                    👥 Jugadores ({completedIndices.length}/{players.length} completados)
                    {totalUnlocked < players.length && (
                        <span className="text-moss-light/40 ml-2">• Completa {totalUnlocked < players.length ? 3 - (completedIndices.length % 3 || 3) : 0} más para desbloquear</span>
                    )}
                </p>

                <div className="grid grid-cols-12 gap-2 justify-items-center">
                    {players.map((player, index) => renderPlayer(player, index, false))}
                </div>
            </div>
        </motion.div>
    );
}
