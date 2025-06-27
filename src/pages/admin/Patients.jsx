import { useEffect, useState } from "react";
import { loadPatients, savePatients } from "../../utils/localStorageUtils";
import { SAMPLE_PATIENTS } from "../../data/patients";
import PatientForm from "../../components/PatientForm";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [editing, setEditing] = useState(null); // null or patient object
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const saved = loadPatients();
    if (saved.length === 0) {
      savePatients(SAMPLE_PATIENTS); // <-- seed localStorage
      setPatients(SAMPLE_PATIENTS);
    } else {
      setPatients(saved);
    }
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (patient) => {
    setEditing(patient);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = patients.filter((p) => p.id !== id);
    setPatients(updated);
    savePatients(updated);
  };

  const handleSave = (patient) => {
    let updated;
    if (editing) {
      updated = patients.map((p) => (p.id === patient.id ? patient : p));
    } else {
      updated = [...patients, { ...patient, id: `p${Date.now()}` }];
    }
    setPatients(updated);
    savePatients(updated);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Patients</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Patient
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm md:text-base w-full bg-white shadow rounded">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">DOB</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Health Info</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.dob}</td>
                <td className="p-2">{p.contact}</td>
                <td className="p-2">{p.healthInfo}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <PatientForm
          patient={editing}
          onCancel={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Patients;
