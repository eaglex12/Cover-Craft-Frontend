import React from "react";
import { Globe } from "./Landing-page/2nd page/page";
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";
import CoverLetterInput from "@/components/cover-letter-input";

const Home: React.FC = () => {
	return (
		<div className="bg-background min-h-screen flex flex-col items-center px-4 py-8">
			<div className="grid grid-cols-2 items-center px-20 py-20">
				<div>
					<div className="text-foreground text-6xl font-bold mb-4">
						Generate a Cover Letter{" "}
						<FlipWords
							words={["Instantly", "Quickly", "Rapidly", "Swiftly"]}
						/>
					</div>
					<p className="text-accent text-lg mb-6 max-w-xl">
						Our platform provides a quick and easy way to create professional
						cover letters tailored to your needs. Just enter a few details,
						and let our tool do the rest. Save time and enhance your job
						applications today!
					</p>
					<Button>Get Started</Button>
				</div>
				<CoverLetterInput />
			</div>
			<div className="flex justify-center mb-8">
				<Globe className="w-64 h-64" />
			</div>

			<footer className="mt-16 text-foreground text-center">
				<p className="text-sm">© 2024 Cover Craft. All rights reserved.</p>
				<div className="flex justify-center mt-4 space-x-4">
					<a href="#" className="text-primary hover:underline">
						Contact Us
					</a>
					<a href="#" className="text-primary hover:underline">
						Privacy Policy
					</a>
					<a href="#" className="text-primary hover:underline">
						Terms of Service
					</a>
				</div>
			</footer>
		</div>
	);
};

export default Home;
