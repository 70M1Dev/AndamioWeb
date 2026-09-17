'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Lightformer, RoundedBox, Sparkles } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Un andamio de 2 cuerpos x 3 niveles que se arma de abajo hacia arriba, con
// una "página web" adentro que se completa cuando termina la estructura.
// ---------------------------------------------------------------------------

const ANCHO = 2.1;      // largo de cada cuerpo
const FONDO = 0.75;     // mitad de la profundidad
const ALTO = 1.35;      // altura de cada nivel
const NIVELES = 3;
const XS = [-ANCHO, 0, ANCHO];
const ZS = [-FONDO, FONDO];
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

type Tipo = 'caño' | 'riostra' | 'tabla' | 'nudo';
type Pieza = { tipo: Tipo; a: THREE.Vector3; b: THREE.Vector3; delay: number };

function armarPiezas(): Pieza[] {
  const piezas: Pieza[] = [];
  const cima = NIVELES * ALTO + 0.35;
  const cuando = (y: number) => 0.2 + y * 0.42 + Math.random() * 0.15;

  // Parantes: crecen desde el piso
  for (const x of XS) for (const z of ZS) piezas.push({ tipo: 'caño', a: V(x, 0, z), b: V(x, cima, z), delay: 0.05 + Math.random() * 0.2 });

  for (let n = 1; n <= NIVELES; n++) {
    const y = n * ALTO;
    // Largueros de frente y de fondo
    for (const z of ZS) for (let i = 0; i < XS.length - 1; i++)
      piezas.push({ tipo: 'caño', a: V(XS[i], y, z), b: V(XS[i + 1], y, z), delay: cuando(y) });
    // Travesaños
    for (const x of XS) piezas.push({ tipo: 'caño', a: V(x, y, -FONDO), b: V(x, y, FONDO), delay: cuando(y) + 0.1 });
    // Riostras en diagonal, alternadas como en el logo
    for (let i = 0; i < XS.length - 1; i++) {
      const sube = (i + n) % 2 === 0;
      const y0 = y - ALTO;
      piezas.push({
        tipo: 'riostra',
        a: V(XS[i], sube ? y0 : y, FONDO + 0.06),
        b: V(XS[i + 1], sube ? y : y0, FONDO + 0.06),
        delay: cuando(y) + 0.2,
      });
      piezas.push({
        tipo: 'riostra',
        a: V(XS[i], sube ? y : y0, -FONDO - 0.06),
        b: V(XS[i + 1], sube ? y0 : y, -FONDO - 0.06),
        delay: cuando(y) + 0.25,
      });
    }
    // Plataformas: no en todos los cuerpos, para que se vea la web de adentro
    if (n !== 2) for (let i = 0; i < XS.length - 1; i++)
      piezas.push({ tipo: 'tabla', a: V(XS[i], y, 0), b: V(XS[i + 1], y, 0), delay: cuando(y) + 0.35 });
    // Nudos (abrazaderas)
    for (const x of XS) for (const z of ZS) piezas.push({ tipo: 'nudo', a: V(x, y, z), b: V(x, y, z), delay: cuando(y) + 0.05 });
  }
  return piezas;
}

const ease = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);
const easeBack = (t: number) => {
  const c = 1.9;
  const x = Math.min(Math.max(t, 0), 1) - 1;
  return 1 + (c + 1) * x * x * x + c * x * x;
};

// Cilindro de altura 1 con la base en el origen: escalar Y lo "estira".
const geoCaño = new THREE.CylinderGeometry(1, 1, 1, 14).translate(0, 0.5, 0);
const geoNudo = new THREE.SphereGeometry(1, 16, 12);
const geoTabla = new THREE.BoxGeometry(1, 1, 1);
const Y = new THREE.Vector3(0, 1, 0);

type Mats = Record<Tipo, THREE.Material>;

function PiezaMesh({ p, mats, inicio }: { p: Pieza; mats: Mats; inicio: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const largo = p.a.distanceTo(p.b);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(Y, p.b.clone().sub(p.a).normalize()), [p]);

  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const t = (clock.elapsedTime - inicio - p.delay) / 0.7;
    if (p.tipo === 'caño' || p.tipo === 'riostra') {
      const r = p.tipo === 'caño' ? 0.055 : 0.035;
      m.scale.set(r, Math.max(largo * ease(t), 0.0001), r);
    } else if (p.tipo === 'nudo') {
      m.scale.setScalar(Math.max(0.095 * easeBack(t), 0.0001));
    } else {
      const k = ease(t);
      m.scale.set(Math.max(largo * 0.96 * k, 0.0001), 0.06, FONDO * 1.7);
      m.position.set((p.a.x + p.b.x) / 2, p.a.y + 0.04 + (1 - k) * 1.5, 0);
    }
  });

  if (p.tipo === 'tabla')
    return <mesh ref={ref} geometry={geoTabla} material={mats.tabla} castShadow scale={0.0001} />;
  return (
    <mesh
      ref={ref}
      geometry={p.tipo === 'nudo' ? geoNudo : geoCaño}
      material={mats[p.tipo]}
      position={p.a}
      quaternion={p.tipo === 'nudo' ? undefined : quat}
      scale={0.0001}
      castShadow
    />
  );
}

