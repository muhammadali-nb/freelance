import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Download,
	MessageSquare,
	MoreVertical,
	CheckCircle,
	XCircle,
	AlertCircle,
	RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { FreelancerOrder } from "@/types/order";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { SubmitWorkDialog } from "./submit-work-dialog";
import { DisputeDialog } from "./dispute-dialog";

interface FreelancerOrderCardProps {
	order: FreelancerOrder;
	getStatusBadge: (status: FreelancerOrder["status"]) => {
		variant: string;
		label: string;
	};
	onStatusChange: (
		orderId: string,
		newStatus: FreelancerOrder["status"]
	) => void;
}

export function FreelancerOrderCard({
	order,
	getStatusBadge,
	onStatusChange,
}: FreelancerOrderCardProps) {
	const [isSubmitWorkOpen, setIsSubmitWorkOpen] = useState(false);
	const [isDisputeOpen, setIsDisputeOpen] = useState(false);

	const { variant, label } = getStatusBadge(order.status);

	const handleSubmitWork = () => {
		setIsSubmitWorkOpen(true);
	};

	const handleOpenDispute = () => {
		setIsDisputeOpen(true);
	};

	const getAvailableStatuses = () => {
		switch (order.status) {
			case "in_progress":
				return [
					{
						status: "in_review" as const,
						label: "Отправить на проверку",
						icon: CheckCircle,
						action: handleSubmitWork,
					},
					{
						status: "disputed" as const,
						label: "Открыть спор",
						icon: AlertCircle,
						action: handleOpenDispute,
					},
				];
			case "in_review":
				return [
					{
						status: "in_progress" as const,
						label: "Вернуть в работу",
						icon: RotateCcw,
						action: () => onStatusChange(order.id, "in_progress"),
					},
				];
			case "revision":
				return [
					{
						status: "in_review" as const,
						label: "Отправить на проверку",
						icon: CheckCircle,
						action: handleSubmitWork,
					},
					{
						status: "disputed" as const,
						label: "Открыть спор",
						icon: AlertCircle,
						action: handleOpenDispute,
					},
				];
			case "pending":
				return [
					{
						status: "in_progress" as const,
						label: "Начать работу",
						icon: CheckCircle,
						action: () => onStatusChange(order.id, "in_progress"),
					},
					{
						status: "cancelled" as const,
						label: "Отказаться",
						icon: XCircle,
						action: () => onStatusChange(order.id, "cancelled"),
					},
				];
			default:
				return [];
		}
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
							<div className="flex items-center gap-2">
								<Button variant="ghost" size="icon" asChild>
									<Link href={`/chat/${order.client.id}`}>
										<MessageSquare className="h-4 w-4" />
									</Link>
								</Button>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon">
											<MoreVertical className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										{getAvailableStatuses().map(
											({ status, label, icon: Icon, action }) => (
												<DropdownMenuItem
													key={status}
													onClick={action}
													className="flex items-center">
													<Icon className="h-4 w-4 mr-2" />
													{label}
												</DropdownMenuItem>
											)
										)}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>

						<p className="text-sm text-muted-foreground line-clamp-2">
							{order.description}
						</p>

						<div className="flex flex-wrap gap-2 sm:gap-4 text-sm">
							<span>Бюджет: {order.budget.toLocaleString()} ₽</span>
							<span>•</span>
							<span>Заказчик: {order.client.name}</span>
						</div>

						{order.attachments && order.attachments.length > 0 && (
							<div className="mt-4">
								<h4 className="text-sm font-medium mb-2">Файлы заказа:</h4>
								<div className="space-y-2">
									{order.attachments.map((file) => (
										<div
											key={file.id}
											className="flex items-center justify-between p-2 bg-muted rounded-lg">
											<span className="text-sm">{file.name}</span>
											<div className="flex items-center gap-2">
												<span className="text-xs text-muted-foreground">
													{file.size} MB
												</span>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8"
													asChild>
													<Link href={file.url} target="_blank" download>
														<Download className="h-4 w-4" />
													</Link>
												</Button>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					<div className="flex flex-col sm:items-end gap-2">
						<Badge>{label}</Badge>
						<span className="text-xs text-muted-foreground">
							Начат: {new Date(order.createdAt).toLocaleDateString()}
						</span>
					</div>
				</div>
			</Card>

			<SubmitWorkDialog
				isOpen={isSubmitWorkOpen}
				onClose={() => setIsSubmitWorkOpen(false)}
				orderId={order.id}
				clientId={order.client.id}
				onStatusChange={onStatusChange}
			/>

			<DisputeDialog
				isOpen={isDisputeOpen}
				onClose={() => setIsDisputeOpen(false)}
				orderId={order.id}
				clientId={order.client.id}
				onStatusChange={onStatusChange}
			/>
		</>
	);
}
