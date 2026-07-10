const RECORDS_KEY = "medivault_records";

export const getAllRecords = () => {
  return JSON.parse(localStorage.getItem(RECORDS_KEY)) || [];
};

export const saveAllRecords = (records) => {
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
};

export const getUserRecords = (userEmail) => {
  const allRecords = getAllRecords();
  return allRecords.filter((record) => record.userEmail === userEmail);
};

export const getRecordById = (id) => {
  const allRecords = getAllRecords();
  return allRecords.find((record) => String(record.id) === String(id));
};

export const addRecord = (record) => {
  const allRecords = getAllRecords();
  const updatedRecords = [record, ...allRecords];
  saveAllRecords(updatedRecords);
};

export const updateRecord = (updatedRecord) => {
  const allRecords = getAllRecords();

  const updatedRecords = allRecords.map((record) =>
    String(record.id) === String(updatedRecord.id) ? updatedRecord : record
  );

  saveAllRecords(updatedRecords);
};

export const deleteRecord = (id) => {
  const allRecords = getAllRecords();
  const updatedRecords = allRecords.filter(
    (record) => String(record.id) !== String(id)
  );
  saveAllRecords(updatedRecords);
};

export const seedDemoRecords = (userEmail) => {
  const allRecords = getAllRecords();
  const existing = allRecords.some((r) => r.userEmail === userEmail);

  if (existing) return;

  const demoRecords = [
    {
      id: Date.now() + 1,
      title: "Blood Test Report",
      type: "Lab Report",
      hospital: "City Diagnostic Center",
      doctor: "Dr. Ahmed",
      recordDate: "2024-12-10",
      notes: "Routine annual blood screening.",
      fileName: "blood-test.pdf",
      fileData: "",
      fileType: "application/pdf",
      userEmail,
      createdAt: new Date().toISOString(),
    },
    {
      id: Date.now() + 2,
      title: "Chest X-Ray",
      type: "Radiology",
      hospital: "National Hospital",
      doctor: "Dr. Khan",
      recordDate: "2025-01-15",
      notes: "X-ray for persistent cough evaluation.",
      fileName: "xray-report.jpg",
      fileData: "",
      fileType: "image/jpeg",
      userEmail,
      createdAt: new Date().toISOString(),
    },
  ];

  saveAllRecords([...demoRecords, ...allRecords]);
};