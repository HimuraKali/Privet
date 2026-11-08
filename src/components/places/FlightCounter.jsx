export default function FlightCounter({ current, total }) {
  return (
    <div className="pointer-events-none fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 md:block lg:right-10">
      <div className="glass rounded-2xl px-4 py-5 text-center shadow-lg">
        <p className="text-[10px] tracking-[0.25em] text-[var(--theme-text-muted)] uppercase">
          Рейс
        </p>
        <p className="font-display mt-1 text-3xl text-[var(--theme-text)]">
          {current}
          <span className="mx-1 text-lg text-[var(--theme-text-muted)]">из</span>
          {total}
        </p>
      </div>
    </div>
  )
}
