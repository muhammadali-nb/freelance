"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { skillsData } from "@/config/skills";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SkillsStep() {
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"programming" | "design">("programming");

  const filteredSkills = skillsData[selectedCategory].filter(
    (skill) =>
      skill.toLowerCase().includes(inputValue.toLowerCase()) &&
      !skills.includes(skill)
  );

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
      setInputValue("");
      setOpen(false);
    }
  };

  const addCustomSkill = () => {
    const customSkill = inputValue.trim();
    if (customSkill && !skills.includes(customSkill)) {
      setSkills([...skills, customSkill]);
      setInputValue("");
      setOpen(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Основная специализация</Label>
        <Select 
          onValueChange={(value: "programming" | "design") => {
            setSelectedCategory(value);
            setSkills([]);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите специализацию" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="programming">Разработка</SelectItem>
            <SelectItem value="design">UI/UX Дизайн</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Навыки</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Поиск или добавление навыка..."
              className="mt-1"
            />
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Поиск навыка..." />
              <CommandList>
                <CommandEmpty>
                  {inputValue && (
                    <CommandItem
                      onSelect={addCustomSkill}
                      className="flex items-center gap-2 text-blue-500"
                    >
                      <Plus className="w-4 h-4" />
                      Добавить "{inputValue}"
                    </CommandItem>
                  )}
                  {!inputValue && "Начните вводить навык"}
                </CommandEmpty>
                <CommandGroup heading="Рекомендуемые навыки">
                  {filteredSkills.map((skill) => (
                    <CommandItem
                      key={skill}
                      onSelect={() => addSkill(skill)}
                    >
                      {skill}
                    </CommandItem>
                  ))}
                </CommandGroup>
                {inputValue && filteredSkills.length > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup heading="Добавить свой навык">
                      <CommandItem
                        onSelect={addCustomSkill}
                        className="flex items-center gap-2 text-blue-500"
                      >
                        <Plus className="w-4 h-4" />
                        Добавить "{inputValue}"
                      </CommandItem>
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <p className="text-sm text-gray-500 mt-1">
          Выберите из списка или добавьте свой навык
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((skill, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 hover:text-red-500 focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <Label>Уровень английского</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Выберите уровень" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="native">Native</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 