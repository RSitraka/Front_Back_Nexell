import { Site } from '../site/site.entity';
import { Depense } from '../depense/depense.entity';
import { UserRole } from './enums/user-role.enum';
import { Employe } from '../employe/employe.entity';
import { DemandeMateriel } from '../demande-materiel/demande-materiel.entity';
import { DemandeAchat } from '../demande-achat/demande-achat.entity';
import { DemandeAvance } from '../demande-avance/demande-avance.entity';
import { DemandeBudget } from '../demande-budget/demande-budget.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    nom: string;
    prenom: string;
    role: UserRole;
    isActive: boolean;
    employe?: Employe;
    site?: Site;
    depensesValidees: Depense[];
    depensesCreees: Depense[];
    demandesAchat: DemandeAchat[];
    demandesAvance: DemandeAvance[];
    demandesMateriel: DemandeMateriel[];
    demandesBudget: DemandeBudget[];
    createdAt: Date;
    updatedAt: Date;
}
