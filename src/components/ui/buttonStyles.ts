export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full font-display font-semibold tracking-tight transition duration-300 ease-out select-none'

const variants: Record<ButtonVariant, string> = {
  primary:
    'from-glow-300 via-glow-400 to-glow-500 text-night-950 shadow-[0_10px_40px_-12px_rgba(247,172,31,0.75)] bg-linear-to-br hover:shadow-[0_14px_50px_-10px_rgba(247,172,31,0.9)] hover:brightness-108 active:brightness-95',
  secondary:
    'border border-white/15 bg-white/5 text-mist-100 backdrop-blur-sm hover:border-glow-400/45 hover:bg-white/10 hover:text-white',
}

const sizes: Record<ButtonSize, string> = {
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-7 text-base sm:px-9',
}

/** Shared button/link styling so anchors and buttons stay visually identical. */
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className = '',
): string {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(' ')
}
