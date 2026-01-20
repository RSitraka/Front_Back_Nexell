import { useContext, createContext, useState, useEffect } from "react";
import type { Employee } from "../Utils/interface";
import api from "../Utils/axios";
import { useAuth } from "./AuthProvider";

interface EmployeeFormData {
	data: Partial<Employee>;
	cinFile?: File | null;
	certificatsFiles?: File[];
}

interface EmployeeContextInterface {
	Employes: Employee[];
	AllEmployes: Employee[];
	setAllEmployes:React.Dispatch<React.SetStateAction<Employee[]>>;
	setEmployes: React.Dispatch<React.SetStateAction<Employee[]>>;
	getEmployee: () => void;
	updateEmployee: (id: string, formData: EmployeeFormData) => Promise<void>;
	deleteEmployes: (id: string) => void;
}

export const EmployeeContext = createContext<EmployeeContextInterface | null>(null);

export const useEmployes = () => {
	const context = useContext(EmployeeContext);
	if (!context) {
		throw new Error("useEmployes must be used within EmployeeProviders");
	}
	return context;
};

export const EmployeeProviders = ({ children }: { children: React.ReactNode }) => {
	const [Employes, setEmployes] = useState<Employee[]>([]);
	const [AllEmployes, setAllEmployes] = useState<Employee[]>([]);
	const { user, role, roleID, setRole } = useAuth();

	const getEmployee = async () => {
		try {
			const endpoint = role === 'Admin' ? '/employes' : `/employes/${user}`;
			
			let { data } = await api.get(endpoint);
			if (data && !Array.isArray(data)) {
				setEmployes([data]);
			} else if (Array.isArray(data)) {
				setEmployes(data);
			} else {
				setEmployes([]);
			}
			data = await api.get('/employes');
			setAllEmployes(data.data);
		} catch (e) {
			console.error("Erreur API:", e);
			setEmployes([]);
		}
	};

	const createFormData = (empData: EmployeeFormData) => {
		const formData = new FormData();
		Object.keys(empData.data).forEach(key => {
			const value = empData.data[key as keyof Employee];
			if (value !== undefined && value !== null && key !== 'scanPhotoCIN' && key !== 'scanCertificats' && key !== 'role') {
				formData.append(key, String(value));
			}
		});
		if (empData.cinFile) {
			formData.append('photo', empData.cinFile);
		}
		if (empData.certificatsFiles && empData.certificatsFiles.length > 0) {
			empData.certificatsFiles.forEach(file => {
				formData.append('certificats', file);
			});
		}

		return formData;
	};

	const updateEmployee = async (id: string, empData: EmployeeFormData) => {
		try {
			const formData = createFormData(empData);
			await api.patch(`/employes/${id}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});
			if (roleID && empData.data.role) {
				await api.patch(`/users/${roleID}`, {
					role: empData.data.role,
				});
				setRole(empData.data.role);
			}
			getEmployee();
		} catch (e) {
			console.error("Erreur update:", e);
		}
	};

	const deleteEmployes = async (id: string) => {
		try {
			await api.delete(`/employes/${id}`);
			getEmployee();
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		if (user) getEmployee();
	}, [user]);

	const value = {
		Employes,
		setEmployes,
		getEmployee,
		updateEmployee,
		deleteEmployes,
		AllEmployes,
		setAllEmployes,
	};

	return (
		<EmployeeContext.Provider value={value}>
			{children}
		</EmployeeContext.Provider>
	);
};