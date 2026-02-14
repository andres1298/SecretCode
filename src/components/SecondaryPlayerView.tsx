'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/config/config';

interface SecondaryPlayerViewProps {
    players: Player[];
    realImpostorIndex: number;
    onBack: () => void;
}

export default function SecondaryPlayerView({ players, realImpostorIndex, onBack }: SecondaryPlayerViewProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [wrongGuesses, setWrongGuesses] = useState<number[]>([]);
    const [lastWrongName, setLastWrongName] = useState<string | null>(null);
    const [hasWon, setHasWon] = useState(false);
    const [showThanks, setShowThanks] = useState(false);

    const handleVote = () => {
        if (selectedIndex === null) return;

        if (selectedIndex === realImpostorIndex) {
            setHasWon(true);
        } else {
            setWrongGuesses(prev => [...prev, selectedIndex]);
            setLastWrongName(players[selectedIndex].name);
            setSelectedIndex(null);
        }
    };

    const handleSelect = (index: number) => {
        if (hasWon || wrongGuesses.includes(index)) return;
        setSelectedIndex(index);
    };

    // === THANK YOU SCREEN ===
    if (showThanks) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen flex flex-col items-center justify-center p-6"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
                    className="text-6xl mb-6"
                >
                    💜
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl md:text-3xl font-bold text-gold-accent text-center mb-6"
                >
                    ¡Gracias por participar!
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="max-w-lg text-center space-y-4 mb-10"
                >
                    <p className="text-parchment/80 text-base leading-relaxed">
                        Esto es una dinámica especial para <span className="text-gold-accent font-bold">Mari</span>.
                        La idea es que a través de un juego que ama, pueda descubrir un regalito que le preparé
                        para esta fecha.
                    </p>
                    <p className="text-parchment/60 text-sm leading-relaxed">
                        Ese regalo muchos sabrán que nos ha repetido y contado miles de veces:
                        <span className="text-parchment font-semibold italic"> un pequeño tatuaje</span>. 🖤
                    </p>
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '120px' }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="h-px bg-gradient-to-r from-transparent via-gold-accent/40 to-transparent mb-8"
                />

                {/* Personal message from Pondi */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="p-6 rounded-2xl max-w-md text-center"
                    style={{
                        background: 'linear-gradient(145deg, rgba(15, 15, 15, 0.9) 0%, rgba(25, 25, 25, 0.8) 100%)',
                        border: '1px solid rgba(200, 200, 200, 0.1)',
                    }}
                >
                    <p className="text-parchment/70 text-sm leading-relaxed mb-4"
                        style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
                    >
                        &ldquo;Gracias a todos por darme pelota en esta idea loca, se les quiere un montón.&rdquo;
                    </p>
                    <p className="text-gold-accent text-sm font-mono tracking-widest">
                        — Atte. Pondi 🤍
                    </p>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onBack}
                    className="mt-10 px-6 py-3
                        bg-moss-medium/60 hover:bg-moss-light/60
                        text-parchment font-mono text-sm uppercase tracking-widest
                        rounded-lg transition-all duration-300"
                >
                    ← Volver al inicio
                </motion.button>
            </motion.div>
        );
    }

    // === MAIN VOTING VIEW ===
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center p-4 md:p-6 pt-8"
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-parchment mb-2">
                    📋 Pistas Recopiladas
                </h1>
                <p className="text-moss-accent text-sm font-mono">
                    Revisa todas las pistas y vota por quién crees que es el impostor
                </p>
            </motion.div>

            {/* Wrong guess message */}
            <AnimatePresence>
                {lastWrongName && !hasWon && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-xl text-center max-w-lg w-full"
                    >
                        <p className="text-red-300 text-sm">
                            ❌ <span className="font-bold text-white">{lastWrongName}</span> no era el impostor. ¡Sigue intentando!
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Grid de pistas */}
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 max-w-5xl w-full mb-8">
                {players.map((player, index) => {
                    const isExcluded = wrongGuesses.includes(index);
                    const isSelected = selectedIndex === index;
                    const isImpostorRevealed = hasWon && index === realImpostorIndex;

                    return (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleSelect(index)}
                            disabled={isExcluded || hasWon}
                            className={`
                                relative p-3 rounded-xl text-center transition-all duration-300
                                ${isImpostorRevealed
                                    ? 'bg-red-900/50 border-2 border-red-500 ring-2 ring-red-400'
                                    : isExcluded
                                        ? 'bg-gray-800/50 opacity-50 cursor-not-allowed border border-gray-600/30'
                                        : isSelected
                                            ? 'bg-gradient-to-br from-red-600/80 to-red-800/80 ring-2 ring-red-400'
                                            : 'bg-moss-dark/50 border border-moss-light/20 hover:bg-moss-medium/40'
                                }
                            `}
                        >
                            <div className={`
                            w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 rounded-full overflow-hidden border-2
                                ${isImpostorRevealed ? 'border-red-400' :
                                    isExcluded ? 'border-gray-600 grayscale' :
                                        isSelected ? 'border-red-400' : 'border-moss-light/40'}
                            `}>
                                <img
                                    src={player.photo}
                                    alt={player.name}
                                    className={`w-full h-full object-cover player-photo ${isExcluded ? 'grayscale' : ''}`}
                                />
                            </div>
                            <p className={`font-bold text-sm ${isExcluded ? 'text-gray-500' : 'text-parchment'}`}>{player.name}</p>
                            <p className={`text-xs font-mono mt-1 ${isExcluded ? 'text-gray-600' : 'text-moss-accent'}`}>"{player.clue}"</p>

                            {/* Wrong mark */}
                            {isExcluded && (
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">✗</span>
                                </div>
                            )}

                            {/* Impostor badge on win */}
                            {isImpostorRevealed && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                                >
                                    🎭 Impostor
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Vote button or win result */}
            <AnimatePresence mode="wait">
                {!hasWon ? (
                    <motion.div
                        key="vote"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center"
                    >
                        {selectedIndex !== null && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleVote}
                                className="
                                    px-8 py-3
                                    bg-gradient-to-r from-moss-light to-moss-medium
                                    hover:from-moss-medium hover:to-moss-light
                                    text-parchment font-bold uppercase tracking-widest
                                    rounded-xl shadow-xl transition-all duration-300
                                "
                            >
                                🎭 Votar por {players[selectedIndex].name}
                            </motion.button>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center max-w-md"
                    >
                        <div className="p-6 rounded-2xl mb-6 bg-green-900/30 border border-green-500/50">
                            <div className="text-4xl mb-3">🎉</div>
                            <h3 className="text-xl font-bold mb-2 text-green-400">
                                ¡Acertaste!
                            </h3>
                            <p className="text-parchment text-sm">
                                ¡Sí! {players[realImpostorIndex].name} era el impostor.
                                {wrongGuesses.length > 0 && (
                                    <span className="text-moss-accent"> Lo lograste en {wrongGuesses.length + 1} intentos.</span>
                                )}
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowThanks(true)}
                            className="
                                px-8 py-3
                                bg-gradient-to-r from-moss-light to-moss-medium
                                hover:from-moss-medium hover:to-moss-light
                                text-parchment font-bold uppercase tracking-widest
                                rounded-xl shadow-xl transition-all duration-300
                            "
                        >
                            Continuar →
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Back button */}
            {!hasWon && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={onBack}
                    className="mt-8 text-moss-light/40 text-xs font-mono hover:text-moss-accent/60 transition-colors duration-300"
                >
                    ← Volver
                </motion.button>
            )}
        </motion.div>
    );
}
