import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

import { Link, useLocation } from 'react-router-dom';
import { ImSpinner9 } from "react-icons/im";
import { toast } from "react-toastify";

export default function Login() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const navigate = useNavigate();

  interface LoginData {
    name: string;
    prenom: string;
    numeroTelephone: string;
    adresse: string;
    nationalite: string;
    email: string;
    password: string;
    confirmPassword?: string;
    totpCode?: string;
  }

  const { login, register } = useAuth();

  const [formData, setFormData] = useState<LoginData>({
    name: "",
    prenom: "",
    numeroTelephone: "",
    adresse: "",
    nationalite: "",
    email: "",
    password: "",
    confirmPassword: "",
    totpCode: ""
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const [isSamePassword, setIsSamePassword] = useState<boolean>(true);

  const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 6) {
      return { isValid: false, message: "Le mot de passe doit avoir au moins 6 caractères" };
    }
    return { isValid: true, message: "" };
  };

  useEffect(() => {
    if (isLogin) {
      if (formData.email !== "" && formData.password !== "") {
        setCanSubmit(true);
      } else {
        setCanSubmit(false);
      }
    } else {
      if (
        formData.name !== "" &&
        formData.prenom !== "" &&
        formData.numeroTelephone !== "" &&
        formData.adresse !== "" &&
        formData.nationalite !== "" &&
        formData.password !== "" &&
        formData.email !== "" &&
        formData.confirmPassword !== ""
      ) {
        if (isSamePassword && formData.confirmPassword !== "") {
          setCanSubmit(true);
        }
        else {
          setCanSubmit(false);
        }
      } else {
        setCanSubmit(false);
      }
    }
  }, [formData, isLogin, isSamePassword]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (e.target.name === "confirmPassword") {
      setIsSamePassword(value === formData.password);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) || formData.email.length > 254) {
        toast.error("Email invalide");
        setIsLoading(false);
        return;
      }

      if (!isLogin) {
        const { isValid, message } = validatePassword(formData.password);
        if (!isValid) {
          toast.error(message);
          setIsLoading(false);
          return;
        }

        if (formData.name.trim().length < 2) {
          toast.error("Le nom est trop court");
          setIsLoading(false);
          return;
        }

        try {
          const result = await register(
             formData 
          );

          if (result.success) {
            setFormData({
              name: "", prenom: "", numeroTelephone: "", adresse: "", nationalite: "",
              email: "", password: "", confirmPassword: "", totpCode: ""
            });
            navigate("/login");
            toast.success("Utilisateur créé avec succès !");
          } else {
            toast.error("Email déjà utilisé ou erreur serveur.");
          }
          return;
        }
        catch (error) {
          toast.error("Création de compte échouée");
          setIsLoading(false);
          return;
        }
      }

      const { success } = await login(formData.email, formData.password, formData.totpCode);

      await new Promise((resolve) => setTimeout(resolve, 800));

      if (success) {
        setFormData({
          name: "", prenom: "", numeroTelephone: "", adresse: "", nationalite: "",
          email: "", password: "", confirmPassword: "", totpCode: ""
        });
        navigate("/");
        toast.success("Connexion réussie !");
      }
      else {
        toast.error("Email ou mot de passe incorrect.");
      }
    }
    catch (error) {
      toast.error("Erreur d'authentification");
    }
    finally {
      setIsLoading(false);
    }
  };

  const disablesStyle = !canSubmit ? "opacity-70 cursor-not-allowed" : "";
  
  const inputStyle = "w-full mb-4 px-4 py-2 border border-gray-300  \
  rounded shadow-sm focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white \
  placeholder-gray-500";

  return (
    <>
      <div
        className="min-h-screen w-full flex items-center justify-center 
    bg-[url('/images/bg.jpg')] bg-center bg-fixed bg-no-repeat
    bg-cover object-cover py-10" 
      >
        <div className="p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-center text-amber-50 mb-6">
            {isLogin ? "Connexion" : "Créer un compte"}
          </h2>
          <form onSubmit={handleSubmit} className="text-gray-300">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    id="register-name"
                    placeholder="Nom"
                    className={inputStyle}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <input
                    id="register-prenom"
                    placeholder="Prénom"
                    className={inputStyle}
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                  />
                </div>
                <input
                  id="register-adresse"
                  placeholder="Adresse complète"
                  className={inputStyle}
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    id="register-phone"
                    placeholder="Téléphone"
                    className={inputStyle}
                    type="tel"
                    name="numeroTelephone"
                    value={formData.numeroTelephone}
                    onChange={handleChange}
                  />
                  <input
                    id="register-nationalite"
                    placeholder="Nationalité"
                    className={inputStyle}
                    type="text"
                    name="nationalite"
                    value={formData.nationalite}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <input
              id="login-email"
              placeholder="Adresse Email"
              className={inputStyle}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            {!isLogin && (
              <small className="text-gray-400 block mb-1 text-sm">{formData.password.length < 6 && "Min. 6 caractères"}</small>
            )}
            <input
              id="pass"
              placeholder="Mot de passe"
              className={`${inputStyle} mb-6`}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {!isLogin && (
              <>
                {!isSamePassword && <small className="text-red-500 block mb-1 text-sm">Les mots de passe ne correspondent pas</small>}
                <input
                  id="same-password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmer mot de passe"
                  className={`${inputStyle} mb-6`}
                  onChange={handleChange}
                  value={formData.confirmPassword}
                />
              </>
            )}

            <button
              type="submit"
              className={`cursor-pointer w-full bg-gradient-to-r from-sky-400 to-cyan-500 text-white font-semibold py-2 rounded shadow hover:from-sky-500 hover:to-cyan-600 transition ${disablesStyle}`}
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              {isLogin ? "Se Connecter" : "S'inscrire"}
              {isLoading && <ImSpinner9 className="animate-spin inline ml-2" />}
            </button>

            {!isLogin &&
              <p
                className="underline text-gray-400 text-right mt-3 text-sm cursor-pointer hover:text-white transition"
                onClick={() => navigate('/login')}
              >Retour à la connexion</p>}
          </form>

          {isLogin && (
            <div className="mt-6 text-center text-gray-300">
              <p className="mt-4">
                Pas encore de compte ?{" "}
                <Link
                  to="/register"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline font-medium"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}