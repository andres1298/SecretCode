'use client';

import { motion } from 'framer-motion';

interface StageData {
    phrase: string;
    hint: string;
    playerName?: string;
    playerPhoto?: string;
    isImpostor?: boolean;
}

interface CompletedStageViewProps {
    stage: StageData;
    stageNumber: number;
    totalStages: number;
    onPrevious: () => void;
    onNext: () => void;
    onGoToFinal: () => void;
    hasPrevious: boolean;
    hasNext: boolean;
}

export default function CompletedStageView({
    stage,
    stageNumber,
    totalStages,
    onPrevious,
    onNext,
    onGoToFinal,
    hasPrevious,
    hasNext,
}: CompletedStageViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg mx-auto"
        >
            {/* Tarjeta de etapa completada */}
            <div className="bg-gradient-to-br from-moss-dark/80 to-moss-medium/60 rounded-2xl p-6 border border-moss-light/20 relative overflow-hidden">
                {/* Badge de impostor si aplica */}
                {stage.isImpostor && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                        🎭 Impostor
                    </div>
                )}

                {/* Foto del jugador si existe */}
                {stage.playerPhoto && (
                    <div className="flex justify-center mb-4">
                        <div className={`w-20 h-20 rounded-full overflow-hidden border-4 ${stage.isImpostor ? 'border-red-500' : 'border-green-500'
                            }`}>
                            <img
                                src={stage.playerPhoto}
                                alt={stage.playerName || 'Jugador'}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Encabezado */}
                <div className="text-center mb-4 pb-3 border-b border-moss-light/20">
                    <h3 className="font-bold text-parchment text-xl">
                        {stage.playerName || `Etapa ${stageNumber}`}
                    </h3>
                    <p className="text-moss-accent text-xs font-mono mt-1">
                        Pista {stageNumber} de {totalStages}
                    </p>
                </div>

                {/* Pista dada */}
                <div className="bg-moss-dark/30 rounded-lg p-4">
                    <p className="text-xs font-mono text-moss-accent uppercase tracking-widest mb-2">
                        Pista:
                    </p>
                    <p className="text-xl font-mono text-parchment font-bold tracking-wide">
                        "{stage.phrase}"
                    </p>
                </div>
            </div>

            {/* Navegación */}
            <div className="flex items-center justify-between mt-6 gap-4">
                <motion.button
                    onClick={onPrevious}
                    disabled={!hasPrevious}
                    whileHover={hasPrevious ? { scale: 1.02 } : {}}
                    whileTap={hasPrevious ? { scale: 0.98 } : {}}
                    className={`
                        flex-1 py-3 px-4 rounded-lg font-mono text-sm uppercase tracking-wider
                        transition-all duration-300
                        ${hasPrevious
                            ? 'bg-moss-medium text-parchment hover:bg-moss-light cursor-pointer'
                            : 'bg-moss-dark/30 text-moss-light/50 cursor-not-allowed'}
                    `}
                >
                    ← Anterior
                </motion.button>

                {hasNext ? (
                    <motion.button
                        onClick={onNext}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3 px-4 rounded-lg font-mono text-sm uppercase tracking-wider
                            bg-moss-medium text-parchment hover:bg-moss-light transition-all duration-300"
                    >
                        Siguiente →
                    </motion.button>
                ) : (
                    <motion.button
                        onClick={onGoToFinal}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3 px-4 rounded-lg font-mono text-sm uppercase tracking-wider
                            bg-gradient-to-r from-moss-light to-moss-medium text-parchment font-bold
                            hover:from-moss-medium hover:to-moss-light transition-all duration-300"
                    >
                        🏆 Ver Resultado
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}
