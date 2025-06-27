import { useState } from "react";

const IncidentForm = ({ incident, patients = [], onSave, onCancel }) => {
  const safeIncident = incident || {};

  const [patientId, setPatientId] = useState(safeIncident.patientId || "");
  const [title, setTitle] = useState(safeIncident.title || "");
  const [description, setDescription] = useState(
    safeIncident.description || ""
  );
  const [appointmentDate, setAppointmentDate] = useState(
    safeIncident.appointmentDate || ""
  );
  const [comments, setComments] = useState(safeIncident.comments || "");
  const [cost, setCost] = useState(safeIncident.cost || "");
  const [status, setStatus] = useState(safeIncident.status || "Pending");
  const [nextDate, setNextDate] = useState(safeIncident.nextDate || "");
  const [files, setFiles] = useState(safeIncident.files || []);
  const [treatment, setTreatment] = useState(safeIncident.treatment || "");

  const handleFileChange = async (e) => {
    const uploaded = Array.from(e.target.files);
    const filePreviews = await Promise.all(uploaded.map(fileToBase64));
    setFiles(filePreviews);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ name: file.name, url: reader.result });
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientId || !title || !appointmentDate) {
      alert("Patient, title, and date are required.");
      return;
    }

    onSave({
      ...safeIncident,
      patientId,
      title,
      description,
      appointmentDate,
      comments,
      cost,
      status,
      nextDate,
      treatment,
      files,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow space-y-4 relative">
        <h2 className="text-xl font-semibold">
          {safeIncident.id ? "Edit" : "Add"} Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />
          <input
            type="datetime-local"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Comments"
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Cost"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            placeholder="Treatment Done"
            className="w-full border p-2 rounded"
          />
          <input
            type="date"
            value={nextDate}
            onChange={(e) => setNextDate(e.target.value)}
            placeholder="Next Appointment"
            className="w-full border p-2 rounded"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full"
          />

          {files.length > 0 && (
            <div className="text-sm text-gray-600">
              <p className="font-medium">Attached files:</p>
              <ul>
                {files.map((f, idx) => (
                  <li key={idx}>{f.name}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;
