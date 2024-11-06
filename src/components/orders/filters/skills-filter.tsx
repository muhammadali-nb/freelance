import { Badge } from "@/components/ui/badge";

export function SkillsFilter() {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">
        Навыки
      </label>
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="cursor-pointer">React</Badge>
        <Badge variant="outline" className="cursor-pointer">Node.js</Badge>
        <Badge variant="outline" className="cursor-pointer">TypeScript</Badge>
      </div>
    </div>
  );
} 