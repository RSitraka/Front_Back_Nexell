import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaHardHat } from 'react-icons/fa';
import { useSites } from '../../Providers/SitesProvider';
import { SkeletonSiteCard } from '../../Components/UI/Skeleton';

const Employe_Accueil = () => {
    const navigate = useNavigate();
    const { sites, isLoading } = useSites();

    const activeSites = sites.filter(site => site.statut === 'En cours');

    return (
        <div className="space-y-6 text-white">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    Bienvenue sur <span className="text-[#A02020]">nexell</span>
                </h1>
            </div>

            <p className="text-gray-400">
                Aperçu des chantiers actuellement actifs.
                {!isLoading && activeSites.length > 0 && (
                    <span className="ml-2 bg-[#208060]/20 text-[#409090] text-xs font-bold px-2 py-0.5 rounded">
                        {activeSites.length} en cours
                    </span>
                )}
            </p>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => <SkeletonSiteCard key={i} />)}
                </div>
            ) : activeSites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-[#1a2332] rounded-xl border border-dashed border-gray-700">
                    <FaHardHat size={40} className="mb-4 text-gray-600" />
                    <p className="text-lg font-semibold">Aucun chantier en cours</p>
                    <p className="text-sm mt-1">Les chantiers actifs apparaîtront ici.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeSites.map((site) => (
                        <div key={site.id} className="bg-[#1a2332] rounded-xl p-6 border-l-4 border-[#208060] shadow-xl hover:shadow-2xl hover:bg-[#1f2a3d] transition-all cursor-pointer"
                            onClick={() => navigate(`/sites?id=${site.id}`)}>
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-[#208060]/20 text-[#409090] text-xs font-bold px-2 py-1 rounded uppercase">
                                    {site.typeTravail}
                                </span>
                                <span className="flex items-center gap-1 text-amber-400 text-sm">
                                    <FaClock /> {site.statut}
                                </span>
                            </div>

                            <h3 className="text-xl font-semibold mb-3">{site.description}</h3>

                            <div className="space-y-2 text-gray-300 text-sm">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-[#6090A0]" />
                                    {site.localisation}
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-700 flex justify-end">
                                <span className="text-[#409090] text-xs hover:underline">Voir les détails →</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Employe_Accueil;