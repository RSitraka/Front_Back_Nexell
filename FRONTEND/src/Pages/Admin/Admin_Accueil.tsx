import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaTrash, FaSearch, FaCheckCircle } from 'react-icons/fa';
import { useSites } from '../../Providers/SitesProvider';
import ConfirmModal from '../../Components/UI/ConfirmModal';
import { SkeletonSiteCard } from '../../Components/UI/Skeleton';
import type { Site } from '../../Utils/interface';

type FilterStatus = 'Tous' | 'En cours' | 'Terminé';
type FilterType = 'Tous' | 'Calibrage' | 'Installation' | 'Maintenance';

const Admin_Accueil = () => {
    const navigate = useNavigate();
    const { sites, deleteSite, isLoading } = useSites();

    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('Tous');
    const [filterType, setFilterType] = useState<FilterType>('Tous');
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const gradientBrand = "bg-gradient-to-r from-[#208060] via-[#409090] to-[#6090A0]";

    const filteredSites = useMemo(() => {
        return sites.filter(site => {
            const matchSearch =
                site.description.toLowerCase().includes(search.toLowerCase()) ||
                site.localisation.toLowerCase().includes(search.toLowerCase());
            const matchStatus = filterStatus === 'Tous' || site.statut === filterStatus;
            const matchType = filterType === 'Tous' || site.typeTravail === filterType;
            return matchSearch && matchStatus && matchType;
        });
    }, [sites, search, filterStatus, filterType]);

    const activeSites = filteredSites.filter(s => s.statut === 'En cours');
    const finishedSites = filteredSites.filter(s => s.statut === 'Terminé');

    const handleDeleteConfirm = async () => {
        if (!confirmDelete) return;
        await deleteSite(confirmDelete);
        setConfirmDelete(null);
    };

    const SiteCard = ({ site }: { site: Site; key?: string | number }) => {
        const isActive = site.statut === 'En cours';
        return (
            <div className="bg-[#1a2332] rounded-xl p-6 border-l-4 border-[#208060] shadow-xl hover:shadow-2xl transition-all hover:translate-y-[-2px]">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-[#208060]/20 text-[#409090] text-xs font-bold px-2 py-1 rounded uppercase">
                        {site.typeTravail}
                    </span>
                    <span className={`flex items-center gap-1 text-sm font-medium ${isActive ? 'text-amber-400' : 'text-green-400'}`}>
                        {isActive ? <FaClock /> : <FaCheckCircle />} {site.statut}
                    </span>
                </div>

                <h3 className="text-xl font-semibold mb-3 line-clamp-2 text-white">{site.description}</h3>

                <div className="space-y-2 text-gray-300 text-sm">
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#6090A0] shrink-0" />
                        <span className="truncate">{site.localisation}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-white">
                        <FaMoneyBillWave className="text-[#245c49] shrink-0" />
                        {new Intl.NumberFormat('fr-MG', { style: 'currency', currency: 'MGA' }).format(site.depenseTotal)}
                    </div>
                </div>

                <div className='flex justify-end items-center gap-3 mt-4 pt-3 border-t border-gray-700/50'>
                    <button
                        onClick={() => setConfirmDelete(site.id)}
                        className="text-[#A02020] hover:text-red-400 p-1 transition-colors"
                        title="Supprimer le site"
                    >
                        <FaTrash />
                    </button>
                    <button
                        onClick={() => navigate(`/sites?id=${site.id}`)}
                        className="text-[#6090A0] hover:text-white text-sm underline transition-colors"
                    >
                        voir plus
                    </button>
                </div>
            </div>
        );
    };

    const filterBtnBase = "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all";
    const filterBtnActive = `${gradientBrand} text-white shadow`;
    const filterBtnInactive = "bg-[#1a2332] text-gray-400 hover:text-white border border-gray-700";

    return (
        <div className="space-y-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                    <h1 className="text-3xl font-bold">
                        Bienvenue sur <span className="text-[#A02020]">nexell</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {sites.length} site{sites.length !== 1 ? 's' : ''} au total —{' '}
                        {sites.filter(s => s.statut === 'En cours').length} en cours
                    </p>
                </div>
                <button
                    onClick={() => navigate('/sites')}
                    className={`${gradientBrand} px-5 py-2 rounded-lg shadow-lg hover:opacity-90 transition font-medium text-sm whitespace-nowrap`}
                >
                    + Nouveau Site
                </button>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="bg-[#1a2332] rounded-xl p-4 border border-gray-700/50 space-y-3">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                        type="text"
                        placeholder="Rechercher par description ou localisation..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-[#101728] border border-gray-600 rounded-lg pl-9 pr-4 py-2 text-white text-sm focus:border-[#208060] focus:outline-none placeholder-gray-500"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="text-gray-500 text-xs self-center">Statut :</span>
                    {(['Tous', 'En cours', 'Terminé'] as FilterStatus[]).map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`${filterBtnBase} ${filterStatus === s ? filterBtnActive : filterBtnInactive}`}
                        >
                            {s}
                        </button>
                    ))}
                    <span className="text-gray-500 text-xs self-center ml-2">Type :</span>
                    {(['Tous', 'Calibrage', 'Installation', 'Maintenance'] as FilterType[]).map(t => (
                        <button
                            key={t}
                            onClick={() => setFilterType(t)}
                            className={`${filterBtnBase} ${filterType === t ? filterBtnActive : filterBtnInactive}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => <SkeletonSiteCard key={i} />)}
                </div>
            ) : filteredSites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                    <FaSearch className="text-4xl mb-3 opacity-30" />
                    <p className="text-lg font-medium">Aucun site trouvé</p>
                    <p className="text-sm mt-1">Modifiez vos filtres ou créez un nouveau site</p>
                </div>
            ) : (
                <>
                    {activeSites.length > 0 && (filterStatus === 'Tous' || filterStatus === 'En cours') && (
                        <div>
                            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <FaClock /> En cours ({activeSites.length})
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {activeSites.map(site => <SiteCard key={site.id} site={site} />)}
                            </div>
                        </div>
                    )}
                    {finishedSites.length > 0 && (filterStatus === 'Tous' || filterStatus === 'Terminé') && (
                        <div>
                            <h2 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <FaCheckCircle /> Terminés ({finishedSites.length})
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {finishedSites.map(site => <SiteCard key={site.id} site={site} />)}
                            </div>
                        </div>
                    )}
                </>
            )}

            <ConfirmModal
                isOpen={!!confirmDelete}
                title="Supprimer ce site ?"
                message="Cette action est irréversible. Toutes les données associées (dépenses, photos, fichiers) seront supprimées."
                confirmLabel="Supprimer"
                danger
                onConfirm={handleDeleteConfirm}
                onCancel={() => setConfirmDelete(null)}
            />
        </div>
    );
};

export default Admin_Accueil;