// La web que se arma adentro del andamio
function Pagina({ inicio }: { inicio: number }) {
  const grupo = useRef<THREE.Group>(null);
  const barras = useRef<(THREE.Mesh | null)[]>([]);
  const desde = inicio + 1.6;

  // [x, y, ancho, alto, color, delay]
  const bloques: [number, number, number, number, string, number][] = [
    [-0.55, 0.62, 1.7, 0.2, '#1B2536', 0],
    [-0.35, 0.34, 2.1, 0.07, '#D4D4D4', 0.1],
    [-0.5, 0.2, 1.8, 0.07, '#D4D4D4', 0.15],
    [-0.95, -0.22, 0.95, 0.55, '#F5B400', 0.25],
    [0.05, -0.22, 0.95, 0.55, '#E5E5E5', 0.32],
    [1.05, -0.22, 0.95, 0.55, '#E5E5E5', 0.39],
    [-1.02, -0.74, 0.8, 0.2, '#101826', 0.5],
  ];

  useFrame(({ clock }) => {
    const t = clock.elapsedTime - desde;
    if (grupo.current) grupo.current.scale.setScalar(Math.max(easeBack(t / 0.8), 0.0001));
    barras.current.forEach((b, i) => {
      if (!b) return;
      const k = ease((t - 0.5 - bloques[i][5]) / 0.6);
      b.scale.x = Math.max(bloques[i][2] * k, 0.0001);
      b.position.x = bloques[i][0] - (bloques[i][2] * (1 - k)) / 2;
    });
  });

  return (
    <group ref={grupo} position={[0, ALTO * 1.5 + 0.1, 0]} scale={0.0001}>
      <RoundedBox args={[3.4, 2.1, 0.08]} radius={0.06} smoothness={4} castShadow>
        <meshStandardMaterial color="#FAF8F3" roughness={0.35} emissive="#FAF8F3" emissiveIntensity={0.05} />
      </RoundedBox>
      {/* barra del navegador */}
      <mesh position={[0, 0.9, 0.045]}>
        <planeGeometry args={[3.4, 0.28]} />
        <meshBasicMaterial color="#E9E6DF" />
      </mesh>
      {['#F87171', '#F5B400', '#4ADE80'].map((c, i) => (
        <mesh key={c} position={[-1.52 + i * 0.16, 0.9, 0.05]}>
          <circleGeometry args={[0.045, 20]} />
          <meshBasicMaterial color={c} toneMapped={false} />
        </mesh>
      ))}
      {bloques.map(([x, y, , h, color], i) => (
        <mesh key={i} ref={el => { barras.current[i] = el; }} position={[x, y, 0.05]} scale={[0.0001, 1, 1]}>
          <planeGeometry args={[1, h]} />
          <meshBasicMaterial color={color} toneMapped={color !== '#F5B400'} />
        </mesh>
      ))}
    </group>
  );
}

function Andamio({ inicio }: { inicio: number }) {
  const piezas = useMemo(armarPiezas, []);
  const grupo = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  const angosto = viewport.aspect < 1;

  const mats = useMemo<Mats>(() => ({
    caño: new THREE.MeshStandardMaterial({ color: '#C9D1DC', metalness: 0.95, roughness: 0.28 }),
    riostra: new THREE.MeshStandardMaterial({ color: '#F5B400', metalness: 0.4, roughness: 0.35, emissive: '#F5B400', emissiveIntensity: 0.9, toneMapped: false }),
    tabla: new THREE.MeshStandardMaterial({ color: '#2A3548', metalness: 0.2, roughness: 0.6 }),
    nudo: new THREE.MeshStandardMaterial({ color: '#FFC53D', metalness: 0.7, roughness: 0.2, emissive: '#F5B400', emissiveIntensity: 0.6 }),
  }), []);

  useEffect(() => {
    const mover = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / innerHeight) * 2 - 1;
    };
    addEventListener('pointermove', mover, { passive: true });
    return () => removeEventListener('pointermove', mover);
  }, []);

  useFrame(({ clock }, dt) => {
    const g = grupo.current;
    if (!g) return;
    const scroll = Math.min(scrollY / innerHeight, 1.5);
    const entrada = ease((clock.elapsedTime - inicio) / 2.5);
    const objetivoY = -0.55 + (1 - entrada) * -1.2 + mouse.current.x * 0.35 + scroll * 1.2;
    const objetivoX = mouse.current.y * 0.08 + scroll * 0.25;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, objetivoY + Math.sin(clock.elapsedTime * 0.25) * 0.08, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, objetivoX, 3, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, -2.3 - scroll * 1.5, 4, dt);
  });

  return (
    <group position={[angosto ? 0 : 2.6, 0, angosto ? -3 : 0]}>
      <group ref={grupo}>
        {piezas.map((p, i) => <PiezaMesh key={i} p={p} mats={mats} inicio={inicio} />)}
        <Pagina inicio={inicio} />
        <pointLight position={[0, ALTO * 1.5, 1.4]} intensity={2.5} distance={4} color="#FFC53D" />
      </group>
    </group>
  );
}

export default function EscenaAndamio({ inicio = 0 }: { inicio?: number }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.6, 9.5], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <fog attach="fog" args={['#0A0F18', 9, 20]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[-6, 6, 4]} angle={0.5} penumbra={1} intensity={60} color="#F5B400" />

      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.35}>
        <Andamio inicio={inicio} />
      </Float>

      <Sparkles count={70} scale={[14, 8, 6]} size={2.2} speed={0.35} color="#FFC53D" opacity={0.7} />
      <ContactShadows position={[2.6, -2.35, 0]} opacity={0.55} scale={14} blur={2.6} far={6} color="#000" />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 5, -6]} scale={[12, 4, 1]} />
        <Lightformer form="rect" intensity={2} color="#FFC53D" position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="ring" intensity={4} position={[6, 3, 4]} scale={2} />
      </Environment>

      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.85} luminanceSmoothing={0.2} />
        <Vignette offset={0.3} darkness={0.55} />
      </EffectComposer>
    </Canvas>
  );
}
