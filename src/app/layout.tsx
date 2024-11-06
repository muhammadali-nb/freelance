import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { RoleProvider } from "@/context/role-context";

export const metadata: Metadata = {
	title: "Freelance Platform",
	description: "Найдите лучших фрилансеров или предложите свои услуги",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru" suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<AuthProvider>
					<RoleProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange>
							{children}
						</ThemeProvider>
					</RoleProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
