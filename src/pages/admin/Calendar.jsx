import { useEffect, useState } from "react";
import { loadIncidents } from "../../utils/incidentStorage";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [incidents, setIncidents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setIncidents(loadIncidents());
  }, []);

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysInMonth = endOfMonth.getDate();
  const startDay = startOfMonth.getDay(); // Sunday = 0

  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

  const formatDateKey = (d) => new Date(d).toISOString().slice(0, 10); // YYYY-MM-DD

  const dayAppointments = (day) => {
    const dateKey = formatDateKey(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
    return incidents.filter((i) => i.appointmentDate?.slice(0, 10) === dateKey);
  };

  const renderCalendar = () => {
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="bg-gray-100" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dayIncidents = dayAppointments(d);
      days.push(
        <div
          key={d}
          className="p-2 border rounded cursor-pointer hover:bg-blue-100"
          onClick={() =>
            setSelectedDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth(), d)
            )
          }
        >
          <div className="font-bold">{d}</div>
          {dayIncidents.length > 0 && (
            <div className="text-xs text-blue-700 mt-1">
              {dayIncidents.length} appointment
              {dayIncidents.length > 1 ? "s" : ""}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const renderSelectedIncidents = () => {
    if (!selectedDate) return null;

    const dateKey = formatDateKey(selectedDate);
    const list = incidents.filter(
      (i) => i.appointmentDate?.slice(0, 10) === dateKey
    );

    return (
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">
          Appointments on {dateKey}
        </h3>
        {list.length === 0 ? (
          <p>No appointments</p>
        ) : (
          <ul className="space-y-2">
            {list.map((i) => (
              <li key={i.id} className="border p-2 rounded">
                <div className="font-semibold">{i.title}</div>
                <div className="text-sm text-gray-600">{i.description}</div>
                <div className="text-xs text-gray-500">
                  {new Date(i.appointmentDate).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="bg-gray-200 px-3 py-1 rounded">
          &lt;
        </button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={nextMonth} className="bg-gray-200 px-3 py-1 rounded">
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold mb-2 text-blue-800">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>

      {renderSelectedIncidents()}
    </div>
  );
};

export default Calendar;
