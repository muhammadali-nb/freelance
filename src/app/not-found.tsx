import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">Страница не найдена</h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Извините, страница, которую вы ищете, не существует или была перемещена.
      </p>
      <Link href="/">
        <Button>Вернуться на главную</Button>
      </Link>
    </div>
  )
}
