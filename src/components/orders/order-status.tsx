import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
	Clock,
	CheckCircle2,
	AlertCircle,
	PauseCircle,
	XCircle,
} from "lucide-react";

interface OrderStatusProps {
	status: "pending" | "active" | "completed" | "paused" | "cancelled";
	lastUpdated?: string;
}

export default function OrderStatus(
	{ status, lastUpdated }: OrderStatusProps = { status: "pending" }
) {
	const getStatusConfig = (status: string) => {
		switch (status) {
			case "active":
				return {
					label: "In Progress",
					variant: "default" as const,
					icon: Clock,
				};
			case "completed":
				return {
					label: "Completed",
					variant: "secondary" as const,
					icon: CheckCircle2,
				};
			case "paused":
				return {
					label: "On Hold",
					variant: "outline" as const,
					icon: PauseCircle,
				};
			case "cancelled":
				return {
					label: "Cancelled",
					variant: "destructive" as const,
					icon: XCircle,
				};
			default:
				return {
					label: "Pending",
					variant: "secondary" as const,
					icon: AlertCircle,
				};
		}
	};

	const statusConfig = getStatusConfig(status);

	return (
		<Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-none shadow-none">
			<div className="flex flex-wrap items-center gap-2 p-2">
				<Badge
					variant={statusConfig.variant}
					className="flex items-center gap-1">
					<statusConfig.icon className="w-3 h-3" />
					{statusConfig.label}
				</Badge>
				{lastUpdated && (
					<span className="text-xs text-muted-foreground">
						Updated {lastUpdated}
					</span>
				)}
			</div>
		</Card>
	);
}
