import mammoth from "mammoth";

// Type declaration for file parameter
export const readDocxFile = async (file: File): Promise<string> => {
	try {
		const arrayBuffer = await file.arrayBuffer();
		const { value } = await mammoth.extractRawText({ arrayBuffer });
		return value;
	} catch (error) {
		console.error("Error reading docx file:", error);
		throw error;
	}
};
