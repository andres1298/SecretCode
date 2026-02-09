'use client';

import { motion } from 'framer-motion';

interface HintDisplayProps {
    hint: string;
    stageNumber: number;
}

export default function HintDisplay({ hint, stageNumber }: HintDisplayProps) {
    return (
        <motion.div
            key={stageNumber}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md mx-auto mb-8"
        >
            {/* Tarjeta de expediente */}
            <div className="paper-texture rounded-lg p-6 text-ink classified-stamp">
                {/* Encabezado */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-moss-medium/30">
                    <div className="w-8 h-8 bg-moss-medium rounded-full flex items-center justify-center">
                        <span className="text-parchment text-sm font-bold">📋</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-moss-dark uppercase tracking-wide text-sm">
                            Archivo N° {stageNumber.toString().padStart(3, '0')}
                        </h3>
                        <p className="text-moss-medium text-xs font-mono">NIVEL DE ACCESO: RESTRINGIDO</p>
                    </div>
                </div>

                {/* Contenido de la pista */}
                <div className="space-y-3">
                    <p className="text-xs font-mono text-moss-medium uppercase tracking-widest">
                        Pista de Investigación:
                    </p>
                    <p className="text-lg font-detective text-moss-dark leading-relaxed italic">
                        &ldquo;{hint}&rdquo;
                    </p>
                </div>

                {/* Decoración de esquina */}
                <div className="absolute bottom-2 right-2 opacity-20">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-moss-dark">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                </div>
            </div>

            {/* Sombra decorativa */}
            <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/20 rounded-b-lg -z-10 blur-sm" />
        </motion.div>
    );
}
