"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X, User, Settings, Briefcase, LogOut } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user, isAuthenticated, logout } = useAuth();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleLogout = async () => {
		await logout();
		setIsOpen(false);
	};

	return (
		<nav className="bg-background border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex px-2 lg:px-0">
						<Link href="/" className="flex-shrink-0 flex items-center">
							<span className="font-bold text-xl">Freelance</span>
						</Link>
						<div className="hidden lg:ml-6 lg:flex lg:space-x-8">
							<NavLink href="/">Главная</NavLink>
							<NavLink href="/about">О нас</NavLink>
							<NavLink href="/contact">Контакты</NavLink>
						</div>
					</div>
					<div className="hidden lg:ml-6 lg:flex lg:items-center space-x-4">
						{isAuthenticated && user ? (
							<DropdownMenu>
								<DropdownMenuTrigger className="focus:outline-none">
									<Avatar>
										<AvatarImage src={user.avatar} alt={user.name} />
										<AvatarFallback>
											{user.name.substring(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-56">
									<DropdownMenuLabel>{user.name}</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Link href="/profile" className="w-full flex items-center">
											<User className="mr-2 h-4 w-4" />
											<span>Профиль</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Link href="/settings" className="w-full flex items-center">
											<Settings className="mr-2 h-4 w-4" />
											<span>Настройки</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Link href="/projects" className="w-full flex items-center">
											<Briefcase className="mr-2 h-4 w-4" />
											<span>Мои проекты</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										className="text-red-600"
										onClick={handleLogout}>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Выйти</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Link href="/login">
								<Button variant="outline" size="lg">
									Войти
								</Button>
							</Link>
						)}
					</div>
					<div className="flex items-center lg:hidden">
						<button
							onClick={toggleMenu}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition duration-150 ease-in-out"
							aria-expanded="false">
							<span className="sr-only">Открыть главное меню</span>
							{isOpen ? (
								<X className="block h-6 w-6" aria-hidden="true" />
							) : (
								<Menu className="block h-6 w-6" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Мобильное меню */}
			<div
				className={cn(
					"fixed inset-0 bg-black bg-opacity-50 lg:hidden transition-opacity duration-300 z-50",
					isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				)}
				onClick={toggleMenu}>
				<div
					className={cn(
						"fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out",
						isOpen ? "translate-x-0" : "translate-x-full"
					)}
					onClick={(e) => e.stopPropagation()}>
					<div className="pt-5 pb-6 px-4">
						<div className="flex items-center justify-between mb-8">
							<div className="font-bold text-xl">Меню</div>
							<button
								onClick={toggleMenu}
								className="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
								<X className="h-6 w-6" />
							</button>
						</div>
						<div className="space-y-4">
							<MobileNavLink href="/" onClick={toggleMenu}>
								Главная
							</MobileNavLink>
							<MobileNavLink href="/about" onClick={toggleMenu}>
								О нас
							</MobileNavLink>
							<MobileNavLink href="/contact" onClick={toggleMenu}>
								Контакты
							</MobileNavLink>
						</div>
						{isAuthenticated && user ? (
							<div className="mt-6 pt-6 border-t border-gray-200">
								<div className="flex items-center px-4 mb-4">
									<div className="flex-shrink-0">
										<Avatar>
											<AvatarImage src={user.avatar} alt={user.name} />
											<AvatarFallback>
												{user.name.substring(0, 2).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</div>
									<div className="ml-3">
										<div className="text-base font-medium text-gray-800">
											{user.name}
										</div>
										<div className="text-sm font-medium text-gray-500">
											{user.email}
										</div>
									</div>
								</div>
								<div className="space-y-1">
									<MobileMenuItem
										href="/profile"
										icon={User}
										onClick={toggleMenu}>
										Профиль
									</MobileMenuItem>
									<MobileMenuItem
										href="/settings"
										icon={Settings}
										onClick={toggleMenu}>
										Настройки
									</MobileMenuItem>
									<MobileMenuItem
										href="/projects"
										icon={Briefcase}
										onClick={toggleMenu}>
										Мои проекты
									</MobileMenuItem>
									<button
										onClick={handleLogout}
										className="flex items-center w-full px-4 py-2 text-base font-medium text-red-600 hover:bg-gray-50">
										<LogOut className="mr-3 h-5 w-5" />
										Выйти
									</button>
								</div>
							</div>
						) : (
							<div className="mt-6 pt-6 border-t border-gray-200">
								<Link href="/login" className="w-full" onClick={toggleMenu}>
									<Button variant="outline" className="w-full">
										Войти
									</Button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

const NavLink = ({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) => (
	<Link
		href={href}
		className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition duration-150 ease-in-out">
		{children}
	</Link>
);

const MobileNavLink = ({
	href,
	onClick,
	children,
}: {
	href: string;
	onClick: () => void;
	children: React.ReactNode;
}) => (
	<Link
		href={href}
		className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition duration-150 ease-in-out"
		onClick={onClick}>
		{children}
	</Link>
);

const MobileMenuItem = ({
	href,
	icon: Icon,
	onClick,
	children,
}: {
	href: string;
	icon: any;
	onClick: () => void;
	children: React.ReactNode;
}) => (
	<Link
		href={href}
		className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
		onClick={onClick}>
		<Icon className="mr-3 h-5 w-5" />
		{children}
	</Link>
);

export default Navbar;
