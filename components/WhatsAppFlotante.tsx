'use client';

import { motion } from 'motion/react';
import IconoWhatsApp from './IconoWhatsApp';
import { WA_CONSULTA } from '@/lib/datos';

export default function WhatsAppFlotante() {
  return (
    <motion.a
      href={WA_CONSULTA}
      target="_blank"
      rel="noopener"
      aria-label="Escribinos por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1FAF38] text-white shadow-xl shadow-black/30"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 2.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#1FAF38] opacity-30 [animation-duration:2.5s]" />
      <IconoWhatsApp className="relative h-7 w-7" />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink-900 opacity-0 shadow-lg transition group-hover:opacity-100">
        ¿Hablamos?
      </span>
    </motion.a>
  );
}
