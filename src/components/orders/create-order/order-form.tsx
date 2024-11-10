"use client";

import { Button } from "@/components/ui/button";
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
import { RequirementsField } from "./requirements-field";
import { SkillsField } from "./skills-field";
import { useState } from "react";
import { OrderFormData } from "@/types/order";

export function OrderForm() {
  const [formData, setFormData] = useState<OrderFormData>({
    title: "",
    description: "",
    budget: "",
    category: "",
    completionDate: "",
    attachments: null,
    orderCategory: "",
    deadline: "",
    status: "open",
    views: 0,
    proposals: 0,
    client: {
      id: "", // Будет заполняться из контекста аутентификации
      name: "",
      avatar: "",
      rating: 0,
      completedProjects: 0,
      totalSpent: 0,
      location: "",
      registeredAt: "",
      description: "",
      successRate: 0,
    }
  });

  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [files, setFiles] = useState<Array<{ id: string; name: string; size: number; type: string }>>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: OrderFormData) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev: OrderFormData) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: Number((file.size / (1024 * 1024)).toFixed(2)),
        type: file.type.split('/')[1] || file.type,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements((prev) => [...prev, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setRequirements((prev) => prev.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      requirements,
      skills,
      attachments: files,
      createdAt: new Date().toISOString(),
    };
    console.log("Форма отправлена:", orderData);
    // Здесь будет логика отправки на сервер
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Основная информация */}
        <div className="flex flex-col space-y-1.5 sm:col-span-2">
          <Label htmlFor="title">Название заказа</Label>
          <Input
            id="title"
            name="title"
            placeholder="Введите название заказа"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col space-y-1.5 sm:col-span-2">
          <Label htmlFor="description">Описание</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Подробно опишите ваш заказ"
            value={formData.description}
            onChange={handleInputChange}
            className="min-h-[150px]"
            required
          />
        </div>

        {/* Финансы и сроки */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="budget">Бюджет (₽)</Label>
          <Input
            id="budget"
            name="budget"
            type="number"
            placeholder="Введите бюджет"
            value={formData.budget}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="deadline">Дедлайн</Label>
          <Input
            id="deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Категория и тип */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="category">Категория проекта</Label>
          <Select onValueChange={handleSelectChange("category")}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Web Development">Веб-разработка</SelectItem>
              <SelectItem value="Mobile Development">Мобильная разработка</SelectItem>
              <SelectItem value="Design">Дизайн</SelectItem>
              <SelectItem value="Marketing">Маркетинг</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="orderCategory">Тип оплаты</Label>
          <Select onValueChange={handleSelectChange("orderCategory")}>
            <SelectTrigger id="orderCategory">
              <SelectValue placeholder="Выберите тип оплаты" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">Фиксированная цена</SelectItem>
              <SelectItem value="hourly">Почасовая оплата</SelectItem>
              <SelectItem value="milestone">Поэтапная оплата</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Требования и навыки */}
        <RequirementsField
          requirements={requirements}
          newRequirement={newRequirement}
          setNewRequirement={setNewRequirement}
          addRequirement={addRequirement}
          removeRequirement={removeRequirement}
        />

        <SkillsField
          skills={skills}
          newSkill={newSkill}
          setNewSkill={setNewSkill}
          addSkill={addSkill}
          removeSkill={removeSkill}
        />

        {/* Файлы */}
        <div className="flex flex-col space-y-1.5 sm:col-span-2">
          <Label htmlFor="attachments">Прикрепить файлы</Label>
          <Input
            id="attachments"
            name="attachments"
            type="file"
            onChange={handleFileChange}
            multiple
            className="mb-2"
          />
          {files.length > 0 && (
            <div className="space-y-2 mt-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span className="text-sm">{file.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {file.size} MB
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Создать заказ
      </Button>
    </form>
  );
} 