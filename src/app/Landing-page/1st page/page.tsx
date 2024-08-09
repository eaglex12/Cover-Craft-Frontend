"use client";
import React from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@mui/material";
import CoverLetterInput from "@/components/cover-letter-input";
import { Globe } from "../2nd page/page";

export function FirstPage() {
	return (
		<div className="w-[calc(100%-4rem)] mx-auto rounded-md h-[100vh] overflow-hidden bg-white dark:bg-black text-black dark:text-white">
			<div className="grid grid-cols-2 items-center px-20 py-20">
				<div>
					<div className="text-foreground text-6xl font-bold mb-4">
						Generate a Cover Letter{" "}
						<FlipWords words={["Instantly", "Quickly", "Rapidly", "Swiftly"]} />
					</div>
					<p className="text-accent text-lg mb-6 max-w-xl text-black dark:text-gray-500 ">
						Our platform provides a quick and easy way to create professional
						cover letters tailored to your needs. Just enter a few details, and
						let our tool do the rest. Save time and enhance your job
						applications today!
					</p>
					<Button>Get Started</Button>
				</div>
				<CoverLetterInput />
			</div>
			<div className="flex justify-center mb-8">
				<Globe className="w-64 h-64" />
			</div>
		</div>
	);
}
