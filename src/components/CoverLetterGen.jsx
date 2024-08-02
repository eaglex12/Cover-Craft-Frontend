import React, { useState } from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	Paper,
	Snackbar,
	Alert,
} from "@mui/material";
import { readDocxFile } from "../utils/docutils"; // Make sure to import the function correctly

const PreCoverLetterGenerator = () => {
	const [company, setCompany] = useState("");
	const [role, setRole] = useState("");
	const [generatedLetter, setGeneratedLetter] = useState("");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [uploadedLetter, setUploadedLetter] = useState("");

	const generateCoverLetter = () => {
		const letter = `
      Dear Hiring Manager,

      I am writing to express my strong interest in the ${role} role at ${company}. With a solid background in computer science and engineering, along with hands-on experience in developing innovative software solutions, I am eager to bring my technical expertise and passion for software development to your esteemed team.

      Currently, I am working as a Software Development Engineer at basys.ai, where I have played a pivotal role in developing an enterprise software solution from inception to automate the Prior Authorization System in the US. This project has significantly improved healthcare process efficiency. I have integrated advanced AI systems, including ChatGPT and Claude.AI, alongside an in-house AI system, enhancing the system's intelligence and responsiveness by 50%.

      One of my notable achievements in this role includes automating the process of switching between different GPT models, which reduced testing time by up to 80% for the AI team. I also implemented FHIR (Fast Healthcare Interoperability Resources) standards using HAPI FHIR and HL7 protocols to ensure secure and efficient exchange of healthcare information. This implementation enabled seamless integration with other healthcare systems and enhanced data interoperability, reducing data exchange errors by 70%.

      During my 6-month internship at MyOoumph Networks Pvt Ltd as a Full Stack Development Intern, I strengthened my backend development skills through extensive work with Django and GraphQL API, while also utilizing technologies such as Apollo Client, ReactJS, and CSS to craft engaging user interfaces. My commitment to developing reliable solutions was demonstrated through my extensive use of the Postman API for testing and debugging endpoints, contributing to a robust and scalable backend architecture. My solid foundation in Data Structures and Algorithms (DSA) is evidenced by my successful completion of over 350 coding challenges on platforms like Geeks for Geeks and LeetCode.

      A significant highlight of my experience was addressing a rendering issue at Shaadi.com, where my problem-solving abilities and front-end programming proficiency significantly improved the user experience. My academic excellence is underscored by my All India Rank (AIR) of 15002 out of 1.2 million applicants in the highly competitive JEE Advanced 2020.

      I am enthusiastic about the prospect of contributing my technical expertise, strong foundation in DSA, and innovative problem-solving skills to ${company}'s groundbreaking projects. I am confident that my background aligns perfectly with the requirements of the ${role} role, and I am eager to bring my passion for software development to your team.

      Thank you for considering my application. I look forward to the possibility of contributing to ${company}'s success and further advancing my career as a ${role}.

      Sincerely,
      Divyansh Singh Rathore
    `
			.trim()
			.split("\n")
			.map((line) => line.trimStart())
			.join("\n");

		setGeneratedLetter(letter);
	};

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(generatedLetter)
			.then(() => {
				setOpenSnackbar(true);
			})
			.catch((err) => {
				console.error("Failed to copy!", err);
			});
	};

	const handleFileUpload = async (event) => {
		const file = event.target.files[0];
		if (file) {
			const fileType = file.name.split(".").pop().toLowerCase();
			if (fileType === "txt") {
				const reader = new FileReader();
				reader.onload = (e) => {
					setUploadedLetter(e.target.result);
				};
				reader.readAsText(file);
			} else if (fileType === "docx") {
				try {
					const docxText = await readDocxFile(file);
					console.log("🚀 ~ handleFileUpload ~ docxText:", typeof docxText);
					setUploadedLetter(docxText);
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

	return (
		<Container
			maxWidth="md"
			sx={{
				padding: "20px",
				marginTop: "20px",
				fontFamily: "Arial, sans-serif",
			}}
		>
			<Typography variant="h4" align="center" gutterBottom>
				Cover Letter Generator
			</Typography>
			<TextField
				label="Company Name"
				variant="outlined"
				fullWidth
				margin="normal"
				value={company}
				onChange={(e) => setCompany(e.target.value)}
			/>
			<TextField
				label="Role"
				variant="outlined"
				fullWidth
				margin="normal"
				value={role}
				onChange={(e) => setRole(e.target.value)}
			/>
			<Button
				variant="contained"
				color="primary"
				fullWidth
				onClick={generateCoverLetter}
				sx={{ marginBottom: "20px" }}
			>
				Generate Cover Letter
			</Button>

			<input
				accept=".txt,.docx"
				id="upload-cover-letter"
				type="file"
				style={{ display: "none" }}
				onChange={handleFileUpload}
			/>

			{uploadedLetter && (
				<Paper
					elevation={3}
					sx={{
						padding: "20px",
						borderRadius: "5px",
						background: "black",
						color: "white",
					}}
				>
					<Typography
						variant="h6"
						align="center"
						gutterBottom
						sx={{ fontWeight: "bold" }}
					>
						Uploaded Cover Letter
					</Typography>
					<pre
						style={{
							whiteSpace: "pre-wrap",
							wordWrap: "break-word",
							textAlign: "left",
							textIndent: "0", // Ensure no text-indent
						}}
					>
						{uploadedLetter}
					</pre>
				</Paper>
			)}

			{generatedLetter && (
				<Paper
					elevation={3}
					sx={{
						padding: "20px",
						borderRadius: "5px",
						background: "black",
						color: "white",
					}}
				>
					<Typography
						variant="h6"
						align="center"
						gutterBottom
						sx={{ fontWeight: "bold" }}
					>
						Generated Cover Letter
					</Typography>

					<pre
						style={{
							whiteSpace: "pre-wrap",
							wordWrap: "break-word",
							textAlign: "left",
							textIndent: "0", // Ensure no text-indent
						}}
					>
						{generatedLetter}
					</pre>
					<Button
						variant="contained"
						color="secondary"
						fullWidth
						onClick={copyToClipboard}
						sx={{ marginTop: "10px" }}
					>
						Copy to Clipboard
					</Button>
				</Paper>
			)}

			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={() => setOpenSnackbar(false)}
			>
				<Alert onClose={() => setOpenSnackbar(false)} severity="success">
					Cover letter copied to clipboard!
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default PreCoverLetterGenerator;
