import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SOS from "./pages/SOS";
import MapView from "./pages/MapView";
import Admin from "./pages/Admin";
import VolunteerLogin from "./pages/Volunteer/Login";
import VolunteerDashboard from "./pages/Volunteer/Dashboard";
import Support from "./pages/Support";
// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Context
import { AuthProvider } from "./components/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        {/* ✅ Navbar ALWAYS visible */}
        <Navbar />

        <Routes>
          {/* Public Routes */}
          
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
<Route path="/register" element={<Register />} />
         <Route path="/volunteer/login" element={<VolunteerLogin />} />
        <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
            <Route path="/support" element={<Support />} />


          <Route
            path="/sos"
            element={
              <ProtectedRoute>
                <SOS />
              </ProtectedRoute>
            }
          />

          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapView />
              </ProtectedRoute>
            }
          />

         <Route path="/admin" element={<Admin />} />
        
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;