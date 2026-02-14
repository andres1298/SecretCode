'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config, Player } from '@/config/config';
import ModeSelector from '@/components/ModeSelector';
import PinCodeInput from '@/components/PinCodeInput';
import IntroScreen from '@/components/IntroScreen';
import SecretInput from '@/components/SecretInput';
import ProgressIndicator from '@/components/ProgressIndicator';
import HintDisplay from '@/components/HintDisplay';
import ImpostorSelector from '@/components/ImpostorSelector';
import ThemeInput from '@/components/ThemeInput';
import ImageCarousel from '@/components/ImageCarousel';
import FinalMessage from '@/components/FinalMessage';
import GiftCoupon from '@/components/GiftCoupon';
import CompletedStageView from '@/components/CompletedStageView';
import PlayerOverview from '@/components/PlayerOverview';
import SecondaryPlayerView from '@/components/SecondaryPlayerView';
import StageTransition from '@/components/StageTransition';

const STORAGE_KEY = 'impostor_game_progress';

type GameMode = 'mari' | 'secondary' | 'admin';
type GamePhase = 'mode-select' | 'pin-entry' | 'intro' | 'collecting' | 'transition-to-selecting' | 'selecting' | 'transition-to-guessing' | 'guessing' | 'victory' | 'defeat' | 'reviewing' | 'secondary-play' | 'admin-view';

interface GameState {
    phase: GamePhase;
    mode: GameMode;
    currentPlayerIndex: number;
    collectedClues: string[];
    completedPlayerIndices: number[];
    selectedImpostorIndex: number | null;
    wrongGuesses: number[];
    lastWrongGuessName: string | null;
}

