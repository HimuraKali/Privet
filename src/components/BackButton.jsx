import { Link } from 'react-router-dom'

export default function BackButton({ to = '/home' }) {
  return (
    <Link
      to={to}
      className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-[var(--theme-text)] transition hover:bg-white/60"
    >
      <span aria-hidden>←</span>
      Назад
    </Link>
  )
}
