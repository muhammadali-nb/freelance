"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";

// В реальном приложении данные будут загружаться с сервера
const mockOrder = {
	id: "1",
	title: "Разработка веб-приложения",
	description:
		"Требуется разработать веб-приложение для управления задачами с возможностью создания проектов, назначения исполнителей, отслеживания прогресса и формирования отчетов. Необходима интеграция с существующими системами компании, включая систему авторизации и API для обмена данными. Важно обеспечить удобный пользовательский интерфейс и высокую производительность системы.",
	budget: 100000,
	deadline: "2024-04-01",
	status: "open",
	category: "Web Development",
	skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Express"],
	createdAt: "2024-03-01",
	client: {
		id: "c1",
		name: "Иван Петров",
		avatar: "/avatars/client1.jpg",
		rating: 4.8,
		completedProjects: 15,
		totalSpent: 750000,
		location: "Москва",
		registeredAt: "2023-01-15",
		description: "Руководитель IT-отдела в крупной компании. Ищем талантливых разработчиков для долгосрочного сотрудничества.",
		successRate: 95
	},
	proposals: 12,
	views: 156,
	attachments: [
		{
			id: "a1",
			name: "technical_requirements.pdf",
			size: 2.5,
			type: "pdf"
		},
		{
			id: "a2", 
			name: "ui_mockups.fig",
			size: 15.8,
			type: "figma"
		}
	],
	requirements: [
		"Опыт работы с React и TypeScript от 2 лет",
		"Знание принципов построения REST API",
		"Опыт работы с PostgreSQL",
		"Умение писать чистый и поддерживаемый код",
		"Опыт работы в команде"
	]
};

export default function OrderDetailPage() {
	const params = useParams<{ id: string }>();

	return (
		<div className="container mx-auto py-8 px-4">
			<div className="grid md:grid-cols-3 gap-6">
				<div className="md:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<div className="flex justify-between items-start">
								<CardTitle className="text-2xl">{mockOrder.title}</CardTitle>
								<Badge
									variant="secondary"
									className="bg-green-100 text-green-800">
									{mockOrder.status === "open" ? "Открыт" : "Закрыт"}
								</Badge>
							</div>
							<div className="text-sm text-gray-500 mt-2">
								Создан: {new Date(mockOrder.createdAt).toLocaleDateString()}
							</div>
						</CardHeader>
						<CardContent>
							<div className="prose max-w-none">
								<p className="whitespace-pre-wrap">{mockOrder.description}</p>
							</div>
							
							<div className="mt-6">
								<h3 className="font-semibold mb-2">Требования:</h3>
								<ul className="list-disc pl-5 space-y-1">
									{mockOrder.requirements.map((req, index) => (
										<li key={index}>{req}</li>
									))}
								</ul>
							</div>

							<div className="mt-6">
								<h3 className="font-semibold mb-2">Требуемые навыки:</h3>
								<div className="flex flex-wrap gap-2">
									{mockOrder.skills.map((skill) => (
										<Badge key={skill} variant="outline">
											{skill}
										</Badge>
									))}
								</div>
							</div>

							<div className="mt-6">
								<h3 className="font-semibold mb-2">Приложенные файлы:</h3>
								<div className="space-y-2">
									{mockOrder.attachments.map((file) => (
										<div key={file.id} className="flex items-center gap-2 text-sm">
											<span>{file.name}</span>
											<span className="text-gray-500">({file.size} MB)</span>
										</div>
									))}
								</div>
							</div>

							<div className="mt-6">
								<h3 className="font-semibold mb-2">Статистика:</h3>
								<div className="flex gap-4 text-sm text-gray-500">
									<div>Просмотров: {mockOrder.views}</div>
									<div>Откликов: {mockOrder.proposals}</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-6">
					<Card>
						<CardContent className="pt-6">
							<div className="text-lg font-semibold mb-4">Детали проекта</div>
							<div className="space-y-4">
								<div>
									<div className="text-sm text-gray-500">Бюджет</div>
									<div className="font-medium">
										{mockOrder.budget.toLocaleString()} ₽
									</div>
								</div>
								<div>
									<div className="text-sm text-gray-500">Дедлайн</div>
									<div className="font-medium">
										{new Date(mockOrder.deadline).toLocaleDateString()}
									</div>
								</div>
								<div>
									<div className="text-sm text-gray-500">Категория</div>
									<div className="font-medium">{mockOrder.category}</div>
								</div>
								<Button className="w-full">Откликнуться</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="text-lg font-semibold mb-4">О заказчике</div>
							<div className="flex items-center gap-4 mb-4">
								<Avatar className="h-12 w-12">
									<AvatarImage
										src={mockOrder.client.avatar}
										alt={mockOrder.client.name}
									/>
									<AvatarFallback>
										{mockOrder.client.name.substring(0, 2)}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-medium">{mockOrder.client.name}</div>
									<div className="text-sm text-gray-500">
										Рейтинг: {mockOrder.client.rating}
									</div>
								</div>
							</div>
							<div className="space-y-2 text-sm">
								<div className="text-gray-500">
									{mockOrder.client.description}
								</div>
								<div className="text-gray-500">
									Местоположение: {mockOrder.client.location}
								</div>
								<div className="text-gray-500">
									На платформе с: {new Date(mockOrder.client.registeredAt).toLocaleDateString()}
								</div>
								<div className="text-gray-500">
									Завершенных проектов: {mockOrder.client.completedProjects}
								</div>
								<div className="text-gray-500">
									Успешных сделок: {mockOrder.client.successRate}%
								</div>
								<div className="text-gray-500">
									Потрачено на проекты: {mockOrder.client.totalSpent.toLocaleString()} ₽
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
