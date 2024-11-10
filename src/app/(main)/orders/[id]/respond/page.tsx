"use client";

import { PageHeader } from "@/components/page-header";
import { HandshakeIcon } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RouteGuard } from "@/components/auth/route-guard";

// Моковые данные заказа (в реальном приложении будут загружаться с сервера)
const mockOrder = {
	id: 1,
	title: "Разработка веб-приложения",
	budget: 100000,
	deadline: "2024-04-01",
	requirements: [
		"Опыт работы с React и TypeScript от 2 лет",
		"Знание принципов построения REST API",
		"Опыт работы с PostgreSQL",
	],
};

export default function RespondToOrderPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		price: mockOrder.budget,
		deadline: mockOrder.deadline,
		coverLetter: "",
		acceptedRequirements: [...mockOrder.requirements],
		additionalRequirements: [] as string[],
		newRequirement: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const addAdditionalRequirement = () => {
		if (formData.newRequirement.trim()) {
			setFormData((prev) => ({
				...prev,
				additionalRequirements: [
					...prev.additionalRequirements,
					prev.newRequirement.trim(),
				],
				newRequirement: "",
			}));
		}
	};

	const removeAdditionalRequirement = (index: number) => {
		setFormData((prev) => ({
			...prev,
			additionalRequirements: prev.additionalRequirements.filter(
				(_, i) => i !== index
			),
		}));
	};

	const toggleRequirement = (requirement: string) => {
		setFormData((prev) => ({
			...prev,
			acceptedRequirements: prev.acceptedRequirements.includes(requirement)
				? prev.acceptedRequirements.filter((req) => req !== requirement)
				: [...prev.acceptedRequirements, requirement],
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Отправка отклика:", formData);
		// Здесь будет логика отправки на сервер
		router.push(`/orders/${mockOrder.id}/responses`);
	};

	return (
		<RouteGuard allowedRoles={["freelancer"]}>
			<div className="space-y-4 sm:space-y-6 md:space-y-8 p-3 sm:p-6 md:p-10">
				<PageHeader
					icon={HandshakeIcon}
					title="Отклик на заказ"
					description={`Откликнуться на заказ: ${mockOrder.title}`}
				/>

				<form onSubmit={handleSubmit} className="w-full mx-auto">
					<div className="grid gap-3 sm:gap-4 md:gap-6">
						<Card className="hover:shadow-md transition-shadow">
							<CardHeader className="p-3 sm:p-4 md:p-6">
								<CardTitle className="text-base sm:text-lg md:text-xl">
									Ваше предложение
								</CardTitle>
								<CardDescription className="text-xs sm:text-sm md:text-base">
									Укажите ваши условия выполнения заказа
								</CardDescription>
							</CardHeader>
							<CardContent className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
									<div className="space-y-1.5 sm:space-y-2">
										<Label htmlFor="price" className="text-sm sm:text-base">
											Ваша цена (₽)
										</Label>
										<Input
											id="price"
											name="price"
											type="number"
											value={formData.price}
											onChange={handleInputChange}
											className="text-sm sm:text-base h-8 sm:h-10"
										/>
									</div>
									<div className="space-y-1.5 sm:space-y-2">
										<Label htmlFor="deadline" className="text-sm sm:text-base">
											Срок выполнения
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
								</div>
								<div className="space-y-1.5 sm:space-y-2">
									<Label htmlFor="coverLetter" className="text-sm sm:text-base">
										Сопроводительное письмо
									</Label>
									<Textarea
										id="coverLetter"
										name="coverLetter"
										placeholder="Расскажите, почему вы подходите для этого заказа..."
										value={formData.coverLetter}
										onChange={handleInputChange}
										className="min-h-[120px] sm:min-h-[150px] text-sm sm:text-base"
									/>
								</div>
							</CardContent>
						</Card>

						<Card className="hover:shadow-md transition-shadow">
							<CardHeader className="p-3 sm:p-4 md:p-6">
								<CardTitle className="text-base sm:text-lg md:text-xl">
									Требования заказчика
								</CardTitle>
								<CardDescription className="text-xs sm:text-sm md:text-base">
									Подтвердите соответствие требованиям
								</CardDescription>
							</CardHeader>
							<CardContent className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
								<div className="space-y-1.5 sm:space-y-2">
									{mockOrder.requirements.map((requirement, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer"
											onClick={() => toggleRequirement(requirement)}>
											<span className="text-xs sm:text-sm flex-1 mr-2">
												{requirement}
											</span>
											<Badge
												variant={
													formData.acceptedRequirements.includes(requirement)
														? "default"
														: "outline"
												}
												className="text-xs whitespace-nowrap">
												{formData.acceptedRequirements.includes(requirement)
													? "Принято"
													: "Не принято"}
											</Badge>
										</div>
									))}
								</div>

								<Separator />

								<div className="space-y-1.5 sm:space-y-2">
									<Label className="text-sm sm:text-base">
										Дополнительные требования или уточнения
									</Label>
									<div className="flex flex-col sm:flex-row gap-2">
										<Input
											placeholder="Добавить требование..."
											value={formData.newRequirement}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													newRequirement: e.target.value,
												}))
											}
											className="text-sm sm:text-base h-8 sm:h-10"
										/>
										<Button
											type="button"
											onClick={addAdditionalRequirement}
											className="text-sm sm:text-base h-8 sm:h-10">
											Добавить
										</Button>
									</div>
									<div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
										{formData.additionalRequirements.map((req, index) => (
											<Badge
												key={index}
												variant="secondary"
												className="text-xs sm:text-sm flex items-center gap-1 p-1 sm:p-1.5">
												{req}
												<button
													type="button"
													onClick={() => removeAdditionalRequirement(index)}
													className="ml-1 hover:text-destructive">
													×
												</button>
											</Badge>
										))}
									</div>
								</div>
							</CardContent>
						</Card>

						<div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
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
								Отправить отклик
							</Button>
						</div>
					</div>
				</form>
			</div>
		</RouteGuard>
	);
}
