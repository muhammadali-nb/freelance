import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6 md:p-8">
			<div className="w-full max-w-2xl">
				<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center text-foreground">
					Свяжитесь с нами
				</h1>
				<form className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
					<div>
						<Label htmlFor="name" className="text-base sm:text-lg">
							Имя
						</Label>
						<Input
							id="name"
							placeholder="Введите ваше имя"
							className="mt-1 h-10 sm:h-11 text-sm sm:text-base"
						/>
					</div>
					<div>
						<Label htmlFor="email" className="text-base sm:text-lg">
							Email
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="Введите ваш email"
							className="mt-1 h-10 sm:h-11 text-sm sm:text-base"
						/>
					</div>
					<div>
						<Label htmlFor="message" className="text-base sm:text-lg">
							Сообщение
						</Label>
						<Textarea
							id="message"
							placeholder="Введите ваше сообщение"
							rows={5}
							className="mt-1 text-sm sm:text-base"
						/>
					</div>
					<Button
						type="submit"
						size="lg"
						className="w-full h-10 sm:h-11 text-sm sm:text-base">
						Отправить
					</Button>
				</form>
				<div className="text-center px-4 sm:px-6">
					<h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">
						Другие способы связи
					</h2>
					<p className="text-base sm:text-lg mb-2 text-muted-foreground">
						Email: info@freelance-site.ru
					</p>
					<p className="text-base sm:text-lg mb-2 text-muted-foreground">
						Телефон: +7 (999) 123-45-67
					</p>
					<p className="text-base sm:text-lg text-muted-foreground">
						Адрес: г. Москва, ул. Примерная, д. 123
					</p>
				</div>
			</div>
		</div>
	);
}
