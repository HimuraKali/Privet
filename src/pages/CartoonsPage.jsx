import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import BackButton from '../components/BackButton'
import Book from '../components/cartoons/Book'
import usePetalsOnPage from '../hooks/usePetalsOnPage'

const EXTRA_BUTTON_TEXT = 'Тут что-то ещё'

export default function CartoonsPage() {
  usePetalsOnPage(true)
  const navigate = useNavigate()

  const handleGoToMessenger = () => {
    // Сохраняем текущую страницу (последнюю) перед переходом
    // В данном контексте мы знаем, что кнопка отображается только на последней странице
    // Но для надежности можно было бы передавать индекс из Book, 
    // однако задание просит добавить кнопку на последнюю страницу.
    // cartoons.length - это индекс последней страницы (BookEnd)
    sessionStorage.setItem('book-page-index', '6') // cartoons.length = 6
    navigate('/messenger')
  }

  const extraButton = (
    <button
      type="button"
      onClick={handleGoToMessenger}
      className="mt-4 rounded-full border border-[#d4a373] bg-[#faedcd] px-7 py-3 text-sm text-[#6a3a3a] shadow-sm transition hover:bg-[#fefae0]"
    >
      {EXTRA_BUTTON_TEXT}
    </button>
  )

  return (
    <PageTransition>
      <main className="cartoons-bg relative flex min-h-screen flex-col px-6 py-8">
        <div className="relative z-[2] mb-4">
          <BackButton />
        </div>
        <div className="relative z-[2] flex flex-1 items-center justify-center pb-6">
          <Book extraEnd={extraButton} />
        </div>
      </main>
    </PageTransition>
  )
}
