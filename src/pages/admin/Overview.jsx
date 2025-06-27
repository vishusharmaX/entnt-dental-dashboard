import { useEffect, useState } from "react";
import { loadPatients } from "../../utils/localStorageUtils";
import { loadIncidents } from "../../utils/incidentStorage";

const Overview = () => {
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    setPatients(loadPatients());
    setIncidents(loadIncidents());
  }, []);

  const now = new Date();

  // ✅ Next 10 upcoming appointments
  const nextAppointments = incidents
    .filter((i) => new Date(i.appointmentDate) > now)
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  // ✅ Revenue
  const revenue = incidents.reduce((sum, i) => sum + (Number(i.cost) || 0), 0);

  // ✅ Status Count
  const statusCount = incidents.reduce((acc, i) => {
    const s = i.status || "Pending";
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  // ✅ Top Patients
  const patientMap = {};
  incidents.forEach((i) => {
    if (i?.patientId)
      patientMap[i.patientId] = (patientMap[i?.patientId] || 0) + 1;
  });

  const topPatients = Object.entries(patientMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, count]) => ({
      name: patients.find((p) => p.id === id)?.name || "Unknown",
      count,
    }));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-600 text-sm">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-700">₹{revenue}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-600 text-sm">Pending Treatments</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {statusCount["Pending"] || 0}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-600 text-sm">Completed Treatments</h3>
          <p className="text-2xl font-bold text-blue-700">
            {statusCount["Completed"] || 0}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-600 text-sm">Upcoming Appointments</h3>
          <p className="text-2xl font-bold text-purple-700">
            {nextAppointments.length}
          </p>
        </div>
      </div>

      {/* Next 10 Appointments */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">
          Next 10 Appointments
        </h3>
        <div className="bg-white rounded shadow p-4 space-y-2">
          {nextAppointments.length === 0 && (
            <p className="text-gray-500">No upcoming appointments.</p>
          )}
          {nextAppointments.map((i) => (
            <div key={i.id} className="border-b pb-2">
              <div className="font-medium">{i.title}</div>
              <div className="text-sm text-gray-600">
                {new Date(i.appointmentDate).toLocaleString()} – Patient:{" "}
                {patients.find((p) => p.id === i.patientId)?.name || "Unknown"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Patients */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-700">
          Top Patients
        </h3>
        <div className="bg-white rounded shadow p-4 space-y-2">
          {topPatients.length === 0 && (
            <p className="text-gray-500">No patient data.</p>
          )}
          {topPatients.map((p, i) => (
            <div key={i} className="border-b pb-1">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-500">
                {p.count} appointments
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
