'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/config/config';

interface ThemeInputProps {
    correctTheme: string;
    players: Player[];
    impostorIndex: number;
    onCorrect: () => void;
    onWrong: () => void;
}

export default function ThemeInput({
    correctTheme,
    players,
    impostorIndex,
    onCorrect,
    onWrong
}: ThemeInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [isShaking, setIsShaking] = useState(false);
    const [showError, setShowError] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const normalizeText = (text: string) => {
        return text.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (normalizeText(inputValue) === normalizeText(correctTheme)) {
            onCorrect();
        } else {
            setIsShaking(true);
            setShowError(true);
            setAttempts(prev => prev + 1);
            setTimeout(() => setIsShaking(false), 500);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto"
        >
            {/* Icono y título */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-6"
            >
                <div className="text-5xl mb-3">🧩</div>
                <h2 className="text-2xl md:text-3xl font-bold text-parchment mb-2">
                    ¡Último Desafío!
                </h2>
                <p className="text-moss-accent text-sm">
                    Has identificado al impostor. Ahora adivina cuál era la temática secreta.
                </p>
            </motion.div>

            {/* Resumen de pistas */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 p-4 bg-moss-dark/50 rounded-xl border border-moss-light/20"
            >
                <p className="text-xs font-mono text-moss-accent uppercase tracking-widest mb-3 text-center">
                    📋 Pistas recopiladas
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {players.map((player, index) => (
                        <div
                            key={index}
                            className={`
                                p-2 rounded-lg text-center
                                ${index === impostorIndex
                                    ? 'bg-red-900/50 border border-red-500/50'
                                    : 'bg-moss-medium/30'
                                }
                            `}
                        >
                            <p className={`text-xs ${index === impostorIndex ? 'text-red-300' : 'text-moss-accent'}`}>
                                {player.name}
                                {index === impostorIndex && ' 🎭'}
                            </p>
                            <p className={`font-mono text-sm ${index === impostorIndex ? 'text-red-200 line-through' : 'text-parchment'}`}>
                                "{player.clue}"
                            </p>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-moss-accent/60 text-center mt-3">
                    💡 ¿Qué tienen en común todas las pistas excepto la del impostor?
                </p>
            </motion.div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="theme-input"
                        className="block text-sm font-mono text-moss-accent mb-2 uppercase tracking-widest"
                    >
                        ¿Cuál era la temática?
                    </label>
                    <motion.input
                        id="theme-input"
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setShowError(false);
                        }}
                        animate={isShaking ? {
                            x: [0, -10, 10, -10, 10, 0],
                            transition: { duration: 0.5 }
                        } : {}}
                        className={`
                            w-full px-4 py-3 
                            bg-moss-dark/50 
                            border-2 ${showError ? 'border-red-500' : 'border-moss-light'}
                            rounded-lg
                            text-parchment text-lg font-mono
                            placeholder-moss-light/50
                            focus:outline-none focus:border-gold-accent
                            transition-colors duration-300
                        `}
                        placeholder="Escribe la temática..."
                        autoComplete="off"
                        autoFocus
                    />

                    {/* Mensaje de error */}
                    <div className="h-6 mt-2">
                        {showError && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm font-mono"
                            >
                                Incorrecto. {attempts >= 3 ? '¡Piensa bien!' : 'Intenta de nuevo.'}
                            </motion.p>
                        )}
                    </div>
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                        w-full py-3 px-6
                        bg-gradient-to-r from-moss-light to-moss-medium
                        hover:from-moss-medium hover:to-moss-light
                        text-parchment font-bold uppercase tracking-widest
                        rounded-lg
                        shadow-lg shadow-moss-dark/30
                        transition-all duration-300
                    "
                >
                    ✨ Verificar Temática
                </motion.button>
            </form>

            {/* Pista después de varios intentos */}
            {attempts >= 5 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-center text-moss-accent/70 text-sm"
                >
                    💡 Pista: La respuesta tiene {correctTheme.length} letras
                </motion.p>
            )}
        </motion.div>
    );
}
