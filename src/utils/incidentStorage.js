const INCIDENTS_KEY = "entnt_incidents";

export const loadIncidents = () => {
    const data = localStorage.getItem(INCIDENTS_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveIncidents = (data) => {
    localStorage.setItem(INCIDENTS_KEY, JSON.stringify(data));
};
