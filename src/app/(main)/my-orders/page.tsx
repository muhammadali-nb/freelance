"use client";

import { RouteGuard } from "@/components/auth/route-guard";
import { useState } from "react";
import { useRole } from "@/context/role-context";
import { ClientOrdersList } from "@/components/orders/client-orders-list";
import { FreelancerOrdersList } from "@/components/orders/freelancer-orders-list";
import { mockClientOrders, mockFreelancerOrders } from "@/lib/mock-data";
import { OrderStatus } from "@/types/order";

export default function MyOrdersPage() {
	const { role } = useRole();
	const [clientOrders, setClientOrders] = useState(mockClientOrders);
	const [freelancerOrders] = useState(mockFreelancerOrders);

	const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
		setClientOrders((prevOrders) =>
			prevOrders.map((order) =>
				order.id === orderId ? { ...order, status: newStatus } : order
			)
		);
	};

	const handleDelete = (orderId: string) => {
		setClientOrders((prevOrders) =>
			prevOrders.map((order) =>
				order.id === orderId ? { ...order, status: "deleted" } : order
			)
		);
	};

	if (role === "client") {
		return (
			<RouteGuard allowedRoles={["client"]}>
				<ClientOrdersList
					orders={clientOrders}
					onStatusChange={handleStatusChange}
					onDelete={handleDelete}
				/>
			</RouteGuard>
		);
	}

	return (
		<RouteGuard allowedRoles={["freelancer"]}>
			<FreelancerOrdersList orders={freelancerOrders} />
		</RouteGuard>
	);
}
