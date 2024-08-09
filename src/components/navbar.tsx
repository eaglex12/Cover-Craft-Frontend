"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	return (
		<nav className="px-10 py-5 flex justify-between bg-white dark:bg-black text-black dark:text-white">
			<Link href="/" className="font-bold">
				Cover Craft
			</Link>
			<div className="flex items-center space-x-5">
				<Link href="#" className="p-2 text-gray-700 dark:text-gray-300">
					Sign Up
				</Link>
				<Link
					href="#"
					className="py-2 px-10 rounded neumorphism  text-gray-700 dark:text-gray-200"
				>
					Login
				</Link>
				<button
					onClick={toggleDarkMode}
					className="p-2 text-gray-600 dark:text-gray-300"
				>
					{darkMode ? (
						<FaMoon className="text-yellow-500" />
					) : (
						<FaSun className="text-yellow-500" />
					)}
				</button>
			</div>
		</nav>
	);
}