export default function Home() {
    const [gameState, setGameState] = useState<GameState>({
        phase: 'mode-select',
        mode: 'mari',
        currentPlayerIndex: 0,
        collectedClues: [],
        completedPlayerIndices: [],
        selectedImpostorIndex: null,
        wrongGuesses: [],
        lastWrongGuessName: null
    });
    const [isLoading, setIsLoading] = useState(true);
    const [reviewingStage, setReviewingStage] = useState(0);
    const [pendingMode, setPendingMode] = useState<GameMode>('mari');

    const totalPlayers = config.players.length;

    // Encontrar el índice del impostor real
    const realImpostorIndex = useMemo(() => {
        return config.players.findIndex(p => p.isImpostor);
    }, []);

    // Cargar progreso desde localStorage (solo para modo Mari)
    useEffect(() => {
        const savedProgress = localStorage.getItem(STORAGE_KEY);
        if (savedProgress) {
            try {
                const saved = JSON.parse(savedProgress);
                setGameState({
                    ...saved,
                    completedPlayerIndices: saved.completedPlayerIndices || [],
                    wrongGuesses: saved.wrongGuesses || [],
                    lastWrongGuessName: saved.lastWrongGuessName || null,
                    mode: saved.mode || 'mari'
                });
            } catch (e) {
                console.error('Error loading saved progress:', e);
            }
        }
        setIsLoading(false);
    }, []);

    // Guardar progreso en localStorage (solo modo Mari)
    useEffect(() => {
        if (!isLoading && gameState.mode === 'mari' && gameState.phase !== 'mode-select') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
        }
    }, [gameState, isLoading]);

    // === Mode Selection Handlers ===
    const handleSelectMari = () => {
        setGameState({
            ...gameState,
            mode: 'mari',
            phase: 'intro'
        });
    };

    const handleSelectSecondary = () => {
        setPendingMode('secondary');
        setGameState({
            ...gameState,
            phase: 'pin-entry'
        });
    };

    const handleSelectAdmin = () => {
        setPendingMode('admin');
        setGameState({
            ...gameState,
            phase: 'pin-entry'
        });
    };

    const handlePinSuccess = () => {
        if (pendingMode === 'secondary') {
            setGameState({
                ...gameState,
                mode: 'secondary',
                phase: 'secondary-play'
            });
        } else if (pendingMode === 'admin') {
            setGameState({
                ...gameState,
                mode: 'admin',
                phase: 'admin-view'
            });
        }
    };

    const handleBackToModeSelect = () => {
        setGameState({
            phase: 'mode-select',
            mode: 'mari',
            currentPlayerIndex: 0,
            collectedClues: [],
            completedPlayerIndices: [],
            selectedImpostorIndex: null,
            wrongGuesses: [],
            lastWrongGuessName: null
        });
    };

    // === Mari Game Handlers ===
    const handleStartGame = () => {
        setGameState({
            phase: 'collecting',
            mode: 'mari',
            currentPlayerIndex: 0,
            collectedClues: [],
            completedPlayerIndices: [],
            selectedImpostorIndex: null,
            wrongGuesses: [],
            lastWrongGuessName: null
        });
    };

    const handleSelectPlayer = (index: number) => {
        setGameState({
            ...gameState,
            currentPlayerIndex: index
        });
    };

    const handleClueSubmitted = () => {
        const currentIdx = gameState.currentPlayerIndex;
        const newCompleted = [...gameState.completedPlayerIndices, currentIdx];
        const newClues = [...gameState.collectedClues, config.players[currentIdx].clue];

        if (newCompleted.length >= totalPlayers) {
            setGameState({
                ...gameState,
                collectedClues: newClues,
                completedPlayerIndices: newCompleted,
                phase: 'transition-to-selecting'
            });
        } else {
            let nextIndex = (currentIdx + 1) % totalPlayers;
            while (newCompleted.includes(nextIndex)) {
                nextIndex = (nextIndex + 1) % totalPlayers;
            }
            setGameState({
                ...gameState,
                currentPlayerIndex: nextIndex,
                collectedClues: newClues,
                completedPlayerIndices: newCompleted
            });
        }
    };

    const handleImpostorSelected = (playerIndex: number) => {
        if (playerIndex === realImpostorIndex) {
            setGameState({
                ...gameState,
                selectedImpostorIndex: playerIndex,
                phase: 'transition-to-guessing',
                lastWrongGuessName: null
            });
        } else {
            const wrongPlayerName = config.players[playerIndex].name;
            setGameState({
                ...gameState,
                wrongGuesses: [...gameState.wrongGuesses, playerIndex],
                lastWrongGuessName: wrongPlayerName
            });
        }
    };

    const handleThemeCorrect = () => {
        setGameState({
            ...gameState,
            phase: 'victory'
        });
    };

    const handleReset = () => {
        localStorage.removeItem(STORAGE_KEY);
        setGameState({
            phase: 'mode-select',
            mode: 'mari',
            currentPlayerIndex: 0,
            collectedClues: [],
            completedPlayerIndices: [],
            selectedImpostorIndex: null,
            wrongGuesses: [],
            lastWrongGuessName: null
        });
    };

    const handleViewStages = () => {
        setReviewingStage(0);
        setGameState({
            ...gameState,
            phase: 'reviewing'
        });
    };

    const handleGoToFinal = () => {
        setGameState({
            ...gameState,
            phase: 'victory'
        });
    };

    const handlePreviousStage = () => {
        if (reviewingStage > 0) {
            setReviewingStage(reviewingStage - 1);
        }
    };

    const handleNextStage = () => {
        if (reviewingStage < totalPlayers - 1) {
            setReviewingStage(reviewingStage + 1);
        }
    };

    // Pantalla de carga
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

    // === MODE SELECT ===
    if (gameState.phase === 'mode-select') {
        return (
            <ModeSelector
                onSelectMari={handleSelectMari}
                onSelectSecondary={handleSelectSecondary}
                onSelectAdmin={handleSelectAdmin}
            />
        );
    }

    // === PIN ENTRY ===
    if (gameState.phase === 'pin-entry') {
        return (
            <PinCodeInput
                correctCode={pendingMode === 'secondary' ? '9876' : '2000'}
                label={pendingMode === 'secondary' ? 'Modo Jugadores' : 'Modo Admin'}
                onSuccess={handlePinSuccess}
                onBack={handleBackToModeSelect}
            />
        );
    }

    // === SECONDARY PLAYER MODE ===
    if (gameState.phase === 'secondary-play') {
        return (
            <SecondaryPlayerView
                players={config.players}
                realImpostorIndex={realImpostorIndex}
                onBack={handleBackToModeSelect}
            />
        );
    }

    // === ADMIN MODE ===
    if (gameState.phase === 'admin-view') {
        return (
            <div className="min-h-screen flex flex-col items-center p-4 pt-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6"
                >
                    <h1 className="text-2xl font-bold text-parchment mb-2">
                        🔧 Modo Admin
                    </h1>
                    <p className="text-moss-accent text-xs font-mono uppercase tracking-widest">
                        Vista rápida de pistas
                    </p>
                </motion.div>

                {/* Quick clue grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 max-w-5xl w-full mb-6">
                    {config.players.map((player, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-lg text-center ${player.isImpostor
                                ? 'bg-red-900/40 border border-red-500/50'
                                : 'bg-moss-dark/40 border border-moss-light/15'
                                }`}
                        >
                            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-1 rounded-full overflow-hidden border-2 border-moss-light/30">
                                <img src={player.photo} alt={player.name} className="w-full h-full object-cover player-photo" />
                            </div>
                            <p className="text-parchment text-xs font-bold">{player.name}</p>
                            <p className={`text-xs font-mono mt-0.5 ${player.isImpostor ? 'text-red-300' : 'text-moss-accent'}`}>
                                "{player.clue}" {player.isImpostor && '🎭'}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="text-gold-accent text-sm font-bold mb-6">
                    Temática: {config.theme}
                </p>

                <div className="flex gap-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setGameState({ ...gameState, phase: 'victory', mode: 'admin' })}
                        className="py-3 px-6 bg-gradient-to-r from-moss-light to-moss-medium
                            text-parchment font-mono text-sm uppercase tracking-widest
                            rounded-lg transition-all duration-300"
                    >
                        🎁 Ver Cupón
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBackToModeSelect}
                        className="py-3 px-6 bg-moss-medium/40 hover:bg-moss-medium/60
                            text-parchment font-mono text-sm uppercase tracking-widest
                            rounded-lg transition-all duration-300"
                    >
                        ← Volver
                    </motion.button>
                </div>
            </div>
        );
    }

    // === MARI MODE: Intro ===
    if (gameState.phase === 'intro') {
        return (
            <IntroScreen
                title={config.introTitle}
                message={config.introMessage}
                hint={config.introHint}
                onStart={handleStartGame}
                onBack={handleBackToModeSelect}
            />
        );
    }

    // === MARI MODE: Collecting clues ===
    if (gameState.phase === 'collecting') {
        const currentPlayer = config.players[gameState.currentPlayerIndex];
        const isCurrentCompleted = gameState.completedPlayerIndices.includes(gameState.currentPlayerIndex);

        return (
            <main className="min-h-screen flex flex-col items-center p-4 md:p-6 pt-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-4"
                >
                    <h1 className="text-2xl md:text-3xl font-bold text-parchment mb-1">
                        🎭 Recopila las Pistas
                    </h1>
                    <p className="text-moss-accent font-mono text-xs uppercase tracking-widest">
                        Pregunta a cada jugador
                    </p>
                </motion.div>

                {/* Vista general de jugadores */}
                <PlayerOverview
                    players={config.players}
                    currentIndex={gameState.currentPlayerIndex}
                    completedIndices={gameState.completedPlayerIndices}
                    onSelectPlayer={handleSelectPlayer}
                />

                {/* Área de contenido principal */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={gameState.currentPlayerIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-lg"
                    >
                        {/* Display del jugador actual */}
                        <HintDisplay
                            player={currentPlayer}
                            stageNumber={gameState.currentPlayerIndex + 1}
                            totalStages={totalPlayers}
                        />

                        {/* Input para la pista o mensaje de completado */}
                        {isCurrentCompleted ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center p-4 bg-green-600/20 border border-green-500/50 rounded-xl"
                            >
                                <p className="text-green-400 font-mono">
                                    ✓ Pista ya recopilada: &quot;{currentPlayer.clue}&quot;
                                </p>
                                <p className="text-moss-accent text-sm mt-2">
                                    Selecciona otro jugador de arriba
                                </p>
                            </motion.div>
                        ) : (
                            <SecretInput
                                onCorrect={handleClueSubmitted}
                                correctPhrase={currentPlayer.clue}
                                playerName={currentPlayer.name}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Progreso */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-center"
                >
                    <p className="text-moss-light text-sm font-mono">
                        {gameState.completedPlayerIndices.length} de {totalPlayers} pistas recopiladas
                    </p>
                </motion.div>

                <button
                    onClick={handleBackToModeSelect}
                    className="mt-4 text-moss-light/40 text-xs font-mono hover:text-moss-accent transition-colors duration-300"
                >
                    ← Volver al inicio
                </button>
            </main>
        );
    }

    // === Transición: Recopilación → Selección del impostor ===
    if (gameState.phase === 'transition-to-selecting') {
        return (
            <main className="min-h-screen">
                <StageTransition
                    emoji="🎉"
                    title="¡Todas las pistas recopiladas!"
                    message="Buen trabajo, chiquitina. Ya tienes toda la información. Ahora observa bien las pistas y descubre quién es el impostor."
                    buttonText="Continuar →"
                    onContinue={() => setGameState({ ...gameState, phase: 'selecting' })}
                />
            </main>
        );
    }

    // === Transición: Impostor identificado → Adivinar temática ===
    if (gameState.phase === 'transition-to-guessing') {
        return (
            <main className="min-h-screen">
                <StageTransition
                    emoji="🕵️‍♀️"
                    title="¡Impostor descubierto!"
                    message="¡Lograste identificar al impostor! Buen trabajo, chiquitina. Ahora queda el último reto: ¿cuál era la categoría secreta?"
                    buttonText="Continuar →"
                    onContinue={() => setGameState({ ...gameState, phase: 'guessing' })}
                />
            </main>
        );
    }

    // === Seleccionando al impostor ===
    if (gameState.phase === 'selecting') {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
                <ImpostorSelector
                    players={config.players}
                    onSelect={handleImpostorSelected}
                    excludedIndices={gameState.wrongGuesses}
                    wrongGuessName={gameState.lastWrongGuessName}
                />
                <button
                    onClick={handleBackToModeSelect}
                    className="mt-6 text-moss-light/40 text-xs font-mono hover:text-moss-accent transition-colors duration-300"
                >
                    ← Volver al inicio
                </button>
            </main>
        );
    }

    // === Adivinando la temática ===
    if (gameState.phase === 'guessing') {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
                <ThemeInput
                    correctTheme={config.theme}
                    players={config.players}
                    impostorIndex={realImpostorIndex}
                    onCorrect={handleThemeCorrect}
                    onWrong={() => { }}
                />
                <button
                    onClick={handleBackToModeSelect}
                    className="mt-6 text-moss-light/40 text-xs font-mono hover:text-moss-accent transition-colors duration-300"
                >
                    ← Volver al inicio
                </button>
            </main>
        );
    }

    // === Victoria → Gift Coupon ===
    if (gameState.phase === 'victory') {
        return (
            <GiftCoupon
                onRestart={handleReset}
                onViewStages={handleViewStages}
            />
        );
    }

    // === Derrota ===
    if (gameState.phase === 'defeat') {
        return (
            <div className="min-h-screen overflow-hidden">
                <FinalMessage
                    isVictory={false}
                    message={config.finalMessage}
                    impostor={config.players[realImpostorIndex]}
                    theme={config.theme}
                    onRestart={handleReset}
                />
            </div>
        );
    }

    // === Revisando pistas ===
    if (gameState.phase === 'reviewing') {
        const reviewPlayer = config.players[reviewingStage];
        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-parchment mb-2">
                        📋 Revisando Pistas
                    </h1>
                </motion.div>

                {/* Indicador de progreso */}
                <ProgressIndicator
                    currentStage={reviewingStage + 1}
                    totalStages={totalPlayers}
                />

                {/* Vista de etapa */}
                <AnimatePresence mode="wait">
                    <CompletedStageView
                        key={reviewingStage}
                        stage={{
                            phrase: reviewPlayer.clue,
                            hint: `Pista de ${reviewPlayer.name}`,
                            playerName: reviewPlayer.name,
                            playerPhoto: reviewPlayer.photo,
                            isImpostor: reviewPlayer.isImpostor
                        }}
                        stageNumber={reviewingStage + 1}
                        totalStages={totalPlayers}
                        onPrevious={handlePreviousStage}
                        onNext={handleNextStage}
                        onGoToFinal={handleGoToFinal}
                        hasPrevious={reviewingStage > 0}
                        hasNext={reviewingStage < totalPlayers - 1}
                    />
                </AnimatePresence>

                <button
                    onClick={handleBackToModeSelect}
                    className="mt-6 text-moss-light/40 text-xs font-mono hover:text-moss-accent transition-colors duration-300"
                >
                    ← Volver al inicio
                </button>
            </main>
        );
    }

    return null;
}
