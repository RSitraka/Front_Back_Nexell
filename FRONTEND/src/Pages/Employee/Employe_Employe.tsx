import React, { useState, useEffect } from 'react';
import { FaTrash, FaIdCard, FaFileAlt, FaPhone, FaMapMarkerAlt, FaTimes, FaEdit, FaSave, FaPlus, FaDownload } from 'react-icons/fa';
import { UserRole, type Employee, type FilesInterface } from '../../Utils/interface';
import { useEmployes } from '../../Providers/EmployeProviders';
import api from '../../Utils/axios';
import { useAuth } from '../../Providers/AuthProvider';

const Employe_Employes = () => {

    const { Employes, updateEmployee, deleteEmployes } = useEmployes();
    const { role } = useAuth();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Employee>>({
        nom: '', prenom: '', adresse: '', numeroTelephone: ''
    });
    const [cinFile, setCinFile] = useState<File | null>(null);
    const [newCertificats, setNewCertificats] = useState<File[]>([]);

    const [existingCertificats, setExistingCertificats] = useState<FilesInterface[]>([]);
    const [existingCin, setExistingCin] = useState<FilesInterface | null>(null);

    const [cinPreview, setCinPreview] = useState<string | null>(null);
    const [isLoadingImage, setIsLoadingImage] = useState(false);

    // Styles
    const inputStyle = "w-full bg-[#101728] border border-gray-600 rounded p-2 text-white focus:border-[#208060] focus:outline-none mb-3 transition-colors";
    const labelStyle = "block text-gray-400 text-sm mb-1";
    const cardStyle = "bg-[#1a2332] p-5 rounded-xl shadow-lg border-l-4 border-[#208060] relative group transition-all hover:bg-[#1f2a3d] hover:shadow-cyan-900/20";
    const fileItemStyle = "flex justify-between items-center bg-[#1a2332] px-2 py-2 rounded text-xs mb-1 border border-gray-700";

    const fetchFileBlob = async (fileId: string): Promise<string | null> => {
        try {
            const response = await api.get(`/fichiers/download/${fileId}`, {
                responseType: 'blob'
            });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error("Erreur lors du téléchargement du fichier:", error);
            return null;
        }
    };

    useEffect(() => {
        if (cinFile) {
            const objectUrl = URL.createObjectURL(cinFile);
            setCinPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [cinFile]);

    const downloadCertificate = async (file: FilesInterface) => {
        const url = await fetchFileBlob(file.id);
        if (url) {
            const link = document.createElement('a');
            link.href = url;
            link.download = file.originalName || 'document';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    const handleAddCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewCertificats([...newCertificats, e.target.files[0]]);
        }
    };
    const handleCinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCinFile(e.target.files[0]);
        }
    };

    const removeNewCertificate = (index: number) => {
        const updated = [...newCertificats];
        updated.splice(index, 1);
        setNewCertificats(updated);
    };

    const handleDeleteExistingFile = async (fileId: string, type: 'photos' | 'certificats') => {
        if (!window.confirm("Voulez-vous supprimer ce fichier ?") || !editingId) return;
        await api.delete(`/employes/${type}/${editingId}/${fileId}`);
        if (type === 'photos') {
            setExistingCin(null);
            setCinPreview(null);
        } else {
            setExistingCertificats(prev => prev.filter(f => f.id !== fileId));
        }
    };

    const handleEdit = async (emp: Employee) => {
        resetForm();
        setEditingId(emp.id);

        if (!role) return;
        setFormData({
            nom: emp.nom,
            prenom: emp.prenom,
            adresse: emp.adresse,
            numeroTelephone: emp.numeroTelephone,
            salaire: emp.salaire,
            role: role,
        });

        if (emp.scanPhotoCIN && emp.scanPhotoCIN.id) {
            setExistingCin(emp.scanPhotoCIN);
            setIsLoadingImage(true);
            const blobUrl = await fetchFileBlob(emp.scanPhotoCIN.id);
            setCinPreview(blobUrl);
            setIsLoadingImage(false);
        }

        if (emp.scanCertificats && emp.scanCertificats.length > 0) {
            setExistingCertificats(emp.scanCertificats);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        resetForm();
    };

    const resetForm = () => {
        setFormData({ nom: '', prenom: '', adresse: '', numeroTelephone: '' });
        setCinFile(null);
        setNewCertificats([]);
        setExistingCertificats([]);
        setExistingCin(null);
        setCinPreview(null);
        setIsLoadingImage(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSend = {
            data: formData,
            cinFile: cinFile,
            certificatsFiles: newCertificats,
        };

        if (editingId) {
            await updateEmployee(editingId, dataToSend);
            setEditingId(null);
            resetForm();
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Voulez-vous vraiment supprimer votre compte ?")) {
            deleteEmployes(id);
            if (editingId === id) handleCancelEdit();
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-10 text-white">
            <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-4">
                Gestion des informations
            </h1>
            <div className={`grid gap-8 ${editingId ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>

                {editingId && (
                    <div className="lg:col-span-1">
                        <div className="bg-[#1a2332] p-6 rounded-xl shadow-xl sticky top-6 border border-[#6090A0] transition-colors duration-300">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <FaEdit className="text-amber-400" /> Modifier
                                </h2>
                                <button onClick={handleCancelEdit} className="text-gray-400 hover:text-white">
                                    <FaTimes />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>

                                <div>
                                    <label className={labelStyle}>Nom</label>
                                    <input type="text" required className={inputStyle} value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Prénom</label>
                                    <input type="text" required className={inputStyle} value={formData.prenom} onChange={e => setFormData({ ...formData, prenom: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Adresse</label>
                                    <input type="text" className={inputStyle} value={formData.adresse} onChange={e => setFormData({ ...formData, adresse: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Téléphone</label>
                                    <input type="text" required className={inputStyle} value={formData.numeroTelephone} onChange={e => setFormData({ ...formData, numeroTelephone: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Salaire</label>
                                    <p className={inputStyle}>{formData.salaire ?? 0}</p>
                                </div>

                                <div className="mb-4 bg-[#101728] p-3 rounded border border-dashed border-gray-600">
                                    <label className={`${labelStyle} flex justify-between mb-2`}>
                                        <span>Scan CIN / Photo</span>
                                    </label>
                                    {existingCin ? (
                                        <div className={fileItemStyle}>
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <FaIdCard className="text-[#208060]" />
                                                <span className="truncate max-w-[120px] text-gray-300">{existingCin.originalName}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => downloadCertificate(existingCin)} className="text-[#6090A0] hover:text-white" title="Télécharger"><FaDownload /></button>
                                                <button type="button" onClick={() => handleDeleteExistingFile(existingCin.id, 'photos')} className="text-[#A02020] hover:text-red-400" title="Supprimer pour changer"><FaTrash /></button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {cinFile ? (
                                                <div className="flex justify-between items-center bg-[#208060]/20 px-2 py-2 rounded text-xs mb-1 border border-[#208060]/50">
                                                    <span className="truncate max-w-[150px] text-emerald-400">{cinFile.name} (Nouveau)</span>
                                                    <button type="button" onClick={() => { setCinFile(null); setCinPreview(null); }} className="text-[#A02020] hover:text-red-400">
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="mt-2">
                                                    <input
                                                        id="cinInput"
                                                        type="file"
                                                        accept="image/*,application/pdf"
                                                        onChange={handleCinChange}
                                                        className="hidden"
                                                    />
                                                    <label htmlFor="cinInput" className="cursor-pointer bg-[#1a2332] border border-dashed border-gray-500 text-gray-400 text-xs px-3 py-3 rounded hover:border-[#208060] transition w-full text-center flex justify-center items-center gap-2">
                                                        <FaPlus size={10} /> Sélectionner un fichier CIN
                                                    </label>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className={labelStyle}>Certificats</label>
                                    {existingCertificats.length > 0 && (
                                        <div className="mb-2">
                                            <p className="text-xs text-gray-500 mb-1">Enregistrés :</p>
                                            {existingCertificats.map((file) => (
                                                <div key={file.id} className={fileItemStyle}>
                                                    <span className="truncate max-w-[120px] text-gray-300">{file.originalName}</span>
                                                    <div className="flex gap-2">
                                                        <button type="button" onClick={() => downloadCertificate(file)} className="text-[#6090A0] hover:text-white"><FaDownload size={12} /></button>
                                                        <button type="button" onClick={() => handleDeleteExistingFile(file.id, 'certificats')} className="text-[#A02020] hover:text-red-400"><FaTrash size={12} /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex gap-2 items-center mb-2 mt-2">
                                        <input id="certInput" type="file" className="hidden" onChange={handleAddCertificate} accept="image/*,application/pdf" />
                                        <label htmlFor="certInput" className="cursor-pointer bg-[#101728] border border-dashed border-gray-500 text-gray-400 text-xs px-3 py-2 rounded hover:border-[#208060] transition w-full text-center flex justify-center items-center gap-2">
                                            <FaPlus size={10} /> Ajouter un certificat
                                        </label>
                                    </div>
                                    <div className="space-y-1">
                                        {newCertificats.map((file, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-[#101728] px-2 py-1 rounded text-xs border border-gray-600">
                                                <span className="truncate max-w-[150px] text-emerald-400">{file.name} (Nouveau)</span>
                                                <button type="button" onClick={() => removeNewCertificate(idx)} className="text-[#A02020] hover:text-red-400"><FaTimes /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button type="submit" className="flex-1 py-2 px-4 rounded font-bold shadow-lg transition flex justify-center items-center gap-2 bg-amber-600 hover:bg-amber-700">
                                        <FaSave /> Mettre à jour
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <div className={editingId ? "lg:col-span-2" : "w-full"}>
                    <div className={`grid gap-4 auto-rows-min ${editingId ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {Array.isArray(Employes) && Employes.map((emp) => (
                            <div key={emp.id} className={`${cardStyle} ${editingId === emp.id ? 'ring-2 ring-amber-400 scale-[1.02]' : ''}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{emp.prenom} {emp.nom}</h3>
                                        <p className="text-[#409090] text-sm flex items-center gap-2 mt-1">
                                            <FaPhone className="text-xs" /> {emp.numeroTelephone}
                                        </p>
                                        <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                                            <FaMapMarkerAlt className="text-xs" /> {emp.adresse || 'Non renseigné'}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(emp)} className="text-[#6090A0] hover:text-white transition bg-[#101728] p-2 rounded-full" title="Modifier">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(emp.id)} className="bg-[#101728] p-2 rounded-full text-[#A02020] hover:bg-red-900/20 transition" title="Supprimer">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-2 gap-2 text-xs">
                                    <div className="bg-[#101728] p-2 rounded flex items-center gap-2 text-gray-300">
                                        <FaIdCard className={`${emp.scanPhotoCIN ? 'text-[#208060]' : 'text-gray-600'}`} />
                                        {emp.scanPhotoCIN ? 'CIN Présent' : 'Pas de CIN'}
                                    </div>
                                    <div className="bg-[#101728] p-2 rounded flex items-center gap-2 text-gray-300">
                                        <FaFileAlt className="text-[#6090A0]" />
                                        {emp.scanCertificats ? emp.scanCertificats.length : 0} Certificat(s)
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {(!Array.isArray(Employes) || Employes.length === 0) && (
                        <div className="text-center text-gray-500 py-10 bg-[#1a2332] rounded-xl border border-dashed border-gray-700 mt-4">
                            Aucun employé enregistré pour le moment.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Employe_Employes;