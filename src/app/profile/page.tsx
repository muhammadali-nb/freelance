import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-foreground">Профиль фрилансера</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl text-card-foreground">Основная информация</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 mb-3 md:mb-4">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Фото профиля" />
                <AvatarFallback className="bg-muted text-muted-foreground">ИФ</AvatarFallback>
              </Avatar>
              <Button size="sm" className="md:text-base">Изменить фото</Button>
            </div>
            <form className="space-y-3 md:space-y-4 mt-3 md:mt-4">
              <div>
                <Label htmlFor="name" className="text-sm md:text-base text-foreground">Имя</Label>
                <Input id="name" placeholder="Ваше имя" className="mt-1 bg-background text-foreground" />
              </div>
              <div>
                <Label htmlFor="title" className="text-sm md:text-base text-foreground">Профессия</Label>
                <Input id="title" placeholder="Например: Веб-разработчик" className="mt-1 bg-background text-foreground" />
              </div>
              <div>
                <Label htmlFor="location" className="text-sm md:text-base text-foreground">Местоположение</Label>
                <Input id="location" placeholder="Город, Страна" className="mt-1 bg-background text-foreground" />
              </div>
              <Button type="submit" size="sm" className="w-full md:w-auto md:text-base">Сохранить изменения</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl text-card-foreground">О себе</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-3 md:space-y-4">
              <div>
                <Label htmlFor="bio" className="text-sm md:text-base text-foreground">Биография</Label>
                <Textarea id="bio" placeholder="Расскажите о себе и своем опыте" rows={4} className="mt-1 bg-background text-foreground" />
              </div>
              <div>
                <Label htmlFor="skills" className="text-sm md:text-base text-foreground">Навыки</Label>
                <Input id="skills" placeholder="Например: JavaScript, React, Node.js" className="mt-1 bg-background text-foreground" />
              </div>
              <Button type="submit" size="sm" className="w-full md:w-auto md:text-base">Обновить информацию</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-card">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl text-card-foreground">Портфолио</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <div className="bg-muted p-3 md:p-4 rounded text-sm md:text-base text-muted-foreground">Проект 1</div>
              <div className="bg-muted p-3 md:p-4 rounded text-sm md:text-base text-muted-foreground">Проект 2</div>
              <div className="bg-muted p-3 md:p-4 rounded text-sm md:text-base text-muted-foreground">Проект 3</div>
            </div>
            <Button size="sm" className="mt-3 md:mt-4 w-full md:w-auto md:text-base">Добавить проект</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}