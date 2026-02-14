'use client';

export interface Player {
    name: string;
    photo: string;
    clue: string;
    isImpostor: boolean;
}

export interface FinalMessage {
    winTitle: string;
    winSubtitle: string;
    winMessage: string;
    loseTitle: string;
    loseSubtitle: string;
    loseMessage: string;
}

export interface GameConfig {
    theme: string;
    introTitle: string;
    introMessage: string;
    introHint: string;
    players: Player[];
    finalMessage: FinalMessage;
    images: string[];
}

export const config: GameConfig = {
    // La temática secreta que deben adivinar
    theme: "Tatuaje",

    // Pantalla de introducción
    introTitle: "🎭 El Impostor — Mari Special Edition",
    introMessage: "Hay un impostor entre tus amigos. Todos conocen la temática secreta… excepto uno de ellos. Recopila las pistas de cada jugador y descubre quién es el impostor.",
    introHint: "Psst… si logras resolver todo, hay una sorpresita esperándote al final ✨",

    // Jugadores con sus pistas
    players: [
        {
            name: "Pondi",
            photo: "/pondi.jpeg",
            clue: "Adicción",
            isImpostor: false
        },
        {
            name: "Sebas",
            photo: "/sebas.jpeg",
            clue: "Colombia",
            isImpostor: false
        },
        {
            name: "Cami",
            photo: "/cami.jpeg",
            clue: "Marca",
            isImpostor: false
        },
        {
            name: "AleJ",
            photo: "/alej.jpeg",
            clue: "Piel",
            isImpostor: false
        },
        {
            name: "AleQ",
            photo: "/aleq.jpeg",
            clue: "iPod",
            isImpostor: false
        },
        {
            name: "MariU",
            photo: "/mariu.jpeg",
            clue: "Vaquita",
            isImpostor: false
        },
        {
            name: "Isa",
            photo: "/isa.jpeg",
            clue: "3",
            isImpostor: false
        },
        {
            name: "Alonso",
            photo: "/alonso.jpeg",
            clue: "Geométrico",
            isImpostor: false
        },
        {
            name: "Lu",
            photo: "/lu.jpeg",
            clue: "Rauw Alejandro",
            isImpostor: false
        },
        {
            name: "Ange",
            photo: "/ange.jpeg",
            clue: "Expresión",
            isImpostor: true
        },
        {
            name: "Ka",
            photo: "/ka.jpeg",
            clue: "Dolor",
            isImpostor: false
        },
        {
            name: "Lina",
            photo: "/lina.jpeg",
            clue: "Capas",
            isImpostor: false
        },
    ],

    // Mensajes finales
    finalMessage: {
        winTitle: "🏆 ¡Victoria!",
        winSubtitle: "Has descubierto al impostor",
        winMessage: "Excelente trabajo, chiquitina. Has identificado al impostor y descubierto la temática secreta.",
        loseTitle: "❌ ¡Perdiste!",
        loseSubtitle: "El impostor ganó esta vez",
        loseMessage: "El impostor logró pasar desapercibido. ¡Inténtalo de nuevo!"
    },

    // Imágenes para el carrusel de victoria
    images: [
        "/pondi.jpeg",
        "/sebas.jpeg",
        "/cami.jpeg",
        "/alej.jpeg",
        "/aleq.jpeg",
        "/mariu.jpeg",
        "/isa.jpeg",
        "/alonso.jpeg",
        "/lu.jpeg",
        "/ange.jpeg",
        "/ka.jpeg",
        "/lina.jpeg",
    ],
};
