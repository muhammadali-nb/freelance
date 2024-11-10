'use client'

import { OrdersList } from "@/components/orders/orders-list";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleToggle } from "@/components/role-toggle";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRole } from "@/context/role-context";

export default function OrdersPage() {
	const { role } = useRole();

	return (
		<div className="space-y-6 py-6 pb-16">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
				<div>
					<div className="flex items-center gap-4">
						<h1 className="text-2xl font-bold tracking-tight">Заказы</h1>
						<RoleToggle />
					</div>
					<p className="text-muted-foreground mt-1">
						Просматривайте последние заказы от клиентов
					</p>
				</div>
				{role === "client" && (
					<Link href={"/orders/create-order"}>
						<Button className="text-xs sm:text-base">Создать заказ</Button>
					</Link>
				)}
			</div>
			<Separator />
			<Tabs defaultValue="all" className="space-y-4">
				<TabsList>
					<TabsTrigger value="all" className="text-xs sm:text-base">
						Все заказы
					</TabsTrigger>
					<TabsTrigger value="saved" className="text-xs sm:text-base">
						Сохраненные
					</TabsTrigger>
					<TabsTrigger value="best" className="text-xs sm:text-base">
						Рекомендуемые
					</TabsTrigger>
				</TabsList>
				<TabsContent value="all">
					<OrdersList />
				</TabsContent>
				<TabsContent value="saved">
					<OrdersList />
				</TabsContent>
				<TabsContent value="best">
					<OrdersList />
				</TabsContent>
			</Tabs>
		</div>
	);
}
