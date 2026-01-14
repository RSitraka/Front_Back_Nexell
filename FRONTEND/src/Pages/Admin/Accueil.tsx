import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import { useAuth } from '../../Providers/AuthProvider';
import { useEffect } from 'react';

// Exemple de données de sites existants
const activeSites = [
    {
        id: 'site-001',
        description: 'Installation Fibre Zone Alpha',
        location: 'Antananarivo, Analakely',
        totalExpense: 1250000,
        status: 'En cours',
        type: 'Installation'
    },
    {
        id: 'site-002',
        description: 'Maintenance Tour Radio',
        location: 'Tamatave, Port',
        totalExpense: 450000,
        status: 'En cours',
        type: 'Maintenance'
    }
];

const Accueil = () => {
    const navigate = useNavigate();

    const gradientBrand = "bg-gradient-to-r from-[#208060] via-[#409090] to-[#6090A0]";
    const textRed = "text-[#A02020]";

    const {user} = useAuth();

    useEffect(() => {
        console.log(user);
    }, [user]);
    return (
        <div className="space-y-6 text-white">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    Bienvenue sur <span className={textRed}>nexell</span>
                </h1>
                <button 
                    onClick={() => navigate('/sites')}
                    className={`${gradientBrand} px-6 py-2 rounded-lg shadow-lg hover:opacity-90 transition font-medium`}
                >
                    + Nouveau Site
                </button>
            </div>

            <p className="text-gray-400">Aperçu des chantiers actuellement actifs.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeSites.map((site) => (
                    <div key={site.id} className="bg-[#1a2332] rounded-xl p-6 border-l-4 border-[#208060] shadow-xl hover:shadow-2xl transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-[#208060]/20 text-[#409090] text-xs font-bold px-2 py-1 rounded uppercase">
                                {site.type}
                            </span>
                            <span className="flex items-center gap-1 text-amber-400 text-sm">
                                <FaClock /> {site.status}
                            </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2">{site.description}</h3>
                        
                        <div className="space-y-2 text-gray-300 text-sm">
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-[#6090A0]" />
                                {site.location}
                            </div>
                            <div className="flex items-center gap-2 font-mono text-white">
                                <FaMoneyBillWave className="text-[#245c49]" />
                                {new Intl.NumberFormat('fr-MG', { style: 'currency', currency: 'MGA' }).format(site.totalExpense)}
                            </div>
                        </div>
						<div className='flex justify-end underline hover:cursor-pointer' onClick={() => navigate('/sites')}>voir plus</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Accueil;