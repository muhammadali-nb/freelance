import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

interface WorkReviewMessageProps {
  orderId: string;
  orderTitle: string;
  decision: "approve" | "revision";
  feedback: string;
}

export function WorkReviewMessage({
  orderId,
  orderTitle,
  decision,
  feedback,
}: WorkReviewMessageProps) {
  const isApproved = decision === "approve";

  return (
    <Card className={isApproved ? "bg-success/5 border-success/20" : "bg-warning/5 border-warning/20"}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {isApproved ? (
            <CheckCircle className="h-5 w-5 text-success" />
          ) : (
            <AlertCircle className="h-5 w-5 text-warning" />
          )}
          <CardTitle className="text-base">
            {isApproved ? "Работа принята" : "Требуется доработка"}
          </CardTitle>
        </div>
        <Link 
          href={`/orders/${orderId}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          {orderTitle}
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm font-medium">
            {isApproved ? "Отзыв заказчика:" : "Необходимые доработки:"}
          </div>
          <p className="text-sm whitespace-pre-wrap">
            {feedback}
          </p>
          {isApproved && (
            <div className="text-xs text-success mt-4">
              Заказ успешно завершен
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 