'use client';

import { motion } from 'framer-motion';
import { FinalMessage as FinalMessageType } from '@/config/config';

interface FinalMessageProps {
    message: FinalMessageType;
    onViewStages?: () => void;
}

export default function FinalMessage({ message, onViewStages }: FinalMessageProps) {
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
                    className="h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent mx-auto mb-8"
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
                    🏆
                </motion.div>

                {/* Título */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="text-3xl md:text-4xl font-bold text-parchment mb-4 font-detective"
                >
                    {message.title}
                </motion.h1>

                {/* Subtítulo */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="text-lg text-moss-accent mb-6 font-mono uppercase tracking-widest"
                >
                    {message.subtitle}
                </motion.p>

                {/* Mensaje principal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    className="relative"
                >
                    <div className="absolute -left-4 top-0 text-4xl text-gold-accent/30">&ldquo;</div>
                    <p className="text-xl md:text-2xl text-parchment leading-relaxed font-detective italic px-6">
                        {message.message}
                    </p>
                    <div className="absolute -right-4 bottom-0 text-4xl text-gold-accent/30">&rdquo;</div>
                </motion.div>

                {/* Decoración inferior */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent mx-auto mt-8"
                />

                {/* Botón para ver etapas */}
                {onViewStages && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2 }}
                        onClick={onViewStages}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-8 py-3 px-6 bg-moss-medium/80 hover:bg-moss-light 
                            text-parchment font-mono text-sm uppercase tracking-widest
                            rounded-lg border border-gold-accent/30 transition-all duration-300"
                    >
                        📋 Revisar Etapas Completadas
                    </motion.button>
                )}

                {/* Sello de completado */}
                <motion.div
                    initial={{ opacity: 0, rotate: -20, scale: 0 }}
                    animate={{ opacity: 1, rotate: 12, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: 1.7,
                        type: 'spring'
                    }}
                    className="absolute -top-4 -right-4 bg-moss-medium text-parchment px-4 py-2 rounded shadow-lg"
                >
                    <span className="font-mono text-sm font-bold tracking-widest">✓ COMPLETADO</span>
                </motion.div>
            </motion.div>
        </div>
    );
}
