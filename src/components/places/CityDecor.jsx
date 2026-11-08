import { motion } from 'framer-motion'

export function BarcelonaDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Мозаичный узор */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, #ffb4a2 0 8px, transparent 9px),
            radial-gradient(circle at 60% 50%, #f4a5c0 0 6px, transparent 7px),
            radial-gradient(circle at 80% 20%, #ffd0a8 0 7px, transparent 8px),
            radial-gradient(circle at 40% 70%, #e890ae 0 5px, transparent 6px)
          `,
          backgroundSize: '90px 90px, 70px 70px, 110px 110px, 80px 80px',
        }}
      />
      {/* Силуэт Саграда */}
      <svg
        className="absolute bottom-0 left-[6%] h-[55%] w-auto opacity-40"
        viewBox="0 0 200 320"
        aria-hidden
      >
        <path
          fill="#5c3340"
          d="M100 10c8 30 12 55 10 80l8-20 6 35c20 10 28 40 22 75l12-15v40c-15 8-20 30-18 55H60c2-25-3-47-18-55v-40l12 15c-6-35 2-65 22-75l6-35 8 20c-2-25 2-50 10-80z"
        />
        <path fill="#5c3340" opacity="0.7" d="M70 200h60v120H70z" />
      </svg>
    </div>
  )
}

export function IrelandDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-[70%]">
        {[
          { bottom: '0%', h: '42%', color: '#5a9a6e', speed: 0 },
          { bottom: '18%', h: '38%', color: '#7fb892', speed: 0 },
          { bottom: '36%', h: '32%', color: '#a8d4b4', speed: 0 },
        ].map((hill, i) => (
          <div
            key={i}
            data-parallax={0.15 + i * 0.12}
            className="absolute inset-x-0 rounded-[100%] opacity-80"
            style={{
              bottom: hill.bottom,
              height: hill.h,
              background: `linear-gradient(180deg, ${hill.color}, color-mix(in srgb, ${hill.color} 70%, #2f4a3a))`,
              transform: `scaleX(${1.2 + i * 0.1})`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-transparent" />
      <div className="absolute inset-x-0 top-1/3 h-40 bg-white/20 blur-3xl" />
    </div>
  )
}

export function IcelandDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-x-0 top-0 h-[55%] opacity-70"
        style={{
          background:
            'linear-gradient(120deg, transparent 10%, #7ec8ff55 25%, #b8a6e888 45%, #7fffd455 60%, transparent 80%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-x-0 top-[10%] h-[40%] opacity-50 blur-xl"
        style={{
          background:
            'linear-gradient(100deg, transparent, #a78bfa66, #67e8f966, transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['100% 0%', '0% 0%', '100% 0%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export function BudapestDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a3558]/30 via-transparent to-[#1a2240]/50" />
      {/* Цепной мост */}
      <svg
        className="absolute bottom-[18%] left-1/2 h-auto w-[70%] -translate-x-1/2 opacity-50"
        viewBox="0 0 600 120"
        aria-hidden
      >
        <path
          fill="none"
          stroke="#f0c090"
          strokeWidth="3"
          d="M20 90 Q150 10 300 90 Q450 10 580 90"
        />
        <path fill="none" stroke="#f0c090" strokeWidth="4" d="M20 90h560" />
        {[80, 160, 240, 300, 360, 440, 520].map((x) => (
          <line key={x} x1={x} y1="90" x2={x} y2={x === 300 ? 35 : 55} stroke="#f0c090" strokeWidth="2" />
        ))}
        <rect x="280" y="28" width="40" height="62" rx="4" fill="#f0c090" opacity="0.85" />
      </svg>
      {/* Огни и отражения */}
      <div className="absolute inset-x-0 bottom-0 h-[22%]">
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className="absolute bottom-[40%] rounded-full bg-[#f0c090]"
            style={{
              left: `${6 + i * 5}%`,
              width: 4 + (i % 3),
              height: 4 + (i % 3),
              opacity: 0.4 + (i % 5) * 0.1,
              boxShadow: '0 0 10px #f0c090',
            }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#6a82c4]/35 to-transparent opacity-70" />
      </div>
    </div>
  )
}

export function ChinaDecor() {
  const lanterns = [
    { left: '8%', delay: 0, size: 1 },
    { left: '22%', delay: 0.4, size: 0.85 },
    { left: '75%', delay: 0.2, size: 1.1 },
    { left: '88%', delay: 0.7, size: 0.9 },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {lanterns.map((l, i) => (
        <motion.div
          key={i}
          className="absolute top-[8%]"
          style={{ left: l.left, scale: l.size }}
          animate={{ y: [0, 14, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: l.delay }}
        >
          <div className="mx-auto h-10 w-0.5 bg-[#c45a6e]/50" />
          <div
            className="h-14 w-10 rounded-full"
            style={{
              background: 'linear-gradient(180deg, #ff8aa0, #c45a6e)',
              boxShadow: '0 8px 24px rgba(196,90,110,0.45)',
            }}
          />
          <div className="mx-auto mt-0.5 h-3 w-3 rounded-full bg-[#e87890]" />
        </motion.div>
      ))}

      {/* Лепестки сакуры */}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-3 w-2 rounded-full bg-[#ffb7c5]"
          style={{ left: `${8 + i * 7}%`, top: '-5%', opacity: 0.7 }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, (i % 2 === 0 ? 40 : -30)],
            rotate: [0, 180 + i * 20],
          }}
          transition={{
            duration: 8 + (i % 5),
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  )
}

export default function CityDecor({ type }) {
  switch (type) {
    case 'barcelona':
      return <BarcelonaDecor />
    case 'ireland':
      return <IrelandDecor />
    case 'iceland':
      return <IcelandDecor />
    case 'budapest':
      return <BudapestDecor />
    case 'china':
      return <ChinaDecor />
    default:
      return null
  }
}
