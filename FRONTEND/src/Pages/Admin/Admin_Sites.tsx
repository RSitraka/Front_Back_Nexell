import React, { useEffect, useState } from 'react';
import { FaTrash, FaPlus, FaFilePdf, FaCar, FaUsers, FaTools, FaCoins, FaSave, FaTimes, FaDownload, FaImage } from 'react-icons/fa';
import { RiInformationLine } from "react-icons/ri";
import { useMaterials } from '../../Providers/MatériauxProviders';
import { useEmployes } from '../../Providers/EmployeProviders';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../Utils/axios';
import type { FilesInterface } from '../../Utils/interface';
import { useSites } from '../../Providers/SitesProvider';

const Admin_Sites = () => {

    const { materials } = useMaterials();
    const { Employes } = useEmployes();
    const { addSite, updateSite } = useSites();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [siteId, setSiteId] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [Error, setError] = useState(false);
    const [localisation, setLocalisation] = useState('');
    const [typeTravail, setType] = useState('Installation');
    const [status, setStatus] = useState('En cours');
    const [coordonneesGPS, setcoordonneesGPS] = useState('');
    const [description, setDescription] = useState('');
    const [newPhotos, setNewPhotos] = useState<File[]>([]);
    const [existingPhotos, setExistingPhotos] = useState<FilesInterface[]>([]);
    const [existingPhotoPreviews, setExistingPhotoPreviews] = useState<{ [key: string]: string }>({});
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [existingFiles, setExistingFiles] = useState<FilesInterface[]>([]);

    const isFormValid = !!(typeTravail && status && description.trim() && localisation.trim() && coordonneesGPS.trim());
    const [selectedMaterials, setSelectedMaterials] = useState<{
        id: string,
        materielId: string,
        quantite: number,
        priceRef: number,
        isNew: boolean,
    }[]>([]);
    const [otherExpenses, setOtherExpenses] = useState<{ id: string, desc: string, amount: number }[]>([]);
    const [siteEmployees, setSiteEmployees] = useState<{ id: string, salaire: number, isNew: boolean }[]>([]);

    const [vehicle, setVehicle] = useState({
        active: false,
        plate: '',
        driver: '',
        agency: '',
        cost: 0
    });

    useEffect(() => {
        const loadPreviews = async () => {
            const previews: { [key: string]: string } = {};
            for (const photo of existingPhotos) {
                const url = await fetchFileBlob(photo.id, 'photos');
                if (url) previews[photo.id] = url;
            }
            setExistingPhotoPreviews(prev => ({ ...prev, ...previews }));
        };

        if (existingPhotos.length > 0) {
            loadPreviews();
        }
    }, [existingPhotos]);

    const fetchFileBlob = async (fileId: string, type: string): Promise<string | null> => {
        try {
            const response = await api.get(`/${type}/download/${fileId}`, {
                responseType: 'blob'
            });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error("Erreur download:", error);
            return null;
        }
    };
    const downloadFile = async (file: FilesInterface, type: string) => {
        const url = await fetchFileBlob(file.id, type);
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

    const handleDeleteExisting = async (fileId: string, type: 'photos' | 'fichiers') => {
        if (!window.confirm("Supprimer ce fichier définitivement ?")) return;

        try {
            await api.delete(`/${type}/${fileId}`);

            if (type === 'photos') {
                setExistingPhotos(prev => prev.filter(f => f.id !== fileId));
                if (existingPhotoPreviews[fileId]) {
                    URL.revokeObjectURL(existingPhotoPreviews[fileId]);
                    const newPreviews = { ...existingPhotoPreviews };
                    delete newPreviews[fileId];
                    setExistingPhotoPreviews(newPreviews);
                }
            } else {
                setExistingFiles(prev => prev.filter(f => f.id !== fileId));
            }
        } catch (error) {
            console.error("Erreur suppression", error);
        }
    };

    const handleNewPhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setNewPhotos(prev => [...prev, ...filesArray]);
        }
    };

    const handleNewFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setNewFiles(prev => [...prev, ...filesArray]);
        }
    };

    const removeNewPhoto = (index: number) => {
        setNewPhotos(prev => prev.filter((_, i) => i !== index));
    };

    const removeNewFile = (index: number) => {
        setNewFiles(prev => prev.filter((_, i) => i !== index));
    };



    const fetchData = async (id: string) => {
        try {
            const { data } = await api.get(`/sites/${id}`);
            if (!data.id) return;
            setSiteId(data.id);
            setcoordonneesGPS(data.coordonneesGPS);
            setType(data.typeTravail);
            setDescription(data.description);
            setLocalisation(data.localisation);
            setStatus(data.statut);
            setExistingFiles(data.fichiers);
            setExistingPhotos(data.photos);
            if (materials) {
                setSelectedMaterials([]);
                data.demandesMateriel.forEach((mat: any) => {
                    addMaterial(mat.materiel.id, false, mat.quantite, mat.id);
                });
            }
            if (Employes) {
                setSiteEmployees([]);
                data.employes.forEach((emp: any) => {
                    addEmployee(emp.id, false);
                })
            }
            setSiteEmployees(data.employes);
            setOtherExpenses(data.depenses);
        }
        catch (e) { setError(true); }
    }
    useEffect(() => {
        if (!materials || !Employes) return;
        if (id && id.length) {
            setIsEditing(true);
            fetchData(id);
        }
    }, [materials, Employes]);


    const calculateTotal = () => {
        const matTotal = selectedMaterials.reduce((acc, item) => acc + (item.priceRef * item.quantite), 0);
        const expTotal = otherExpenses.reduce((acc, item) => acc + item.amount, 0);
        const empTotal = siteEmployees.reduce((acc, item) => acc + item.salaire, 0);
        const vehTotal = vehicle.active ? vehicle.cost : 0;

        return matTotal + expTotal + empTotal + vehTotal;
    };

    const totalExpense = calculateTotal();

    const addMaterial = (materialId: string, isNew: boolean, quantite: number, id: string) => {
        const exists = selectedMaterials.find(item => item.materielId === materialId);
        if (exists) {
            alert("Ce matériau est déjà dans la liste.");
            return;
        }
        const mat = materials.find(m => m.id === materialId);
        if (mat) {
            setSelectedMaterials(prev => [
                ...prev,
                {
                    id: id,
                    materielId: materialId,
                    quantite: quantite,
                    priceRef: mat.prix,
                    isNew: isNew,
                }
            ]);

        }
    };
    const deleteMaterials = async (idx: number) => {
        if (!selectedMaterials[idx].isNew && window.confirm("Voulez-vous supprimer cette demande ?")) {
            await api.delete(`/demandes-materiel/${selectedMaterials[idx].id}`)
        }
        const start = [...selectedMaterials];
        start.splice(idx, 1);
        setSelectedMaterials(start);
    }


    const updateMaterialquantite = (index: number, newquantite: number) => {
        const updated = [...selectedMaterials];
        updated[index].quantite = Number(newquantite);
        setSelectedMaterials(updated);
    };

    const addEmployee = (empId: string, isNew: boolean) => {
        const emp = Employes.find(e => e.id === empId);
        if (emp && !siteEmployees.find(e => e.id === empId)) {
            setSiteEmployees([...siteEmployees, { id: emp.id, salaire: emp.salaire, isNew }]);
        }
    };

    const removeEmploye = async (idx: number) => {
        if (!siteEmployees[idx].isNew && window.confirm("Voulez-vous enlever cet employé")) {
            await api.patch(`/employes/${siteEmployees[idx].id}`, {siteId: null});
        }
        const start = [...siteEmployees];
        start.splice(idx, 1);
        setSiteEmployees(start);
    }
    const updatesalaire = (index: number, amount: number) => {
        const updated = [...siteEmployees];
        updated[index].salaire = Number(amount);
        setSiteEmployees(updated);
    };

    const addExpense = () => {
        setOtherExpenses([...otherExpenses, { id: Date.now().toString(), desc: '', amount: 0 }]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const siteData = {
            typeTravail,
            status,
            localisation,
            coordonneesGPS,
            description,
            selectedMaterials,
            otherExpenses,
            siteEmployees,
            vehicle,
            totalExpense,
        };

        const dataToSend = {
            data: siteData,
            photos: newPhotos,
            files: newFiles,
        };

        if (isEditing) {
            await updateSite(siteId, dataToSend);
            navigate('/');
        }
        else {
            await addSite(dataToSend);
            navigate('/');
        }
    };
    // const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) setPhotos([...photos, ...Array.from(e.target.files)]);
    // };
    // const removePhoto = (index: number) => {
    //     setPhotos((prev) => prev.filter((_, i) => i !== index));
    // };

    // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) setFiles([...files, ...Array.from(e.target.files)]);
    // };

    const sectionTitle = "text-[#6090A0] text-lg font-bold flex items-center gap-2 mb-4 border-b border-gray-700 pb-2";
    const inputStyle = "w-full bg-[#101728] border border-gray-600 rounded p-2 text-white focus:border-[#208060] focus:outline-none";
    const cardStyle = "bg-[#1a2332] p-6 rounded-xl shadow-md mb-6";
    const btnRed = "bg-[#A02020] hover:bg-red-700 text-white p-2 rounded";
    const gradientBtn = "bg-gradient-to-r from-[#208060] to-[#6090A0] hover:opacity-90 text-white px-4 py-2 rounded shadow transition";

    return (
        <>
            {Error ? <div className="flex justify-center items-center h-screen">
                <h1 className="text-lg font-bold text-center">
                    Ce site n'existe pas
                </h1>
            </div> :
                <div className="text-white max-w-5xl mx-auto pb-20">
                    <h1 className="text-3xl font-bold mb-8 text-white">Gestion de Site</h1>

                    <div className={cardStyle}>
                        <h2 className={sectionTitle}><RiInformationLine /> Informations Générales</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Type de travail</label>
                                <select required className={inputStyle} value={typeTravail} onChange={e => setType(e.target.value)}>
                                    <option>Calibrage</option>
                                    <option>Installation</option>
                                    <option>Maintenance</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Status</label>
                                <select required className={inputStyle} value={status} onChange={e => setStatus(e.target.value)}>
                                    <option>En cours</option>
                                    <option>Terminé</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-400 text-sm mb-1">Description du travail</label>
                                <textarea required rows={2} className={inputStyle} placeholder="Description des tâches sur lieux..." value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-400 text-sm mb-1">Localisation</label>
                                <input required type="text" className={inputStyle} placeholder="Antananarivo, Analakely" value={localisation} onChange={e => setLocalisation(e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-400 text-sm mb-1">Localisation GPS (Lien)</label>
                                <input required type="text" className={inputStyle} placeholder="https://maps.google.com/..." value={coordonneesGPS} onChange={e => setcoordonneesGPS(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className={cardStyle}>
                        <h2 className={sectionTitle}><FaTools /> Matériaux Utilisés</h2>
                        <div className="flex gap-2 mb-4">
                            <select id="matSelect" className={inputStyle}>
                                <option value="">-- Choisir un matériel --</option>
                                {materials.map(m => (
                                    <option key={m.id} value={m.id}>{m.nom} ({m.modele}) - {m.prix} Ar</option>
                                ))}
                            </select>
                            <button
                                onClick={() => {
                                    const select = document.getElementById('matSelect') as HTMLSelectElement;
                                    if (select.value) addMaterial(select.value, true, 1, select.value);
                                }}
                                className={gradientBtn}
                            >Ajouter</button>
                        </div>

                        {selectedMaterials.length > 0 && (
                            <table className="w-full text-sm text-left text-gray-300">
                                <thead className="text-xs uppercase bg-[#101728] text-[#6090A0]">
                                    <tr>
                                        <th className="px-4 py-2">Nom</th>
                                        <th className="px-4 py-2">Prix Unit.</th>
                                        <th className="px-4 py-2">Qté</th>
                                        <th className="px-4 py-2">Total</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedMaterials.map((item, idx) => {
                                        const matInfo = materials.find(m => m.id === item.materielId);
                                        return (
                                            <tr key={idx} className="border-b border-gray-700">
                                                <td className="px-4 py-2">{matInfo?.nom}</td>
                                                <td className="px-4 py-2">{item.priceRef} Ar</td>
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantite ?? 0}
                                                        onChange={(e) => {
                                                            const val = e.target.value === '' ? 1 : parseInt(e.target.value);
                                                            updateMaterialquantite(idx, val);
                                                        }}
                                                        className="w-16 bg-[#101728] rounded p-1"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 font-bold">{(item.priceRef * item.quantite).toLocaleString()} Ar</td>
                                                <td className="px-4 py-2">
                                                    <button onClick={() => {
                                                        deleteMaterials(idx);
                                                    }} className="text-[#A02020] hover:text-red-400"><FaTrash /></button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className={cardStyle}>
                        <h2 className={sectionTitle}><FaCoins /> Autres Dépenses (Batellage, Divers)</h2>
                        {otherExpenses.map((exp, idx) => (
                            <div key={idx} className="flex gap-2 mb-2 items-center">
                                <input
                                    type="text"
                                    placeholder="Description (ex: Batellage)"
                                    className={`${inputStyle}`}
                                    value={exp.desc}
                                    onChange={(e) => {
                                        const updated = [...otherExpenses];
                                        updated[idx].desc = e.target.value;
                                        setOtherExpenses(updated);
                                    }}
                                />
                                <input
                                    type="number"
                                    placeholder="Montant"
                                    className={`${inputStyle}`}
                                    value={exp.amount === 0 ? '' : exp.amount}
                                    onChange={(e) => {
                                        const updated = [...otherExpenses];
                                        updated[idx].amount = Number(e.target.value);
                                        setOtherExpenses(updated);
                                    }}
                                />
                                <span className="text-gray-400 text-sm">Ar</span>
                                <button onClick={() => {
                                    const updated = [...otherExpenses];
                                    updated.splice(idx, 1);
                                    setOtherExpenses(updated);
                                }} className={btnRed}><FaTrash /></button>
                            </div>
                        ))}
                        <button onClick={addExpense} className="text-sm text-[#409090] hover:underline flex items-center gap-1 mt-2">
                            <FaPlus /> Ajouter une ligne de dépense
                        </button>
                    </div>

                    <div className={cardStyle}>
                        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                            <h2 className="text-[#6090A0] text-lg font-bold flex items-center gap-2"><FaCar /> Véhicule</h2>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={vehicle.active} onChange={() => setVehicle({ ...vehicle, active: !vehicle.active })} className="w-5 h-5 accent-[#208060]" />
                                <span className="text-sm">Véhicule utilisé ?</span>
                            </label>
                        </div>

                        {vehicle.active && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                                <input type="text" placeholder="Matricule" className={inputStyle} value={vehicle.plate} onChange={e => setVehicle({ ...vehicle, plate: e.target.value })} />
                                <input type="text" placeholder="Agence" className={inputStyle} value={vehicle.agency} onChange={e => setVehicle({ ...vehicle, agency: e.target.value })} />
                                <input type="text" placeholder="Nom Chauffeur / ID" className={inputStyle} value={vehicle.driver} onChange={e => setVehicle({ ...vehicle, driver: e.target.value })} />
                                <div>
                                    <label className="text-xs text-gray-400">Total (Carburant + Location)</label>
                                    <input type="number" placeholder="Coût Total" className={inputStyle} value={vehicle.cost === 0 ? '' : vehicle.cost} onChange={e => setVehicle({ ...vehicle, cost: Number(e.target.value) })} />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={cardStyle}>
                        <h2 className={sectionTitle}><FaUsers /> Employés & Salaires</h2>
                        <div className="flex gap-2 mb-4">
                            <select id="empSelect" className={inputStyle}>
                                <option value="">-- Ajouter un employé --</option>
                                {Employes.map(e => (
                                    <option key={e.id} value={e.id}>{e.nom} {e.prenom}</option>
                                ))}
                            </select>
                            <button
                                onClick={() => {
                                    const select = document.getElementById('empSelect') as HTMLSelectElement;
                                    if (select.value) addEmployee(select.value, true);
                                }}
                                className={gradientBtn}
                            >Ajouter</button>
                        </div>

                        {siteEmployees.map((siteEmp, idx) => {
                            const empData = Employes.find(e => e.id === siteEmp.id);
                            return (
                                <div key={idx} className="flex justify-between items-center bg-[#101728] p-3 rounded mb-2 border border-gray-700">
                                    <div>
                                        <p className="font-bold">{empData?.nom} {empData?.prenom}</p>
                                        <p className="text-xs text-gray-500">{empData?.numeroTelephone}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="text-xs text-gray-400">Salaire/Avance:</label>
                                        <input
                                            type="number"
                                            className={`${inputStyle} w-32`}
                                            value={siteEmp.salaire === 0 ? '' : siteEmp.salaire}
                                            onChange={(e) => updatesalaire(idx, Number(e.target.value))}
                                        />
                                        <span className="text-sm">Ar</span>
                                        <button onClick={() => {
                                            removeEmploye(idx);
                                        }} className={btnRed}><FaTrash /></button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className={cardStyle}>
                            <h2 className={sectionTitle}><FaImage /> Galerie Photos</h2>

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleNewPhotosUpload}
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#208060]/20 file:text-[#409090] hover:file:bg-[#208060]/30 cursor-pointer"
                            />

                            <div className="mt-4 flex flex-wrap gap-3">
                                {existingPhotos.map((f) => (
                                    <div key={f.id} className="relative group w-20 h-20 bg-gray-900 rounded overflow-hidden border border-gray-600">
                                        {existingPhotoPreviews[f.id] ? (
                                            <img src={existingPhotoPreviews[f.id]} alt={f.originalName} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">Chargement...</div>
                                        )}
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button type="button" onClick={() => downloadFile(f, 'photos')} className="text-[#6090A0] hover:text-white"><FaDownload size={12} /></button>
                                            <button type="button" onClick={() => handleDeleteExisting(f.id, 'photos')} className="text-[#A02020] hover:text-red-400"><FaTrash size={12} /></button>
                                        </div>
                                    </div>
                                ))}

                                {newPhotos.map((f, i) => (
                                    <div key={i} className="relative w-20 h-20 bg-gray-800 rounded border border-[#208060] overflow-hidden">
                                        <img src={URL.createObjectURL(f)} alt="Preview" className="w-full h-full object-cover" />

                                        <div className="absolute top-0 right-0 bg-black/50 p-1 cursor-pointer hover:bg-red-600" onClick={() => removeNewPhoto(i)}>
                                            <FaTimes className="text-white text-xs" />
                                        </div>
                                        <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-[10px] text-center text-white truncate px-1">
                                            Nouveau
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={cardStyle}>
                            <h2 className={sectionTitle}><FaFilePdf /> Fichiers & Scans</h2>

                            <input
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx"
                                onChange={handleNewFilesUpload}
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#208060]/20 file:text-[#409090] hover:file:bg-[#208060]/30 cursor-pointer"
                            />

                            <div className="mt-4 flex flex-col gap-2">
                                {existingFiles.length > 0 && <p className="text-xs text-gray-500 uppercase font-semibold">Enregistrés</p>}
                                {existingFiles.map((f) => (
                                    <div key={f.id} className="flex justify-between items-center bg-[#101728] px-3 py-2 rounded text-xs border border-gray-700">
                                        <span className="truncate max-w-[200px] text-gray-300 flex items-center gap-2">
                                            <FaFilePdf className="text-gray-500" /> {f.originalName}
                                        </span>
                                        <div className="flex gap-3">
                                            <button type="button" onClick={() => downloadFile(f, 'fichiers')} className="text-[#6090A0] hover:text-white" title="Télécharger"><FaDownload /></button>
                                            <button type="button" onClick={() => handleDeleteExisting(f.id, 'fichiers')} className="text-[#A02020] hover:text-red-400" title="Supprimer"><FaTrash /></button>
                                        </div>
                                    </div>
                                ))}

                                {/* B. Affichage des NOUVEAUX Fichiers (Mémoire) */}
                                {newFiles.length > 0 && <p className="text-xs text-emerald-500 uppercase font-semibold mt-2">À envoyer</p>}
                                {newFiles.map((f, i) => (
                                    <div key={i} className="flex justify-between items-center bg-[#208060]/10 px-3 py-2 rounded text-xs border border-[#208060]/30">
                                        <span className="truncate max-w-[200px] text-emerald-400 flex items-center gap-2">
                                            <FaFilePdf /> {f.name} (Nouveau)
                                        </span>
                                        <button type="button" onClick={() => removeNewFile(i)} className="text-[#A02020] hover:text-red-400">
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="fixed bottom-0 left-0 lg:left-0 w-full bg-[#101728] border-t border-[#208060] p-4 shadow-2xl z-40">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pl-0 lg:pl-64">

                            <div className="flex flex-col">
                                <span className="text-gray-400 text-sm">TOTAL DÉPENSES DU SITE</span>
                                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#208060] to-[#409090]">
                                    {totalExpense.toLocaleString()} Ar
                                </span>
                            </div>
                            <button
                                disabled={!isFormValid}
                                onClick={handleSubmit}
                                className={`
                                          px-8 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2 transition-all
                                        ${!isFormValid
                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                                        : 'bg-gradient-to-r from-[#A02020] to-red-800 text-white hover:scale-105 cursor-pointer'
                                    }
                                 `}
                            >
                                <FaSave /> ENREGISTRER LE SITE
                            </button>
                        </div>
                    </div>
                </div>}
        </>
    );
};

export default Admin_Sites;