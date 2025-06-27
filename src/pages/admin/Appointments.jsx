import { useEffect, useState } from "react";
import { loadIncidents, saveIncidents } from "../../utils/incidentStorage";
import { loadPatients } from "../../utils/localStorageUtils";
import IncidentForm from "../../components/IncidentForm";

const Appointments = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [filterPatient, setFilterPatient] = useState("all");
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setPatients(loadPatients());
    setIncidents(loadIncidents());
  }, []);

  const filteredIncidents =
    filterPatient === "all"
      ? incidents
      : incidents.filter((i) => i.patientId === filterPatient);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (incident) => {
    setEditing(incident);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = incidents.filter((i) => i.id !== id);
    setIncidents(updated);
    saveIncidents(updated);
  };

  const handleSave = (incident) => {
    let updated;
    if (editing) {
      updated = incidents.map((i) => (i.id === incident.id ? incident : i));
    } else {
      updated = [...incidents, { ...incident, id: `i${Date.now()}` }];
    }
    setIncidents(updated);
    saveIncidents(updated);
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Appointment
        </button>
      </div>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Patient:</label>
        <select
          value={filterPatient}
          onChange={(e) => setFilterPatient(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm md:text-base w-full bg-white rounded shadow">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="p-2">Patient</th>
              <th className="p-2">Title</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncidents.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="p-2">
                  {patients.find((p) => p.id === i.patientId)?.name ||
                    "Unknown"}
                </td>
                <td className="p-2">{i.title}</td>
                <td className="p-2">
                  {new Date(i.appointmentDate).toLocaleString()}
                </td>
                <td className="p-2">{i.status || "Pending"}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(i)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredIncidents.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No appointments
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <IncidentForm
          incident={editing}
          patients={patients}
          onCancel={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Appointments;
