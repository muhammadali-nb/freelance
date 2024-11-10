"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import { OrderStatus } from "@/types/order";

interface ReviewWorkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  freelancerId: string;
  submission: {
    description: string;
    files: Array<{
      name: string;
      url: string;
      size: number;
    }>;
  };
  onStatusChange: (orderId: string, status: OrderStatus, feedback?: string) => void;

}

type ReviewDecision = "approve" | "revision" | null;

export function ReviewWorkDialog({
  isOpen,
  onClose,
  orderId,
  freelancerId,
  submission,
  onStatusChange,
}: ReviewWorkDialogProps) {
  const router = useRouter();
  const [decision, setDecision] = useState<ReviewDecision>(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!decision) return;

    setIsSubmitting(true);
    try {
      const newStatus = decision === "approve" ? "completed" : "revision";
      await onStatusChange(orderId, newStatus, feedback);
      
      // Отправляем сообщение в чат
      router.push(`/chat/${freelancerId}?review=true&orderId=${orderId}&decision=${decision}&feedback=${encodeURIComponent(feedback)}`);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-[600px] p-0 h-[90vh] max-h-[800px] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <DialogHeader className="p-4 sm:p-6 md:p-8 border-b">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl">
              Проверка выполненной работы
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Проверьте работу и примите решение о её завершении или необходимости доработки
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            <div className="grid gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <Label className="text-sm sm:text-base">
                  Описание выполненной работы:
                </Label>
                <div className="p-3 sm:p-4 bg-muted rounded-lg text-sm sm:text-base">
                  {submission.description}
                </div>
              </div>

              {submission.files.length > 0 && (
                <div className="space-y-2 sm:space-y-3">
                  <Label className="text-sm sm:text-base">Прикрепленные файлы:</Label>
                  <div className="space-y-2">
                    {submission.files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 sm:p-3 bg-muted rounded-lg"
                      >
                        <span className="text-xs sm:text-sm truncate flex-1 mr-2">
                          {file.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                            {file.size} MB
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 sm:h-9 sm:w-9"
                            asChild
                          >
                            <a href={file.url} download>
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2 sm:space-y-3">
                <Label className="text-sm sm:text-base">Решение</Label>
                <RadioGroup
                  value={decision || ""}
                  onValueChange={(value) => setDecision(value as ReviewDecision)}
                  className="space-y-2 sm:space-y-3"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <RadioGroupItem value="approve" id="approve" />
                    <Label 
                      htmlFor="approve" 
                      className="text-sm sm:text-base cursor-pointer"
                    >
                      Принять работу и завершить заказ
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <RadioGroupItem value="revision" id="revision" />
                    <Label 
                      htmlFor="revision" 
                      className="text-sm sm:text-base cursor-pointer"
                    >
                      Отправить на доработку
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Label 
                  htmlFor="feedback" 
                  className="text-sm sm:text-base"
                >
                  {decision === "approve" ? "Отзыв о работе" : "Что нужно доработать"}
                </Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={
                    decision === "approve"
                      ? "Напишите отзыв о выполненной работе..."
                      : "Опишите, что нужно доработать..."
                  }
                  className="min-h-[120px] sm:min-h-[150px] text-sm sm:text-base"
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter className="p-4 sm:p-6 md:p-8 border-t gap-2 sm:gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={!decision || isSubmitting}
              variant={decision === "approve" ? "default" : "secondary"}
              className="text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5"
            >
              {isSubmitting
                ? "Отправка..."
                : decision === "approve"
                ? "Завершить заказ"
                : "Отправить на доработку"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 