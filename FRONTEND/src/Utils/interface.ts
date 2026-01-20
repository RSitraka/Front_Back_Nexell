type SiteType = 'Calibrage' | 'Installation' | 'Maintenance';
type SiteStatus = 'En cours' | 'Terminé';

interface Material {
  id: string;
  nom: string;
  modele: string;
  nomFournisseur: string;
  prix: number;
}

export enum UserRole {
  EMPLOYE = 'Employe',
  LOGISTIC = 'logistic',
  FINANCE = 'Finance',
  ADMIN = 'Admin',
  BAILLEUR = 'Bailleur',
  SUPER_ADMIN = 'super_admin',
}



interface FilesInterface {
  id: string;
  url: string;
  type: string;
  originalName: string;
  siteId: string;
  description: string;
}

interface Employee {
  id: string;
  prenom: string;
  nom: string;
  role?: string;
  salaire: number;
  avanceCumulee: number;
  nationalite: string;
  resteSalaire: number;
  adresse: string;
  numeroTelephone: string;
  scanPhotoCIN: FilesInterface | null;
  scanCertificats?: FilesInterface[] | [];
}

interface SiteMaterial {
  materialId: string;
  quantity: number;
}

interface OtherExpense {
  id: string;
  description: string;
  amount: number;
}

interface SiteEmployee {
  employeeId: string;
  salaryPaid: number; // Avance ou salaire
}

interface VehicleInfo {
  plate: string;
  driverId: string; // ou nom
  agency: string;
  cost: number; // Carburant + Location
}

interface Site {
  id: string;
  createdAt: Date;
  typeTravail: SiteType;
  depenseTotal: number;
  description: string;
  coordonneesGPS: string;
  localisation: string;
  photos: string[];
  files: string[];
  materials: SiteMaterial[];
  otherExpenses: OtherExpense[];
  vehicle: VehicleInfo | null;
  employees: SiteEmployee[];
  statut: SiteStatus;
}

interface SiteUpload {
  type: SiteType;
  coordonneesGPS: string;
  localisation: string;
  description: string;
  photos: File[];
  files: File[];
  materials: SiteMaterial[];
  otherExpenses: OtherExpense[];
  vehicle: VehicleInfo | null;
  employees: SiteEmployee[];
  status: SiteStatus;
}

export type {
  SiteType,
  SiteUpload,
  SiteEmployee,
  FilesInterface,
  SiteStatus,
  Site,
  Material,
  Employee,
  OtherExpense,
  VehicleInfo,
}