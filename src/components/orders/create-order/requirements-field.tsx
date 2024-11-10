import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface RequirementsFieldProps {
  requirements: string[];
  newRequirement: string;
  setNewRequirement: (value: string) => void;
  addRequirement: () => void;
  removeRequirement: (index: number) => void;
}

export function RequirementsField({
  requirements,
  newRequirement,
  setNewRequirement,
  addRequirement,
  removeRequirement,
}: RequirementsFieldProps) {
  return (
    <div className="flex flex-col space-y-1.5 sm:col-span-2">
      <Label htmlFor="requirements">Требования</Label>
      <div className="flex space-x-2">
        <Input
          id="requirements"
          value={newRequirement}
          onChange={(e) => setNewRequirement(e.target.value)}
          placeholder="Добавить требование"
        />
        <Button type="button" onClick={addRequirement} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <ul className="list-disc list-inside mt-2 space-y-1">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="truncate mr-2">{"- " + req}</span>
            <Button
              type="button"
              onClick={() => removeRequirement(index)}
              variant="ghost"
              size="sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
} 