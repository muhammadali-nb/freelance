import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { RoleProvider } from "@/context/role-context";
import { NotificationsProvider } from "@/context/notifications-context";

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
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
			/>
			<body className={inter.className}>
				<AuthProvider>
					<RoleProvider>
						<NotificationsProvider>
							<ThemeProvider
								attribute="class"
								defaultTheme="system"
								enableSystem
								disableTransitionOnChange>
								{children}
							</ThemeProvider>
						</NotificationsProvider>
					</RoleProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
