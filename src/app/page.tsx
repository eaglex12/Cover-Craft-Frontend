import React from "react";
import Link from "next/link";

const Home: React.FC = () => {
	return (
		<div>
			<Link href="/pre-uploaded-letter">
				Welcome to the Cover Letter Generator
			</Link>
			<Link href="/cover-letter-generator">Go to Cover Letter Generator</Link>
		</div>
	);
};

export default Home;
