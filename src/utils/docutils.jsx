// src/utils.js

import mammoth from "mammoth";

export const readDocxFile = async (file) => {
	try {
		const arrayBuffer = await file.arrayBuffer();
		const { value } = await mammoth.extractRawText({ arrayBuffer });
		return value;
	} catch (error) {
		console.error("Error reading docx file:", error);
		throw error;
	}
};
