import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { loadIncidents } from "../../utils/incidentStorage";
import { loadPatients } from "../../utils/localStorageUtils";
import { useNavigate } from "react-router-dom"; // 🔹 Required for redirect after logout

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [patientInfo, setPatientInfo] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allPatients = loadPatients();
    const thisPatient = allPatients.find((p) => p.id === user.patientId);
    setPatientInfo(thisPatient);

    const allIncidents = loadIncidents();
    const personalIncidents = allIncidents.filter(
      (i) => i.patientId === user.patientId
    );
    setIncidents(personalIncidents);
  }, [user.patientId]);

  const now = new Date();
  const upcoming = incidents.filter((i) => new Date(i.appointmentDate) > now);
  const history = incidents.filter((i) => new Date(i.appointmentDate) <= now);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Welcome, {patientInfo?.name}
          </h2>
          <p className="text-gray-600">Here are your appointments:</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      </div>

      {/* Upcoming */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-700">
          Upcoming Appointments
        </h3>
        {upcoming.length === 0 ? (
          <p className="text-gray-500">No upcoming appointments.</p>
        ) : (
          <div className="grid gap-4">
            {upcoming.map((i) => (
              <div key={i.id} className="bg-white p-4 shadow rounded">
                <div className="font-semibold">{i.title}</div>
                <div className="text-sm">{i.description}</div>
                <div className="text-sm text-gray-500">
                  Scheduled on: {new Date(i.appointmentDate).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* History */}
      <section>
        <h3 className="text-xl font-semibold mb-2 text-green-700">
          Treatment History
        </h3>
        {history.length === 0 ? (
          <p className="text-gray-500">No previous treatments.</p>
        ) : (
          <div className="grid gap-4">
            {history.map((i) => (
              <div key={i.id} className="bg-gray-50 p-4 border rounded">
                <div className="font-semibold">{i.title}</div>
                <div className="text-sm">{i.description}</div>
                <div className="text-sm text-gray-600">
                  Comments: {i.comments || "N/A"}
                </div>
                <div className="text-sm text-gray-600">
                  Cost: ₹{i.cost || "N/A"}
                </div>
                <div className="text-sm text-gray-600">
                  Status: {i.status || "Pending"}
                </div>
                <div className="text-sm text-gray-600">
                  Next Visit: {i.nextDate || "N/A"}
                </div>

                {i.files?.length > 0 && (
                  <div className="mt-2">
                    <div className="text-sm font-medium">Files:</div>
                    <ul className="text-blue-600 text-sm underline">
                      {i.files.map((f, index) => (
                        <li key={index}>
                          <a href={f.url} target="_blank" rel="noreferrer">
                            {f.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
