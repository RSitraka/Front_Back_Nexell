import React, { useState } from 'react';
import { FaTrash, FaPlus, FaFilePdf, FaCamera, FaCar, FaUsers, FaTools, FaCoins, FaSave } from 'react-icons/fa';
import type { Material, Employee } from '../../Utils/interface'; // Import des mocks
import { RiInformationLine } from "react-icons/ri";
const mockMaterials: Material[] = [
    { id: '1', name: 'Câble RJ45', model: 'Cat6', supplier: 'ElecPro', price: 1500 },
    { id: '2', name: 'Marteau', model: 'Acier Trempé', supplier: 'BricoTout', price: 25000 },
    { id: '3', name: 'Antenne 4G', model: 'Huawei', supplier: 'TelecomSrc', price: 450000 },
];

const mockEmployees: Employee[] = [
    { id: '1', firstName: 'Jean', lastName: 'Rakoto', phone: '034 00 000 00', address:'yo' },
    { id: '2', firstName: 'Paul', lastName: 'Andriama', phone: '032 00 000 00', address:'yo' },
];

const Sites = () => {
    const [type, setType] = useState('Installation');
    const [status, setStatus] = useState('En cours');
    const [gpsLink, setGpsLink] = useState('');
    const [description, setDescription] = useState('');
    
    const [photos, setPhotos] = useState<File[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    
    const [selectedMaterials, setSelectedMaterials] = useState<{ id: string, qty: number, priceRef: number }[]>([]);
    const [otherExpenses, setOtherExpenses] = useState<{ id: string, desc: string, amount: number }[]>([]);
    const [siteEmployees, setSiteEmployees] = useState<{ id: string, salary: number }[]>([]);
    
    const [vehicle, setVehicle] = useState({
        active: false,
        plate: '',
        driver: '',
        agency: '',
        cost: 0
    });

    const calculateTotal = () => {
        const matTotal = selectedMaterials.reduce((acc, item) => acc + (item.priceRef * item.qty), 0);
        const expTotal = otherExpenses.reduce((acc, item) => acc + item.amount, 0);
        const empTotal = siteEmployees.reduce((acc, item) => acc + item.salary, 0);
        const vehTotal = vehicle.active ? vehicle.cost : 0;
        
        return matTotal + expTotal + empTotal + vehTotal;
    };

    const totalExpense = calculateTotal();

    const addMaterial = (materialId: string) => {
        const mat = mockMaterials.find(m => m.id === materialId);
        if (mat) {
            setSelectedMaterials([...selectedMaterials, { id: mat.id, qty: 1, priceRef: mat.price }]);
        }
    };
    const updateMaterialQty = (index: number, newQty: number) => {
        const updated = [...selectedMaterials];
        updated[index].qty = Number(newQty);
        setSelectedMaterials(updated);
    };

    const addEmployee = (empId: string) => {
        const emp = mockEmployees.find(e => e.id === empId);
        if (emp && !siteEmployees.find(e => e.id === empId)) {
            setSiteEmployees([...siteEmployees, { id: emp.id, salary: 0 }]);
        }
    };
    const updateSalary = (index: number, amount: number) => {
        const updated = [...siteEmployees];
        updated[index].salary = Number(amount);
        setSiteEmployees(updated);
    };

    const addExpense = () => {
        setOtherExpenses([...otherExpenses, { id: Date.now().toString(), desc: '', amount: 0 }]);
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setPhotos([...photos, ...Array.from(e.target.files)]);
    };
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFiles([...files, ...Array.from(e.target.files)]);
    };

    const sectionTitle = "text-[#6090A0] text-lg font-bold flex items-center gap-2 mb-4 border-b border-gray-700 pb-2";
    const inputStyle = "w-full bg-[#101728] border border-gray-600 rounded p-2 text-white focus:border-[#208060] focus:outline-none";
    const cardStyle = "bg-[#1a2332] p-6 rounded-xl shadow-md mb-6";
    const btnRed = "bg-[#A02020] hover:bg-red-700 text-white p-2 rounded";
    const gradientBtn = "bg-gradient-to-r from-[#208060] to-[#6090A0] hover:opacity-90 text-white px-4 py-2 rounded shadow transition";

    return (
        <div className="text-white max-w-5xl mx-auto pb-20">
            <h1 className="text-3xl font-bold mb-8 text-white">Gestion de Site</h1>

            <div className={cardStyle}>
                <h2 className={sectionTitle}><RiInformationLine /> Informations Générales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Type de travail</label>
                        <select className={inputStyle} value={type} onChange={e => setType(e.target.value)}>
                            <option>Calibrage</option>
                            <option>Installation</option>
                            <option>Maintenance</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Status</label>
                        <select className={inputStyle} value={status} onChange={e => setStatus(e.target.value)}>
                            <option>En cours</option>
                            <option>Terminé</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm mb-1">Description du travail</label>
                        <textarea rows={2} className={inputStyle} placeholder="Description des tâches sur lieux..." value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm mb-1">Localisation GPS (Lien)</label>
                        <input type="text" className={inputStyle} placeholder="https://maps.google.com/..." value={gpsLink} onChange={e => setGpsLink(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className={cardStyle}>
                <h2 className={sectionTitle}><FaTools /> Matériaux Utilisés</h2>
                <div className="flex gap-2 mb-4">
                    <select id="matSelect" className={inputStyle}>
                        <option value="">-- Choisir un matériel --</option>
                        {mockMaterials.map(m => (
                            <option key={m.id} value={m.id}>{m.name} ({m.model}) - {m.price} Ar</option>
                        ))}
                    </select>
                    <button 
                        onClick={() => {
                            const select = document.getElementById('matSelect') as HTMLSelectElement;
                            if(select.value) addMaterial(select.value);
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
                                const matInfo = mockMaterials.find(m => m.id === item.id);
                                return (
                                    <tr key={idx} className="border-b border-gray-700">
                                        <td className="px-4 py-2">{matInfo?.name}</td>
                                        <td className="px-4 py-2">{item.priceRef} Ar</td>
                                        <td className="px-4 py-2">
                                            <input type="number" min="1" defaultValue={"1"} value={item.qty} onChange={(e) => updateMaterialQty(idx, parseInt(e.target.value))} 
											className="w-16 bg-[#101728] rounded p-1" />
                                        </td>
                                        <td className="px-4 py-2 font-bold">{(item.priceRef * item.qty).toLocaleString()} Ar</td>
                                        <td className="px-4 py-2">
                                            <button onClick={() => {
                                                const start = [...selectedMaterials];
                                                start.splice(idx, 1);
                                                setSelectedMaterials(start);
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
                        <input type="checkbox" checked={vehicle.active} onChange={() => setVehicle({...vehicle, active: !vehicle.active})} className="w-5 h-5 accent-[#208060]" />
                        <span className="text-sm">Véhicule utilisé ?</span>
                    </label>
                </div>
                
                {vehicle.active && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                        <input type="text" placeholder="Matricule" className={inputStyle} value={vehicle.plate} onChange={e => setVehicle({...vehicle, plate: e.target.value})} />
                        <input type="text" placeholder="Agence" className={inputStyle} value={vehicle.agency} onChange={e => setVehicle({...vehicle, agency: e.target.value})} />
                        <input type="text" placeholder="Nom Chauffeur / ID" className={inputStyle} value={vehicle.driver} onChange={e => setVehicle({...vehicle, driver: e.target.value})} />
                        <div>
                            <label className="text-xs text-gray-400">Total (Carburant + Location)</label>
                            <input type="number" placeholder="Coût Total" className={inputStyle} value={vehicle.cost === 0 ? '' : vehicle.cost} onChange={e => setVehicle({...vehicle, cost: Number(e.target.value)})} />
                        </div>
                    </div>
                )}
            </div>
            <div className={cardStyle}>
                <h2 className={sectionTitle}><FaUsers /> Employés & Salaires</h2>
                <div className="flex gap-2 mb-4">
                    <select id="empSelect" className={inputStyle}>
                        <option value="">-- Ajouter un employé --</option>
                        {mockEmployees.map(e => (
                            <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>
                        ))}
                    </select>
                    <button 
                        onClick={() => {
                            const select = document.getElementById('empSelect') as HTMLSelectElement;
                            if(select.value) addEmployee(select.value);
                        }}
                        className={gradientBtn}
                    >Ajouter</button>
                </div>

                {siteEmployees.map((siteEmp, idx) => {
                    const empData = mockEmployees.find(e => e.id === siteEmp.id);
                    return (
                        <div key={idx} className="flex justify-between items-center bg-[#101728] p-3 rounded mb-2 border border-gray-700">
                            <div>
                                <p className="font-bold">{empData?.firstName} {empData?.lastName}</p>
                                <p className="text-xs text-gray-500">{empData?.phone}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-xs text-gray-400">Salaire/Avance:</label>
                                <input 
                                    type="number" 
                                    className={`${inputStyle} w-32`} 
                                    value={siteEmp.salary === 0 ? '' : siteEmp.salary}
                                    onChange={(e) => updateSalary(idx, Number(e.target.value))}
                                />
                                <span className="text-sm">Ar</span>
                                <button onClick={() => {
                                    const start = [...siteEmployees];
                                    start.splice(idx, 1);
                                    setSiteEmployees(start);
                                }} className={btnRed}><FaTrash /></button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className={cardStyle}>
                    <h2 className={sectionTitle}><FaCamera /> Photos du site</h2>
                    <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#208060]/20 file:text-[#409090] hover:file:bg-[#208060]/30"/>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {photos.map((f, i) => (
                            <span key={i} className="text-xs bg-gray-700 px-2 py-1 rounded text-white">{f.name}</span>
                        ))}
                    </div>
                </div>
                <div className={cardStyle}>
                    <h2 className={sectionTitle}><FaFilePdf /> Fichiers & Scans</h2>
                    <input type="file" multiple accept=".pdf,.doc" onChange={handleFileUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#208060]/20 file:text-[#409090] hover:file:bg-[#208060]/30"/>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {files.map((f, i) => (
                            <span key={i} className="text-xs bg-gray-700 px-2 py-1 rounded text-white">{f.name}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- FOOTER TOTAL --- */}
            <div className="fixed bottom-0 left-0 lg:left-0 w-full bg-[#101728] border-t border-[#208060] p-4 shadow-2xl z-40">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pl-0 lg:pl-64"> 
                    {/* Note: pl-64 compense la sidebar sur desktop si nécessaire, ou ajuster selon layout */}
                    
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-sm">TOTAL DÉPENSES DU SITE</span>
                        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#208060] to-[#409090]">
                            {totalExpense.toLocaleString()} Ar
                        </span>
                    </div>

                    <button className="bg-gradient-to-r from-[#A02020] to-red-800 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:scale-105 transition flex items-center gap-2">
                        <FaSave /> ENREGISTRER LE SITE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sites;