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
    <div className="space-y-4 sm:space-y-6">
      <div>
        <Label className="text-sm sm:text-base">Почасовая ставка</Label>
        <div className="flex items-center space-x-2 mt-1 sm:mt-2">
          <Input
            type="number"
            placeholder="0"
            className="text-sm sm:text-base h-9 sm:h-10"
          />
          <span className="text-base sm:text-lg text-foreground">₽/час</span>
        </div>
      </div>
      <div>
        <Label className="text-sm sm:text-base">Предпочитаемая занятость</Label>
        <Select>
          <SelectTrigger className="mt-1 sm:mt-2 h-9 sm:h-10 text-sm sm:text-base">
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
        <Label className="text-sm sm:text-base">Доступность в неделю</Label>
        <Select>
          <SelectTrigger className="mt-1 sm:mt-2 h-9 sm:h-10 text-sm sm:text-base">
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