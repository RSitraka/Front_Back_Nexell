import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./Providers/AuthProvider";
import ProtectedRoutes from "./Providers/ProtectedRoute";
import { SitesProvider } from "./Providers/SitesProvider";
import { MatériauxProviders } from "./Providers/MatériauxProviders";
import { EmployeeProviders } from "./Providers/EmployeProviders";
import { PageLoader } from "./Components/UI/Skeleton";

const Dashboard = lazy(() => import("./Pages/Default/Dashboard"));
const Accueil = lazy(() => import("./Pages/Default/Accueil"));
const Sites = lazy(() => import("./Pages/Default/Sites"));
const Employes = lazy(() => import("./Pages/Default/Employe"));
const Materiaux = lazy(() => import("./Pages/Default/Materiaux"));
const Stats = lazy(() => import("./Pages/Default/Stats"));
const Login = lazy(() => import("./Pages/Login"));

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen text-white bg-[#0d1626]">
    <h1 className="text-8xl font-bold mb-4 text-[#208060]">404</h1>
    <p className="text-2xl font-semibold mb-2">Page introuvable</p>
    <p className="text-gray-400">La page que vous cherchez n'existe pas.</p>
  </div>
);

function App() {
  return (
    <>
      <AuthProvider>
        <SitesProvider>
          <MatériauxProviders>
            <EmployeeProviders>
              <Router>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Login />} />
                    <Route
                      path="/"
                      element={
                        <ProtectedRoutes>
                          <Dashboard />
                        </ProtectedRoutes>
                      }>
                      <Route index element={<Accueil />} />
                      <Route path='sites' element={<Sites />} />
                      <Route path='employe' element={<Employes />} />
                      <Route path='materiaux' element={<Materiaux />} />
                      <Route path='dashboard' element={<Stats />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Router>
            </EmployeeProviders>
          </MatériauxProviders>
        </SitesProvider>
      </AuthProvider>
    </>
  );
}

export default App
