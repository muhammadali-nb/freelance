"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      router.push("/profile");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-background border rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-center text-foreground">
        Регистрация
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Имя</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите ваше имя"
            required
          />
        </div>
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
        <Button type="submit" className="w-full">
          Зарегистрироваться
        </Button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-sm text-muted-foreground">Уже есть аккаунт? </span>
        <Link href="/login" className="text-sm text-primary hover:underline">
          Войти
        </Link>
      </div>
    </div>
  );
} 