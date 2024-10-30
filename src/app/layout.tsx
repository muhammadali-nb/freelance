import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter } from "@/lib/fonts";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
	title: "Freelance Platform",
	description: "Найдите лучших фрилансеров или предложите свои услуги",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className={inter.className}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
