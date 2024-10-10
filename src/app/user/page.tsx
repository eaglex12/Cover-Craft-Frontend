"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { signupUser } from "../../redux/thunks/userThunks";
import { ToastContainer, toast } from "react-toastify";

// Define the shape of your form data
interface FormData {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

const SignupForm: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const { loading, error } = useSelector((state: RootState) => state.user);

	const [formData, setFormData] = useState<FormData>({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = await dispatch(signupUser(formData));
		console.log("🚀 ~ handleSubmit ~ result:", result);

		// Check for the email already exists error
		if (
			signupUser.rejected.match(result) &&
			result.payload === "Email already exists"
		) {
			toast.error("Email already exists!", {
				position: "top-right",
				className: "bg-red-500 text-white p-3 rounded-lg shadow-md",
				autoClose: 3000,
			});
		} else if (signupUser.fulfilled.match(result)) {
			toast.success("Signup successful!", {
				position: "top-right",
				className: "bg-green-500 text-white p-3 rounded-lg shadow-md",
				autoClose: 3000,
			});
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="p-6 shadow-lg rounded-lg bg-white max-w-lg mx-auto mt-10 space-y-4"
			>
				<h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
					Sign Up
				</h2>

				<div className="space-y-4">
					<input
						type="text"
						name="firstname"
						placeholder="First Name"
						value={formData.firstname}
						onChange={handleChange}
						className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					<input
						type="text"
						name="lastname"
						placeholder="Last Name"
						value={formData.lastname}
						onChange={handleChange}
						className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-md transition duration-300 ease-in-out"
				>
					{loading ? "Signing up..." : "Sign Up"}
				</button>
			</form>

			{/* ToastContainer with Tailwind positioning */}
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				toastClassName={() =>
					"relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
				}
				bodyClassName={() => "text-sm font-white font-med block p-3"}
				closeButton={false}
			/>
		</>
	);
};

export default SignupForm;
