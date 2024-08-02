import React, { useState } from "react";
import { Container, TextField, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import { readDocxFile } from "../utils/docutils"; // Ensure this path is correct

const CoverLetterGenerator = () => {
	const [uploadedLetter, setUploadedLetter] = useState("");
	const [placeholders, setPlaceholders] = useState({
		name: "",
		company: "",
		role: "",
	});
	const [updatedLetter, setUpdatedLetter] = useState("");
	const [betterCoverLetter, setBetterCoverLetter] = useState("");
	const [view, setView] = useState("upload"); // New state to manage the current view

	const handleFileUpload = async (event) => {
		const file = event.target.files[0];
		if (file) {
			const fileType = file.name.split(".").pop().toLowerCase();
			if (fileType === "txt") {
				const reader = new FileReader();
				reader.onload = (e) => {
					setUploadedLetter(e.target.result);
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
			const response = await axios.post(
				"http://localhost:3000/api/parse-cover-letter",
				{
					file: uploadedLetter,
					name: placeholders.name,
					company: placeholders.company,
					role: placeholders.role,
				}
			);

			const { text } = response.data;
			console.log("🚀 ~ handleUpload ~ text:", text);

			setUpdatedLetter(text);
			setView("updated");
		} catch (error) {
			console.error("Failed to upload and parse cover letter", error);
		}
	};

	const handleGenerateBetterCoverLetter = async () => {
		if (!updatedLetter) return; // Ensure updatedLetter is used

		try {
			const response = await axios.post(
				"http://localhost:3000/api/generate-better-cover-letter",
				{
					file: updatedLetter, // Use updatedLetter instead of uploadedLetter
					name: placeholders.name,
					company: placeholders.company,
					role: placeholders.role,
				}
			);

			const { text } = response.data;
			setBetterCoverLetter(text);
		} catch (error) {
			console.error("Failed to generate better cover letter", error);
		}
	};

	const handleUpdate = (field) => (e) => {
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

			{(view === "updated" || betterCoverLetter) && (
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
