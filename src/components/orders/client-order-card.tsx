import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Edit,
	MoreVertical,
	PauseCircle,
	PlayCircle,
	Trash2,
	MessageSquare,
	CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { ClientOrder, OrderStatus } from "@/types/order";
import { useState } from "react";
import { ReviewWorkDialog } from "./review-work-dialog";

interface ClientOrderCardProps {
	order: ClientOrder;
	onStatusChange: (orderId: string, status: OrderStatus, feedback?: string) => void;
	onDelete: (orderId: string) => void;
	getStatusBadge: (status: ClientOrder["status"]) => {
		variant: string;
		label: string;
	};
}

// Моковые данные для демонстрации
const mockSubmission = {
	description: "Работа выполнена в соответствии с требованиями. Реализованы все основные функции, проведено тестирование.",
	files: [
		{
			name: "project-files.zip",
			url: "/files/project.zip",
			size: 15.7
		},
		{
			name: "documentation.pdf",
			url: "/files/docs.pdf",
			size: 2.3
		}
	],
	freelancerId: "f1" // ID фрилансера
};

export function ClientOrderCard({
	order,
	onStatusChange,
	onDelete,
	getStatusBadge,
}: ClientOrderCardProps) {
	const [isReviewOpen, setIsReviewOpen] = useState(false);
	const { variant, label } = getStatusBadge(order.status);

	const handleReviewWork = () => {
		setIsReviewOpen(true);
	};

	return (
		<>
			<Card className="p-4 sm:p-6">
				<div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between">
					<div className="space-y-2 flex-1">
						<div className="flex items-start justify-between">
							<Link
								href={`/orders/${order.id}`}
								className="text-lg font-semibold hover:underline">
								{order.title}
							</Link>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon">
										<MoreVertical className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem asChild>
										<Link
											href={`/orders/${order.id}/edit`}
											className="flex items-center">
											<Edit className="h-4 w-4 mr-2" />
											Редактировать
										</Link>
									</DropdownMenuItem>
									
									{order.status === "in_review" && (
										<DropdownMenuItem onClick={handleReviewWork} className="flex items-center">
											<CheckCircle className="h-4 w-4 mr-2" />
											Проверить работу
										</DropdownMenuItem>
									)}

									{order.status === "active" ? (
										<DropdownMenuItem
											onClick={() => onStatusChange(order.id, "paused" as OrderStatus)}
											className="flex items-center">
											<PauseCircle className="h-4 w-4 mr-2" />
											Приостановить
										</DropdownMenuItem>
									) : order.status === "paused" ? (
										<DropdownMenuItem
											onClick={() => onStatusChange(order.id, "active" as OrderStatus)}
											className="flex items-center">
											<PlayCircle className="h-4 w-4 mr-2" />
											Активировать
										</DropdownMenuItem>
									) : null}

									{order.responses > 0 && (
										<DropdownMenuItem asChild>
											<Link
												href={`/orders/${order.id}/responses`}
												className="flex items-center">
												<MessageSquare className="h-4 w-4 mr-2" />
												Просмотреть отклики
											</Link>
										</DropdownMenuItem>
									)}

									<DropdownMenuItem
										onClick={() => onDelete(order.id)}
										className="text-destructive flex items-center">
										<Trash2 className="h-4 w-4 mr-2" />
										Удалить
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<p className="text-sm text-muted-foreground line-clamp-2">
							{order.description}
						</p>

						<div className="flex flex-wrap gap-2 sm:gap-4 text-sm">
							<span>Бюджет: {order.budget.toLocaleString()} ₽</span>
							<span>•</span>
							<span>Откликов: {order.responses}</span>
							<span>•</span>
							<span>Просмотров: {order.views}</span>
						</div>

						{order.status === "in_review" && (
							<div className="mt-2">
								<Button 
									variant="outline" 
									size="sm"
									onClick={handleReviewWork}
									className="text-xs"
								>
									Проверить выполненную работу
								</Button>
							</div>
						)}
					</div>

					<div className="flex flex-col sm:items-end gap-2">
						<Badge >{label}</Badge>
						<span className="text-xs text-muted-foreground">
							Создан: {new Date(order.createdAt).toLocaleDateString()}
						</span>
					</div>
				</div>
			</Card>

			{isReviewOpen && (
				<ReviewWorkDialog
					isOpen={isReviewOpen}
					onClose={() => setIsReviewOpen(false)}
					orderId={order.id}
					freelancerId={mockSubmission.freelancerId}
					submission={mockSubmission}
					onStatusChange={onStatusChange}
				/>
			)}
		</>
	);
}
