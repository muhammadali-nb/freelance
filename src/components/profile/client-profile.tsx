import { UserProfile } from "@/lib/types/user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ClientProfileProps {
	user: UserProfile;
}

export default function ClientProfile({ user }: ClientProfileProps) {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
			{/* Левая колонка */}
			<div className="lg:col-span-4">
				<Card className="p-4 md:p-6">
					<div className="flex flex-col">
						<div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
							<img
								src={user.image || "/default-avatar.png"}
								alt="Profile"
								className="w-20 h-20 md:w-24 md:h-24 rounded-full"
							/>
							<div className="text-center sm:text-left">
								<h2 className="text-xl md:text-2xl font-bold">{user.name}</h2>
								<p className="text-muted-foreground">{user.email}</p>
							</div>
						</div>

						<div className="space-y-6">
							<div>
								<h3 className="font-semibold text-lg mb-2">О компании</h3>
								<p className="text-muted-foreground">
									{user.company || "Не указана"}
								</p>
							</div>

							<div>
								<h3 className="font-semibold text-lg mb-2">
									Статистика заказов
								</h3>
								<div className="grid grid-cols-2 gap-4">
									<div className="p-3 bg-muted rounded-lg">
										<p className="text-sm text-muted-foreground">
											Активные заказы
										</p>
										<p className="text-xl font-bold">0</p>
									</div>
									<div className="p-3 bg-muted rounded-lg">
										<p className="text-sm text-muted-foreground">Завершенные</p>
										<p className="text-xl font-bold">0</p>
									</div>
								</div>
							</div>

							<div>
								<h3 className="font-semibold text-lg mb-2">
									Рейтинг заказчика
								</h3>
								<div className="flex items-center gap-2">
									<div className="text-2xl font-bold">5.0</div>
									<div className="flex text-yellow-400">★★★★★</div>
								</div>
							</div>
						</div>

						<div className="mt-6">
							<Button className="w-full">Редактировать профиль</Button>
						</div>
					</div>
				</Card>
			</div>

			{/* Правая колонка */}
			<div className="lg:col-span-8 space-y-4 md:space-y-6">
				<Card className="p-4 md:p-6">
					<div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
						<h3 className="text-md md:text-xl font-bold">Активные заказы</h3>
						<Button
							variant="outline"
							className="text-xs sm:text-base w-full sm:w-auto">
							Разместить заказ
						</Button>
					</div>
					<div className="space-y-4">
						<p className="text-xs sm:text-base text-muted-foreground text-center py-4">
							У вас пока нет активных заказов
						</p>
					</div>
				</Card>

				<Card className="p-4 md:p-6">
					<div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
						<h3 className="text-md md:text-xl font-bold">История заказов</h3>
						<Badge variant="secondary">Всего: 0</Badge>
					</div>
					<div className="space-y-4">
						<p className="text-xs sm:text-base text-muted-foreground text-center py-4">
							История заказов пуста
						</p>
					</div>
				</Card>

				<Card className="p-4 md:p-6">
					<h3 className="text-md md:text-xl text-center font-bold mb-4">
						Отзывы фрилансеров
					</h3>
					<div className="space-y-4">
						<p className="text-xs sm:text-base text-muted-foreground text-center py-4">
							Пока нет отзывов
						</p>
					</div>
				</Card>
			</div>
		</div>
	);
}
