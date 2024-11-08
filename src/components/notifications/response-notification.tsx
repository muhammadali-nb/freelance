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
    <Card className="p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 md:space-y-4">
      <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12">
          <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
          <AvatarFallback>{freelancer.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-0.5 sm:space-y-1">
          <div className="flex items-start justify-between">
            <div>
              <Link 
                href={`/freelancers/${freelancer.id}`}
                className="font-medium hover:underline text-foreground text-sm sm:text-base"
              >
                {freelancer.name}
              </Link>
              <p className="text-xs sm:text-sm text-muted-foreground">{freelancer.title}</p>
            </div>
            <span className="text-[10px] sm:text-xs text-muted-foreground">
              {formatDistanceToNow(createdAt, { locale: ru, addSuffix: true })}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-foreground">
            Откликнулся на заказ{" "}
            <Link href={`/orders/${orderId}`} className="text-primary hover:underline">
              {orderTitle}
            </Link>
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{coverLetter}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
        <Button variant="outline" asChild className="text-xs sm:text-sm w-full sm:w-auto">
          <Link href={`/freelancers/${freelancer.id}`}>
            Просмотреть профиль
          </Link>
        </Button>
        <Button asChild className="text-xs sm:text-sm w-full sm:w-auto">
          <Link href={`/chat/${freelancer.id}`}>
            Начать чат
          </Link>
        </Button>
      </div>
    </Card>
  );
}