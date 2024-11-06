"use client";

import { useState } from "react";
import { Order } from "@/lib/types/order";
import { OrderCard } from "@/components/orders/order-card";
import { useRole } from "@/context/role-context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, SlidersHorizontal } from "lucide-react";
import { FiltersContent } from "./filters/filters-content";
import { mockOrders } from "@/lib/mock-data/orders"; // Переместите моковые данные в отдельный файл

export function OrdersList() {
  const { role } = useRole();
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState([0, 1000000]);

  return (
    <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-6">
      {/* Фильтры для десктопа */}
      <div className="hidden lg:block lg:col-span-3">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              {role === "freelancer" ? "Найти заказы" : "Найти фрилансеров"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FiltersContent
              category={category}
              setCategory={setCategory}
              budget={budget}
              setBudget={setBudget}
            />
          </CardContent>
        </Card>
      </div>

      {/* Список заказов */}
      <div className="col-span-12 lg:col-span-9">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={role === "freelancer" ? "Поиск заказов..." : "Поиск фрилансеров..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Фильтры для мобильных */}
          <div className="lg:hidden w-full sm:w-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Фильтры
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent
                    category={category}
                    setCategory={setCategory}
                    budget={budget}
                    setBudget={setBudget}
                  />
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