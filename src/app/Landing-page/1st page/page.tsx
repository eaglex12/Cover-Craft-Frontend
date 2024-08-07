"use client";
import React from "react";
import { Vortex } from "../../../components/ui/vortex";
import { TypewriterEffectSmooth } from "../../../components/ui/typewriter-effect";
const words = [
	{
		text: "Crafting",
		className: "text-white text-2xl md:text-4xl",
	},
	{
		text: "Perfect",
		className: "text-white text-2xl md:text-4xl",
	},
	{
		text: "Cover",
		className: "text-white text-2xl md:text-4xl",
	},
	{
		text: "Letter",
		className: "text-white text-2xl md:text-4xl",
	},
	{
		text: "for",
		className: "text-white text-2xl md:text-4xl",
	},
	{
		text: "your",
		className: "text-white text-2xl md:text-4xl",
	},
	{
		text: "Success.",
		className: "text-blue-500 text-2xl md:text-4xl dark:text-blue-500",
	},
];

export function FirstPage() {
	return (
		<div className="w-[calc(100%-4rem)] mx-auto rounded-md h-[100vh] overflow-hidden">
			<Vortex
				rangeY={200}
				backgroundColor="black"
				className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
			>
				<h1 className="text-white text-2xl md:text-6xl font-bold text-center">
					Cover Craft
				</h1>
				<TypewriterEffectSmooth words={words} />
				<div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
					<button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
						Order now
					</button>
					<button className="px-4 py-2 text-white">Watch trailer</button>
				</div>
			</Vortex>
		</div>
	);
}
