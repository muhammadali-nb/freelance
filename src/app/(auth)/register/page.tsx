"use client";

import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Suspense fallback={<div className="text-foreground">Загрузка...</div>}>
				<RegisterForm />
			</Suspense>
		</div>
	);
}
