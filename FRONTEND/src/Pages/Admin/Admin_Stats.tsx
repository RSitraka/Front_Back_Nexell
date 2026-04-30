import { useMemo } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import {
    FaClipboardList, FaCheckCircle, FaClock, FaCoins, FaChartLine,
    FaTools, FaWrench, FaSatelliteDish
} from 'react-icons/fa';
import { useSites } from '../../Providers/SitesProvider';
import { SkeletonChart, SkeletonStatCard } from '../../Components/UI/Skeleton';
import type { Site } from '../../Utils/interface';

const COLORS = { Calibrage: '#6090A0', Installation: '#208060', Maintenance: '#A02020' };

const Admin_Stats = () => {
    const { sites, isLoading } = useSites();

    const stats = useMemo(() => {
        const activeCount = sites.filter((s: Site) => s.statut === 'En cours').length;
        const finishedCount = sites.filter((s: Site) => s.statut === 'Terminé').length;
        const totalDepenses = sites.reduce((acc: number, s: Site) => acc + (s.depenseTotal ?? 0), 0);

        const byType = (['Calibrage', 'Installation', 'Maintenance'] as const).map(type => {
            const group = sites.filter(s => s.typeTravail === type);
            return {
                name: type,
                count: group.length,
                depense: group.reduce((acc, s) => acc + (s.depenseTotal ?? 0), 0),
            };
        });

        // Données mensuelles sur les 6 derniers mois
        const now = new Date();
        const monthlyMap: Record<string, number> = {};
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
            monthlyMap[key] = 0;
        }
        sites.forEach(site => {
            const d = new Date(site.createdAt);
            const key = d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
            if (key in monthlyMap) monthlyMap[key] += site.depenseTotal ?? 0;
        });
        const monthlyData = Object.entries(monthlyMap).map(([name, total]) => ({ name, total }));

        // Données hebdomadaires du mois actuel
        const weeks: Record<string, number> = { 'Sem 1': 0, 'Sem 2': 0, 'Sem 3': 0, 'Sem 4': 0 };
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();
        sites.forEach(site => {
            const d = new Date(site.createdAt);
            if (d.getMonth() !== thisMonth || d.getFullYear() !== thisYear) return;
            const day = d.getDate();
            const week = day <= 7 ? 'Sem 1' : day <= 14 ? 'Sem 2' : day <= 21 ? 'Sem 3' : 'Sem 4';
            weeks[week] += site.depenseTotal ?? 0;
        });
        const weeklyData = Object.entries(weeks).map(([name, total]) => ({
            name, total,
            materiel: Math.round(total * 0.6),
            salaire: Math.round(total * 0.4),
        }));

        const sortedSites = [...sites].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return { activeCount, finishedCount, totalDepenses, byType, monthlyData, weeklyData, sortedSites };
    }, [sites]);

    const cardStyle = "bg-[#1a2332] p-5 rounded-xl shadow-lg border border-gray-800/50";
    const titleStyle = "text-[#6090A0] font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider";

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#101728] border border-[#208060] p-3 rounded shadow-xl text-xs">
                    <p className="text-gray-300 font-bold mb-1">{label}</p>
                    {payload.map((p: any, i: number) => (
                        <p key={i} style={{ color: p.color }}>
                            {p.name}: {Number(p.value).toLocaleString('fr-FR')} Ar
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto pb-10 space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => <SkeletonStatCard key={i} />)}
                </div>
                <SkeletonChart />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SkeletonChart />
                    <SkeletonChart />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto pb-10 text-white space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Tableau de Bord</h1>
                    <p className="text-gray-400 text-sm mt-1">Vue d'ensemble financière et opérationnelle</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                    <div className="bg-gradient-to-r from-[#208060] to-[#409090] p-4 rounded-lg shadow-lg min-w-[180px]">
                        <p className="text-xs text-green-100 mb-1">Dépenses Totales</p>
                        <p className="text-2xl font-bold">{stats.totalDepenses.toLocaleString('fr-FR')} Ar</p>
                    </div>
                    <div className="bg-[#1a2332] border border-amber-500/30 p-4 rounded-lg shadow-lg min-w-[130px]">
                        <p className="text-xs text-gray-400 mb-1 flex items-center gap-1"><FaClock className="text-amber-400" /> En cours</p>
                        <p className="text-2xl font-bold text-amber-400">{stats.activeCount}</p>
                    </div>
                    <div className="bg-[#1a2332] border border-green-500/30 p-4 rounded-lg shadow-lg min-w-[130px]">
                        <p className="text-xs text-gray-400 mb-1 flex items-center gap-1"><FaCheckCircle className="text-green-400" /> Terminés</p>
                        <p className="text-2xl font-bold text-green-400">{stats.finishedCount}</p>
                    </div>
                </div>
            </div>

            {/* KPI Cards par type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.byType.map(({ name, count, depense }) => {
                    const icons: Record<string, JSX.Element> = {
                        Calibrage: <FaSatelliteDish className="text-[#6090A0]" />,
                        Installation: <FaTools className="text-[#208060]" />,
                        Maintenance: <FaWrench className="text-[#A02020]" />,
                    };
                    const colors: Record<string, string> = {
                        Calibrage: 'border-[#6090A0]/40',
                        Installation: 'border-[#208060]/40',
                        Maintenance: 'border-[#A02020]/40',
                    };
                    return (
                        <div key={name} className={`bg-[#1a2332] rounded-xl p-5 border ${colors[name]} shadow-lg`}>
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-gray-400 text-sm font-medium">{name}</span>
                                <span className="text-xl">{icons[name]}</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{count} site{count !== 1 ? 's' : ''}</p>
                            <p className="text-sm text-gray-400 mt-1 font-mono">{depense.toLocaleString('fr-FR')} Ar</p>
                            <div className="mt-3 bg-gray-800 rounded-full h-1.5">
                                <div
                                    className="h-1.5 rounded-full transition-all"
                                    style={{
                                        width: `${sites.length ? (count / sites.length) * 100 : 0}%`,
                                        backgroundColor: COLORS[name as keyof typeof COLORS],
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* Évolution mensuelle */}
                <div className={`${cardStyle} col-span-1 lg:col-span-2 xl:col-span-2`}>
                    <h2 className={titleStyle}><FaChartLine /> Évolution mensuelle (6 derniers mois)</h2>
                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.monthlyData}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#208060" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#208060" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                                <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="total" name="Total" stroke="#409090" fillOpacity={1} fill="url(#colorTotal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Répartition par type (Pie) */}
                <div className={`${cardStyle} col-span-1`}>
                    <h2 className={titleStyle}><FaCoins /> Répartition par type</h2>
                    <div className="h-[280px] flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height="70%">
                            <PieChart>
                                <Pie
                                    data={stats.byType.filter(d => d.depense > 0)}
                                    dataKey="depense"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                >
                                    {stats.byType.map(entry => (
                                        <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex gap-4 mt-2">
                            {stats.byType.map(({ name }) => (
                                <span key={name} className="flex items-center gap-1 text-xs text-gray-400">
                                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: COLORS[name as keyof typeof COLORS] }} />
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hebdomadaire ce mois */}
                <div className={cardStyle}>
                    <h2 className={titleStyle}><FaCoins /> Dépenses hebdomadaires (ce mois)</h2>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 10 }} />
                                <YAxis stroke="#9ca3af" tick={{ fontSize: 10 }} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="total" name="Total" fill="#6090A0" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Dépenses par type (Bar) */}
                <div className={`${cardStyle} lg:col-span-2`}>
                    <h2 className={titleStyle}><FaCoins /> Dépenses totales par type de travail</h2>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.byType}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                                <YAxis stroke="#9ca3af" tick={{ fontSize: 10 }} tickFormatter={v => `${Number(v).toLocaleString('fr-FR')} Ar`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="depense" name="Dépenses" radius={[4, 4, 0, 0]}>
                                    {stats.byType.map(entry => (
                                        <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Tableau historique */}
            <div className={cardStyle}>
                <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FaClipboardList className="text-[#208060]" /> Historique des Sites
                    </h2>
                    <span className="text-xs bg-gray-700 px-3 py-1 rounded-full text-gray-300">
                        {stats.sortedSites.length} site{stats.sortedSites.length !== 1 ? 's' : ''} — classés par date
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
                                <th className="p-4 rounded-tr-lg text-center">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-300 divide-y divide-gray-700">
                            {stats.sortedSites.map(site => (
                                <tr key={site.id} className="hover:bg-[#1f2a3d] transition-colors">
                                    <td className="p-4 font-medium text-white">{site.description}</td>
                                    <td className="p-4">
                                        <span
                                            className="px-2 py-1 rounded text-xs border font-semibold"
                                            style={{
                                                color: COLORS[site.typeTravail as keyof typeof COLORS],
                                                borderColor: COLORS[site.typeTravail as keyof typeof COLORS] + '60',
                                                backgroundColor: COLORS[site.typeTravail as keyof typeof COLORS] + '15',
                                            }}
                                        >
                                            {site.typeTravail}
                                        </span>
                                    </td>
                                    <td className="p-4 font-mono text-gray-400">
                                        {new Date(site.createdAt).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td className="p-4 font-bold text-[#409090]">
                                        {(site.depenseTotal ?? 0).toLocaleString('fr-FR')} Ar
                                    </td>
                                    <td className="p-4 text-center">
                                        {site.statut === 'En cours' ? (
                                            <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20">
                                                <FaClock size={10} /> En cours
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
                                                <FaCheckCircle size={10} /> Terminé
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
