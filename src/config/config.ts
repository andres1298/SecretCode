export interface Stage {
    phrase: string;
    hint: string;
}

export interface FinalMessage {
    title: string;
    subtitle: string;
    message: string;
}

export const config = {
    // Frases secretas y sus hints - 5 etapas
    stages: [
        {
            phrase: "codigo-alfa",
            hint: "El nombre de nuestro primer proyecto juntos..."
        },
        {
            phrase: "primavera-2024",
            hint: "La estación y el año en que todo comenzó..."
        },
        {
            phrase: "cafe-con-leche",
            hint: "Tu bebida favorita cuando nos conocimos..."
        },
        {
            phrase: "mil-estrellas",
            hint: "Lo que prometimos contar aquella noche..."
        },
        {
            phrase: "te-quiero",
            hint: "Las palabras que siempre quiero decirte..."
        },
    ] as Stage[],

    // Mensaje final de felicitación
    finalMessage: {
        title: "¡Misión Cumplida, Detective!",
        subtitle: "Has descifrado todos los códigos secretos",
        message: "Cada pista te trajo hasta aquí porque cada momento contigo es un tesoro que vale la pena descubrir. Feliz San Valentín ❤️"
    } as FinalMessage,

    // URLs de imágenes placeholder para el collage (20 imágenes)
    images: [
        "https://picsum.photos/seed/1/400/300",
        "https://picsum.photos/seed/2/400/300",
        "https://picsum.photos/seed/3/400/300",
        "https://picsum.photos/seed/4/400/300",
        "https://picsum.photos/seed/5/400/300",
        "https://picsum.photos/seed/6/400/300",
        "https://picsum.photos/seed/7/400/300",
        "https://picsum.photos/seed/8/400/300",
        "https://picsum.photos/seed/9/400/300",
        "https://picsum.photos/seed/10/400/300",
        "https://picsum.photos/seed/11/400/300",
        "https://picsum.photos/seed/12/400/300",
        "https://picsum.photos/seed/13/400/300",
        "https://picsum.photos/seed/14/400/300",
        "https://picsum.photos/seed/15/400/300",
        "https://picsum.photos/seed/16/400/300",
        "https://picsum.photos/seed/17/400/300",
        "https://picsum.photos/seed/18/400/300",
        "https://picsum.photos/seed/19/400/300",
        "https://picsum.photos/seed/20/400/300",
    ],
};
