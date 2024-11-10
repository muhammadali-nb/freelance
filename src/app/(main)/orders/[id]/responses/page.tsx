"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { ResponseNotification } from "@/components/notifications/response-notification";
import { useParams } from "next/navigation";

// Здесь будем получать отклики для конкретного заказа
const mockResponses = [
	{
		freelancer: {
			id: "f1",
			name: "Иван Петров",
			avatar: "/avatars/ivan.jpg",
			title: "Full-Stack Developer",
		},
		orderId: "order1",
		orderTitle: "Разработка веб-приложения",
		createdAt: new Date(),
		coverLetter:
			"Здравствуйте! Имею большой опыт в разработке подобных приложений...",
	},
	// Другие отклики...
];

export default function OrderResponsesPage() {
	const params = useParams<{ id: string }>();

	return (
		<RouteGuard allowedRoles={["client"]}>
			<div className="container max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
				<h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-foreground">
					Отклики на заказ
				</h1>
				<div className="space-y-3 sm:space-y-4 md:space-y-6">
					{mockResponses.map((response, index) => (
						<div
							className="bg-card rounded-lg shadow-sm p-3 sm:p-4 md:p-6"
							key={index}>
							<ResponseNotification {...response} />
						</div>
					))}
				</div>
			</div>
		</RouteGuard>
	);
}
