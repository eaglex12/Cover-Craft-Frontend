"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { signupUser } from "../../redux/thunks/userThunks";

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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(signupUser(formData));
	};

	return (
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

			{error && <p className="text-red-500 text-center mt-4">{error}</p>}

			<p className="text-sm text-center text-gray-500 mt-6">
				Already have an account?{" "}
				<a href="/login" className="text-blue-500 hover:underline">
					Log in
				</a>
			</p>
		</form>
	);
};

export default SignupForm;
