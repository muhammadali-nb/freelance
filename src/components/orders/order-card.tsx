import { Order } from "@/lib/types/order";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { UserRole } from "@/context/role-context";

interface OrderCardProps {
  order: Order;
  role: UserRole;
}

export function OrderCard({ order, role }: OrderCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-4">
            <div>
              <Link 
                href={`/orders/${order.id}`}
                className="text-lg sm:text-xl font-semibold hover:text-blue-600 transition-colors line-clamp-2"
              >
                {order.title}
              </Link>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground mt-1">
                <span>Фиксированная цена</span>
                <span className="hidden sm:inline">•</span>
                <span>Уровень: Средний</span>
                <span className="hidden sm:inline">•</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <p className="text-gray-600 line-clamp-3">{order.description}</p>

            <div className="flex flex-wrap gap-2">
              {order.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={order.client.avatar} />
                  <AvatarFallback>{order.client.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{order.client.name}</p>
                  <p className="text-muted-foreground">
                    {role === "freelancer" ? "Заказчик" : "Исполнитель"}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Потрачено: ₽500K+  •  95% успешных проектов
                </p>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="hidden sm:inline-flex"
            >
              <Bookmark className="h-5 w-5" />
            </Button>
            <div className="text-right">
              <div className="font-semibold">{order.budget.toLocaleString()} ₽</div>
              <div className="text-sm text-muted-foreground hidden sm:block">
                {role === "freelancer" ? "Бюджет заказа" : "Ставка фрилансера"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 