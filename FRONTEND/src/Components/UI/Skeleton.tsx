const pulse = "animate-pulse bg-gray-700/50 rounded";

export const SkeletonSiteCard = () => (
    <div className="bg-[#1a2332] rounded-xl p-6 border-l-4 border-gray-700 shadow-xl">
        <div className="flex justify-between items-start mb-4">
            <div className={`${pulse} h-5 w-24`} />
            <div className={`${pulse} h-5 w-20`} />
        </div>
        <div className={`${pulse} h-6 w-3/4 mb-4`} />
        <div className="space-y-2">
            <div className={`${pulse} h-4 w-1/2`} />
            <div className={`${pulse} h-4 w-2/3`} />
        </div>
        <div className="flex justify-end gap-3 mt-4">
            <div className={`${pulse} h-6 w-6`} />
            <div className={`${pulse} h-4 w-16`} />
        </div>
    </div>
);

export const SkeletonStatCard = () => (
    <div className="bg-[#1a2332] p-5 rounded-xl shadow-lg border border-gray-800/50">
        <div className={`${pulse} h-4 w-32 mb-4`} />
        <div className={`${pulse} h-8 w-24 mb-2`} />
        <div className={`${pulse} h-3 w-16`} />
    </div>
);

export const SkeletonTableRow = () => (
    <tr>
        <td className="p-4"><div className={`${pulse} h-4 w-36`} /></td>
        <td className="p-4"><div className={`${pulse} h-4 w-20`} /></td>
        <td className="p-4"><div className={`${pulse} h-4 w-24`} /></td>
        <td className="p-4"><div className={`${pulse} h-4 w-28`} /></td>
        <td className="p-4 flex justify-center"><div className={`${pulse} h-6 w-20`} /></td>
    </tr>
);

export const SkeletonChart = () => (
    <div className="bg-[#1a2332] p-5 rounded-xl shadow-lg border border-gray-800/50">
        <div className={`${pulse} h-4 w-48 mb-6`} />
        <div className={`${pulse} h-[250px] w-full rounded-lg`} />
    </div>
);

export const PageLoader = () => (
    <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#208060] border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-400 text-sm">Chargement...</span>
        </div>
    </div>
);
