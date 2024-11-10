import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";
import { ClientOrderCard } from "./client-order-card";
import { ClientOrder } from "@/types/order";
import { getStatusBadge } from "@/lib/utils";

interface ClientOrdersListProps {
  orders: ClientOrder[];
  onStatusChange: (orderId: string, status: ClientOrder["status"]) => void;
  onDelete: (orderId: string) => void;
}

export function ClientOrdersList({ orders, onStatusChange, onDelete }: ClientOrdersListProps) {
  return (
    <div className="container mx-auto max-w-7xl space-y-4 sm:space-y-6 md:space-y-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          icon={FileText}
          title="Мои заказы"
          description="Управление вашими заказами"
        />
        <Button asChild className="w-full sm:w-auto">
          <Link href="/orders/create-order">
            Создать заказ
          </Link>
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">У вас пока нет заказов</p>
          <Button asChild className="mt-4">
            <Link href="/orders/create-order">
              Создать первый заказ
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map(order => (
            <ClientOrderCard
              key={order.id}
              order={order}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              getStatusBadge={getStatusBadge}
            />
          ))}
        </div>
      )}
    </div>
  );
} 