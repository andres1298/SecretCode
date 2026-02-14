'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/config/config';

interface ImpostorSelectorProps {
    players: Player[];
    onSelect: (playerIndex: number) => void;
    excludedIndices?: number[];
    wrongGuessName?: string | null;
}

export default function ImpostorSelector({
    players,
    onSelect,
    excludedIndices = [],
    wrongGuessName = null
}: ImpostorSelectorProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isConfirming, setIsConfirming] = useState(false);

    const handleSelect = (index: number) => {
        if (excludedIndices.includes(index)) return;
        setSelectedIndex(index);
        setIsConfirming(false);
    };

    const handleConfirm = () => {
        if (selectedIndex !== null) {
            setIsConfirming(true);
            setTimeout(() => {
                onSelect(selectedIndex);
            }, 500);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto"
        >
            {/* Título */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-parchment mb-2">
                    🔍 ¿Quién es el Impostor?
                </h2>
                <p className="text-moss-accent font-mono text-sm">
                    Selecciona al jugador que crees que no conocía la temática
                </p>
            </motion.div>

            {/* Mensaje de error si falló */}
            <AnimatePresence>
                {wrongGuessName && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-xl text-center"
                    >
                        <p className="text-red-300 text-lg">
                            ❌ ¡Definitivamente <span className="font-bold text-white">{wrongGuessName}</span> no era el impostor!
                        </p>
                        <p className="text-moss-accent text-sm mt-1">
                            Vuelve a intentarlo...
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Grid de jugadores */}
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8 max-w-5xl w-full">
                {players.map((player, index) => {
                    const isExcluded = excludedIndices.includes(index);
                    return (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={!isExcluded ? { scale: 1.05 } : {}}
                            whileTap={!isExcluded ? { scale: 0.95 } : {}}
                            onClick={() => handleSelect(index)}
                            disabled={isExcluded}
                            className={`
                                relative p-4 rounded-xl
                                transition-all duration-300
                                ${isExcluded
                                    ? 'bg-gray-800/50 opacity-50 cursor-not-allowed'
                                    : selectedIndex === index
                                        ? 'bg-gradient-to-br from-red-600 to-red-800 ring-4 ring-red-400'
                                        : 'bg-moss-dark/50 hover:bg-moss-medium/50 border border-moss-light/30'
                                }
                            `}
                        >
                            {/* Foto */}
                            <div className={`
                                w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 rounded-full overflow-hidden
                                border-3 transition-colors duration-300
                                ${isExcluded
                                    ? 'border-gray-600 grayscale'
                                    : selectedIndex === index
                                        ? 'border-red-400'
                                        : 'border-moss-light/50'
                                }
                            `}>
                                <img
                                    src={player.photo}
                                    alt={player.name}
                                    className={`w-full h-full object-cover player-photo ${isExcluded ? 'grayscale' : ''}`}
                                />
                            </div>

                            {/* Nombre */}
                            <p className={`font-bold text-sm truncate ${isExcluded ? 'text-gray-500' : 'text-parchment'}`}>
                                {player.name}
                            </p>

                            {/* Pista ingresada */}
                            <p className={`text-xs mt-1 font-mono truncate ${isExcluded ? 'text-gray-600' : 'text-moss-accent'}`}>
                                "{player.clue}"
                            </p>

                            {/* X para excluidos */}
                            {isExcluded && (
                                <div className="absolute top-2 right-2 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">✗</span>
                                </div>
                            )}

                            {/* Indicador de selección */}
                            <AnimatePresence>
                                {selectedIndex === index && !isExcluded && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                                    >
                                        <span className="text-white text-sm">🎯</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </div>

            {/* Botón de confirmación */}
            <AnimatePresence>
                {selectedIndex !== null && !excludedIndices.includes(selectedIndex) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="text-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleConfirm}
                            disabled={isConfirming}
                            className={`
                                px-8 py-4
                                bg-gradient-to-r from-moss-light to-moss-medium
                                hover:from-moss-medium hover:to-moss-light
                                text-parchment text-lg font-bold uppercase tracking-widest
                                rounded-xl
                                shadow-xl shadow-moss-dark/30
                                transition-all duration-300
                                disabled:opacity-50
                            `}
                        >
                            {isConfirming ? '⏳ Verificando...' : `🎭 Acusar a ${players[selectedIndex].name}`}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
