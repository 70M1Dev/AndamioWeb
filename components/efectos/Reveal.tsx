'use client';

import { motion, type HTMLMotionProps } from 'motion/react';

// Aparece al entrar en pantalla: sube, se enfoca y gana opacidad.
export default function Reveal({ delay = 0, y = 40, ...props }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  );
}
