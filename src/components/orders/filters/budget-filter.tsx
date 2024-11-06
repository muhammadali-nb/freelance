import { DualRangeSlider } from "@/components/ui/dual-range-slider";

interface BudgetFilterProps {
  budget: number[];
  setBudget: (value: number[]) => void;
}

export function BudgetFilter({ budget, setBudget }: BudgetFilterProps) {
  const formatValue = (value: number) => 
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
      compactDisplay: 'short'
    }).format(value);

  return (
    <div className="w-full">
      <label className="text-sm font-medium mb-4 block text-foreground">
        Бюджет
      </label>
      <div className="w-full">
        <DualRangeSlider
          formatValue={formatValue}
          value={budget}
          onValueChange={setBudget}
          min={0}
          max={1000000}
          step={10000}
          className="w-full"
        />
      </div>
    </div>
  );
} 