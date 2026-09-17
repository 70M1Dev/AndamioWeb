'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Lightformer, PerformanceMonitor, Preload, RoundedBox, Sparkles } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { useEffect, useMemo, useRef, useState } from 'react';
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

const Y = new THREE.Vector3(0, 1, 0);
const tmp = new THREE.Object3D();

type Reloj = { current: number };

// Reloj de la animación: arranca después de la intro y de unos cuadros de
// calentamiento (compilación de shaders), y nunca avanza más de 1/30 s por
// cuadro. Si el celular se traba, el armado se frena en vez de saltar.
function Tiempo({ reloj, inicio }: { reloj: Reloj; inicio: number }) {
  const cuadros = useRef(0);
  useFrame(({ clock }, dt) => {
    if (++cuadros.current < 4 || clock.elapsedTime < inicio) return;
    reloj.current += Math.min(dt, 1 / 30);
  });
  return null;
}

// Todas las piezas de un tipo en un solo InstancedMesh: una llamada de dibujo
// en vez de una por pieza. Deja de actualizar cuando terminó de armarse.
function Piezas({ piezas, tipo, geo, mat, reloj, sombras }: {
  piezas: Pieza[]; tipo: Tipo; geo: THREE.BufferGeometry; mat: THREE.Material; reloj: Reloj; sombras: boolean;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const terminado = useRef(false);
  const lista = useMemo(() => piezas.filter(p => p.tipo === tipo).map(p => ({
    ...p,
    largo: p.a.distanceTo(p.b),
    quat: new THREE.Quaternion().setFromUnitVectors(Y, p.b.clone().sub(p.a).normalize()),
  })), [piezas, tipo]);

  useFrame(() => {
    const m = ref.current;
    if (!m || terminado.current) return;
    let todas = true;
    lista.forEach((p, i) => {
      const t = (reloj.current - p.delay) / 0.7;
      if (t < 1) todas = false;
      tmp.quaternion.identity();
      if (tipo === 'caño' || tipo === 'riostra') {
        const r = tipo === 'caño' ? 0.055 : 0.035;
        tmp.position.copy(p.a);
        tmp.quaternion.copy(p.quat);
        tmp.scale.set(r, Math.max(p.largo * ease(t), 0.0001), r);
      } else if (tipo === 'nudo') {
        tmp.position.copy(p.a);
        tmp.scale.setScalar(Math.max(0.095 * easeBack(t), 0.0001));
      } else {
        const k = ease(t);
        tmp.position.set((p.a.x + p.b.x) / 2, p.a.y + 0.04 + (1 - k) * 1.5, 0);
        tmp.scale.set(Math.max(p.largo * 0.96 * k, 0.0001), 0.06, FONDO * 1.7);
      }
      tmp.updateMatrix();
      m.setMatrixAt(i, tmp.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
    terminado.current = todas;
  });

  return <instancedMesh ref={ref} args={[geo, mat, lista.length]} castShadow={sombras} frustumCulled={false} />;
}

// La web que se arma adentro del andamio
function Pagina({ reloj }: { reloj: Reloj }) {
  const grupo = useRef<THREE.Group>(null);
  const barras = useRef<(THREE.Mesh | null)[]>([]);
  const terminado = useRef(false);

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

  useFrame(() => {
    if (terminado.current) return;
    const t = reloj.current - 1.6;
    terminado.current = t > 2;
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

function Andamio({ inicio, movil }: { inicio: number; movil: boolean }) {
  const piezas = useMemo(armarPiezas, []);
  const reloj = useRef(0);
  const grupo = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  const angosto = viewport.aspect < 1;

  // En celular, caños y nudos con menos caras: a ese tamaño no se nota.
  const geos = useMemo(() => ({
    caño: new THREE.CylinderGeometry(1, 1, 1, movil ? 8 : 14).translate(0, 0.5, 0),
    nudo: new THREE.SphereGeometry(1, movil ? 10 : 16, movil ? 8 : 12),
    tabla: new THREE.BoxGeometry(1, 1, 1),
  }), [movil]);

  const mats = useMemo<Record<Tipo, THREE.Material>>(() => ({
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
    const entrada = ease(reloj.current / 2.5);
    const objetivoY = -0.55 + (1 - entrada) * -1.2 + mouse.current.x * 0.35 + scroll * 1.2;
    const objetivoX = mouse.current.y * 0.08 + scroll * 0.25;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, objetivoY + Math.sin(clock.elapsedTime * 0.25) * 0.08, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, objetivoX, 3, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, -2.3 - scroll * 1.5, 4, dt);
  });

  return (
    <group position={[angosto ? 0 : 2.6, 0, angosto ? -3 : 0]}>
      <group ref={grupo}>
        {/* Tiempo va primero para que su useFrame corra antes que el de las piezas */}
        <Tiempo reloj={reloj} inicio={inicio} />
        <Piezas piezas={piezas} tipo="caño" geo={geos.caño} mat={mats.caño} reloj={reloj} sombras={!movil} />
        <Piezas piezas={piezas} tipo="riostra" geo={geos.caño} mat={mats.riostra} reloj={reloj} sombras={!movil} />
        <Piezas piezas={piezas} tipo="nudo" geo={geos.nudo} mat={mats.nudo} reloj={reloj} sombras={!movil} />
        <Piezas piezas={piezas} tipo="tabla" geo={geos.tabla} mat={mats.tabla} reloj={reloj} sombras={!movil} />
        <Pagina reloj={reloj} />
        <pointLight position={[0, ALTO * 1.5, 1.4]} intensity={2.5} distance={4} color="#FFC53D" />
      </group>
    </group>
  );
}

const esMovil = () => matchMedia('(max-width: 767px), (pointer: coarse)').matches;

export default function EscenaAndamio({ inicio = 0 }: { inicio?: number }) {
  // En celular se apagan el bloom y las sombras (lo más caro por cuadro) y se
  // limita la densidad de píxeles; si aun así no da abasto, baja a 1.
  const [movil] = useState(esMovil);
  const [dpr, setDpr] = useState(movil ? 1.5 : 2);

  return (
    <Canvas
      shadows={!movil}
      dpr={[1, dpr]}
      camera={{ position: [0, 0.6, 9.5], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      {movil && <PerformanceMonitor onDecline={() => setDpr(1)} />}
      <Preload all />
      <fog attach="fog" args={['#0A0F18', 9, 20]} />
      <ambientLight intensity={movil ? 0.4 : 0.25} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} castShadow={!movil} shadow-mapSize={[1024, 1024]} />
      <spotLight position={[-6, 6, 4]} angle={0.5} penumbra={1} intensity={60} color="#F5B400" />

      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.35}>
        <Andamio inicio={inicio} movil={movil} />
      </Float>

      <Sparkles count={movil ? 25 : 70} scale={[14, 8, 6]} size={2.2} speed={0.35} color="#FFC53D" opacity={0.7} />
      {!movil && <ContactShadows position={[2.6, -2.35, 0]} opacity={0.55} scale={14} blur={2.6} far={6} color="#000" />}

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 5, -6]} scale={[12, 4, 1]} />
        <Lightformer form="rect" intensity={2} color="#FFC53D" position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="ring" intensity={4} position={[6, 3, 4]} scale={2} />
      </Environment>

      {!movil && (
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.85} luminanceSmoothing={0.2} />
          <Vignette offset={0.3} darkness={0.55} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
