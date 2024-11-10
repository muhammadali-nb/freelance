import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { RoleProvider } from "@/context/role-context";
import { NotificationsProvider } from "@/context/notifications-context";
import { Toaster } from "react-hot-toast";

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
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				/>
			</head>
			<body className={inter.className}>
				<AuthProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange>
						<RoleProvider>
							<NotificationsProvider>{children}</NotificationsProvider>
						</RoleProvider>
					</ThemeProvider>
				</AuthProvider>
				<Toaster position="top-right" />
			</body>
		</html>
	);
}
