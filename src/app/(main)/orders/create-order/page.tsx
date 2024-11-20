"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { PageHeader } from "@/components/page-header";
import { FilePlus, FilePlus2, FileText } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateOrderPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		budget: "",
		deadline: "",
		category: "Web Development",
	});
	const [requirements, setRequirements] = useState<string[]>([]);
	const [newRequirement, setNewRequirement] = useState("");
	const [skills, setSkills] = useState<string[]>([]);
	const [newSkill, setNewSkill] = useState("");
	const [files, setFiles] = useState<
		{ id: string; name: string; size: number }[]
	>([]);

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
		const order = {
			...formData,
			requirements,
			skills,
			attachments: files,
		};
		console.log("Новый заказ:", order);
		// Здесь будет логика отправки на сервер
		router.push("/orders");
	};

	return (
		<RouteGuard allowedRoles={["client"]}>
			<div className="space-y-4 sm:space-y-6 md:space-y-8 p-0 py-6 sm:p-6 md:p-10">
				<PageHeader
					icon={FilePlus2}
					title="Создание заказа"
					description="Заполните информацию о вашем заказе"
				/>

				<form onSubmit={handleSubmit}>
					<div className="grid gap-3 sm:gap-4 md:gap-6">
						<Card className="hover:shadow-md transition-shadow">
							<CardHeader className="p-3 sm:p-4 md:p-6">
								<CardTitle className="text-base sm:text-lg md:text-xl">
									Основная информация
								</CardTitle>
								<CardDescription className="text-xs sm:text-sm md:text-base">
									Укажите основные параметры заказа
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
										Описание заказа
									</Label>
									<Textarea
										id="description"
										name="description"
										value={formData.description}
										onChange={handleInputChange}
										className="min-h-[100px] text-sm sm:text-base"
									/>
								</div>

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

								<div className="space-y-2">
									<Label className="text-sm sm:text-base">Требования</Label>
									<div className="flex gap-2">
										<Input
											value={newRequirement}
											onChange={(e) => setNewRequirement(e.target.value)}
											placeholder="Добавить требование"
											className="text-sm sm:text-base h-8 sm:h-10"
										/>
										<Button
											type="button"
											onClick={handleAddRequirement}
											className="text-xs sm:text-sm">
											Добавить
										</Button>
									</div>
									<div className="flex flex-wrap gap-2 mt-2">
										{requirements.map((req, index) => (
											<Badge
												key={index}
												variant="secondary"
												className="text-xs sm:text-sm cursor-pointer"
												onClick={() => handleRemoveRequirement(index)}>
												{req} ×
											</Badge>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<Label className="text-sm sm:text-base">Навыки</Label>
									<div className="flex gap-2">
										<Input
											value={newSkill}
											onChange={(e) => setNewSkill(e.target.value)}
											placeholder="Добавить навык"
											className="text-sm sm:text-base h-8 sm:h-10"
										/>
										<Button
											type="button"
											onClick={handleAddSkill}
											className="text-xs sm:text-sm">
											Добавить
										</Button>
									</div>
									<div className="flex flex-wrap gap-2 mt-2">
										{skills.map((skill, index) => (
											<Badge
												key={index}
												variant="secondary"
												className="text-xs sm:text-sm cursor-pointer"
												onClick={() => handleRemoveSkill(index)}>
												{skill} ×
											</Badge>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<Label className="text-sm sm:text-base">Файлы</Label>
									<Input
										type="file"
										onChange={handleFileChange}
										multiple
										className="text-sm sm:text-base"
									/>
									<div className="flex flex-wrap gap-2 mt-2">
										{files.map((file) => (
											<Badge
												key={file.id}
												variant="secondary"
												className="text-xs sm:text-sm cursor-pointer"
												onClick={() => handleRemoveFile(file.id)}>
												{file.name} ({file.size} MB) ×
											</Badge>
										))}
									</div>
								</div>
							</CardContent>
						</Card>

						<div className="flex justify-end gap-3">
							<Button
								type="button"
								variant="outline"
								onClick={() => router.back()}
								className="text-xs sm:text-sm">
								Отмена
							</Button>
							<Button type="submit" className="text-xs sm:text-sm">
								Создать заказ
							</Button>
						</div>
					</div>
				</form>
			</div>
		</RouteGuard>
	);
}
