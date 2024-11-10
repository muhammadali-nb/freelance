import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface SkillsFieldProps {
  skills: string[];
  newSkill: string;
  setNewSkill: (value: string) => void;
  addSkill: () => void;
  removeSkill: (index: number) => void;
}

export function SkillsField({
  skills,
  newSkill,
  setNewSkill,
  addSkill,
  removeSkill,
}: SkillsFieldProps) {
  return (
    <div className="flex flex-col space-y-1.5 sm:col-span-2">
      <Label htmlFor="skills">Навыки</Label>
      <div className="flex space-x-2">
        <Input
          id="skills"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Добавить навык"
        />
        <Button type="button" onClick={addSkill} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap mt-2 gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="outline" className="flex items-center">
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="ml-2"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
} 