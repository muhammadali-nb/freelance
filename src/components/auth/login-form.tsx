"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirect = searchParams?.get("redirect") || "/profile";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(email, password);
			router.push(redirect);
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	return (
		<div className="w-full max-w-md p-4 sm:p-6 md:p-8 bg-background border rounded-lg shadow-sm">
			<h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-foreground">
				Вход в систему
			</h1>
			<form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
				<div className="space-y-0.5 sm:space-y-2">
					<Label htmlFor="email" className="text-xs sm:text-sm md:text-base">
						Email
					</Label>
					<Input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Введите ваш email"
						required
						className="text-sm sm:text-base h-9 sm:h-10"
					/>
				</div>
				<div className="space-y-0.5 sm:space-y-2">
					<Label htmlFor="password" className="text-xs sm:text-sm md:text-base">
						Пароль
					</Label>
					<Input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Введите ваш пароль"
						required
						className="text-sm sm:text-base h-9 sm:h-10"
					/>
				</div>
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
					<div className="flex items-center space-x-2">
						<Checkbox id="remember" className="h-4 w-4 sm:h-5 sm:w-5" />
						<Label
							htmlFor="remember"
							className="text-xs sm:text-sm text-muted-foreground">
							Запомнить меня
						</Label>
					</div>
					<Link
						href="/forgot-password"
						className="text-xs sm:text-sm text-primary hover:underline">
						Забыли пароль?
					</Link>
				</div>
				<div className="h-0.5 sm:h-1"></div>
				<Button
					type="submit"
					className="w-full h-9 sm:h-10 text-sm sm:text-base">
					Войти
				</Button>
			</form>
			<div className="mt-4 text-center">
				<span className="text-xs sm:text-sm text-muted-foreground">
					Нет аккаунта?{" "}
				</span>
				<Link
					href="/register"
					className="text-xs sm:text-sm text-primary hover:underline">
					Зарегистрироваться
				</Link>
			</div>
		</div>
	);
}
