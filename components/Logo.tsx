export function LogoMarca({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#F5B400" />
      <path d="M11 30V10M29 30V10M11 16h18M11 24h18M11 16l18 8" stroke="#101826" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMarca />
      <span className="leading-none">
        <span className="block font-extrabold text-lg tracking-tight">ANDAMIO</span>
        <span className="block text-[10px] tracking-[0.35em] text-white/60">WEB · UY</span>
      </span>
    </span>
  );
}
