import ActCard from '../components/ActCard'
import PageTransition from '../components/PageTransition'
import usePetalsOnPage from '../hooks/usePetalsOnPage'

const ACTS = [
  {
    to: '/acts/music',
    roman: 'I',
    title: 'Музыка',
    accent: '#c4a8e0',
  },
  {
    to: '/acts/places',
    roman: 'II',
    title: 'Места',
    accent: '#8ec5f0',
  },
  {
    to: '/acts/cartoons',
    roman: 'III',
    title: 'Мультики',
    accent: '#f0b090',
  },
]

export default function HomePage() {
  usePetalsOnPage(true)

  return (
    <PageTransition>
      <main className="dreamy-bg relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <header className="mb-12 max-w-xl text-center md:mb-16">
          <h1 className="font-display text-5xl text-[var(--theme-text)] md:text-6xl">
            Выбери историю
          </h1>
        </header>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {ACTS.map((act, i) => (
            <ActCard key={act.to} {...act} delay={0.1 + i * 0.08} />
          ))}
        </div>
      </main>
    </PageTransition>
  )
}
