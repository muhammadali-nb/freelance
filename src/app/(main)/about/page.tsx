import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">О нас</h1>
        <p className="mb-4 text-base md:text-lg">
          Мы - команда профессионалов, стремящихся создать лучшую платформу для фрилансеров и заказчиков. Наша миссия - объединить талантливых специалистов и инновационные проекты.
        </p>
        <p className="mb-6 text-base md:text-lg">
          Основанная в 2024 году, наша платформа постоянно развивается, предоставляя удобные инструменты для эффективного сотрудничества и реализации творческих идей.
        </p>
        <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">Наши ценности</h2>
        <ul className="list-disc list-inside mb-8 text-base md:text-lg">
          <li>Профессионализм и качество</li>
          <li>Инновации и развитие</li>
          <li>Честность и прозрачность</li>
          <li>Поддержка и сообщество</li>
        </ul>
        <div className="text-center">
          <Link href="/contact">
            <Button size="lg">Свяжитесь с нами</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
