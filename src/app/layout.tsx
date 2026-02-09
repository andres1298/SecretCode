import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Proyecto Secreto | Misión Especial',
    description: 'Una misión secreta te espera. ¿Podrás descifrar todos los códigos?',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    )
}
