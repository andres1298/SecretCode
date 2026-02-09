'use client';

import { motion } from 'framer-motion';

interface ImageCarouselProps {
    images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
    // Dividir imágenes en 4 filas
    const rows = [
        images.slice(0, 5),
        images.slice(5, 10),
        images.slice(10, 15),
        images.slice(15, 20),
    ];

    // Velocidades diferentes para cada fila (en segundos)
    const durations = [60, 45, 35, 25];

    return (
        <div className="fixed inset-0 overflow-hidden -z-10">
            <div className="absolute inset-0 flex flex-col justify-evenly py-4">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="relative h-[22%] overflow-hidden">
                        <motion.div
                            className="flex gap-4 absolute"
                            animate={{
                                x: [0, '-50%'],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                    duration: durations[rowIndex],
                                    ease: 'linear',
                                },
                            }}
                        >
                            {/* Duplicar imágenes para loop infinito */}
                            {[...row, ...row].map((src, imgIndex) => (
                                <div
                                    key={`${rowIndex}-${imgIndex}`}
                                    className="relative flex-shrink-0 w-64 h-full rounded-lg overflow-hidden shadow-lg"
                                >
                                    <img
                                        src={src}
                                        alt={`Recuerdo ${imgIndex + 1}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    {/* Overlay con gradiente */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-moss-dark/40 to-transparent" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Overlay general para mejorar legibilidad del mensaje */}
            <div className="absolute inset-0 bg-moss-dark/50" />
        </div>
    );
}
