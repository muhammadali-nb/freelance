"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="bg-white shadow-sm">
			<div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
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
					<div className="hidden lg:ml-6 lg:flex lg:items-center">
						<Link href="/login">
							<Button variant="outline" size="lg">Войти</Button>
						</Link>
					</div>
					<div className="flex items-center lg:hidden">
						<button
							onClick={toggleMenu}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition duration-150 ease-in-out"
							aria-expanded="false"
						>
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

			<div
				className={`lg:hidden transition-all duration-300 ease-in-out ${
					isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
				} overflow-hidden`}
			>
				<div className="px-2 pt-2 pb-3 space-y-1">
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
				<div className="pt-4 pb-3 border-t border-gray-200">
					<div className="flex items-center px-4">
						<Link href="/login">
							<Button variant="outline" size="sm" onClick={toggleMenu}>
								Войти
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
	<Link
		href={href}
		className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition duration-150 ease-in-out"
	>
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
		className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-150 ease-in-out"
		onClick={onClick}
	>
		{children}
	</Link>
);

export default Navbar;
