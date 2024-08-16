import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";
import { signupUser } from "../thunks/userThunks";

interface UserState {
	user: IUser | null;
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	user: null,
	loading: false,
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signupUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signupUser.fulfilled, (state, action: PayloadAction<IUser>) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Signup failed";
			});
	},
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
