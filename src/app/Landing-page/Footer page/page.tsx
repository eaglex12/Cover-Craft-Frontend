import React from "react";

const Footer: React.FC = () => {
	return (
		<div className="bg-background  flex flex-col items-center px-4 py-8">
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

export default Footer;
