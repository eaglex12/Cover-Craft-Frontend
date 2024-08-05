// app/layout.tsx

import { Inter } from "next/font/google";
import { CssBaseline } from "@mui/material";
import "./globals.css"; // Ensure you import any global CSS if needed

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "My Next.js Project",
	description: "Generated by Next.js",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<html lang="en">
			<body className={inter.className}>
				<CssBaseline /> {/* Ensure to use Material-UI's CSS baseline */}
				{children}
			</body>
		</html>
	);
};

export default RootLayout;