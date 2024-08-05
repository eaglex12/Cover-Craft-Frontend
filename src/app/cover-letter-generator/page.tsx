"use client";
import { useState, ChangeEvent } from "react";
import { Container, TextField, Button, Paper, Typography } from "@mui/material";
import { readDocxFile } from "../../utils/docUtils";
import { FetchUtils } from "../../utils/axiosInstance";
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
	const [view, setView] = useState<"upload" | "uploaded" | "updated">("upload");

	const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const fileType = file.name.split(".").pop()?.toLowerCase();
			if (fileType === "txt") {
				const reader = new FileReader();
				reader.onload = (e) => {
					setUploadedLetter(e.target?.result as string);
					setView("uploaded");
				};
				reader.readAsText(file);
			} else if (fileType === "docx") {
				try {
					const docxText = await readDocxFile(file);
					setUploadedLetter(docxText);
					setView("uploaded");
				} catch (error) {
					console.error("Error reading docx file:", error);
				}
			} else {
				console.error(
					"Unsupported file format. Please upload a .txt or .docx file."
				);
			}
		}
	};

	const handleUpload = async () => {
		if (!uploadedLetter) return;

		try {
			const response = (await FetchUtils.postRequest("api/parse-cover-letter", {
				file: uploadedLetter,
				name: placeholders.name,
				company: placeholders.company,
				role: placeholders.role,
			})) as responseData;

			const { text } = response;
			setUpdatedLetter(text);
			setView("updated");
		} catch (error) {
			console.error("Failed to upload and parse cover letter", error);
		}
	};

	const handleGenerateBetterCoverLetter = async () => {
		if (!updatedLetter) return;

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
		} catch (error) {
			console.error("Failed to generate better cover letter", error);
		}
	};

	const handleUpdate =
		(field: keyof typeof placeholders) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			setPlaceholders({ ...placeholders, [field]: e.target.value });
		};

	return (
		<Container maxWidth="md">
			<Typography variant="h4">Upload and Edit Cover Letter</Typography>
			<input type="file" onChange={handleFileUpload} />

			{view === "upload" && (
				<Button variant="contained" color="primary" onClick={handleUpload}>
					Upload and Parse
				</Button>
			)}

			{view === "uploaded" && (
				<Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
					<Typography variant="h6">Uploaded Cover Letter</Typography>
					<pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
						{uploadedLetter}
					</pre>
					<Typography variant="h6" sx={{ marginTop: "20px" }}>
						Update Information
					</Typography>
					<TextField
						label="Name"
						value={placeholders.name}
						onChange={handleUpdate("name")}
						fullWidth
						sx={{ marginBottom: "10px" }}
					/>
					<TextField
						label="Company"
						value={placeholders.company}
						onChange={handleUpdate("company")}
						fullWidth
						sx={{ marginBottom: "10px" }}
					/>
					<TextField
						label="Role"
						value={placeholders.role}
						onChange={handleUpdate("role")}
						fullWidth
						sx={{ marginBottom: "20px" }}
					/>
					<Button variant="contained" color="secondary" onClick={handleUpload}>
						Update Cover Letter
					</Button>
				</Paper>
			)}

			{view === "updated" && (
				<Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
					<Typography variant="h6">Updated Cover Letter</Typography>
					<pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
						{updatedLetter}
					</pre>
					<Button
						variant="contained"
						color="success"
						onClick={handleGenerateBetterCoverLetter}
						sx={{ marginTop: "20px" }}
					>
						Generate Better Cover Letter
					</Button>
				</Paper>
			)}

			{betterCoverLetter && (
				<Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
					<Typography variant="h6">Better Cover Letter</Typography>
					<pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
						{betterCoverLetter}
					</pre>
				</Paper>
			)}
		</Container>
	);
};

export default CoverLetterGenerator;
