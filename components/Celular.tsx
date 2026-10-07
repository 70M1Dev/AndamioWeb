// Celular dibujado con CSS: canto metálico, botones, isla, barra de estado e
// indicador de inicio. Las medidas del marco van en cqw (porcentaje del ancho
// del propio celular), así se ve igual de proporcionado a cualquier tamaño.
// La pantalla es de 390x844: la barra de estado ocupa 54 y las capturas, el
// resto. Cambia de captura con un fundido cuando cambia `activa`.

type Pantalla = { src: string; barra: string };

// Decide si sobre ese color van letras claras u oscuras.
const esOscuro = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 < 150;
};

const BOTON = 'absolute w-[1.2cqw] bg-[#3A3E48]';

export default function Celular({ pantallas, activa, etiqueta }: { pantallas: Pantalla[]; activa: number; etiqueta: string }) {
  const barra = pantallas[activa].barra;
  const tinta = esOscuro(barra) ? '#FFFFFF' : '#0A0F18';
  const fundido = { transition: 'fill .7s' };

  return (
    <div role="img" aria-label={etiqueta} className="[container-type:inline-size]">
      <div className="relative rounded-[16.6cqw] bg-[linear-gradient(140deg,#9499A4,#3A3E48_16%,#15181E_50%,#2B2F38_84%,#7B808B)] p-[1.1cqw] shadow-2xl shadow-black/45">
        {/* Botones del canto: acción, volumen y encendido */}
        <span className={`${BOTON} -left-[0.8cqw] top-[20%] h-[4.5%] rounded-l-[0.8cqw]`} />
        <span className={`${BOTON} -left-[0.8cqw] top-[28.5%] h-[8.5%] rounded-l-[0.8cqw]`} />
        <span className={`${BOTON} -left-[0.8cqw] top-[39%] h-[8.5%] rounded-l-[0.8cqw]`} />
        <span className={`${BOTON} -right-[0.8cqw] top-[32%] h-[13%] rounded-r-[0.8cqw]`} />

        <div className="rounded-[15.5cqw] bg-[#05070A] p-[2.7cqw]">
          <div className="relative overflow-hidden rounded-[12.8cqw] bg-white" style={{ aspectRatio: '390 / 844' }}>
            <div className="absolute inset-x-0 bottom-0 top-[6.4%]">
              {pantallas.map((p, i) => (
                <img
                  key={p.src}
                  src={p.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${i === activa ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </div>

            {/* Barra de estado e isla, dibujadas sobre los 390 de ancho de la pantalla */}
            <svg aria-hidden="true" viewBox="0 0 390 54" className="absolute inset-x-0 top-0 block w-full">
              <rect width="390" height="54.5" style={{ fill: barra, ...fundido }} />
              <g style={{ fill: tinta, ...fundido }}>
                <text x="66" y="35.5" textAnchor="middle" fontSize="17" fontWeight="600">9:41</text>
                <rect x="291" y="30.5" width="3.2" height="4.5" rx="1" />
                <rect x="296" y="28.5" width="3.2" height="6.5" rx="1" />
                <rect x="301" y="26" width="3.2" height="9" rx="1" />
                <rect x="306" y="23.5" width="3.2" height="11.5" rx="1" />
                <path d="M320.5 35.5l-8.3-8.3a11.7 11.7 0 0 1 16.6 0z" />
                <rect x="334" y="24" width="24" height="11.5" rx="3.6" opacity=".35" />
                <rect x="336" y="26" width="20" height="7.5" rx="2" />
                <rect x="359.2" y="27.8" width="1.7" height="4" rx=".85" opacity=".4" />
              </g>
              <rect x="132" y="11" width="126" height="37" rx="18.5" fill="#05070A" />
            </svg>

            <span className="absolute bottom-[1%] left-1/2 h-[0.6%] w-[35%] -translate-x-1/2 rounded-full bg-ink-950/60" />
            {/* Reflejo del vidrio */}
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgb(255_255_255/.18),transparent_26%)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
