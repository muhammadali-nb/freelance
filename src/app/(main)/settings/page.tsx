"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Sun, Moon, Mail, Bell, Trash2, Settings2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SettingsPage() {
	const { theme, setTheme } = useTheme();

	return (
		<div className="space-y-8 py-10">
			<div className="flex items-center gap-3">
				<Settings2 className="h-8 w-8" />
				<div>
					<h1 className="text-3xl font-bold">Настройки</h1>
					<p className="text-muted-foreground mt-2">
						Управляйте настройками вашего аккаунта
					</p>
				</div>
			</div>

			<Card className="hover:shadow-md transition-shadow">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						{theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
						Внешний вид
					</CardTitle>
					<CardDescription>
						Настройте внешний вид приложения под себя
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<RadioGroup
						defaultValue={theme}
						onValueChange={(value) => setTheme(value)}
						className="flex flex-col space-y-3"
					>
						<div className="flex items-center justify-between space-x-2 p-3 rounded-lg hover:bg-accent cursor-pointer">
							<div className="flex items-center gap-3">
								<Sun className="h-5 w-5" />
								<div className="space-y-1">
									<Label>Светлая тема</Label>
									<p className="text-sm text-muted-foreground">
										Классический светлый интерфейс
									</p>
								</div>
							</div>
							<RadioGroupItem value="light" id="light" />
						</div>
						<div className="flex items-center justify-between space-x-2 p-3 rounded-lg hover:bg-accent cursor-pointer">
							<div className="flex items-center gap-3">
								<Moon className="h-5 w-5" />
								<div className="space-y-1">
									<Label>Тёмная тема</Label>
									<p className="text-sm text-muted-foreground">
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
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Bell className="h-5 w-5" />
						Уведомления
					</CardTitle>
					<CardDescription>
						Настройте способы получения уведомлений
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Mail className="h-5 w-5" />
							<div className="space-y-1">
								<Label>Email уведомления</Label>
								<p className="text-sm text-muted-foreground">
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
						<div className="flex items-center gap-3">
							<Bell className="h-5 w-5" />
							<div className="space-y-1">
								<Label>Push уведомления</Label>
								<p className="text-sm text-muted-foreground">
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
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-destructive">
						<Trash2 className="h-5 w-5" />
						Управление аккаунтом
					</CardTitle>
					<CardDescription>
						Опасная зона - будьте внимательны
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg">
						<AlertTriangle className="h-5 w-5 text-destructive" />
						<p className="text-sm text-destructive">
							Это действие необратимо удалит все ваши данные
						</p>
					</div>
					<Button variant="destructive" className="w-full sm:w-auto">
						<Trash2 className="h-4 w-4 mr-2" />
						Удалить аккаунт
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}