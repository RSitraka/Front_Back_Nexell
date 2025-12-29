import { Repository } from 'typeorm';
import { Livraison } from './livraison.entity';
import { CreateLivraisonDto } from './dto/create-livraison.dto';
import { UpdateLivraisonDto } from './dto/update-livraison.dto';
import { DemandeAchat } from '../demande-achat/demande-achat.entity';
import { Vehicule } from '../vehicule/vehicule.entity';
import { User } from '../user/user.entity';
import { Site } from '../site/site.entity';
import { Depense } from '../depense/depense.entity';
export declare class LivraisonService {
    private readonly repo;
    private readonly demandeAchatRepo;
    private readonly vehiculeRepo;
    private readonly userRepo;
    private readonly siteRepo;
    private readonly depenseRepo;
    constructor(repo: Repository<Livraison>, demandeAchatRepo: Repository<DemandeAchat>, vehiculeRepo: Repository<Vehicule>, userRepo: Repository<User>, siteRepo: Repository<Site>, depenseRepo: Repository<Depense>);
    private calculerCoutLivraison;
    create(dto: CreateLivraisonDto): Promise<Livraison>;
    valider(id: string, valideur: User): Promise<Livraison>;
    update(id: string, dto: UpdateLivraisonDto): Promise<Livraison>;
    findAll(): Promise<Livraison[]>;
    findOne(id: string): Promise<Livraison>;
}
