import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

interface DisputeMessageProps {
  orderId: string;
  orderTitle: string;
  reason: string;
  description: string;
  desiredOutcome: string;
}

const getReasonLabel = (reason: string) => {
  const reasons: Record<string, string> = {
    payment_issue: "Проблемы с оплатой",
    work_quality: "Качество работы",
    communication: "Проблемы с коммуникацией",
    deadline: "Нарушение сроков",
    requirements: "Несоответствие требованиям",
    other: "Другое",
  };
  return reasons[reason] || reason;
};

export function DisputeMessage({
  orderId,
  orderTitle,
  reason,
  description,
  desiredOutcome,
}: DisputeMessageProps) {
  return (
    <Card className="bg-destructive/5 border-destructive/20">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-base text-destructive">Открыт спор</CardTitle>
        </div>
        <Link 
          href={`/orders/${orderId}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          {orderTitle}
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm font-medium mb-1">Причина спора:</div>
          <div className="text-sm text-destructive">
            {getReasonLabel(reason)}
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium mb-1">Описание проблемы:</div>
          <p className="text-sm whitespace-pre-wrap">
            {description}
          </p>
        </div>

        <div>
          <div className="text-sm font-medium mb-1">Желаемое решение:</div>
          <p className="text-sm whitespace-pre-wrap">
            {desiredOutcome}
          </p>
        </div>

        <div className="text-xs text-muted-foreground">
          Служба поддержки рассмотрит ваше обращение в течение 24 часов
        </div>
      </CardContent>
    </Card>
  );
} 