import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, LineChart, Line, Legend 
} from 'recharts';
import { FaClipboardList, FaCheckCircle, FaClock, FaCoins, FaChartLine } from 'react-icons/fa';
import { useSites } from '../../Providers/SitesProvider';


const monthlyData = [
	{ name: 'Sem 1', total: 1200000, materiel: 800000, salaire: 300000 },
	{ name: 'Sem 2', total: 2100000, materiel: 1200000, salaire: 600000 },
	{ name: 'Sem 3', total: 1800000, materiel: 900000, salaire: 700000 },
	{ name: 'Sem 4', total: 2800000, materiel: 1500000, salaire: 900000 },
];




const Admin_Stats = () => {
	
	const {sites} = useSites();
	interface Site {
		id: string;
		description: string;
		typeTravail: string;
		createdAt: string;
		depenseTotal: number;
		statut: string;
	}
	
    
    const sortedSites = [...sites].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	
	
    const activeCount = sites.filter(site => site.statut === 'En cours').length;
    const sitesFinished = sites.filter(site => site.statut === 'Terminé');
    const loadingFinished = sites.filter(site => site.statut === 'En cours');
	const totalDepenses = sitesFinished.reduce((acc, site) => acc + (site.depenseTotal ?? 0),0) + loadingFinished.reduce((acc, site) => acc + (site.depenseTotal ?? 0),0);
	
    const siteCalibrage = sites.filter(site => site.typeTravail === "Calibrage");
    const siteInstallation = sites.filter(site => site.typeTravail === "Installation");
    const siteMaintenance = sites.filter(site => site.typeTravail === "Maintenance");
    
    const depsiteCalibrage = siteCalibrage.reduce((acc, site) => acc + (site.depenseTotal ?? 0),0);
    const depsiteInstallation = siteInstallation.reduce((acc, site) => acc + (site.depenseTotal ?? 0),0);
    const depsiteMaintenance = siteMaintenance.reduce((acc, site) => acc + (site.depenseTotal ?? 0),0);
    
	const buildMonthlyData = (sites: Site[]) => {
		const weeks: Record<string, number> = {
			"Sem 1": 0,
			"Sem 2": 0,
			"Sem 3": 0,
			"Sem 4": 0,
		};
	
		sites.forEach(site => {
			const day = new Date(site.createdAt).getDate();
	
			let week = "Sem 4";
			if (day <= 7) week = "Sem 1";
			else if (day <= 14) week = "Sem 2";
			else if (day <= 21) week = "Sem 3";
	
			weeks[week] += site.depenseTotal ?? 0;
		});
	
		return Object.keys(weeks).map(w => ({
			name: w,
			total: weeks[w],
			materiel: weeks[w] * 0.6,   // estimation si pas encore séparé en DB
			salaire: weeks[w] * 0.4
		}));
	};
	
    const buildSalaryMonthlyData = (sites: any[]) => {
    const weeks: Record<string, number> = {
        "Sem 1": 0,
        "Sem 2": 0,
        "Sem 3": 0,
        "Sem 4": 0,
    };

    sites.forEach((site) => {
        const day = new Date(site.createdAt).getDate();

        let week = "Sem 4";
        if (day <= 7) week = "Sem 1";
        else if (day <= 14) week = "Sem 2";
        else if (day <= 21) week = "Sem 3";

        // Utiliser les dépenses de type SALAIRE pour avoir le total réel,
        // même quand les employés sont réaffectés à un autre site.
        const totalSalaireSite =
            site.depenses
                ?.filter((dep: any) => dep.type === 'Salaire employé (avec avance)')
                .reduce((acc: number, dep: any) => acc + Number(dep.montant ?? 0), 0)
            ?? 0;

        weeks[week] += totalSalaireSite;
    });

    return Object.keys(weeks).map((w) => ({
        name: w,
        salaire: weeks[w],
    }));
    };



    const cardStyle = "bg-[#1a2332] p-5 rounded-xl shadow-lg border border-gray-800/50";
    const titleStyle = "text-[#6090A0] font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider";
	
	const chartData = buildMonthlyData(sites);
    const salaireData = buildSalaryMonthlyData(sites);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#101728] border border-[#208060] p-3 rounded shadow-xl text-xs">
                    <p className="text-gray-300 font-bold mb-1">{label}</p>
                    {payload.map((p: any, index: number) => (
                        <p key={index} style={{ color: p.color }}>
                            {p.name}: {p.value.toLocaleString()} Ar
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="max-w-7xl mx-auto pb-10 text-white space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Tableau de Bord</h1>
                    <p className="text-gray-400 text-sm mt-1">Vue d'ensemble financière et opérationnelle</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-gradient-to-r from-[#208060] to-[#409090] p-4 rounded-lg shadow-lg min-w-[180px]">
                        <p className="text-xs text-green-100 mb-1">Dépenses Totales (Global)</p>
                        <p className="text-2xl font-bold">{totalDepenses.toLocaleString()} Ar</p>
                    </div>
                    <div className="bg-[#1a2332] border border-[#208060] p-4 rounded-lg shadow-lg min-w-[150px]">
                        <p className="text-xs text-gray-400 mb-1">Sites Actifs</p>
                        <p className="text-2xl font-bold text-[#409090]">{activeCount}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                
                <div className={`${cardStyle} col-span-1 lg:col-span-2 xl:col-span-3`}>
                    <h2 className={titleStyle}><FaChartLine /> Évolution des Dépenses Totales (Ce mois)</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#208060" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#208060" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                                <XAxis dataKey="name" stroke="#9ca3af" tick={{fontSize: 12}} />
                                <YAxis stroke="#9ca3af" tick={{fontSize: 12}} tickFormatter={(value) => `${value/1000}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="total" name="Total Dépenses" stroke="#409090" fillOpacity={1} fill="url(#colorTotal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={cardStyle}>
                <h2 className={titleStyle}><FaCoins /> Dépenses par Type de Travail</h2>

                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={[
                        { name: "Calibrage", depense: depsiteCalibrage },
                        { name: "Installation", depense: depsiteInstallation },
                        { name: "Maintenance", depense: depsiteMaintenance },
                        ]}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                        <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 10 }} />
                        <YAxis
                        stroke="#9ca3af"
                        tick={{ fontSize: 10 }}
                        tickFormatter={(value) => `${Number(value).toLocaleString('fr-FR')} Ar`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="depense" name="Dépenses totales" fill="#6090A0" radius={[4, 4, 0, 0]} />
                    </BarChart>
                    </ResponsiveContainer>
                </div>
                </div>


                <div className={`${cardStyle} lg:col-span-1 xl:col-span-2`}>
                    <h2 className={titleStyle}><FaCoins /> Coût Salarial</h2>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salaireData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                                <XAxis dataKey="name" stroke="#9ca3af" tick={{fontSize: 10}} />
                                <YAxis stroke="#9ca3af" tick={{fontSize: 10}} tickFormatter={(value) => `${value/1000}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Line type="monotone" dataKey="salaire" name="Salaires Employés" stroke="#A02020" strokeWidth={3} dot={{r: 4, fill: '#A02020'}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className={cardStyle}>
                <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FaClipboardList className="text-[#208060]" /> Historique des Sites
                    </h2>
                    <span className="text-xs bg-gray-700 px-3 py-1 rounded-full text-gray-300">
                        Classés par date (Récents)
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#101728] text-[#6090A0] text-xs uppercase">
                            <tr>
                                <th className="p-4 rounded-tl-lg">Nom du site</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Date Création</th>
                                <th className="p-4">Coût Total</th>
                                <th className="p-4 rounded-tr-lg text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-300 divide-y divide-gray-700">
                            {sortedSites.map((sites) => (
                                <tr key={sites.id} className="hover:bg-[#1f2a3d] transition-colors">
                                    <td className="p-4 font-medium text-white">{sites.description}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-gray-700/50 rounded text-xs border border-gray-600">
                                            {sites.typeTravail}
                                        </span>
                                    </td>
                                    <td className="p-4 font-mono text-gray-400">
                                        {new Date(sites.createdAt).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td className="p-4 font-bold text-[#409090]">
                                        {sites.depenseTotal.toLocaleString()} Ar
                                    </td>
                                    <td className="p-4 text-center">
                                        {sites.statut === 'En cours' ? (
                                            <span className="inline-flex items-center gap-1 bg-[#208060]/20 text-[#208060] px-3 py-1 rounded-full text-xs font-bold border border-[#208060]/30">
                                                <FaClock /> En cours
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-bold">
                                                <FaCheckCircle /> Terminé
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Admin_Stats;