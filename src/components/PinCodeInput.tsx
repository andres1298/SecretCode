'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface PinCodeInputProps {
    correctCode: string;
    label: string;
    onSuccess: () => void;
    onBack: () => void;
}

export default function PinCodeInput({ correctCode, label, onSuccess, onBack }: PinCodeInputProps) {
    const [digits, setDigits] = useState<string[]>(['', '', '', '']);
    const [isError, setIsError] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newDigits = [...digits];
        newDigits[index] = value.slice(-1);
        setDigits(newDigits);
        setIsError(false);

        // Auto-avanzar al siguiente input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }

        // Verificar código cuando se completan los 4 dígitos
        const fullCode = newDigits.join('');
        if (fullCode.length === 4) {
            if (fullCode === correctCode) {
                onSuccess();
            } else {
                setIsShaking(true);
                setIsError(true);
                setTimeout(() => {
                    setIsShaking(false);
                    setDigits(['', '', '', '']);
                    inputRefs.current[0]?.focus();
                }, 600);
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-4"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-8"
            >
                <div className="text-4xl mb-4">🔒</div>
                <h2 className="text-2xl font-bold text-parchment mb-2">{label}</h2>
                <p className="text-moss-accent text-sm font-mono">
                    Ingresa el código de 4 dígitos
                </p>
            </motion.div>

            {/* Pin inputs */}
            <motion.div
                animate={isShaking ? {
                    x: [0, -12, 12, -12, 12, 0],
                    transition: { duration: 0.5 }
                } : {}}
                className="flex gap-4 mb-6"
            >
                {digits.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={`
                            w-14 h-16 text-center text-2xl font-bold font-mono
                            bg-moss-dark/50 rounded-xl
                            border-2 ${isError ? 'border-red-500' : 'border-moss-light/50'}
                            text-parchment
                            focus:outline-none focus:border-gold-accent
                            transition-colors duration-300
                        `}
                        autoFocus={index === 0}
                    />
                ))}
            </motion.div>

            {/* Error message */}
            <div className="h-6">
                {isError && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm font-mono"
                    >
                        Código incorrecto
                    </motion.p>
                )}
            </div>

            {/* Back button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={onBack}
                className="mt-8 text-moss-light/50 text-sm font-mono hover:text-moss-accent transition-colors duration-300"
            >
                ← Volver
            </motion.button>
        </motion.div>
    );
}
