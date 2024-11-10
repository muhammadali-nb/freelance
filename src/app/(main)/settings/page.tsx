"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
	AlertTriangle,
	Sun,
	Moon,
	Mail,
	Bell,
	Trash2,
	Settings2,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PageHeader } from "@/components/page-header";

export default function SettingsPage() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="space-y-4 sm:space-y-6 md:space-y-8 pt-6 sm:p-6 md:p-10">
			<PageHeader
				icon={Settings2}
				title="Настройки"
				description="Управляйте настройками вашего аккаунта"
			/>

			<Card className="hover:shadow-md transition-shadow">
				<CardHeader className="p-4 sm:p-6">
					<CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
						{theme === "dark" ? (
							<Moon className="h-4 w-4 sm:h-5 sm:w-5" />
						) : (
							<Sun className="h-4 w-4 sm:h-5 sm:w-5" />
						)}
						Внешний вид
					</CardTitle>
					<CardDescription className="text-sm sm:text-base">
						Настройте внешний вид приложения под себя
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
					<RadioGroup
						defaultValue={theme}
						onValueChange={(value) => setTheme(value)}
						className="flex flex-col space-y-2 sm:space-y-3">
						<div className="flex items-center justify-between space-x-2 p-2 sm:p-3 rounded-lg hover:bg-accent cursor-pointer">
							<div className="flex items-center gap-2 sm:gap-3">
								<Sun className="h-4 w-4 sm:h-5 sm:w-5" />
								<div className="space-y-0.5 sm:space-y-1">
									<Label className="text-sm sm:text-base">Светлая тема</Label>
									<p className="text-xs sm:text-sm text-muted-foreground">
										Классический светлый интерфейс
									</p>
								</div>
							</div>
							<RadioGroupItem value="light" id="light" />
						</div>
						<div className="flex items-center justify-between space-x-2 p-2 sm:p-3 rounded-lg hover:bg-accent cursor-pointer">
							<div className="flex items-center gap-2 sm:gap-3">
								<Moon className="h-4 w-4 sm:h-5 sm:w-5" />
								<div className="space-y-0.5 sm:space-y-1">
									<Label className="text-sm sm:text-base">Тёмная тема</Label>
									<p className="text-xs sm:text-sm text-muted-foreground">
										Тёмный интерфейс для комфортной работы
									</p>
								</div>
							</div>
							<RadioGroupItem value="dark" id="dark" />
						</div>
					</RadioGroup>
				</CardContent>
			</Card>

			<Card className="hover:shadow-md transition-shadow">
				<CardHeader className="p-4 sm:p-6">
					<CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
						<Bell className="h-4 w-4 sm:h-5 sm:w-5" />
						Уведомления
					</CardTitle>
					<CardDescription className="text-sm sm:text-base">
						Настройте способы получения уведомлений
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 sm:gap-3">
							<Mail className="h-4 w-4 sm:h-5 sm:w-5" />
							<div className="space-y-0.5 sm:space-y-1">
								<Label className="text-sm sm:text-base">
									Email уведомления
								</Label>
								<p className="text-xs sm:text-sm text-muted-foreground">
									Получайте важные обновления на вашу почту
								</p>
							</div>
						</div>
						<RadioGroup defaultValue="on" className="flex">
							<RadioGroupItem value="on" id="email-on" />
						</RadioGroup>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 sm:gap-3">
							<Bell className="h-4 w-4 sm:h-5 sm:w-5" />
							<div className="space-y-0.5 sm:space-y-1">
								<Label className="text-sm sm:text-base">Push уведомления</Label>
								<p className="text-xs sm:text-sm text-muted-foreground">
									Мгновенные уведомления в браузере
								</p>
							</div>
						</div>
						<RadioGroup defaultValue="on" className="flex">
							<RadioGroupItem value="on" id="push-on" />
						</RadioGroup>
					</div>
				</CardContent>
			</Card>

			<Card className="hover:shadow-md transition-shadow">
				<CardHeader className="p-4 sm:p-6">
					<CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-destructive">
						<Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
						Управление аккаунтом
					</CardTitle>
					<CardDescription className="text-sm sm:text-base">
						Опасная зона - будьте внимательны
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
					<div className="flex items-center gap-2 p-2 sm:p-3 bg-destructive/10 rounded-lg">
						<AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
						<p className="text-xs sm:text-sm text-destructive">
							Это действие необратимо удалит все ваши данные
						</p>
					</div>
					<Button
						variant="destructive"
						className="w-full sm:w-auto text-sm sm:text-base">
						<Trash2 className="h-4 w-4 mr-2" />
						Удалить аккаунт
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
