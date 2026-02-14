'use client';

import { motion } from 'framer-motion';
import { Player } from '@/config/config';

interface HintDisplayProps {
    player: Player;
    stageNumber: number;
    totalStages: number;
}

export default function HintDisplay({ player, stageNumber, totalStages }: HintDisplayProps) {
    return (
        <motion.div
            key={stageNumber}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md mx-auto mb-4 md:mb-8"
        >
            {/* Tarjeta del jugador */}
            <div className="bg-gradient-to-br from-moss-dark/80 to-moss-medium/60 rounded-2xl p-4 md:p-6 border border-moss-light/20 backdrop-blur-sm">
                {/* Indicador de etapa */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                        Pista {stageNumber} de {totalStages}
                    </span>
                </div>

                {/* Mobile: horizontal compact layout */}
                <div className="flex items-center gap-4 md:hidden mt-2">
                    <div className="w-16 h-16 flex-shrink-0 rounded-full overflow-hidden border-[3px] border-gold-accent shadow-lg">
                        <img
                            src={player.photo}
                            alt={player.name}
                            className="w-full h-full object-cover player-photo"
                        />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-parchment">
                            {player.name}
                        </h3>
                        <p className="text-moss-accent text-xs font-mono">
                            Pregúntale su pista e ingrésala abajo
                        </p>
                    </div>
                </div>

                {/* Desktop: vertical centered layout */}
                <div className="hidden md:block">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                        className="flex justify-center mb-4 mt-2"
                    >
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gold-accent shadow-xl">
                            <img
                                src={player.photo}
                                alt={player.name}
                                className="w-full h-full object-cover player-photo"
                            />
                        </div>
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-parchment text-center mb-2"
                    >
                        {player.name}
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-moss-accent text-center text-sm font-mono"
                    >
                        Pregúntale su pista e ingrésala abajo
                    </motion.p>
                </div>

                {/* Icono decorativo */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-2 right-3 md:bottom-3"
                >
                    <span className="text-2xl md:text-3xl">🎭</span>
                </motion.div>
            </div>

            {/* Sombra decorativa */}
            <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/20 rounded-b-xl -z-10 blur-sm" />
        </motion.div>
    );
}
