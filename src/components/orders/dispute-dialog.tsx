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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@/types/order";

interface DisputeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  clientId: string;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

type DisputeReason = 
  | "payment_issue"
  | "work_quality"
  | "communication"
  | "deadline"
  | "requirements"
  | "other";

interface DisputeData {
  reason: DisputeReason;
  description: string;
  desiredOutcome: string;
  files: File[];
}

const disputeReasons = [
  { value: "payment_issue", label: "Проблемы с оплатой" },
  { value: "work_quality", label: "Качество работы" },
  { value: "communication", label: "Проблемы с коммуникацией" },
  { value: "deadline", label: "Нарушение сроков" },
  { value: "requirements", label: "Несоответствие требованиям" },
  { value: "other", label: "Другое" },
] as const;

export function DisputeDialog({
  isOpen,
  onClose,
  orderId,
  clientId,
  onStatusChange,
}: DisputeDialogProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<DisputeData>({
    reason: "other",
    description: "",
    desiredOutcome: "",
    files: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        files: Array.from(e.target.files!),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // В реальном приложении здесь будет API-запрос
      onStatusChange(orderId, "disputed");
      
      // Переход в чат с сообщением о споре
      router.push(`/chat/${clientId}?dispute=true&orderId=${orderId}&reason=${formData.reason}&description=${encodeURIComponent(formData.description)}&outcome=${encodeURIComponent(formData.desiredOutcome)}`);
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
              Открытие спора
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Опишите проблему и желаемое решение. Мы постараемся помочь разрешить ситуацию.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            <div className="grid gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label>Причина спора</Label>
                <RadioGroup
                  value={formData.reason}
                  onValueChange={(value: DisputeReason) => 
                    setFormData(prev => ({ ...prev, reason: value }))
                  }
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                >
                  {disputeReasons.map(({ value, label }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value} className="cursor-pointer">
                        {label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание проблемы</Label>
                <Textarea
                  id="description"
                  placeholder="Подробно опишите возникшую проблему..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    description: e.target.value 
                  }))}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desiredOutcome">Желаемое решение</Label>
                <Textarea
                  id="desiredOutcome"
                  placeholder="Опишите, какого решения вы ожидаете..."
                  value={formData.desiredOutcome}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    desiredOutcome: e.target.value 
                  }))}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="files">Подтверждающие документы</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
                {formData.files.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {Array.from(formData.files).map((file, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="p-4 sm:p-6 md:p-8 border-t gap-2 sm:gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" variant="destructive" disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Открыть спор"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 