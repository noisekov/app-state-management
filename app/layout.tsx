import type { Metadata } from 'next';
import '../styles/globals.css';
import '../styles/index.css';

export const metadata: Metadata = {
    title: 'Pokemon',
    description: 'Pokemons Application for education',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
