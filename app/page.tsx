import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import WhatsAppFlotante from '@/components/WhatsAppFlotante';
import Intro from '@/components/efectos/Intro';
import Beneficios from '@/components/secciones/Beneficios';
import Caso from '@/components/secciones/Caso';
import Cinta from '@/components/secciones/Cinta';
import Cta from '@/components/secciones/Cta';
import Demo from '@/components/secciones/Demo';
import Faq from '@/components/secciones/Faq';
import Hero from '@/components/secciones/Hero';
import Planes from '@/components/secciones/Planes';
import Proceso from '@/components/secciones/Proceso';

export default function Home() {
  return (
    <>
      <Intro />
      <Navbar />
      <main>
        <Hero />
        <Cinta />
        <Beneficios />
        <Planes />
        <Caso />
        <Demo />
        <Proceso />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <WhatsAppFlotante />
    </>
  );
}
