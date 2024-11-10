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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@/types/order";

interface SubmitWorkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  clientId: string;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

interface SubmitWorkData {
  description: string;
  files: File[];
}

export function SubmitWorkDialog({
  isOpen,
  onClose,
  orderId,
  clientId,
  onStatusChange,
}: SubmitWorkDialogProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<SubmitWorkData>({
    description: "",
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
      onStatusChange(orderId, "in_review");
      
      // Переход в чат с сообщением о сдаче работы
      router.push(`/chat/${clientId}?submitWork=true&orderId=${orderId}&description=${encodeURIComponent(formData.description)}`);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-[500px] p-0 h-[90vh] max-h-[800px] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <DialogHeader className="p-4 sm:p-6 md:p-8 border-b">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl">
              Отправка работы на проверку
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Опишите выполненную работу и прикрепите необходимые файлы
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            <div className="grid gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor="description" className="text-sm sm:text-base">
                  Описание выполненной работы
                </Label>
                <Textarea
                  id="description"
                  placeholder="Опишите, что было сделано..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[120px] sm:min-h-[150px] md:min-h-[180px] text-sm sm:text-base"
                  required
                />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor="files" className="text-sm sm:text-base">
                  Прикрепить файлы
                </Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="text-sm sm:text-base"
                />
                {formData.files.length > 0 && (
                  <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                    {Array.from(formData.files).map((file, index) => (
                      <div key={index} className="text-xs sm:text-sm text-muted-foreground">
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    ))}
                  </div>
                )}
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
              disabled={isSubmitting}
              className="text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5"
            >
              {isSubmitting ? "Отправка..." : "Отправить на проверку"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 