'use client';

import { motion } from 'framer-motion';
import { Stage } from '@/config/config';

interface CompletedStageViewProps {
    stage: Stage;
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
            <div className="paper-texture rounded-lg p-6 text-ink relative overflow-hidden">
                {/* Sello de completado */}
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    ✓ Completado
                </div>

                {/* Encabezado */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-moss-medium/30">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">✓</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-moss-dark uppercase tracking-wide text-sm">
                            Etapa {stageNumber} de {totalStages}
                        </h3>
                        <p className="text-moss-medium text-xs font-mono">ARCHIVO DESBLOQUEADO</p>
                    </div>
                </div>

                {/* Pista original */}
                <div className="mb-4">
                    <p className="text-xs font-mono text-moss-medium uppercase tracking-widest mb-2">
                        Pista:
                    </p>
                    <p className="text-lg font-detective text-moss-dark leading-relaxed italic">
                        &ldquo;{stage.hint}&rdquo;
                    </p>
                </div>

                {/* Respuesta revelada */}
                <div className="bg-moss-dark/10 rounded-lg p-4">
                    <p className="text-xs font-mono text-moss-medium uppercase tracking-widest mb-2">
                        Código Secreto:
                    </p>
                    <p className="text-xl font-mono text-moss-dark font-bold tracking-wide">
                        {stage.phrase}
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
              bg-gradient-to-r from-gold-accent to-moss-accent text-moss-dark font-bold
              hover:from-moss-accent hover:to-gold-accent transition-all duration-300"
                    >
                        🏆 Ver Premio
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}
