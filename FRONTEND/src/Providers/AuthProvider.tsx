import { useState, createContext, useContext, useEffect, useRef } from "react";
import api from "../Utils/axios";
import { toast } from "react-toastify";

interface AuthInterface {
	user: string | null,
	role: string | null,
	login: (username: string, password: string, totpCode?: string) => any,
	register: (username: string, password: string, email: string) => any,
	logout: () => void,
	setUser: (username: string | null) => void,
	setLoading: (loading: boolean) => void,
	loading: boolean,
	isAuthenticated: boolean,
}

const AuthContext = createContext<AuthInterface | null>(null);

const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context)
		throw new Error("Error in context");
	return context
}

const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<string | null>(null)
	const [role, setRole] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	const login = async (username: string, password: string) => {
		try {
			const postData = {
				email: username,
				password: password,
			}

			const { data } = await api.post("/auth/login", postData);

			if (!data || !data.user.role) {
				throw new Error("User not found!");
			}
			setUser(data.user.roleId);
			setRole(data.user.role);
			return { success: true, requires2FA: false };
		}
		catch (err: any) {
			if (err.response?.data?.requires2FA) {
				return { success: false, requires2FA: true };
			}

			if (err.response?.data?.error === "Invalid 2FA code") {
				return { success: false, requires2FA: true };
			}
			return { success: false, error: err.message, requires2FA: false };
		}
	}

	const register = async (username: string, password: string, email: string) => {
		try {
			const response = await api.post('/users/register', {
				username,
				password,
				email
			});
			if (!response.data.username || !response.data.email) {
				return { success: false, error: "Email or username already in use" };
			}
			return { success: true, data: response.data };
		} catch (error: any) {
			if (error.response?.data?.error) {
				return { success: false, error: error.response.data.error };
			}
			return { success: false, error: "Registration failed" };
		}
	};

	const logout = async () => {
		try {
			await api.post("/auth/logout");
		} catch (error) {
		} finally {
			setUser(null);
		}
	}



	const value = {
		user,
		role,
		login,
		logout,
		register,
		setUser,
		setLoading,
		loading,
		isAuthenticated: !!user,
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>

	)
}

export { useAuth, AuthProvider }