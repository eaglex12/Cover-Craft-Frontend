import React from "react";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";

const Home: React.FC = () => {
	return (
		<div className="flex items-center justify-center  gap-6 p-6">
			<CardContainer className="p-6">
				<CardBody className="bg-gray-50 border border-black/[0.1] rounded-xl p-6 shadow-lg">
					<CardItem
						translateZ="70"
						className="text-xl font-bold text-neutral-600 dark:text-white"
					>
						Pre-Uploaded Letter
					</CardItem>
					<CardItem
						translateZ="80"
						className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
					>
						<Link href="/pre-uploaded-letter">
							<span className="underline cursor-pointer">
								Go to Pre-Uploaded Letter
							</span>
						</Link>
					</CardItem>
				</CardBody>
			</CardContainer>

			<CardContainer className="p-6">
				<CardBody className="bg-gray-50 border border-black/[0.1] rounded-xl p-6 shadow-lg">
					<CardItem
						translateZ="70"
						className="text-xl font-bold text-neutral-600 dark:text-white"
					>
						Cover Letter Generator
					</CardItem>
					<CardItem
						translateZ="80"
						className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
					>
						<Link href="/cover-letter-generator">
							<span className="underline cursor-pointer">
								Go to Cover Letter Generator
							</span>
						</Link>
					</CardItem>
				</CardBody>
			</CardContainer>
		</div>
	);
};

export default Home;
