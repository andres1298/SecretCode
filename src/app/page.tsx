'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '@/config/config';
import SecretInput from '@/components/SecretInput';
import ProgressIndicator from '@/components/ProgressIndicator';
import HintDisplay from '@/components/HintDisplay';
import ImageCarousel from '@/components/ImageCarousel';
import FinalMessage from '@/components/FinalMessage';
import CompletedStageView from '@/components/CompletedStageView';

const STORAGE_KEY = 'secretcode_progress';

type ViewMode = 'playing' | 'completed' | 'reviewing';

export default function Home() {
    const [currentStage, setCurrentStage] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<ViewMode>('playing');
    const [reviewingStage, setReviewingStage] = useState(0);

    const totalStages = config.stages.length;

    // Cargar progreso desde localStorage
    useEffect(() => {
        const savedProgress = localStorage.getItem(STORAGE_KEY);
        if (savedProgress) {
            const progress = parseInt(savedProgress, 10);
            if (progress >= totalStages) {
                setIsCompleted(true);
                setViewMode('completed');
            } else {
                setCurrentStage(progress);
            }
        }
        setIsLoading(false);
    }, [totalStages]);

    // Guardar progreso en localStorage
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem(STORAGE_KEY, currentStage.toString());
        }
    }, [currentStage, isLoading]);

    const handleCorrectPhrase = () => {
        const nextStage = currentStage + 1;

        if (nextStage >= totalStages) {
            setIsCompleted(true);
            setViewMode('completed');
            localStorage.setItem(STORAGE_KEY, totalStages.toString());
        } else {
            setCurrentStage(nextStage);
        }
    };

    const handleReset = () => {
        localStorage.removeItem(STORAGE_KEY);
        setCurrentStage(0);
        setIsCompleted(false);
        setViewMode('playing');
    };

    const handleViewStages = () => {
        setReviewingStage(0);
        setViewMode('reviewing');
    };

    const handleGoToFinal = () => {
        setViewMode('completed');
    };

    const handlePreviousStage = () => {
        if (reviewingStage > 0) {
            setReviewingStage(reviewingStage - 1);
        }
    };

    const handleNextStage = () => {
        if (reviewingStage < totalStages - 1) {
            setReviewingStage(reviewingStage + 1);
        }
    };

    // Pantalla de carga inicial
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-moss-light border-t-gold-accent rounded-full"
                />
            </div>
        );
    }

    // Pantalla de revisión de etapas completadas
    if (viewMode === 'reviewing' && isCompleted) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-parchment mb-2 font-detective">
                        📋 Expediente Completo
                    </h1>
                    <p className="text-moss-accent font-mono text-sm uppercase tracking-widest">
                        Revisando archivos descifrados
                    </p>
                </motion.div>

                {/* Indicador de progreso */}
                <ProgressIndicator
                    currentStage={reviewingStage + 1}
                    totalStages={totalStages}
                />

                {/* Vista de etapa completada */}
                <AnimatePresence mode="wait">
                    <CompletedStageView
                        key={reviewingStage}
                        stage={config.stages[reviewingStage]}
                        stageNumber={reviewingStage + 1}
                        totalStages={totalStages}
                        onPrevious={handlePreviousStage}
                        onNext={handleNextStage}
                        onGoToFinal={handleGoToFinal}
                        hasPrevious={reviewingStage > 0}
                        hasNext={reviewingStage < totalStages - 1}
                    />
                </AnimatePresence>
            </main>
        );
    }

    // Pantalla de victoria
    if (viewMode === 'completed' && isCompleted) {
        return (
            <div className="min-h-screen overflow-hidden">
                <ImageCarousel images={config.images} />
                <FinalMessage
                    message={config.finalMessage}
                    onViewStages={handleViewStages}
                />

                {/* Botón de reinicio (discreto) */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    onClick={handleReset}
                    className="fixed bottom-4 right-4 text-moss-light/50 hover:text-moss-accent text-xs font-mono transition-colors"
                >
                    Reiniciar misión
                </motion.button>
            </div>
        );
    }

    // Pantalla de juego
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-parchment mb-2 font-detective">
                    🔍 Proyecto Secreto
                </h1>
                <p className="text-moss-accent font-mono text-sm uppercase tracking-widest">
                    Misión de Alto Secreto
                </p>
            </motion.div>

            {/* Indicador de progreso */}
            <ProgressIndicator
                currentStage={currentStage + 1}
                totalStages={totalStages}
            />

            {/* Área de contenido principal */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStage}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-lg"
                >
                    {/* Hint de la etapa actual */}
                    <HintDisplay
                        hint={config.stages[currentStage].hint}
                        stageNumber={currentStage + 1}
                    />

                    {/* Input secreto */}
                    <SecretInput
                        onCorrect={handleCorrectPhrase}
                        correctPhrase={config.stages[currentStage].phrase}
                        stageNumber={currentStage + 1}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Footer discreto */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="fixed bottom-4 text-center"
            >
                <p className="text-moss-light/40 text-xs font-mono">
                    🔐 Todos los archivos son confidenciales
                </p>
            </motion.footer>
        </main>
    );
}
