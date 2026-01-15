import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Pages/Admin/Dashboard";
import Accueil from "./Pages/Admin/Accueil";
import Sites from "./Pages/Admin/Sites";
import Employes from "./Pages/Admin/Employe";
import Materiaux from "./Pages/Admin/Materiaux";
import Stats from "./Pages/Admin/Stats";
import Login from "./Pages/Login";
import { AuthProvider } from "./Providers/AuthProvider";
import ProtectedRoutes from "./Providers/ProtectedRoute";
import { Suspense } from "react";


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
              <Route path='employé' element={<Employes />} />
              <Route path='matériaux' element={<Materiaux />} />
              <Route path='dashboard' element={<Stats />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
