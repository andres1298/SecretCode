'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

interface SecretInputProps {
    onCorrect: () => void;
    correctPhrase: string;
    stageNumber: number;
}

export default function SecretInput({ onCorrect, correctPhrase, stageNumber }: SecretInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [isShaking, setIsShaking] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (inputValue === correctPhrase) {
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
                        htmlFor={`secret-input-${stageNumber}`}
                        className="block text-sm font-mono text-moss-accent mb-2 uppercase tracking-widest"
                    >
                        Código de Acceso
                    </label>
                    <motion.input
                        id={`secret-input-${stageNumber}`}
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
                        placeholder="Ingresa la frase secreta..."
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
                                Código incorrecto. Intenta de nuevo.
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
            shadow-lg shadow-black/30
            transition-all duration-300
          "
                >
                    🔓 Verificar Código
                </motion.button>
            </form>
        </motion.div>
    );
}
