'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

interface GiftCouponProps {
    onRestart?: () => void;
    onViewStages?: () => void;
}

export default function GiftCoupon({ onRestart, onViewStages }: GiftCouponProps) {
    const [showCoupon, setShowCoupon] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const couponRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowCoupon(true), 1200);
        return () => clearTimeout(timer);
    }, []);

    const handleDownload = useCallback(async () => {
        if (!couponRef.current || isDownloading) return;
        setIsDownloading(true);

        try {
            const { toPng } = await import('html-to-image');
            const dataUrl = await toPng(couponRef.current, {
                quality: 1,
                pixelRatio: 3,
                backgroundColor: '#0a0a0a',
            });

            // Convert data URL to blob
            const res = await fetch(dataUrl);
            const blob = await res.blob();
            const file = new File([blob], 'cupon-tatuaje.png', { type: 'image/png' });

            // Try Web Share API first (works great on mobile)
            if (navigator.share && navigator.canShare?.({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'Cupón de Tatuaje',
                });
            } else {
                // Desktop fallback: download via link
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = 'cupon-tatuaje.png';
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
        } catch (err) {
            // If user cancels share, that's okay
            if ((err as Error)?.name !== 'AbortError') {
                console.error('Error downloading coupon:', err);
            }
        } finally {
            setIsDownloading(false);
        }
    }, [isDownloading]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Floating particles background */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-gold-accent/20"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                            y: typeof window !== 'undefined' ? window.innerHeight + 20 : 820,
                            opacity: 0
                        }}
                        animate={{
                            y: -20,
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: 'linear'
                        }}
                    />
                ))}
            </div>

            {/* Initial celebration */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 150 }}
                className="text-center mb-6"
            >
                <motion.div
                    animate={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-6xl mb-4"
                >
                    🏆
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold text-gold-accent mb-2">
                    ¡Lo lograste!
                </h1>
                <p className="text-moss-accent text-sm font-mono uppercase tracking-widest">
                    Resolviste el misterio
                </p>
            </motion.div>

            {/* The tattoo-style coupon */}
            {showCoupon && (
                <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: 90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-lg relative"
                >
                    <div
                        ref={couponRef}
                        className="relative rounded-2xl overflow-hidden"
                        style={{
                            background: 'linear-gradient(145deg, rgba(15, 15, 15, 0.95) 0%, rgba(25, 25, 25, 0.9) 50%, rgba(15, 15, 15, 0.95) 100%)',
                            border: '2px solid rgba(200, 200, 200, 0.15)',
                        }}
                    >
                        {/* Top ornamental tattoo border */}
                        <div className="flex justify-center py-4"
                            style={{ borderBottom: '1px solid rgba(200, 200, 200, 0.1)' }}
                        >
                            <p
                                className="font-mono text-xs tracking-[0.4em] uppercase"
                                style={{ color: 'rgba(200, 200, 200, 0.35)' }}
                            >
                                ✦ — cupón de regalo — ✦
                            </p>
                        </div>

                        {/* Main coupon body */}
                        <div className="px-10 py-10 text-center relative">
                            {/* Decorative side lines (tattoo style) */}
                            <div className="absolute left-4 top-6 bottom-6 flex flex-col justify-between items-center">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="w-px h-4" style={{ background: 'rgba(200,200,200,0.08)' }} />
                                ))}
                            </div>
                            <div className="absolute right-4 top-6 bottom-6 flex flex-col justify-between items-center">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="w-px h-4" style={{ background: 'rgba(200,200,200,0.08)' }} />
                                ))}
                            </div>

                            {/* Tattoo machine icon */}
                            <div className="mb-5">
                                <span className="text-5xl">🖤</span>
                            </div>

                            {/* Main text — tattoo script style */}
                            <h2
                                className="text-2xl md:text-3xl font-bold mb-4 leading-tight"
                                style={{
                                    color: '#e8e8e8',
                                    fontFamily: 'Georgia, serif',
                                    fontStyle: 'italic',
                                    letterSpacing: '0.02em',
                                }}
                            >
                                Este cuponcito es válido para el tatuaje que gustes tontiluski
                            </h2>

                            {/* Ornamental divider */}
                            <div
                                className="h-px mx-auto mb-5 w-1/2"
                                style={{ background: 'linear-gradient(to right, transparent, rgba(200,200,200,0.25), transparent)' }}
                            />

                            {/* Details */}
                            <p
                                className="text-sm mb-2 leading-relaxed font-mono"
                                style={{ color: 'rgba(200, 200, 200, 0.5)' }}
                            >
                                Este cupón no tiene fecha de vencimiento.
                            </p>

                            {/* Personal message */}
                            <p
                                className="text-sm"
                                style={{
                                    color: 'rgba(200, 200, 200, 0.6)',
                                    fontFamily: 'Georgia, serif',
                                    fontStyle: 'italic',
                                }}
                            >
                                Feliz San Valentín, chiquitina ✨
                            </p>
                        </div>

                        {/* Bottom ornamental tattoo border */}
                        <div className="flex justify-center py-3"
                            style={{ borderTop: '1px solid rgba(200, 200, 200, 0.1)' }}
                        >
                            <p className="font-mono text-xs" style={{ color: 'rgba(200,200,200,0.15)', letterSpacing: '0.5em' }}>
                                ✦✦✦
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Action buttons */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
            >
                {showCoupon && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="py-3 px-6 bg-gold-accent/20 hover:bg-gold-accent/30
                            text-gold-accent font-mono text-sm uppercase tracking-widest
                            rounded-lg border border-gold-accent/40 transition-all duration-300
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDownloading ? '⏳ Descargando...' : '📥 Descargar Cupón'}
                    </motion.button>
                )}
                {onViewStages && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onViewStages}
                        className="py-3 px-6 bg-moss-medium/80 hover:bg-moss-light
                            text-parchment font-mono text-sm uppercase tracking-widest
                            rounded-lg border border-gold-accent/30 transition-all duration-300"
                    >
                        📋 Revisar Pistas
                    </motion.button>
                )}
                {onRestart && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onRestart}
                        className="py-3 px-6 bg-gradient-to-r from-moss-light to-moss-medium
                            hover:from-moss-medium hover:to-moss-light
                            text-parchment font-mono text-sm uppercase tracking-widest
                            rounded-lg transition-all duration-300"
                    >
                        🔄 Volver al inicio
                    </motion.button>
                )}
            </motion.div>
        </div>
    );
}
