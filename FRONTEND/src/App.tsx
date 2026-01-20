import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Pages/Default/Dashboard";
import Accueil from "./Pages/Default/Accueil";
import Sites from "./Pages/Default/Sites";
import Employes from "./Pages/Default/Employe";
import Materiaux from "./Pages/Default/Materiaux";
import Stats from "./Pages/Default/Stats";
import Login from "./Pages/Login";
import { AuthProvider } from "./Providers/AuthProvider";
import ProtectedRoutes from "./Providers/ProtectedRoute";
import { Suspense } from "react";
import { SitesProvider } from "./Providers/SitesProvider";
import { MatériauxProviders } from "./Providers/MatériauxProviders";
import { EmployeeProviders } from "./Providers/EmployeProviders";


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-black">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Not Found</p>
    </div>
  );
};


function App() {
  return (
    <>
      <AuthProvider>
        <SitesProvider>
        <MatériauxProviders>
          <EmployeeProviders>
          <Router>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoutes>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Dashboard />
                    </Suspense>
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
          </Router>
          </EmployeeProviders>
          </MatériauxProviders>
        </SitesProvider>
      </AuthProvider>
    </>
  )
}

export default App
