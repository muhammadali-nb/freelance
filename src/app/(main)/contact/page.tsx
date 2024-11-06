import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-foreground">
          Свяжитесь с нами
        </h1>
        <form className="space-y-6 mb-8">
          <div>
            <Label htmlFor="name" className="text-lg">Имя</Label>
            <Input id="name" placeholder="Введите ваше имя" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email" className="text-lg">Email</Label>
            <Input id="email" type="email" placeholder="Введите ваш email" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="message" className="text-lg">Сообщение</Label>
            <Textarea id="message" placeholder="Введите ваше сообщение" rows={5} className="mt-1" />
          </div>
          <Button type="submit" size="lg" className="w-full">Отправить</Button>
        </form>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Другие способы связи</h2>
          <p className="text-lg mb-2 text-muted-foreground">Email: info@freelance-site.ru</p>
          <p className="text-lg mb-2 text-muted-foreground">Телефон: +7 (999) 123-45-67</p>
          <p className="text-lg text-muted-foreground">Адрес: г. Москва, ул. Примерная, д. 123</p>
        </div>
      </div>
    </div>
  );
}
