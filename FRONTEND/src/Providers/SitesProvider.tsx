import { createContext, useContext, useEffect, useState } from "react";
import type { FilesInterface, Site } from "../Utils/interface";
import api from "../Utils/axios";
import { useAuth } from "./AuthProvider";


interface SiteContextInterface {
    sites: Site[];
    addSite: (data: any) => Promise<void>;
    updateSite: (id: string, data: any) => Promise<void>;
    getSites: () => Promise<void>;
}

const SitesContext = createContext<SiteContextInterface | null>(null);

export const useSites = () => {
    const context = useContext(SitesContext);
    if (!context) {
        throw new Error("useSites must be used within SitesProvider");
    }
    return context;
};

const SiteInfo = (data: any): any => {
    return {
        typeTravail: data.data.typeTravail,
        localisation: data.data.localisation,
        coordonneesGPS: data.data.coordonneesGPS,
        description: data.data.description,
        statut: data.data.status,
        depenseTotal: data.data.totalExpense,
    }
}

const addFiles = async (data: any, id: string, type: string) => {
    await Promise.all(
        data.map((file: any) => {
            const formData = new FormData();
            formData.append(`${type}`, file);
            formData.append('siteId', id);
            if (type === 'fichiers')
                formData.append('type', 'Document');
            return (api.post(`/${type}`, formData));
        })
    );
};

const updateEmployes = async (data: any[], siteId: string) => {
    await Promise.all(
        data.map(emp => {
            const formData = new FormData();
            formData.append('salaire', String(emp.salaire));
            formData.append('siteId', siteId);

            return api.patch(`/employes/${emp.id}`, formData);
        })
    );
};

const UpdateMaterials = async (data: any[], siteId: string) => {
    await Promise.all(
        data.map(mat => {
            if (mat.isNew)
                return (api.post(`/demandes-materiel/`, {
                    materielId: mat.id,
                    quantite: (mat.quantite),
                    siteId: siteId,
                    motif: 'demande achat',

                }));
            return (api.patch(`/demandes-materiel/${mat.id}`, {
                quantite: (mat.quantite),
                siteId: siteId,
            }))
        })
    );
}

export const SitesProvider = ({ children }: { children: React.ReactNode }) => {
    const [sites, setSites] = useState<Site[]>([]);
    const { user } = useAuth();

    const getSites = async () => {
        try {
            const response = await api.get('/sites');
            setSites(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des sites:", error);
        }
    };

    const addSite = async (data: any) => {
        try {
            const response = await api.post('/sites', SiteInfo(data));
            if (response.data.id) {
                addFiles(data.files, response.data.id, 'fichiers');
                addFiles(data.photos, response.data.id, 'photos');
                updateEmployes(data.data.siteEmployees, response.data.id);
                UpdateMaterials(data.data.selectedMaterials, response.data.id);
            }
            getSites();
        } catch (error) {
            console.error("Erreur lors de l'ajout du site:", error);
            throw error;
        }
    };

    const updateSite = async (id: string, data: any) => {
        try {
            await api.patch(`/sites/${id}`, SiteInfo(data));
            addFiles(data.photos, id, 'photos');
            addFiles(data.files, id, 'fichiers');
            updateEmployes(data.data.siteEmployees, id);
            UpdateMaterials(data.data.selectedMaterials, id);
            getSites();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du site:", error);
            throw error;
        }
    };

    useEffect(() => {
        if (user) getSites();
    }, [user]);

    const value = {
        sites,
        addSite,
        getSites,
        updateSite,
    };

    return (
        <SitesContext.Provider value={value}>
            {children}
        </SitesContext.Provider>
    );
};