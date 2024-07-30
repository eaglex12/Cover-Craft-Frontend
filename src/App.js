import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home";
import PreCoverLetterGenerator from "./components/CoverLetterGen";
import CoverLetterGenerator from "./components/UploadedLetter";
import "./App.css";

function App() {
	return (
		<Router>
			<div
				style={{
					background:
						"linear-gradient(to right, rgb(255 255 255), rgb(20 37 67))",
				}}
			>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/precoverletter" element={<PreCoverLetterGenerator />} />
					<Route path="/coverletter" element={<CoverLetterGenerator />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
