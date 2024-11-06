"use client";

import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
			<Suspense fallback={<div className="text-foreground">Загрузка...</div>}>
				<LoginForm />
			</Suspense>
		</div>
	);
}
