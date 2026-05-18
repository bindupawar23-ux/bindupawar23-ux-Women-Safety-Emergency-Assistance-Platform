import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function VolunteerLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/volunteers/login", form);


      localStorage.setItem("volunteerToken", res.data.token);
localStorage.setItem("volunteerId", res.data.volunteer._id); // ✅ ADD THIS
      alert("Login successful");
      navigate("/volunteer/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>Volunteer Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <br /><br />

      <button>Login</button>
    </form>
  );
}