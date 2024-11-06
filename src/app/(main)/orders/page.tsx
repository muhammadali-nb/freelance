import { OrdersList } from "@/components/orders/orders-list";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleToggle } from "@/components/role-toggle";

export default function OrdersPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-xl sm:text-2xl font-semibold">Заказы</h1>
            <RoleToggle />
          </div>
          <p className="text-sm text-muted-foreground">
            Найдите подходящие проекты или разместите свой заказ
          </p>
        </div>
        <Button>
          Создать заказ
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="w-full sm:w-auto flex justify-between sm:justify-start">
          <TabsTrigger value="all" className="flex-1 sm:flex-none">Все заказы</TabsTrigger>
          <TabsTrigger value="saved" className="flex-1 sm:flex-none">Сохраненные</TabsTrigger>
          <TabsTrigger value="best" className="flex-1 sm:flex-none">Рекомендуемые</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <OrdersList />
        </TabsContent>
        <TabsContent value="saved">
          <OrdersList />
        </TabsContent>
        <TabsContent value="best">
          <OrdersList />
        </TabsContent>
      </Tabs>
    </div>
  );
} 