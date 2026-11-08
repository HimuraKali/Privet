import { useState } from 'react'

function FrameImage({ src }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex aspect-[3/4] w-full items-center justify-center rounded-md bg-gradient-to-b from-[#f7d5c4] via-[#f3b7c9] to-[#e7c4a2]">
        <span className="font-display text-5xl text-white/80">❀</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt=""
      className="aspect-[3/4] w-full rounded-md object-cover"
      onError={() => setFailed(true)}
    />
  )
}

export default function BookSpread({ cartoon, pageNumber, side }) {
  if (side === 'left') {
    return (
      <div className="book-page book-page-left">
        <div className="flex h-full items-center justify-center px-8 py-8 md:px-10">
          <div className="book-frame w-full max-w-[280px]">
            <FrameImage src={cartoon.image} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="book-page book-page-right">
      <div className="flex h-full flex-col justify-between px-8 py-10 md:px-12 md:py-14">
        <div>
          <p className="text-xs tracking-[0.28em] text-[#b08978] uppercase">Сказка</p>
          <h2 className="font-display mt-4 text-4xl leading-tight text-[#6a3a3a] md:text-5xl">
            {cartoon.title}
          </h2>
          <p className="font-display mt-8 text-xl leading-relaxed text-[#8a5a58] italic md:text-2xl">
            «{cartoon.quote}»
          </p>
        </div>
        <p className="text-center text-sm tracking-[0.3em] text-[#b08978]">— {pageNumber} —</p>
      </div>
    </div>
  )
}
