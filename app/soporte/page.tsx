import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Portal from './Portal';

export const metadata: Metadata = {
  title: 'Área de clientes — Andamio Web',
  description: 'Portal de soporte para clientes de Andamio Web.',
  robots: { index: false },
  alternates: { canonical: '/soporte' },
};

export default function Soporte() {
  return (
    <>
      <Navbar />
      <main>
        <Portal />
      </main>
      <Footer />
    </>
  );
}
