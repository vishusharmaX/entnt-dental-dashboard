import { useState } from "react";

const PatientForm = ({ patient = {}, onSave, onCancel }) => {
  const [name, setName] = useState(patient.name || "");
  const [dob, setDob] = useState(patient.dob || "");
  const [contact, setContact] = useState(patient.contact || "");
  const [healthInfo, setHealthInfo] = useState(patient.healthInfo || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !dob || !contact) return alert("All fields required");
    onSave({ ...patient, name, dob, contact, healthInfo });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold">
          {patient.id ? "Edit" : "Add"} Patient
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact Number"
          className="w-full border p-2 rounded"
        />
        <textarea
          value={healthInfo}
          onChange={(e) => setHealthInfo(e.target.value)}
          placeholder="Health Info"
          className="w-full border p-2 rounded"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {patient.id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
