import { PageHeader } from "@/components/page-header";
import { FileText } from "lucide-react";
import { FreelancerOrderCard } from "./freelancer-order-card";
import { FreelancerOrder } from "@/types/order";
import { getStatusBadge } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FreelancerOrdersListProps {
  orders: FreelancerOrder[];
}

export function FreelancerOrdersList({ orders }: FreelancerOrdersListProps) {
  const handleStatusChange = (orderId: string, newStatus: FreelancerOrder["status"]) => {
    // В реальном приложении здесь будет API-запрос
    console.log(`Changing order ${orderId} status to ${newStatus}`);
  };

  return (
    <div className="container mx-auto max-w-7xl space-y-4 sm:space-y-6 md:space-y-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
      <PageHeader
        icon={FileText}
        title="Мои заказы"
        description="Заказы, над которыми вы работаете"
      />

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">У вас пока нет активных заказов</p>
          <Button asChild className="mt-4">
            <Link href="/orders">
              Найти заказы
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map(order => (
            <FreelancerOrderCard
              key={order.id}
              order={order}
              getStatusBadge={getStatusBadge}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
} 