import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaBoxOpen, FaSearch, FaSave, FaTimes } from 'react-icons/fa';
import type { Material } from '../../Utils/interface';
import { useMaterials } from '../../Providers/MatériauxProviders';

const Employe_Materiaux = () => {
    const { materials, deleteMaterials, addMatériaux, updateMateriaux } = useMaterials();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Material>>({
        nom: '', modele: '', nomFournisseur: '', prix: 0
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'prix' ? Number(value) : value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && formData.id) {
            updateMateriaux(formData as Material);
            setIsEditing(false);
        } else {
            const newMat: Material = {
                id: Date.now().toString(),
                nom: formData.nom || '',
                modele: formData.modele || '',
                nomFournisseur: formData.nomFournisseur || '',
                prix: formData.prix || 0
            };
            addMatériaux(newMat);
        }
        setFormData({ nom: '', modele: '', nomFournisseur: '', prix: 0 });
    };

    const startEdit = (mat: Material) => {
        setFormData(mat);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Supprimer ce matériel définitivement ?')) {
            deleteMaterials(id);
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setFormData({ nom: '', modele: '', nomFournisseur: '', prix: 0 });
    };

    const inputStyle = "w-full bg-[#101728] border border-gray-600 rounded p-2 \
	text-white focus:border-[#208060] focus:outline-none";
    const labelStyle = "block text-xs uppercase font-bold text-gray-500 mb-1";

    return (
        <div className="max-w-6xl mx-auto pb-10 text-white">
            <h1 className="text-3xl font-bold mb-6">Inventaire Matériaux</h1>

            <div className="bg-[#1a2332] p-6 rounded-xl shadow-lg border-t-4 border-[#208060] mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    {isEditing ? <FaEdit className="text-amber-400" /> : <FaPlus className="text-[#208060]" />}
                    {isEditing ? 'Modifier le matériel' : 'Ajouter un nouveau matériel'}
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <div className="lg:col-span-1">
                        <label className={labelStyle}>Nom</label>
                        <input name="nom" type="text" placeholder="Ex: Marteau" required className={inputStyle} value={formData.nom} onChange={handleInputChange} />
                    </div>
                    <div className="lg:col-span-1">
                        <label className={labelStyle}>Modèle</label>
                        <input name="modele" type="text" placeholder="Ex: Acier Trempé" required className={inputStyle} value={formData.modele} onChange={handleInputChange} />
                    </div>
                    <div className="lg:col-span-1">
                        <label className={labelStyle}>Fournisseur</label>
                        <input name="nomFournisseur" type="text" placeholder="Ex: BricoTout" required className={inputStyle} value={formData.nomFournisseur} onChange={handleInputChange} />
                    </div>
                    <div className="lg:col-span-1">
                        <label className={labelStyle}>Prix (Ar)</label>
                        <input name="prix" type="number" placeholder="0" required className={inputStyle} value={formData.prix} onChange={handleInputChange} />
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
                </div>

                <div className="w-full">
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {materials.map((mat) => (
                            <div key={mat.id} className="bg-[#1f2a3d] p-5 rounded-xl shadow-lg border border-gray-700 relative">

                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#208060]/20 p-3 rounded-lg text-[#208060]">
                                            <FaBoxOpen size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">{mat.nom}</h3>
                                            <p className="text-gray-400 text-sm">{mat.modele}</p>
                                        </div>
                                    </div>
                                    <span className="font-mono text-emerald-400 font-bold bg-[#101728] px-2 py-1 rounded">
                                        {mat.prix.toLocaleString()} Ar
                                    </span>
                                </div>

                                <div className="border-t border-gray-700 py-3 mb-3">
                                    <div className="flex justify-between items-center text-sm mb-2">
                                        <span className="text-gray-500">Fournisseur :</span>
                                        <span className="bg-gray-700 px-2 py-1 rounded text-gray-300 text-xs">
                                            {mat.nomFournisseur}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => startEdit(mat)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#101728] py-2 rounded text-[#6090A0] hover:bg-[#6090A0]/20 transition border border-[#6090A0]/30">
                                        <FaEdit /> Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(mat.id)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#101728] py-2 rounded text-[#A02020] hover:bg-[#A02020]/20 transition border border-[#A02020]/30">
                                        <FaTrash /> Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}

                        {materials.length === 0 && (
                            <div className="text-center py-8 text-gray-500 bg-[#1f2a3d] rounded-xl">
                                Aucun matériel.
                            </div>
                        )}
                    </div>

                    <div className="hidden md:block overflow-x-auto rounded-xl shadow-xl border border-gray-700">
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
                            <tbody className="divide-y divide-gray-700 bg-[#1a2332]">
                                {materials.map((mat) => (
                                    <tr key={mat.id} className="hover:bg-[#1f2a3d] transition-colors group">
                                        <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                            <div className="bg-[#208060]/20 p-2 rounded text-[#208060]"><FaBoxOpen /></div>
                                            {mat.nom}
                                        </td>
                                        <td className="px-6 py-4">{mat.modele}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className="bg-gray-700 px-2 py-1 rounded text-gray-300">{mat.nomFournisseur}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono text-emerald-400">
                                            {mat.prix.toLocaleString()} Ar
                                        </td>
                                        <td className="px-6 py-4 flex justify-center gap-3">
                                            <button onClick={() => startEdit(mat)} className="p-2 rounded-full hover:bg-gray-700 text-[#6090A0] hover:text-white transition" title="Modifier">
                                                <FaEdit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(mat.id)} className="p-2 rounded-full hover:bg-gray-700 text-[#A02020] hover:text-red-400 transition" title="Supprimer">
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
        </div>
    );
};

export default Employe_Materiaux;