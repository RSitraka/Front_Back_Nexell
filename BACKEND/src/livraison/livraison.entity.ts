import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { DemandeAchat } from '../demande-achat/demande-achat.entity';
import { Vehicule } from '../vehicule/vehicule.entity';
import { Site } from '../site/site.entity';

export enum StatutLivraison {
  EN_ATTENTE = 'EN_ATTENTE',
  EN_ROUTE = 'EN_ROUTE',
  LIVREE = 'LIVREE',
}

@Entity('livraisons')
export class Livraison {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ---- DEMANDE D'ACHAT ----
  @ManyToOne(() => DemandeAchat, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'demandeAchatId' })
  demandeAchat: DemandeAchat;

  // ---- VEHICULE ----
  @ManyToOne(() => Vehicule, { eager: true })
  @JoinColumn({ name: 'vehiculeId' })
  vehicule: Vehicule;

  // ---- SITE ----
  @ManyToOne(() => Site, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'siteId' })
  site: Site;

  // ---- STATUT ----
  @Column({
    type: 'text',
    enum: StatutLivraison,
    default: StatutLivraison.EN_ATTENTE,
  })
  statut: StatutLivraison;

  // ---- DATES ----
  @Column({ type: 'datetime', nullable: true })
  dateDepart: Date | null;

  @Column({ type: 'datetime', nullable: true })
  dateArrivee: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
