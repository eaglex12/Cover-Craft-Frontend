"use client";
import React, { useState, useEffect } from "react";
import { FirstPage } from "./1st page/page";
import { SecondPage } from "./2nd page/page";

export function About() {
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
		<>
			<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
				<button
					onClick={toggleDarkMode}
					className="p-2 m-4 bg-gray-200 dark:bg-gray-800 rounded"
				>
					Toggle {darkMode ? "Light" : "Dark"} Mode
				</button>
				<FirstPage />
				<SecondPage />
			</div>
		</>
	);
}
