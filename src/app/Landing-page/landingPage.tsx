import { FirstPage } from "./1st page/page";
import { SecondPage } from "./2nd page/page";
import Footer from "./Footer page/page";

export function About() {
	return (
		<>
			<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
				<FirstPage />
				<SecondPage />
				<Footer />
			</div>
		</>
	);
}
