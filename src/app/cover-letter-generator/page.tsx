"use client";

import { useState, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Edit, Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { readDocxFile } from "@/utils/docUtils";
import { FetchUtils } from "@/utils/axiosInstance";
import { responseData } from "@/types/cover-letter-types";

const CoverLetterGenerator: React.FC = () => {
	const [uploadedLetter, setUploadedLetter] = useState<string>("");
	const [placeholders, setPlaceholders] = useState({
		name: "",
		company: "",
		role: "",
	});
	const [updatedLetter, setUpdatedLetter] = useState<string>("");
	const [betterCoverLetter, setBetterCoverLetter] = useState<string>("");
	const [step, setStep] = useState<number>(1);
	const [displayLetter, setDisplayLetter] = useState<string>("");
	const [activeVersion, setActiveVersion] = useState<"manual" | "ai" | null>(
		null
	);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isGeneratingAI, setIsGeneratingAI] = useState(false);
	const { toast } = useToast();

	const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const fileType = file.name.split(".").pop()?.toLowerCase();
			if (fileType === "txt") {
				const reader = new FileReader();
				reader.onload = (e) => {
					const content = e.target?.result as string;
					setUploadedLetter(content);
					setDisplayLetter(content);
					setStep(2);
				};
				reader.readAsText(file);
			} else if (fileType === "docx") {
				try {
					const docxText = await readDocxFile(file);
					setUploadedLetter(docxText);
					setDisplayLetter(docxText);
					setStep(2);
				} catch (error) {
					console.error("Error reading docx file:", error);
					toast({
						title: "Error",
						description: "Failed to read the DOCX file. Please try again.",
						variant: "destructive",
					});
				}
			} else {
				toast({
					title: "Unsupported File",
					description: "Please upload a .txt or .docx file.",
					variant: "destructive",
				});
			}
		}
	};

	const handleUpload = async () => {
		if (!uploadedLetter) return;
		setIsUpdating(true);

		try {
			const response = (await FetchUtils.postRequest("api/parse-cover-letter", {
				file: uploadedLetter,
				name: placeholders.name,
				company: placeholders.company,
				role: placeholders.role,
			})) as responseData;

			const { text } = response;
			setUpdatedLetter(text);
			setDisplayLetter(text);
			setActiveVersion("manual");
			setStep(3);
		} catch (error) {
			console.error("Failed to upload and parse cover letter", error);
			toast({
				title: "Error",
				description: "Failed to update the cover letter. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsUpdating(false);
		}
	};

	const handleGenerateBetterCoverLetter = async () => {
		if (!updatedLetter) return;
		setIsGeneratingAI(true);

		try {
			const response = (await FetchUtils.postRequest(
				"api/generate-better-cover-letter",
				{
					file: updatedLetter,
					name: placeholders.name,
					company: placeholders.company,
					role: placeholders.role,
				}
			)) as responseData;

			const { text } = response;
			setBetterCoverLetter(text);
			setDisplayLetter(text);
			setActiveVersion("ai");
			setStep(4);
		} catch (error) {
			console.error("Failed to generate better cover letter", error);
			toast({
				title: "Error",
				description:
					"Failed to generate a better cover letter. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsGeneratingAI(false);
		}
	};

	const handleUpdate =
		(field: keyof typeof placeholders) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			setPlaceholders({ ...placeholders, [field]: e.target.value });
		};

	const stepVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
	};

	return (
		<div className="flex flex-col lg:flex-row min-h-screen bg-background">
			<div className="w-full lg:w-2/3 p-4 lg:p-8 border-b lg:border-r lg:border-b-0">
				<Card className="h-full">
					<CardContent className="p-4 lg:p-6 h-full">
						<Textarea
							value={displayLetter}
							readOnly
							className="w-full h-full min-h-[300px] lg:min-h-[600px] resize-none font-mono text-sm"
							placeholder="Your cover letter will appear here..."
						/>
					</CardContent>
				</Card>
			</div>
			<div className="w-full lg:w-1/3 p-4 lg:p-8 flex flex-col">
				<h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-8">
					Cover Letter Enhancer
				</h1>
				<Card className="flex-grow">
					<CardContent className="p-4 lg:p-6">
						<AnimatePresence mode="wait">
							{step === 1 && (
								<motion.div
									key="step1"
									variants={stepVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
								>
									<CardHeader>
										<CardTitle>Step 1: Upload Your Cover Letter</CardTitle>
									</CardHeader>
									<div className="space-y-4">
										<div className="flex items-center justify-center w-full">
											<Label
												htmlFor="file-upload"
												className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
											>
												<div className="flex flex-col items-center justify-center pt-5 pb-6">
													<Upload className="w-8 h-8 mb-2 text-muted-foreground" />
													<p className="text-sm text-muted-foreground">
														<span className="font-semibold">
															Click to upload
														</span>{" "}
														or drag and drop
													</p>
													<p className="text-xs text-muted-foreground">
														TXT or DOCX
													</p>
												</div>
												<Input
													id="file-upload"
													type="file"
													className="hidden"
													onChange={handleFileUpload}
													accept=".txt,.docx"
												/>
											</Label>
										</div>
									</div>
								</motion.div>
							)}

							{step === 2 && (
								<motion.div
									key="step2"
									variants={stepVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
								>
									<CardHeader>
										<CardTitle>Step 2: Update Information</CardTitle>
									</CardHeader>
									<div className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="name">Name</Label>
											<Input
												id="name"
												value={placeholders.name}
												onChange={handleUpdate("name")}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="company">Company</Label>
											<Input
												id="company"
												value={placeholders.company}
												onChange={handleUpdate("company")}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="role">Role</Label>
											<Input
												id="role"
												value={placeholders.role}
												onChange={handleUpdate("role")}
											/>
										</div>
										<Button
											onClick={handleUpload}
											className="w-full"
											disabled={isUpdating}
										>
											{isUpdating ? (
												<>
													<Loader2 className="w-4 h-4 mr-2 animate-spin" />
													Updating...
												</>
											) : (
												<>
													<Edit className="w-4 h-4 mr-2" />
													Update Cover Letter
												</>
											)}
										</Button>
									</div>
								</motion.div>
							)}

							{(step === 3 || step === 4) && (
								<motion.div
									key="step3-4"
									variants={stepVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
								>
									<CardHeader>
										<CardTitle>
											{step === 3
												? "Step 3: Generate Better Version"
												: "Step 4: Your Enhanced Cover Letter"}
										</CardTitle>
									</CardHeader>
									<div className="space-y-4">
										<Button
											onClick={handleGenerateBetterCoverLetter}
											className="w-full"
											disabled={isGeneratingAI}
										>
											{isGeneratingAI ? (
												<>
													<Loader2 className="w-4 h-4 mr-2 animate-spin" />
													Generating...
												</>
											) : (
												<>
													<Wand2 className="w-4 h-4 mr-2" />
													Generate Better Cover Letter
												</>
											)}
										</Button>
										{step === 4 && (
											<Button
												onClick={() => {
													navigator.clipboard.writeText(betterCoverLetter);
													toast({
														title: "Copied!",
														description:
															"Your enhanced cover letter has been copied to the clipboard.",
													});
												}}
												className="w-full"
											>
												<FileText className="w-4 h-4 mr-2" />
												Copy to Clipboard
											</Button>
										)}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</CardContent>
				</Card>
				<div className="flex space-x-4 mt-4">
					<Button
						variant={activeVersion === "manual" ? "default" : "outline"}
						className="w-1/2"
						disabled={!updatedLetter}
						onClick={() => {
							setDisplayLetter(updatedLetter);
							setActiveVersion("manual");
						}}
					>
						Manual Version
					</Button>
					<Button
						variant={activeVersion === "ai" ? "default" : "outline"}
						className="w-1/2"
						disabled={!betterCoverLetter}
						onClick={() => {
							setDisplayLetter(betterCoverLetter);
							setActiveVersion("ai");
						}}
					>
						AI Generated
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CoverLetterGenerator;
