"use client";

import { useState } from "react";
import { Order } from "@/lib/types/order";
import { OrderCard } from "./order-card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, SlidersHorizontal } from "lucide-react";
import { useRole } from "@/context/role-context";

// Моковые данные для примера
const mockOrders: Order[] = [
  {
    id: "1",
    title: "Разработка веб-приложения",
    description: "Требуется разработать веб-приложение для управления задачами...",
    budget: 100000,
    deadline: "2024-04-01",
    status: "open",
    category: "Web Development",
    skills: ["React", "Node.js", "TypeScript"],
    createdAt: "2024-03-01",
    client: {
      id: "c1",
      name: "Иван Петров",
      avatar: "/avatars/client1.jpg"
    }
  },
  // Добавьте больше моковых данных по необходимости
];

export function OrdersList() {
  const { role } = useRole();
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState([0, 1000000]);

  const FiltersContent = () => (
    <div className="space-y-6">
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

      <div>
        <label className="text-sm font-medium mb-2 block">
          Бюджет
        </label>
        <div className="space-y-4">
          <Slider
            value={budget}
            max={1000000}
            step={10000}
            onValueChange={setBudget}
          />
          <div className="flex justify-between text-sm">
            <span>{budget[0].toLocaleString()} ₽</span>
            <span>{budget[1].toLocaleString()} ₽</span>
          </div>
        </div>
      </div>

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

      <Separator />

      <Button className="w-full">Применить фильтры</Button>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      {/* Фильтры для десктопа */}
      <div className="hidden lg:block lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              {role === "freelancer" ? "Найти заказы" : "Найти фрилансеров"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FiltersContent />
          </CardContent>
        </Card>
      </div>

      {/* Список заказов */}
      <div className="col-span-12 lg:col-span-9">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={role === "freelancer" ? "Поиск заказов..." : "Поиск фрилансеров..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Фильтры для мобильных */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Фильтры
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="space-y-4">
          {mockOrders.map((order) => (
            <OrderCard 
              key={order.id} 
              order={order}
              role={role}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 