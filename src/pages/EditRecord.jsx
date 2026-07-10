import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import recordService from "../services/recordService";

const EditRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const existingRecord = recordService.getById(id);

  const [formData, setFormData] = useState(
    existingRecord || {
      title: "",
      type: "Lab Report",
      hospital: "",
      doctor: "",
      recordDate: "",
      notes: "",
      fileName: "",
      fileData: "",
      fileType: "",
    }
  );

  if (!existingRecord) {
    return (
      <MainLayout>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-600">Record not found.</p>
        </div>
      </MainLayout>
    );
  }

  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "fileName" && files?.length > 0) {
      const file = files[0];
      const fileData = await convertFileToBase64(file);

      setFormData((prev) => ({
        ...prev,
        fileName: file.name,
        fileType: file.type,
        fileData,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    recordService.update(formData);
    navigate(`/reports/${formData.id}`);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Edit Medical Record</h1>
          <p className="text-slate-500 mt-2">
            Update the details of your saved medical report.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-medium">Report Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Report Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Lab Report</option>
                <option>Radiology</option>
                <option>Prescription</option>
                <option>Discharge Summary</option>
                <option>Vaccination</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Hospital / Lab</label>
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Doctor Name</label>
              <input
                type="text"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Record Date</label>
              <input
                type="date"
                name="recordDate"
                value={formData.recordDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Replace File (optional)</label>
              <input
                type="file"
                name="fileName"
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.fileName && (
                <p className="text-sm text-slate-500 mt-2">
                  Current file: {formData.fileName}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Notes</label>
            <textarea
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
            Update Record
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditRecord;