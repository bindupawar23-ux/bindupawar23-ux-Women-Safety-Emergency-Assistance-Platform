import { NavLink, useNavigate,Link } from "react-router-dom";
import "./index.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <h2 className="logo">🛡 Women Safety</h2>

      {/* Links */}
      <div className="nav-links">
        {!token ? (
          <>
            <NavLink to="/" className="nav-link">
              Login
            </NavLink>

            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>

            <NavLink to="/sos" className="nav-link">
              SOS
            </NavLink>
             <Link to="/support">Support Dashboard</Link>

            <NavLink to="/map" className="nav-link">
              Map
            </NavLink>

            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
             <Link to="/volunteer/dashboard">Volunteer</Link> {/* ✅ ADD THIS */}

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}