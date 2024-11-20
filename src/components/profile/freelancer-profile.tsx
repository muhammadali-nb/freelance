import { UserProfile } from "@/lib/types/user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface FreelancerProfileProps {
	user: UserProfile;
}

export default function FreelancerProfile({ user }: FreelancerProfileProps) {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
			{/* Левая колонка */}
			<div className="lg:col-span-4 space-y-4">
				<Card className="p-4 md:p-6">
					<div className="flex flex-col">
						<div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 mb-6">
							<img
								src={user.image || "/default-avatar.png"}
								alt="Profile"
								className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
							/>
							<div className="text-center lg:text-center flex-1 w-full">
								<h2 className="text-xl md:text-2xl font-bold mb-1">
									{user.name}
								</h2>
								<p className="text-muted-foreground mb-2">{user.email}</p>
								<Badge variant="secondary" className="mb-2">
									Топ фрилансер
								</Badge>
								<Button variant="outline" size="sm" className="w-full">
									Редактировать профиль
								</Button>
							</div>
						</div>

						<div className="space-y-6">
							<div>
								<h3 className="font-semibold text-md sm:text-lg mb-2">
									Специализация
								</h3>
								<p className="text-muted-foreground">
									{user.specialization || "Веб-разработчик"}
								</p>
							</div>

							<div>
								<h3 className="text-md sm:text-lg text-lg mb-2">Навыки</h3>
								<div className="flex flex-wrap gap-2">
									<Badge>React</Badge>
									<Badge>TypeScript</Badge>
									<Badge>Node.js</Badge>
									<Badge>Next.js</Badge>
								</div>
							</div>

							<div>
								<h3 className="text-md sm:text-lg font-semibold mb-2">
									Статистика
								</h3>
								<div className="space-y-4">
									<div>
										<div className="flex justify-between mb-1">
											<span className="text-sm">Успешность</span>
											<span className="text-sm font-medium">95%</span>
										</div>
										<Progress value={95} className="h-2" />
									</div>
									<div>
										<div className="flex justify-between mb-1">
											<span className="text-sm">Выполнено заказов</span>
											<span className="text-sm font-medium">48</span>
										</div>
										<Progress value={80} className="h-2" />
									</div>
								</div>
							</div>

							<div>
								<h3 className="font-semibold text-lg mb-2">Рейтинг</h3>
								<div className="flex items-center gap-2">
									<div className="text-2xl font-bold">4.9</div>
									<div className="flex text-yellow-400">★★★★★</div>
									<span className="text-muted-foreground">(127)</span>
								</div>
							</div>
						</div>
					</div>
				</Card>

				<Card className="p-4 md:p-6">
					<h3 className="text-md sm:text-lg font-semibold mb-4">Контакты</h3>
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
							<span className="text-sm sm:text-base text-muted-foreground">
								{user.email}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
							<span className="text-sm sm:text-base text-muted-foreground">
								{user.phone || "Не указан"}
							</span>
						</div>
					</div>
				</Card>
			</div>

			{/* Правая колонка */}
			<div className="lg:col-span-8 space-y-4">
				<Card className="p-4 md:p-6">
					<h3 className="text-md sm:text-xl font-bold mb-4">Обо мне</h3>
					<p className="text-sm sm:text-base text-muted-foreground">
						{user.bio ||
							"Опытный веб-разработчик с более чем 5-летним стажем работы. Специализируюсь на создании современных веб-приложений с использованием React, TypeScript и Node.js. Имею опыт работы как с небольшими стартапами, так и с крупными корпоративными проектами."}
					</p>
				</Card>

				<Card className="p-4 md:p-6">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-md sm:text-xl font-bold">Портфолио</h3>
						<Button variant="outline" size="sm">
							Добавить проект
						</Button>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{[1, 2, 3, 4].map((item) => (
							<div
								key={item}
								className="group relative aspect-video bg-muted rounded-lg overflow-hidden">
								<img
									src={`/portfolio-${item}.jpg`}
									alt={`Project ${item}`}
									className="w-full h-full object-cover transition-transform group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
									<Button variant="secondary" size="sm">
										Подробнее
									</Button>
								</div>
							</div>
						))}
					</div>
				</Card>

				<Card className="p-4 md:p-6">
					<h3 className="text-md sm:text-xl font-bold mb-6">
						Последние отзывы
					</h3>
					<div className="space-y-6">
						{[1, 2, 3].map((review) => (
							<div
								key={review}
								className="border-b last:border-0 pb-4 last:pb-0">
								<div className="flex items-center gap-4 mb-2">
									<img
										src={`/avatar-${review}.jpg`}
										alt="Client"
										className="w-10 h-10 rounded-full"
									/>
									<div>
										<h4 className="text-sm sm:text-base font-semibold">Клиент {review}</h4>
										<div className="flex text-yellow-400 text-xs">★★★★★</div>
									</div>
								</div>
								<p className="text-xs sm:text-sm text-muted-foreground">
									Отличный специалист! Работа выполнена качественно и в срок.
									Рекомендую!
								</p>
							</div>
						))}
					</div>
				</Card>
			</div>
		</div>
	);
}
