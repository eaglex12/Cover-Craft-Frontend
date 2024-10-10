"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { readDocxFile } from "@/utils/docUtils"; // Ensure this path is correct

export default function CoverLetterGenerator() {
	const [company, setCompany] = useState("");
	const [role, setRole] = useState("");
	const [generatedLetter, setGeneratedLetter] = useState("");
	const [uploadedLetter, setUploadedLetter] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);
	const canvasRef = useRef<HTMLDivElement>(null);
	const { toast } = useToast();

	const generateCoverLetter = async () => {
		setIsGenerating(true);
		// Simulating API call or processing time
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const letter = `
Dear Hiring Manager,

I am writing to express my strong interest in the ${role} role at ${company}. With a solid background in computer science and engineering, along with hands-on experience in developing innovative software solutions, I am eager to bring my technical expertise and passion for software development to your esteemed team.

Currently, I am working as a Software Development Engineer at basys.ai, where I have played a pivotal role in developing an enterprise software solution from inception to automate the Prior Authorization System in the US. This project has significantly improved healthcare process efficiency. I have integrated advanced AI systems, including ChatGPT and Claude.AI, alongside an in-house AI system, enhancing the system's intelligence and responsiveness by 50%.

One of my notable achievements in this role includes automating the process of switching between different GPT models, which reduced testing time by up to 80% for the AI team. I also implemented FHIR (Fast Healthcare Interoperability Resources) standards using HAPI FHIR and HL7 protocols to ensure secure and efficient exchange of healthcare information. This implementation enabled seamless integration with other healthcare systems and enhanced data interoperability, reducing data exchange errors by 70%.

During my 6-month internship at MyOoumph Networks Pvt Ltd as a Full Stack Development Intern, I strengthened my backend development skills through extensive work with Django and GraphQL API, while also utilizing technologies such as Apollo Client, ReactJS, and CSS to craft engaging user interfaces. My commitment to developing reliable solutions was demonstrated through my extensive use of the Postman API for testing and debugging endpoints, contributing to a robust and scalable backend architecture.

A significant highlight of my experience was addressing a rendering issue at Shaadi.com, where my problem-solving abilities and front-end programming proficiency significantly improved the user experience. My academic excellence is underscored by my All India Rank (AIR) of 15002 out of 1.2 million applicants in the highly competitive JEE Advanced 2020.

I am enthusiastic about the prospect of contributing my technical expertise, strong foundation in DSA, and innovative problem-solving skills to ${company}'s groundbreaking projects. I am confident that my background aligns perfectly with the requirements of the ${role} role, and I am eager to bring my passion for software development to your team.

Thank you for considering my application. I look forward to the possibility of contributing to ${company}'s success and further advancing my career as a ${role}.

Sincerely,
Divyansh Singh Rathore
    `.trim();

		setGeneratedLetter(letter);
		setIsGenerating(false);
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(generatedLetter).then(() => {
			toast({
				title: "Copied!",
				description: "Cover letter copied to clipboard.",
			});
		});
	};

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file) {
			const fileType = file.name.split(".").pop()?.toLowerCase();
			if (fileType === "txt") {
				const reader = new FileReader();
				reader.onload = (e) => {
					setUploadedLetter(e.target?.result as string);
				};
				reader.readAsText(file);
			} else if (fileType === "docx") {
				try {
					const docxText = await readDocxFile(file);
					setUploadedLetter(docxText);
				} catch (error) {
					console.error("Error reading docx file:", error);
				}
			} else {
				toast({
					title: "Error",
					description: "Please upload a .txt or .docx file.",
					variant: "destructive",
				});
			}
		}
	};

	useEffect(() => {
		if (canvasRef.current && generatedLetter) {
			const canvas = canvasRef.current;
			canvas.innerHTML = generatedLetter.replace(/\n/g, "<br>");
		}
	}, [generatedLetter]);

	return (
		<div className="flex flex-col lg:flex-row min-h-screen bg-background p-4 gap-4">
			<div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-8 flex items-center justify-center">
				<motion.div
					ref={canvasRef}
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="w-full h-full overflow-auto"
					style={{
						fontFamily: "Georgia, serif",
						fontSize: "14px",
						lineHeight: "1.6",
					}}
				>
					{isGenerating ? (
						<div className="flex flex-col items-center justify-center h-full">
							<Loader2 className="w-8 h-8 animate-spin text-primary" />
							<p className="mt-4 text-muted-foreground">
								Generating your cover letter...
							</p>
						</div>
					) : !generatedLetter ? (
						<div className="flex items-center justify-center h-full text-muted-foreground">
							Your generated cover letter will appear here
						</div>
					) : null}
				</motion.div>
			</div>
			<div className="w-full lg:w-1/3 bg-muted rounded-lg shadow-lg p-8">
				<h1 className="text-4xl font-bold mb-8">Cover Letter Generator</h1>
				<div className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="company">Company Name</Label>
						<Input
							id="company"
							placeholder="Enter company name"
							value={company}
							onChange={(e) => setCompany(e.target.value)}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="role">Role</Label>
						<Input
							id="role"
							placeholder="Enter role"
							value={role}
							onChange={(e) => setRole(e.target.value)}
						/>
					</div>
					<Button
						onClick={generateCoverLetter}
						className="w-full"
						disabled={isGenerating}
					>
						{isGenerating ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Generating...
							</>
						) : (
							"Generate Cover Letter"
						)}
					</Button>
					<div className="relative">
						<Input
							type="file"
							accept=".txt,.docx"
							id="file-upload"
							className="hidden"
							onChange={handleFileUpload}
						/>
						<Label
							htmlFor="file-upload"
							className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-md cursor-pointer hover:border-primary"
						>
							<Upload className="w-6 h-6 mr-2" />
							Upload existing cover letter
						</Label>
					</div>
					{generatedLetter && (
						<Button onClick={copyToClipboard} className="w-full">
							<Copy className="w-4 h-4 mr-2" />
							Copy to Clipboard
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
