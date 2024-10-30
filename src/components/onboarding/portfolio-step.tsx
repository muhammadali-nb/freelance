import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function PortfolioStep() {
  return (
    <div className="space-y-6">
      <div>
        <Label>Добавьте проекты в портфолио</Label>
        <div className="mt-2 space-y-4">
          <div className="border rounded-lg p-4">
            <Input
              placeholder="Название проекта"
              className="mb-2"
            />
            <Input
              placeholder="URL проекта"
              className="mb-2"
            />
            <Textarea
              placeholder="Описание проекта..."
              rows={3}
            />
          </div>
          <Button variant="outline" className="w-full">
            + Добавить еще проект
          </Button>
        </div>
      </div>
    </div>
  );
} 