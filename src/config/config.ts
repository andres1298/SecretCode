export interface Player {
    name: string;
    photo: string;
    clue: string;
    isImpostor: boolean;
}

export interface GameConfig {
    theme: string;
    introTitle: string;
    introMessage: string;
    introHint: string;
    players: Player[];
    finalMessage: {
        victory: string;
        defeat: string;
    };
    images: string[];
}

// Interfaz para las etapas completadas
export interface CompletedStage {
    phrase: string;
    hint: string;
    playerName: string;
    playerPhoto: string;
    isImpostor: boolean;
}

export const config: GameConfig = {
    // La temática secreta que deben adivinar
    theme: "Tatuaje",

    // Pantalla de introducción
    introTitle: "🎭 El Impostor",
    introMessage: "¡Eres la Game Master! Hay un impostor entre tus amigos: todos recibieron una categoría secreta… menos uno. Tu misión es preguntarle a cada persona la pista que le dieron a Pondi e ingresarla aquí. Así recopilarás toda la información necesaria para descubrir quién es el impostor.",
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
            name: "Isa",
            photo: "/isa.jpeg",
            clue: "3",
            isImpostor: false
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
        {
            name: "Ange",
            photo: "/ange.jpeg",
            clue: "Expresión",
            isImpostor: true
        },
        {
            name: "Lu",
            photo: "/lu.jpeg",
            clue: "Rauw Alejandro",
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
            name: "Alonso",
            photo: "/alonso.jpeg",
            clue: "Geométrico",
            isImpostor: false
        },
        {
            name: "MariU",
            photo: "/mariu.jpeg",
            clue: "Vaquita",
            isImpostor: false
        },
        {
            name: "Cami",
            photo: "/cami.jpeg",
            clue: "Marca",
            isImpostor: false
        },
    ],

    // Mensajes finales
    finalMessage: {
        victory: "¡Increíble! Descubriste al impostor y la temática secreta. ¡Eres una verdadera detective! 🎉",
        defeat: "El impostor logró pasar desapercibido esta vez..."
    },

    // Imágenes para el carrusel (fotos de jugadores)
    images: [
        "/pondi.jpeg",
        "/sebas.jpeg",
        "/ange.jpeg",
        "/ka.jpeg",
        "/lina.jpeg",
        "/isa.jpeg",
        "/lu.jpeg",
        "/alej.jpeg",
        "/aleq.jpeg",
        "/alonso.jpeg",
        "/mariu.jpeg",
        "/cami.jpeg"
    ],
};
