"use client";

import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRole } from "@/context/role-context";

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
		description:
			"Руководитель IT-отдела в крупной компании. Ищем талантливых разработчиков для долгосрочного сотрудничества.",
		successRate: 95,
	},
	proposals: 12,
	views: 156,
	attachments: [
		{
			id: "a1",
			name: "technical_requirements.pdf",
			size: 2.5,
			type: "pdf",
		},
		{
			id: "a2",
			name: "ui_mockups.fig",
			size: 15.8,
			type: "figma",
		},
	],
	requirements: [
		"Опыт работы с React и TypeScript от 2 лет",
		"Знание принципов построения REST API",
		"Опыт работы с PostgreSQL",
		"Умение писать чистый и поддерживаемый код",
		"Опыт работы в команде",
	],
};

export default function OrderDetailPage() {
	const params = useParams<{ id: string }>();
	const { role } = useRole();

	return (
		<div className="space-y-4 sm:space-y-6 md:space-y-8 pt-6 sm:p-6 md:p-10">
			<PageHeader
				icon={FileText}
				title={mockOrder.title}
				description="Детальная информация о заказе"
			/>

			<div className="grid md:grid-cols-3 gap-6">
				<div className="md:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<div className="flex justify-between items-start">
								<CardTitle className="text-md md:text-xl font-semibold">
									Описание
								</CardTitle>
								<Badge variant="secondary">Открыт</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<div className="prose dark:prose-invert max-w-none">
								<p className="text-muted-foreground whitespace-pre-wrap text-sm md:text-base">
									{mockOrder.description}
								</p>
							</div>
							<div className="mt-6">
								<h3 className="text-sm md:text-base font-semibold mb-2">
									Требуемые навыки:
								</h3>
								<div className="flex flex-wrap gap-2">
									{mockOrder.skills.map((skill) => (
										<Badge
											key={skill}
											variant="outline"
											className="text-xs md:text-sm">
											{skill}
										</Badge>
									))}
								</div>
							</div>
							<div className="mt-6">
								<h3 className="text-sm md:text-base font-semibold mb-2">
									Требования:
								</h3>
								<ul className="list-disc list-inside space-y-1">
									{mockOrder.requirements.map((req) => (
										<li
											key={req}
											className="text-xs md:text-sm text-muted-foreground">
											{req}
										</li>
									))}
								</ul>
							</div>
							<div className="mt-6">
								<h3 className="text-sm md:text-base font-semibold mb-2">
									Вложения:
								</h3>
								<div className="space-y-2">
									{mockOrder.attachments.map((file) => (
										<div
											key={file.id}
											className="flex items-center justify-between p-2 border rounded">
											<span className="text-xs md:text-sm">{file.name}</span>
											<span className="text-xs md:text-sm text-muted-foreground">
												{file.size} MB
											</span>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-6">
					<Card>
						<CardContent className="pt-6">
							<div className="text-md md:text-lg font-semibold mb-4">
								Детали проекта
							</div>
							<div className="space-y-2 sm:space-y-4">
								<div>
									<div className="text-xs sm:text-sm text-muted-foreground">
										Бюджет
									</div>
									<div className="text-sm sm:text-base font-medium">
										{mockOrder.budget.toLocaleString()} ₽
									</div>
								</div>
								<div>
									<div className="text-xs sm:text-sm text-muted-foreground">
										Дедлайн
									</div>
									<div className="text-sm sm:text-base font-medium">
										{new Date(mockOrder.deadline).toLocaleDateString()}
									</div>
								</div>
								<div>
									<div className="text-xs sm:text-sm text-muted-foreground">
										Категория
									</div>
									<div className="text-sm sm:text-base font-medium">
										{mockOrder.category}
									</div>
								</div>
								<div>
									<div className="text-xs sm:text-sm text-muted-foreground">
										Просмотры
									</div>
									<div className="text-sm sm:text-base font-medium">
										{mockOrder.views}
									</div>
								</div>
								<div>
									<div className="text-xs sm:text-sm text-muted-foreground">
										Откликов
									</div>
									<div className="text-sm sm:text-base font-medium">
										{mockOrder.proposals}
									</div>
								</div>
								{role === "freelancer" && (
									<Link href={`/orders/${params.id}/respond`}>
										<Button className="w-full text-sm sm:text-base mt-3">
											Откликнуться
										</Button>
									</Link>
								)}
								{role === "client" && (
									<Link href={`/orders/${params.id}/responses`}>
										<Button className="w-full text-sm sm:text-base mt-3">
											Просмотреть отклики
										</Button>
									</Link>
								)}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-6">
							<div className="text-md md:text-lg font-semibold mb-4">
								О заказчике
							</div>
							<div className="flex items-center gap-4 mb-4">
								<Avatar className="h-10 w-10 md:h-12 md:w-12">
									<AvatarImage
										src={mockOrder.client.avatar}
										alt={mockOrder.client.name}
									/>
									<AvatarFallback>
										{mockOrder.client.name.substring(0, 2)}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className="text-sm md:text-base font-medium">
										{mockOrder.client.name}
									</div>
									<div className="text-xs md:text-sm text-muted-foreground">
										Рейтинг: {mockOrder.client.rating}
									</div>
								</div>
							</div>
							<div className="space-y-2">
								<div className="text-xs md:text-sm text-muted-foreground">
									Местоположение: {mockOrder.client.location}
								</div>
								<div className="text-xs md:text-sm text-muted-foreground">
									Завершенных проектов: {mockOrder.client.completedProjects}
								</div>
								<div className="text-xs md:text-sm text-muted-foreground">
									Успешных сделок: {mockOrder.client.successRate}%
								</div>
								<div className="text-xs md:text-sm text-muted-foreground">
									Потрачено всего:{" "}
									{mockOrder.client.totalSpent.toLocaleString()} ₽
								</div>
								<div className="text-xs md:text-sm text-muted-foreground">
									На платформе с:{" "}
									{new Date(mockOrder.client.registeredAt).toLocaleDateString()}
								</div>
								<div className="mt-4 text-xs md:text-sm">
									{mockOrder.client.description}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
