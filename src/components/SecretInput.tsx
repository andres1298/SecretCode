'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

interface SecretInputProps {
    onCorrect: () => void;
    correctPhrase: string;
    playerName: string;
}

export default function SecretInput({ onCorrect, correctPhrase, playerName }: SecretInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [isShaking, setIsShaking] = useState(false);
    const [showError, setShowError] = useState(false);

    const normalizeText = (text: string) => {
        return text.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (normalizeText(inputValue) === normalizeText(correctPhrase)) {
            onCorrect();
            setInputValue('');
            setShowError(false);
        } else {
            setIsShaking(true);
            setShowError(true);
            setTimeout(() => {
                setIsShaking(false);
            }, 500);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-md mx-auto"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="clue-input"
                        className="block text-sm font-mono text-moss-accent mb-2 uppercase tracking-widest"
                    >
                        Pista de {playerName}
                    </label>
                    <motion.input
                        id="clue-input"
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
                        placeholder="Escribe la pista que te dio..."
                        autoComplete="off"
                        autoFocus
                    />

                    {/* Contenedor con altura fija para el mensaje de error */}
                    <div className="h-6 mt-2">
                        {showError && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm font-mono"
                            >
                                Pista incorrecta. Pregunta de nuevo.
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
                        border border-gold-accent/30
                        shadow-lg shadow-moss-dark/30
                        transition-all duration-300
                    "
                >
                    ✓ Confirmar Pista
                </motion.button>
            </form>
        </motion.div>
    );
}
