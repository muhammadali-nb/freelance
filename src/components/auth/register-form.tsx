"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Progress } from "@/components/ui/progress";

export function RegisterForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    try {
      await register(formData.name, formData.email, formData.password);
      router.push("/onboarding");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Регистрация</h1>
      <Progress value={step === 1 ? 33.33 : step === 2 ? 66.66 : 100} className="mb-6" />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Введите ваше имя"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Введите ваш email"
                required
              />
            </div>
            <Button
              type="button"
              className="w-full"
              onClick={nextStep}
              disabled={!formData.name || !formData.email}
            >
              Далее
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Введите пароль"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Подтвердите пароль"
                required
              />
            </div>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={prevStep}
              >
                Назад
              </Button>
              <Button
                type="submit"
                className="w-full"
                disabled={
                  !formData.password ||
                  !formData.confirmPassword ||
                  formData.password !== formData.confirmPassword
                }
              >
                Зарегистрироваться
              </Button>
            </div>
          </>
        )}
      </form>

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">Уже есть аккаунт? </span>
        <Link href="/login" className="text-sm text-blue-600 hover:underline">
          Войти
        </Link>
      </div>
    </div>
  );
} 