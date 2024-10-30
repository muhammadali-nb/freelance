import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RatesStep() {
  return (
    <div className="space-y-6">
      <div>
        <Label>Почасовая ставка</Label>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="0"
            className="mt-1"
          />
          <span className="text-lg">₽/час</span>
        </div>
      </div>
      <div>
        <Label>Предпочитаемая занятость</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Выберите тип занятости" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Полный рабочий день</SelectItem>
            <SelectItem value="part-time">Частичная занятость</SelectItem>
            <SelectItem value="project">Проектная работа</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Доступность в неделю</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Выберите количество часов" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="less-20">Менее 20 часов</SelectItem>
            <SelectItem value="20-30">20-30 часов</SelectItem>
            <SelectItem value="30-40">30-40 часов</SelectItem>
            <SelectItem value="more-40">Более 40 часов</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 