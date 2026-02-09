'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
    currentStage: number;
    totalStages: number;
}

export default function ProgressIndicator({ currentStage, totalStages }: ProgressIndicatorProps) {
    const progress = (currentStage / totalStages) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto mb-8"
        >
            {/* Título del expediente */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-moss-accent font-mono text-sm uppercase tracking-widest">
                    Expediente Secreto
                </span>
                <span className="text-gold-accent font-mono text-sm">
                    Etapa {currentStage} de {totalStages}
                </span>
            </div>

            {/* Barra de progreso */}
            <div className="relative h-3 bg-moss-dark/50 rounded-full overflow-hidden border border-moss-light/30">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-accent to-moss-accent rounded-full"
                />

                {/* Marcadores de etapas */}
                <div className="absolute inset-0 flex justify-between px-1">
                    {Array.from({ length: totalStages }).map((_, index) => (
                        <div
                            key={index}
                            className={`
                w-2 h-2 rounded-full my-auto
                transition-colors duration-300
                ${index < currentStage ? 'bg-parchment' : 'bg-moss-light/30'}
              `}
                        />
                    ))}
                </div>
            </div>

            {/* Indicador de progreso en porcentaje */}
            <div className="mt-2 text-center">
                <span className="text-moss-light text-xs font-mono">
                    {Math.round(progress)}% completado
                </span>
            </div>
        </motion.div>
    );
}
