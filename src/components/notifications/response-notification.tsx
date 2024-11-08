"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";

interface ResponseNotificationProps {
  freelancer: {
    id: string;
    name: string;
    avatar?: string;
    title: string;
  };
  orderId: string;
  orderTitle: string;
  createdAt: Date;
  coverLetter: string;
}

export function ResponseNotification({
  freelancer,
  orderId,
  orderTitle,
  createdAt,
  coverLetter
}: ResponseNotificationProps) {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
          <AvatarFallback>{freelancer.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between">
            <div>
              <Link 
                href={`/freelancers/${freelancer.id}`}
                className="font-medium hover:underline text-foreground"
              >
                {freelancer.name}
              </Link>
              <p className="text-sm text-muted-foreground">{freelancer.title}</p>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(createdAt, { locale: ru, addSuffix: true })}
            </span>
          </div>
          <p className="text-sm text-foreground">
            Откликнулся на заказ{" "}
            <Link href={`/orders/${orderId}`} className="text-primary hover:underline">
              {orderTitle}
            </Link>
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2">{coverLetter}</p>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" asChild>
          <Link href={`/freelancers/${freelancer.id}`}>
            Просмотреть профиль
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/chat/${freelancer.id}`}>
            Начать чат
          </Link>
        </Button>
      </div>
    </Card>
  );
} 