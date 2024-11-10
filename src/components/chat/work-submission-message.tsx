import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle } from "lucide-react";
import Link from "next/link";

interface WorkSubmissionMessageProps {
  orderId: string;
  orderTitle: string;
  description: string;
  files?: Array<{
    name: string;
    url: string;
    size: number;
  }>;
}

export function WorkSubmissionMessage({
  orderId,
  orderTitle,
  description,
  files = [],
}: WorkSubmissionMessageProps) {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Работа отправлена на проверку</CardTitle>
        </div>
        <Link 
          href={`/orders/${orderId}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          {orderTitle}
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-sm whitespace-pre-wrap mb-4">
          {description}
        </p>
        {files.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Прикрепленные файлы:</div>
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-background rounded-lg text-sm"
              >
                <span>{file.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                  >
                    <Link href={file.url} target="_blank" download>
                      <Download className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 