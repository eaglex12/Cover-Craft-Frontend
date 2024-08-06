import React from "react";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { SparklesCore } from "../components/ui/sparkles";
import { About } from "./Landing-page/landingPage";

const Home: React.FC = () => {
	return (
		<div>
			<About />
		</div>
		// <div className="relative h-screen w-full bg-black overflow-hidden">
		// 	{/* Content */}
		// 	<div className="relative z-20 flex items-center justify-center gap-6 p-6 mt-16">
		// 		<CardContainer className="p-6">
		// 			<CardBody className="bg-gray-800 border border-white/[0.2] rounded-xl p-6 shadow-lg">
		// 				<CardItem translateZ="70" className="text-xl font-bold text-white">
		// 					Pre-Uploaded Letter
		// 				</CardItem>
		// 				<CardItem translateZ="80" className="text-white text-sm mt-2">
		// 					<Link href="/pre-uploaded-letter">
		// 						<span className="underline cursor-pointer">
		// 							Go to Pre-Uploaded Letter
		// 						</span>
		// 					</Link>
		// 				</CardItem>
		// 			</CardBody>
		// 		</CardContainer>

		// 		<CardContainer className="p-6">
		// 			<CardBody className="bg-gray-800 border border-white/[0.2] rounded-xl p-6 shadow-lg">
		// 				<CardItem translateZ="70" className="text-xl font-bold text-white">
		// 					Cover Letter Generator
		// 				</CardItem>
		// 				<CardItem translateZ="80" className="text-white text-sm mt-2">
		// 					<Link href="/cover-letter-generator">
		// 						<span className="underline cursor-pointer">
		// 							Go to Cover Letter Generator
		// 						</span>
		// 					</Link>
		// 				</CardItem>
		// 			</CardBody>
		// 		</CardContainer>
		// 	</div>

		// 	{/* Gradient Lines */}
		// 	<div className="absolute inset-0 z-10 flex flex-col items-center justify-start">
		// 		<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
		// 		<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
		// 		<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
		// 		<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
		// 	</div>

		// 	{/* Sparkles Background */}
		// 	<div className="absolute inset-0 z-0 flex items-center justify-center">
		// 		<div className="relative w-[30%] h-[30%]">
		// 			<SparklesCore
		// 				background="transparent"
		// 				minSize={0.4}
		// 				maxSize={1}
		// 				particleDensity={1200}
		// 				className="w-full h-full"
		// 				particleColor="#FFFFFF"
		// 			/>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default Home;
