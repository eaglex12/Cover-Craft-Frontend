import React from "react";
import { Chip, Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();

	const handleChipClick = (path) => {
		navigate(path);
	};

	const containerStyle = {
		marginTop: "50px",
		textAlign: "center",
	};

	const chipContainerStyle = {
		display: "flex",
		justifyContent: "center",
		gap: "20px", // Space between chips
	};

	const chipStyle = {
		fontWeight: "bold",
		fontSize: "24px", // Larger font size for the chip
		borderRadius: "16px",
		background: "linear-gradient(to right, #e0e0e0, #f5f5f5)",
		boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)", // Stronger shadow for 3D effect
		transition: "transform 0.3s ease, box-shadow 0.3s ease",
		padding: "20px 40px", // Larger padding for a big box effect
		cursor: "pointer",
		textAlign: "center", // Center text inside chip
	};

	const chipHoverStyle = {
		transform: "scale(1.05)",
		boxShadow: "0 16px 32px rgba(0, 0, 0, 0.4)", // Deeper shadow on hover
	};

	return (
		<Container maxWidth="sm" style={containerStyle}>
			<Typography variant="h4" gutterBottom>
				Choose Your Cover Letter Approach
			</Typography>
			<Paper
				elevation={3}
				style={{ padding: "20px", display: "flex", justifyContent: "center" }}
			>
				<div style={chipContainerStyle}>
					<Chip
						label="Preferred Template"
						clickable
						onClick={() => handleChipClick("/precoverletter")}
						style={chipStyle}
						onMouseOver={(e) =>
							(e.currentTarget.style.transform = chipHoverStyle.transform)
						}
						onMouseOut={(e) => {
							e.currentTarget.style.transform = "scale(1)";
							e.currentTarget.style.boxShadow =
								"0 12px 24px rgba(0, 0, 0, 0.3)";
						}}
					/>
					<Chip
						label="Custom"
						clickable
						onClick={() => handleChipClick("/coverletter")}
						style={chipStyle}
						onMouseOver={(e) =>
							(e.currentTarget.style.transform = chipHoverStyle.transform)
						}
						onMouseOut={(e) => {
							e.currentTarget.style.transform = "scale(1)";
							e.currentTarget.style.boxShadow =
								"0 12px 24px rgba(0, 0, 0, 0.3)";
						}}
					/>
				</div>
			</Paper>
		</Container>
	);
};

export default HomePage;
