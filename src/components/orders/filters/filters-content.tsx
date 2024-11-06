import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CategoryFilter } from "./category-filter";
import { BudgetFilter } from "./budget-filter";
import { SkillsFilter } from "./skills-filter";

interface FiltersContentProps {
  category: string;
  setCategory: (value: string) => void;
  budget: number[];
  setBudget: (value: number[]) => void;
}

export function FiltersContent({ 
  category, 
  setCategory, 
  budget, 
  setBudget 
}: FiltersContentProps) {
  return (
    <div className="space-y-6">
      <CategoryFilter category={category} setCategory={setCategory} />
      <BudgetFilter budget={budget} setBudget={setBudget} />
      <SkillsFilter />
      <Separator />
      <Button className="w-full">Применить фильтры</Button>
    </div>
  );
} 