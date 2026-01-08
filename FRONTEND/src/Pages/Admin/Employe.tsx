import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaTrash, FaIdCard, FaFileAlt, FaPhone, FaMapMarkerAlt, FaTimes, FaEdit, FaUserEdit, FaPlus, FaSave } from 'react-icons/fa';
import type { Employee } from '../../Utils/interface';

const mockEmployees: Employee[] = [
	{ id: '1', firstName: 'Jean', lastName: 'Rakoto', phone: '034 00 000 00', address: 'Antananarivo', cinScan: null, certificates: [] },
	{ id: '2', firstName: 'Paul', lastName: 'Andriama', phone: '032 00 000 00', address: 'Fianarantsoa', cinScan: null, certificates: [] },
];

const Employes = () => {
	const [employees, setEmployees] = useState<Employee[]>(mockEmployees);

	const [editingId, setEditingId] = useState<string | null>(null);

	const [formData, setFormData] = useState<Partial<Employee>>({
		firstName: '', lastName: '', address: '', phone: ''
	});
	const [cinFile, setCinFile] = useState<File | null>(null);
	const [certificates, setCertificates] = useState<File[]>([]);

	const [cinPreview, setCinPreview] = useState<string | null>(null);

	const inputStyle = "w-full bg-[#101728] border border-gray-600 rounded p-2 text-white focus:border-[#208060] focus:outline-none mb-3 transition-colors";
	const labelStyle = "block text-gray-400 text-sm mb-1";
	const cardStyle = "bg-[#1a2332] p-5 rounded-xl shadow-lg border-l-4 border-[#208060] relative group transition-all hover:bg-[#1f2a3d] hover:shadow-cyan-900/20";

	useEffect(() => {
		if (cinFile) {
			const objectUrl = URL.createObjectURL(cinFile);
			setCinPreview(objectUrl);
			return () => URL.revokeObjectURL(objectUrl);
		} else {
			setCinPreview(null);
		}
	}, [cinFile]);


	const handleAddCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setCertificates([...certificates, e.target.files[0]]);
		}
	};

	const removeCertificate = (index: number) => {
		const updated = [...certificates];
		updated.splice(index, 1);
		setCertificates(updated);
	};

	const handleEdit = (emp: Employee) => {
		setEditingId(emp.id);
		setFormData({
			firstName: emp.firstName,
			lastName: emp.lastName,
			address: emp.address,
			phone: emp.phone
		});
		setCinFile(emp.cinScan || null);
		setCertificates(emp.certificates || []);

		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleCancelEdit = () => {
		setEditingId(null);
		resetForm();
	};

	const resetForm = () => {
		setFormData({ firstName: '', lastName: '', address: '', phone: '' });
		setCinFile(null);
		setCertificates([]);
		setCinPreview(null);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (editingId) {
			setEmployees(prev => prev.map(emp => {
				if (emp.id === editingId) {
					return {
						...emp,
						firstName: formData.firstName || '',
						lastName: formData.lastName || '',
						address: formData.address || '',
						phone: formData.phone || '',
						cinScan: cinFile,
						certificates: certificates
					};
				}
				return emp;
			}));
			setEditingId(null);
		} else {
			const newEmployee: Employee = {
				id: Date.now().toString(),
				firstName: formData.firstName || '',
				lastName: formData.lastName || '',
				address: formData.address || '',
				phone: formData.phone || '',
				cinScan: cinFile,
				certificates: certificates
			};
			setEmployees([...employees, newEmployee]);
		}

		resetForm();
	};

	const handleDelete = (id: string) => {
		if (window.confirm("Voulez-vous vraiment supprimer cet employé ?")) {
			setEmployees(employees.filter(e => e.id !== id));
			if (editingId === id) handleCancelEdit();
		}
	};

	return (
		<div className="max-w-6xl mx-auto pb-10 text-white">
			<h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-4">
				Gestion des Employés
			</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-1">
					<div className={`bg-[#1a2332] p-6 rounded-xl shadow-xl sticky top-6 border border-gray-700 transition-colors duration-300 ${editingId ? 'border-[#6090A0]' : ''}`}>

						<h2 className="text-xl font-bold mb-4 flex items-center gap-2">
							{editingId ? <FaEdit className="text-amber-400" /> : <FaPlus className="text-[#208060]" />}
							{editingId ? "Modifier l'employé" : 'Ajouter un nouvel employé'}
						</h2>

						<form onSubmit={handleSubmit}>
							<div>
								<label className={labelStyle}>Nom</label>
								<input type="text" required className={inputStyle} value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
							</div>
							<div>
								<label className={labelStyle}>Prénom</label>
								<input type="text" required className={inputStyle} value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
							</div>
							<div>
								<label className={labelStyle}>Adresse</label>
								<input type="text" className={inputStyle} value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
							</div>
							<div>
								<label className={labelStyle}>Téléphone</label>
								<input type="text" required className={inputStyle} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
							</div>

							<div className="mb-4 bg-[#101728] p-3 rounded border border-dashed border-gray-600">
								<label className={`${labelStyle} flex justify-between`}>
									<span>Scan CIN / Photo</span>
									{cinFile && <span className="text-xs text-[#208060]">Modifié</span>}
								</label>

								{cinPreview ? (
									<div className="mb-3 relative group">
										<img
											src={cinPreview}
											alt="Aperçu CIN"
											className="w-full h-32 object-cover rounded border border-[#6090A0]/50"
										/>
										<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
											<p className="text-xs text-white font-bold">Changer l'image ci-dessous</p>
										</div>
									</div>
								) : (
									<div className="h-20 flex items-center justify-center bg-[#1a2332] rounded mb-2 text-gray-600 text-xs">
										Aucun aperçu
									</div>
								)}

								<input
									type="file"
									accept="image/*"
									onChange={e => setCinFile(e.target.files ? e.target.files[0] : null)}
									className="block w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#208060]/20 file:text-[#409090] hover:file:bg-[#208060]/30 cursor-pointer"
								/>
							</div>

							<div className="mb-4">
								<label className={labelStyle}>Certificats</label>
								<div className="flex gap-2 items-center mb-2">
									<input id="certInput" type="file" className="hidden" onChange={handleAddCertificate} />
									<label htmlFor="certInput" className="cursor-pointer bg-[#101728] border border-dashed border-gray-500 text-gray-400 text-xs px-3 py-2 rounded hover:border-[#208060] transition w-full text-center">
										+ Ajouter un certificat
									</label>
								</div>
								<div className="space-y-1">
									{certificates.map((file, idx) => (
										<div key={idx} className="flex justify-between items-center bg-[#101728] px-2 py-1 rounded text-xs">
											<span className="truncate max-w-[150px]">{file.name}</span>
											<button type="button" onClick={() => removeCertificate(idx)} className="text-[#A02020] hover:text-red-400"><FaTimes /></button>
										</div>
									))}
								</div>
							</div>
							<div className="flex gap-2">
								<button type="submit" className={`flex-1 py-2 px-4 rounded font-bold shadow-lg 
														transition flex justify-center items-center gap-2 ${editingId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gradient-to-r from-[#208060] to-[#6090A0] hover:opacity-90'}`}>
									{editingId ? <><FaSave /> Mettre à jour</> : <><FaPlus /> Ajouter</>}
								</button>
								{editingId && (
									<button type="button" onClick={handleCancelEdit} className="bg-gray-600 hover:bg-gray-700 px-3 rounded text-white">
										<FaTimes />
									</button>
								)}
							</div>
						</form>
					</div>
				</div>

				<div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min">
					{employees.map((emp) => (
						<div key={emp.id} className={`${cardStyle} ${editingId === emp.id ? 'ring-2 ring-amber-400 scale-[1.02]' : ''}`}>
							<div className="flex justify-between items-start">
								<div>
									<h3 className="text-xl font-bold text-white">{emp.lastName} {emp.firstName}</h3>
									<p className="text-[#409090] text-sm flex items-center gap-2 mt-1">
										<FaPhone className="text-xs" /> {emp.phone}
									</p>
									<p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
										<FaMapMarkerAlt className="text-xs" /> {emp.address || 'Non renseigné'}
									</p>
								</div>

								<div className="flex gap-2">
									<button
										onClick={() => handleEdit(emp)}
										className="text-[#6090A0] hover:text-white transition"
										title="Modifier"
									>
										<FaEdit />
									</button>
									<button
										onClick={() => handleDelete(emp.id)}
										className="bg-[#101728] p-2 rounded-full text-[#A02020] hover:bg-red-900/20 transition"
										title="Supprimer"
									>
										<FaTrash />
									</button>
								</div>
							</div>

							<div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-2 gap-2 text-xs">
								<div className="bg-[#101728] p-2 rounded flex items-center gap-2 text-gray-300">
									<FaIdCard className={`${emp.cinScan ? 'text-[#208060]' : 'text-gray-600'}`} />
									{emp.cinScan ? 'CIN Scanné' : 'Pas de CIN'}
								</div>
								<div className="bg-[#101728] p-2 rounded flex items-center gap-2 text-gray-300">
									<FaFileAlt className="text-[#6090A0]" />
									{emp.certificates ? emp.certificates.length : 0} Certificat(s)
								</div>
							</div>
						</div>
					))}

					{employees.length === 0 && (
						<div className="col-span-2 text-center text-gray-500 py-10 bg-[#1a2332] rounded-xl border border-dashed border-gray-700">
							Aucun employé enregistré pour le moment.
						</div>
					)}
				</div>

			</div>
		</div>
	);
};

export default Employes;