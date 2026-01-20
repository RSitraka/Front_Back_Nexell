import { useState, createContext, useContext, useEffect, useRef } from "react";
import api from "../Utils/axios";
import { toast } from "react-toastify";

interface AuthInterface {
	user: string | null,
	role: string | null,
	roleID: string | null,
	login: (username: string, password: string, totpCode?: string) => any,
	register: (formData: any) => any,
	logout: () => void,
	setUser: (username: string | null) => void,
	setRole: (role: string | null) => void,
	setRoleID: (role: string | null) => void,
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
	const [roleID, setRoleID] = useState<string | null>(null);
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
			setRoleID(data.user.id);
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

	const register = async (formdata: any) => {
		try {
			const postData = {
				email: formdata.email,
				password: formdata.password,
				nom: formdata.name,
				prenom: formdata.prenom,
				adresse: formdata.adresse,
				numeroTelephone: formdata.numeroTelephone,
				nationalite: formdata.nationalite,
				salaire: 0,
			}
			const response = await api.post('/employes', postData);
			return {
				success: true,
				data: response.data,
			};
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
		roleID,
		login,
		logout,
		register,
		setUser,
		setRoleID,
		setRole,
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