"use client";

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
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
		<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-6 text-center">Вход в систему</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Введите ваш email"
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="password">Пароль</Label>
					<Input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Введите ваш пароль"
						required
					/>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Checkbox id="remember" />
						<Label htmlFor="remember">Запомнить меня</Label>
					</div>
					<Link
						href="/forgot-password"
						className="text-sm text-blue-600 hover:underline"
					>
						Забыли пароль?
					</Link>
				</div>
				<Button type="submit" className="w-full">
					Войти
				</Button>
			</form>
			<div className="mt-4 text-center">
				<span className="text-sm text-gray-600">Нет аккаунта? </span>
				<Link href="/register" className="text-sm text-blue-600 hover:underline">
					Зарегистрироваться
				</Link>
			</div>
		</div>
	);
}

export default function LoginPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<LoginForm />
		</Suspense>
	);
}
