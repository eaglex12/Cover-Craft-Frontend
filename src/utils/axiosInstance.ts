// src/utils/fetchUtils.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/";

class FetchUtilsClass {
	private async request<T>(
		method: "GET" | "POST",
		url: string,
		body?: any
	): Promise<T> {
		try {
			const response = await fetch(`${BASE_URL}${url}`, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: body ? JSON.stringify(body) : undefined,
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || response.statusText);
			}

			return response.json();
		} catch (error) {
			console.error("Fetch request failed:", error);
			throw error;
		}
	}

	public getRequest = async <T>(url: string): Promise<T> =>
		this.request<T>("GET", url);

	public postRequest = async <T, M>(url: string, body: T): Promise<M> =>
		this.request<M>("POST", url, body);
}

const FetchUtils = new FetchUtilsClass();

export { FetchUtils };
