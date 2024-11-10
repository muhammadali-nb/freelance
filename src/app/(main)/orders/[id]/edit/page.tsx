"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { PageHeader } from "@/components/page-header";
import { Edit } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Моковые данные заказа
const mockOrder = {
	id: "1",
	title: "Разработка веб-приложения",
	description:
		"Требуется разработать веб-приложение для управления задачами...",
	budget: 100000,
	deadline: "2024-04-01",
	category: "Web Development",
	requirements: [
		"Опыт работы с React и TypeScript от 2 лет",
		"Знание принципов построения REST API",
		"Опыт работы с PostgreSQL",
	],
	skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
	attachments: [
		{ id: "1", name: "technical_requirements.pdf", size: 2.5 },
		{ id: "2", name: "mockups.fig", size: 1.8 },
	],
};

export default function EditOrderPage() {
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const [formData, setFormData] = useState({
		title: mockOrder.title,
		description: mockOrder.description,
		budget: mockOrder.budget,
		deadline: mockOrder.deadline,
		category: mockOrder.category,
	});
	const [requirements, setRequirements] = useState(mockOrder.requirements);
	const [newRequirement, setNewRequirement] = useState("");
	const [skills, setSkills] = useState(mockOrder.skills);
	const [newSkill, setNewSkill] = useState("");
	const [files, setFiles] = useState(mockOrder.attachments);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddRequirement = () => {
		if (newRequirement.trim()) {
			setRequirements((prev) => [...prev, newRequirement.trim()]);
			setNewRequirement("");
		}
	};

	const handleRemoveRequirement = (index: number) => {
		setRequirements((prev) => prev.filter((_, i) => i !== index));
	};

	const handleAddSkill = () => {
		if (newSkill.trim()) {
			setSkills((prev) => [...prev, newSkill.trim()]);
			setNewSkill("");
		}
	};

	const handleRemoveSkill = (index: number) => {
		setSkills((prev) => prev.filter((_, i) => i !== index));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files).map((file) => ({
				id: Math.random().toString(36).substr(2, 9),
				name: file.name,
				size: Number((file.size / (1024 * 1024)).toFixed(2)),
			}));
			setFiles((prev) => [...prev, ...newFiles]);
		}
	};

	const handleRemoveFile = (fileId: string) => {
		setFiles((prev) => prev.filter((file) => file.id !== fileId));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const updatedOrder = {
			...formData,
			requirements,
			skills,
			attachments: files,
		};
		console.log("Обновленный заказ:", updatedOrder);
		// Здесь будет логика отправки на сервер
		router.push("/my-orders");
	};

	return (
		<RouteGuard allowedRoles={["client"]}>
			<div className="space-y-4 sm:space-y-6 md:space-y-8 p-3 sm:p-6 md:p-10">
				<PageHeader
					icon={Edit}
					title="Редактирование заказа"
					description="Измените детали вашего заказа"
				/>

				<form onSubmit={handleSubmit}>
					<div className="grid gap-3 sm:gap-4 md:gap-6">
						<Card className="hover:shadow-md transition-shadow">
							<CardHeader className="p-3 sm:p-4 md:p-6">
								<CardTitle className="text-base sm:text-lg md:text-xl">
									Основная информация
								</CardTitle>
								<CardDescription className="text-xs sm:text-sm md:text-base">
									Обновите основные параметры заказа
								</CardDescription>
							</CardHeader>
							<CardContent className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
									<div className="space-y-1.5 sm:space-y-2">
										<Label htmlFor="title" className="text-sm sm:text-base">
											Название заказа
										</Label>
										<Input
											id="title"
											name="title"
											value={formData.title}
											onChange={handleInputChange}
											className="text-sm sm:text-base h-8 sm:h-10"
										/>
									</div>
									<div className="space-y-1.5 sm:space-y-2">
										<Label htmlFor="budget" className="text-sm sm:text-base">
											Бюджет (₽)
										</Label>
										<Input
											id="budget"
											name="budget"
											type="number"
											value={formData.budget}
											onChange={handleInputChange}
											className="text-sm sm:text-base h-8 sm:h-10"
										/>
									</div>
								</div>
								<div className="space-y-1.5 sm:space-y-2">
									<Label htmlFor="description" className="text-sm sm:text-base">
										Описание
									</Label>
									<Textarea
										id="description"
										name="description"
										value={formData.description}
										onChange={handleInputChange}
										rows={5}
										className="text-sm sm:text-base min-h-[100px] sm:min-h-[120px]"
									/>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
									<div className="space-y-1.5 sm:space-y-2">
										<Label htmlFor="deadline" className="text-sm sm:text-base">
											Дедлайн
										</Label>
										<Input
											id="deadline"
											name="deadline"
											type="date"
											value={formData.deadline}
											onChange={handleInputChange}
											className="text-sm sm:text-base h-8 sm:h-10"
										/>
									</div>
									<div className="space-y-1.5 sm:space-y-2">
										<Label htmlFor="category" className="text-sm sm:text-base">
											Категория
										</Label>
										<Select
											value={formData.category}
											onValueChange={(value) =>
												setFormData((prev) => ({ ...prev, category: value }))
											}>
											<SelectTrigger className="h-8 sm:h-10">
												<SelectValue
													placeholder="Выберите категорию"
													className="text-sm sm:text-base"
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectItem
													value="Web Development"
													className="text-sm sm:text-base">
													Веб-разработка
												</SelectItem>
												<SelectItem
													value="Mobile Development"
													className="text-sm sm:text-base">
													Мобильная разработка
												</SelectItem>
												<SelectItem
													value="Design"
													className="text-sm sm:text-base">
													Дизайн
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="hover:shadow-md transition-shadow">
							<CardHeader className="p-3 sm:p-4 md:p-6">
								<CardTitle className="text-base sm:text-lg md:text-xl">
									Требования и навыки
								</CardTitle>
								<CardDescription className="text-xs sm:text-sm md:text-base">
									Обновите требования к исполнителю и необходимые навыки
								</CardDescription>
							</CardHeader>
							<CardContent className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
								<div className="space-y-2">
									<Label className="text-sm sm:text-base">Требования</Label>
									<div className="flex flex-col sm:flex-row gap-2">
										<Input
											value={newRequirement}
											onChange={(e) => setNewRequirement(e.target.value)}
											placeholder="Добавить требование"
											className="text-sm sm:text-base h-8 sm:h-10 flex-1"
										/>
										<Button
											type="button"
											onClick={handleAddRequirement}
											className="text-sm sm:text-base h-8 sm:h-10">
											Добавить
										</Button>
									</div>
									<div className="space-y-2 mt-2">
										{requirements.map((req, index) => (
											<div
												key={index}
												className="flex items-center justify-between bg-muted p-1 sm:p-2 rounded text-sm sm:text-base">
												<span className="text-xs sm:text-sm">{req}</span>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													onClick={() => handleRemoveRequirement(index)}
													className="h-6 sm:h-8">
													✕
												</Button>
											</div>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<Label className="text-sm sm:text-base">Навыки</Label>
									<div className="flex flex-col sm:flex-row gap-2">
										<Input
											value={newSkill}
											onChange={(e) => setNewSkill(e.target.value)}
											placeholder="Добавить навык"
											className="text-sm sm:text-base h-8 sm:h-10 flex-1"
										/>
										<Button
											type="button"
											onClick={handleAddSkill}
											className="text-sm sm:text-base h-8 sm:h-10">
											Добавить
										</Button>
									</div>
									<div className="flex flex-wrap gap-2 mt-2">
										{skills.map((skill, index) => (
											<Badge
												key={index}
												variant="secondary"
												className="flex items-center gap-1 pr-1 text-xs sm:text-sm">
												{skill}
												<button
													type="button"
													onClick={() => handleRemoveSkill(index)}
													className="hover:text-destructive">
													✕
												</button>
											</Badge>
										))}
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="hover:shadow-md transition-shadow">
							<CardHeader className="p-3 sm:p-4 md:p-6">
								<CardTitle className="text-base sm:text-lg md:text-xl">
									Файлы
								</CardTitle>
								<CardDescription className="text-xs sm:text-sm md:text-base">
									Обновите прикрепленные файлы
								</CardDescription>
							</CardHeader>
							<CardContent className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
								<div>
									<Input
										type="file"
										onChange={handleFileChange}
										multiple
										className="text-sm sm:text-base"
									/>
								</div>
								<div className="space-y-2">
									{files.map((file) => (
										<div
											key={file.id}
											className="flex items-center justify-between p-2 bg-muted rounded">
											<span className="text-xs sm:text-sm truncate max-w-[200px] sm:max-w-none">
												{file.name}
											</span>
											<div className="flex items-center gap-2">
												<span className="text-xs sm:text-sm text-muted-foreground">
													{file.size} MB
												</span>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													onClick={() => handleRemoveFile(file.id)}
													className="h-6 sm:h-8">
													✕
												</Button>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						<div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
							<Button
								type="button"
								variant="outline"
								onClick={() => router.back()}
								className="text-sm sm:text-base h-8 sm:h-10 w-full sm:w-auto">
								Отмена
							</Button>
							<Button
								type="submit"
								className="text-sm sm:text-base h-8 sm:h-10 w-full sm:w-auto">
								Сохранить изменения
							</Button>
						</div>
					</div>
				</form>
			</div>
		</RouteGuard>
	);
}
