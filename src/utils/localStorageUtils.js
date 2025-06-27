const PATIENTS_KEY = "entnt_patients";

export const loadPatients = () => {
    const data = localStorage.getItem(PATIENTS_KEY);
    return data ? JSON.parse(data) : [];
};

export const savePatients = (data) => {
    localStorage.setItem(PATIENTS_KEY, JSON.stringify(data));
};
