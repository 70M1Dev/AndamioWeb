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
import { INSTAGRAM } from '@/lib/datos';

// Ficha de la empresa para buscadores y asistentes de IA: tienen que coincidir
// con los datos de Google Business Profile y de las redes.
const datosEstructurados = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://andamioweb.com/#empresa',
  name: 'Andamio Web',
  url: 'https://andamioweb.com/',
  image: 'https://andamioweb.com/og.png',
  description: 'Diseño y desarrollo de landings empresariales, tiendas online y webs con sistema de reservas para negocios de Uruguay.',
  telephone: '+59894331117',
  address: { '@type': 'PostalAddress', addressLocality: 'Montevideo', addressCountry: 'UY' },
  areaServed: [
    { '@type': 'City', name: 'Montevideo' },
    { '@type': 'AdministrativeArea', name: 'Canelones' },
    { '@type': 'Country', name: 'Uruguay' },
  ],
  knowsLanguage: 'es',
  sameAs: [INSTAGRAM],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados).replace(/</g, '\\u003c') }}
      />
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
