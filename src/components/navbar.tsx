import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="px-10 py-5 flex justify-between bg-background">
			<Link href="/" className="text-foreground font-bold">
				Cover Craft
			</Link>
			<div className="space-x-5">
				<Link href="/signup" className="text-foreground p-2">
					Sign Up
				</Link>
				<Link
					href="/login"
					className="text-secondary py-2 px-10 rounded-lg bg-primary"
				>
					Login
				</Link>
			</div>
		</nav>
	);
}
