import { useContext, createContext, useState, useEffect } from "react";
import type { Material } from "../Utils/interface";
import api from "../Utils/axios";
import { useAuth } from "./AuthProvider";
export const MatériauxContext = createContext<MaterialsInterface | null>(null);

const useMaterials = () => {
	const context = useContext(MatériauxContext);
	if (!context) {
		throw new Error("useMaterials must be used within MatériauxProviders");
	}
	return context;
};

interface MaterialsInterface {
	materials: Material[];
	setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
	getMatériaux: () => void;
	addMatériaux: (data: Material) => void;
	updateMateriaux: (data: Material) => void;
	deleteMaterials: (id: string) => void;
}

const MatériauxProviders = ({ children }: { children: React.ReactNode }) => {
	const [materials, setMaterials] = useState<Material[]>([]);
	const { user } = useAuth();

	const getMatériaux = async () => {
		try {
			const { data } = await api.get<Material[]>('/materiels');
			setMaterials(data);
		} catch (e) {
			console.error(e);
		}
	};

	const addMatériaux = async (data: Material) => {
		try {
			await api.post('/materiels', data);
			getMatériaux();
		} catch (e) {
			console.error(e);
		}
	};

	const updateMateriaux = async (data: Material) => {
		try {
			const material = {
				nom: data.nom,
				modele: data.modele,
				nomFournisseur: data.nomFournisseur,
				prix: data.prix,
			};
			const res = await api.patch<Material>(
				`/materiels/${data.id}`,
				material
			);
			getMatériaux();
		} catch (e) {
			console.error(e);
		}
	};

	const deleteMaterials = async(id: string) => {
		try {
			await api.delete(`/materiels/${id}`);
			getMatériaux();
		}
		catch (e) {
			console.error(e);
		}
	}
	useEffect(() => {
		if (user) getMatériaux();
	}, [user]);

	const value = {
		materials,
		setMaterials,
		getMatériaux,
		addMatériaux,
		updateMateriaux,
		deleteMaterials,
	}
	return (
		<MatériauxContext.Provider value={value}>
			{children}
		</MatériauxContext.Provider>
	);
};

export { useMaterials, MatériauxProviders };
