"use client";

import { Provider } from "react-redux";
import React from "react";
import { store } from "@/redux/store"; // Adjust this to your correct path

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => (
	<Provider store={store}>{children} </Provider>
);
