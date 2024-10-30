import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ExperienceStep() {
  return (
    <div className="space-y-6">
      <div>
        <Label>Опыт работы</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Выберите опыт работы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="entry">Начинающий (меньше 1 года)</SelectItem>
            <SelectItem value="intermediate">Средний (1-3 года)</SelectItem>
            <SelectItem value="expert">Эксперт (3+ лет)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Последнее место работы</Label>
        <Input
          placeholder="Название компании"
          className="mt-1"
        />
        <Input
          placeholder="Должность"
          className="mt-2"
        />
        <Textarea
          placeholder="Опишите ваши обязанности и достижения..."
          className="mt-2"
          rows={3}
        />
      </div>
    </div>
  );
} 