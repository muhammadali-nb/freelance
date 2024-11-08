import { ResponseNotification } from "@/components/notifications/response-notification";

// Здесь будем получать отклики для конкретного заказа
const mockResponses = [
  {
    freelancer: {
      id: "f1",
      name: "Иван Петров",
      avatar: "/avatars/ivan.jpg",
      title: "Full-Stack Developer"
    },
    orderId: "order1",
    orderTitle: "Разработка веб-приложения",
    createdAt: new Date(),
    coverLetter: "Здравствуйте! Имею большой опыт в разработке подобных приложений..."
  },
  // Другие отклики...
];

export default function OrderResponsesPage({ params }: { params: { id: string } }) {
  return (
    <div className="container max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-foreground">
        Отклики на заказ
      </h1>
      <div className="space-y-4">
        {mockResponses.map((response, index) => (
          <ResponseNotification
            key={index}
            {...response}
          />
        ))}
      </div>
    </div>
  );
} 