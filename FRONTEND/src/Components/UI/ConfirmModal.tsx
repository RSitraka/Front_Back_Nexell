import { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    danger?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal = ({
    isOpen,
    title,
    message,
    confirmLabel = "Confirmer",
    cancelLabel = "Annuler",
    danger = false,
    onConfirm,
    onCancel,
}: ConfirmModalProps) => {
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
            if (e.key === "Enter") onConfirm();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, onCancel, onConfirm]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onCancel}
        >
            <div
                className="bg-[#1a2332] border border-gray-700 rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start gap-4 mb-5">
                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${danger ? "bg-red-900/40" : "bg-[#208060]/20"}`}>
                        <FaExclamationTriangle className={danger ? "text-red-400" : "text-[#208060]"} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{message}</p>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                            danger
                                ? "bg-red-700 hover:bg-red-600 text-white"
                                : "bg-gradient-to-r from-[#208060] to-[#409090] hover:opacity-90 text-white"
                        }`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
