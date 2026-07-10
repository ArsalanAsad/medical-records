
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/PageHeader";
import { useToast } from "../context/ToastContext";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);

  const getInitialFormData = () => ({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bloodGroup: user?.bloodGroup || "",
    gender: user?.gender || "",
    address: user?.address || "",
  });

  const [formData, setFormData] = useState(getInitialFormData);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData(getInitialFormData());
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData(getInitialFormData());
    setError("");
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = updateProfile(formData);

    if (!result?.success) {
      setError(result?.message || "Unable to update profile.");
      return;
    }

    showToast("Profile updated successfully.", "success");
    setIsEditing(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="My Profile"
          subtitle="Manage your personal account information and saved profile details."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-700">
                {formData.name?.trim()
                  ? formData.name.trim().charAt(0).toUpperCase()
                  : "U"}
              </div>

              <h2 className="mt-4 text-xl font-semibold text-slate-800">
                {formData.name || "User"}
              </h2>

              <p className="mt-1 break-all text-sm text-slate-500">
                {formData.email || "No email available"}
              </p>

              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-5 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Phone
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {formData.phone || "Not added"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Blood Group
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {formData.bloodGroup || "Not added"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Gender
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {formData.gender || "Not added"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Address
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {formData.address || "Not added"}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">
                  Profile Information
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {isEditing
                    ? "Update your personal details below."
                    : "Your saved account and profile information."}
                </p>
              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-100"
                >
                  Edit Details
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g. 0300 1234567"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Enter your address"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              {isEditing && (
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-lg border border-slate-300 px-6 py-3 text-slate-700 transition hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;