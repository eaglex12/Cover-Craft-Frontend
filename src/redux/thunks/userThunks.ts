import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchUtils } from "../../utils/axiosInstance";
import { IUser } from "../../types/user";

interface SignupData {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export const signupUser = createAsyncThunk<IUser, SignupData>(
	"user/signup",
	async (userData, { rejectWithValue }) => {
		try {
			// Combine firstname and lastname into a name field
			const body = {
				email: userData.email,
				password: userData.password,
				name: `${userData.firstname} ${userData.lastname}`, // Combine names
			};

			// Use FetchUtils.postRequest to send the correct data
			const response = await FetchUtils.postRequest<typeof body, IUser>(
				"api/user/create",
				body
			);
			return response;
		} catch (err: any) {
			// Handle the error properly
			return rejectWithValue(err.message || "Something went wrong");
		}
	}
);
