export default function CoverLetterInput() {
	return (
		<div className="bg-background rounded-lg h-full space-y-5 mx-20">
			<textarea
				className="bg-transparent h-full w-full p-5 outline-none text-accent rounded-lg neumorphism"
				placeholder="Paste your cover letter here..."
			/>
		</div>
	);
}
