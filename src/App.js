import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import PatientDashboard from "./pages/patient/Dashboard";
import Overview from "./pages/admin/Overview";
import Patients from "./pages/admin/Patients";
import Appointments from "./pages/admin/Appointments";
import Calendar from "./pages/admin/Calendar";

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to={`/${user.role.toLowerCase()}`} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={user?.role === "Admin" ? <AdminDashboard /> : <Navigate to="/login" />}>
          <Route path="overview" element={<Overview />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="calendar" element={<Calendar />} />
      </Route>
        <Route path="/patient/*" element={user?.role === "Patient" ? <PatientDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
