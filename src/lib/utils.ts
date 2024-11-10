import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type OrderStatus = "active" | "paused" | "completed" | "deleted" | "in_progress" | "in_review" | "revision" | "disputed" | "cancelled" | "pending";

export function getStatusBadge(status: OrderStatus) {
  const variants = {
    active: "success",
    paused: "warning",
    completed: "secondary",
    deleted: "destructive",
    in_progress: "success",
    in_review: "warning",
    revision: "warning",
    disputed: "destructive",
    cancelled: "destructive",
    pending: "secondary",
  } as const;

  const labels = {
    active: "Активен",
    paused: "Приостановлен",
    completed: "Завершен",
    deleted: "Удален",
    in_progress: "В работе",
    in_review: "На проверке",
    revision: "На доработке",
    disputed: "Спор",
    cancelled: "Отменен",
    pending: "Ожидает",
  } as const;

  return {
    variant: variants[status],
    label: labels[status],
  };
}

// Пример использования:
// const { variant, label } = getStatusBadge(order.status);
// <Badge variant={variant}>{label}</Badge>
