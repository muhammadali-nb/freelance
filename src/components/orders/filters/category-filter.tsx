import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFilterProps {
  category: string;
  setCategory: (value: string) => void;
}

export function CategoryFilter({ category, setCategory }: CategoryFilterProps) {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">
        Категория
      </label>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Выберите категорию" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все категории</SelectItem>
          <SelectItem value="web">Веб-разработка</SelectItem>
          <SelectItem value="mobile">Мобильная разработка</SelectItem>
          <SelectItem value="design">Дизайн</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 