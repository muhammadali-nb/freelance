import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function BasicInfoStep() {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Профессиональный заголовок</Label>
        <Input
          id="title"
          placeholder="Например: Full-Stack React Developer"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="overview">О себе</Label>
        <Textarea
          id="overview"
          placeholder="Расскажите о своем опыте и навыках..."
          className="mt-1"
          rows={5}
        />
      </div>
      <div>
        <Label htmlFor="location">Местоположение</Label>
        <Input
          id="location"
          placeholder="Город, Страна"
          className="mt-1"
        />
      </div>
    </div>
  );
} 