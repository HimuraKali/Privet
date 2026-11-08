import { Link } from 'react-router-dom'

/**
 * Последний разворот.
 * extra — необязательная дополнительная кнопка (React-элемент).
 */
export default function BookEnd({ side = 'right', extra = null }) {
  if (side === 'left') {
    return (
      <div className="book-page book-page-left">
        <div className="flex h-full flex-col items-center justify-center gap-4 text-[#c4a090]">
          <span className="font-display text-4xl">✦</span>
          <span className="text-xs tracking-[0.35em] uppercase">конец</span>
        </div>
      </div>
    )
  }

  return (
    <div className="book-page book-page-right">
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <p className="text-xs tracking-[0.32em] text-[#b08978] uppercase">Последняя страница</p>
        <h2 className="font-display mt-4 text-6xl text-[#6a3a3a] md:text-7xl">Конец</h2>

        <Link
          to="/home"
          className="mt-10 rounded-full border border-[#e2c48a] bg-[#fff8ee] px-7 py-3 text-sm text-[#6a3a3a] shadow-sm transition hover:bg-white"
        >
          Вернуться на главную
        </Link>

        {/* Место для ещё одной кнопки, например:
            <button type="button" className="mt-4 ..." onClick={...}>...</button>
        */}
        {extra ? <div className="mt-4">{extra}</div> : null}
      </div>
    </div>
  )
}
