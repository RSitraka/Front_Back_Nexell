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
    username: string;
    email?: string;
    password: string;
    confirmPassword?: string;
    totpCode?: string;
  }

  const { login, register } = useAuth();

  const [formData, setFormData] = useState<LoginData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    totpCode: ""
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const [isSamePassword, setIsSamePassword] = useState<boolean>(true);

  const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 8) {
      return { isValid: false, message: "Le mot de passe doit avoir au moins 6 caractères" };
    }
    return { isValid: true, message: "" };
  };

  useEffect(() => {
    if (isLogin) {
      if (formData.username !== "" && formData.password !== "") {
        setCanSubmit(true);
      } else {
        setCanSubmit(false);
      }
    } else {
      if (
        formData.username !== "" &&
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
      if (!isLogin) {
        const { isValid, message } = validatePassword(formData.password);
        if (!isValid) {
          toast.error(message);
          setIsLoading(false);
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email!) || (formData.email && formData.email.length > 254)) {
          toast.error("Invalid email");
          setIsLoading(false);
          return ;
        }
        if (!/^[a-z0-9]+$/i.test(formData.username)) {
          toast.error("Invalid username: should contain only digits and letters");
          setIsLoading(false);
          return;
        }
        if (formData.username.length < 3 || formData.username.length > 16) {
          toast.error("Invalid username: shoud be between 3-16 characters");
          setIsLoading(false);
          return;
        }
        try {
          if (!isLogin) {
            const result = await register(formData.username, formData.password, formData.email!);

            if (result.success) {
              setFormData({
                username: "",
                password: "",
                email: "",
                confirmPassword: "",
                totpCode: ""
              });
              navigate("/");
              toast.success("User created!");
            } else {
              toast.error("Email or Username already in use. Please try again.");
            }
            return;
          }
        }
        catch (error) {
          toast.error("Registration failed");
          setIsLoading(false);
          return;
        }
      }
      const { success } = await login(formData.username, formData.password, formData.totpCode);

      await new Promise((resolve) => setTimeout(resolve, 800));

      if (success) {
        setFormData({
          username: "",
          password: "",
          email: "",
          confirmPassword: "",
          totpCode: ""
        });
        navigate("/");
        toast.success("Successfully logged in !");
      }
      else {
        toast.error("Username, Password or 2FA code incorrect. Please try again.");
      }
    }
    catch (error) {
      toast.error("Authentication failed");
    }
    finally {
      setIsLoading(false);
    }
  };

  const disablesStyle = !canSubmit ? "opacity-70 cursor-not-allowed" : "";

  return (
    <>
      <div
        className="min-h-screen w-full flex items-center justify-center 
    bg-[url('/images/bg.jpg')] bg-center bg-fixed bg-no-repeat
    bg-cover object-cover"
      >
        <div className="dark:bg-zinc-900/70 p-8 rounded-2xl shadow-xl w-96">
          <h2 className="text-2xl font-bold text-center text-amber-50 mb-6">
            {isLogin ? "Sign in" : "Create Account"}
          </h2>
          <form onSubmit={handleSubmit} className="text-gray-300 dark:text-gray-200">
            <input
              id="login-email"
              placeholder="login/email"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-400"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {!isLogin && (
              <input
                id="mail"
                type="Email"
                name="email"
                placeholder="Email"
                className="w-full mb-2  px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={formData.email}
              />
            )}
            {!isLogin && (
              <small className="text-gray-500">{formData.password.length < 8 && "Please choose a stronger password"}</small>
            )}
            <input
              id="pass"
              placeholder="password"
              className="w-full mb-6 px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-400"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {!isLogin && (
              <>
                {!isSamePassword && <small className="text-red-700">Password not identical</small>}
                <input
                  id="same-password"
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  className="w-full mb-6 px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-400"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                />
              </>
            )}

            <button
              type="submit"
              className={`cursor-pointer w-full bg-linear-to-r from-sky-300 to-cyan-400 text-white py-2 rounded shadow hover:bg-blue-700 transition ${disablesStyle}`}
              onClick={handleSubmit}
              disabled={canSubmit ? false : true}
            >
              {isLogin ? "Sign in" : "Register"}
              {isLoading && <ImSpinner9 className="animate-spin inline ml-2" />}
            </button>
            {!isLogin &&
              <p
                className="underline text-gray-500 text-right mt-2 cursor-pointer hover:text-gray-700"
                onClick={() => navigate('/login')}
              >Back</p>}
          </form>
          {isLogin && (
            <>
              <div></div>
              <div className="mt-6 text-center text-gray-300">
                <p className="mt-4">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-400 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}