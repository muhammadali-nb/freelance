import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
			<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-foreground">
				Добро пожаловать на Freelance Platform
			</h1>
			<p className="text-lg md:text-xl mb-8 text-center max-w-2xl text-muted-foreground">
				Найдите лучших фрилансеров для вашего проекта или предложите свои услуги
				тысячам клиентов.
			</p>
			<div className="flex flex-col items-center justify-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
				<Link href="/orders">
					<Button size="lg">Найти проект</Button>
				</Link>
				<Link href="/become-freelancer">
					<Button size="lg" variant="outline">
						Стать фрилансером
					</Button>
				</Link>
			</div>
		</div>
	);
}
