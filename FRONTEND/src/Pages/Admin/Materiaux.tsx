import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaBoxOpen, FaSearch, FaSave, FaTimes } from 'react-icons/fa';
import type { Material } from '../../Utils/interface';

const mockMaterials: Material[] = [
    { id: '1', name: 'Câble RJ45', model: 'Cat6', supplier: 'ElecPro', price: 1500 },
    { id: '2', name: 'Marteau', model: 'Acier Trempé', supplier: 'BricoTout', price: 25000 },
    { id: '3', name: 'Antenne 4G', model: 'Huawei', supplier: 'TelecomSrc', price: 450000 },
];

const Materiaux = () => {
    const [materials, setMaterials] = useState<Material[]>(mockMaterials);
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Material>>({
        name: '', model: '', supplier: '', price: undefined
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'price' ? Number(value) : value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && formData.id) {
            setMaterials(materials.map(m => (m.id === formData.id ? { ...m, ...formData } as Material : m)));
            setIsEditing(false);
        } else {
            const newMat: Material = {
                id: Date.now().toString(),
                name: formData.name || '',
                model: formData.model || '',
                supplier: formData.supplier || '',
                price: formData.price || 0
            };
            setMaterials([...materials, newMat]);
        }
        setFormData({ name: '', model: '', supplier: '', price: 0 });
    };

    const startEdit = (mat: Material) => {
        setFormData(mat);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Supprimer ce matériel définitivement ?')) {
            setMaterials(materials.filter(m => m.id !== id));
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setFormData({ name: '', model: '', supplier: '', price: 0 });
    };

    const inputStyle = "w-full bg-[#101728] border border-gray-600 rounded p-2 \
	text-white focus:border-[#208060] focus:outline-none";
    const labelStyle = "block text-xs uppercase font-bold text-gray-500 mb-1";

    return (
        <div className="max-w-6xl mx-auto pb-10 text-white">
            <h1 className="text-3xl font-bold mb-6">Inventaire Matériaux</h1>

            <div className="bg-[#1a2332] p-6 rounded-xl shadow-lg border-t-4 border-[#208060] mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    {isEditing ? <FaEdit className="text-amber-400"/> : <FaPlus className="text-[#208060]"/>}
                    {isEditing ? 'Modifier le matériel' : 'Ajouter un nouveau matériel'}
                </h2>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <div className="lg:col-span-1">
                        <label className={labelStyle}>Nom</label>
                        <input name="name" type="text" placeholder="Ex: Marteau" required className={inputStyle} value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="lg:col-span-1">
                        <label className={labelStyle}>Modèle</label>
                        <input name="model" type="text" placeholder="Ex: Acier Trempé" required className={inputStyle} value={formData.model} onChange={handleInputChange} />
                    </div>
                    <div className="lg:col-span-1">
                        <label className={labelStyle}>Fournisseur</label>
                        <input name="supplier" type="text" placeholder="Ex: BricoTout" required className={inputStyle} value={formData.supplier} onChange={handleInputChange} />
                    </div>
                    <div className="lg:col-span-1">
                        <label className={labelStyle}>Prix (Ar)</label>
                        <input name="price" type="number" placeholder="0" required className={inputStyle} value={formData.price} onChange={handleInputChange} />
                    </div>
                    
                    <div className="flex gap-2">
                        <button type="submit" className={`flex-1 py-2 px-4 rounded font-bold shadow-lg 
							transition flex justify-center items-center gap-2 ${isEditing ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gradient-to-r from-[#208060] to-[#6090A0] hover:opacity-90'}`}>
                            {isEditing ? <><FaSave /> Mettre à jour</> : <><FaPlus /> Ajouter</>}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={cancelEdit} className="bg-gray-600 hover:bg-gray-700 px-3 rounded text-white">
                                <FaTimes />
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="bg-[#1a2332] rounded-xl overflow-hidden shadow-xl">
                <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-[#151c28]">
                    <div className="text-gray-400 text-sm">Total références : <span className="text-white font-bold">{materials.length}</span></div>
                    <div className="relative hidden md:block">
                        <FaSearch className="absolute left-3 top-3 text-gray-500" />
                        <input type="text" placeholder="Rechercher..." className="bg-[#101728] rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 ring-[#208060] w-64" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                        <thead className="bg-[#101728] text-[#6090A0] uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Nom du matériel</th>
                                <th className="px-6 py-4">Modèle</th>
                                <th className="px-6 py-4">Fournisseur</th>
                                <th className="px-6 py-4 text-right">Prix Unitaire</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {materials.map((mat) => (
                                <tr key={mat.id} className="hover:bg-[#1f2a3d] transition-colors">
                                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                        <div className="bg-[#208060]/20 p-2 rounded text-[#208060]"><FaBoxOpen /></div>
                                        {mat.name}
                                    </td>
                                    <td className="px-6 py-4">{mat.model}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className="bg-gray-700 px-2 py-1 rounded text-gray-300">{mat.supplier}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-mono text-emerald-400">
                                        {mat.price.toLocaleString()} Ar
                                    </td>
                                    <td className="px-6 py-4 flex justify-center gap-3">
                                        <button onClick={() => startEdit(mat)} className="text-[#6090A0] hover:text-white transition" title="Modifier">
                                            <FaEdit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(mat.id)} className="text-[#A02020] hover:text-red-400 transition" title="Supprimer">
                                            <FaTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {materials.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-8 text-gray-500">Aucun matériel enregistré pour le moment.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Materiaux;