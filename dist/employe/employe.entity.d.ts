import { Site } from '../site/site.entity';
import { Depense } from '../depense/depense.entity';
import { User } from '../user/user.entity';
export declare class Employe {
    id: string;
    nom: string;
    prenom: string;
    adresse: string;
    numeroTelephone: string;
    nationalite: string;
    scanPhotoCIN: string;
    scanCertificat: string;
    salaire: number;
    avanceCumulee: number;
    resteSalaire: number;
    user: User;
    site?: Site;
    depenses: Depense[];
    createdAt: Date;
    updatedAt: Date;
}
