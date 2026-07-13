import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import recordService from "../services/recordService";
import ReportCard from "../components/ReportCard";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);

 useEffect(() => {
  const fetchRecords = async () => {
    if (!user) return;

    try {
      const data = await recordService.getByUser();

      setRecords(data);

    } catch (error) {
      console.log(
        "Failed to load records:",
        error.message
      );
    }
  };

  fetchRecords();

}, [user]);

  const stats = useMemo(() => {
    return {
      total: records.length,
      labReports: records.filter((r) => r.type === "Lab Report").length,
      radiology: records.filter((r) => r.type === "Radiology").length,
      prescriptions: records.filter((r) => r.type === "Prescription").length,
      latest: records[0]?.recordDate || "No records",
    };
  }, [records]);

  const recentRecords = records.slice(0, 3);

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title={`Welcome back, ${user?.name || "User"}`}
          subtitle="Track, upload, and organize all your medical records from one dashboard."
          action={
            <Link
              to="/upload"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 transition"
            >
              + Upload Record
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          <StatCard label="Total Records" value={stats.total} helper="All saved reports" />
          <StatCard label="Lab Reports" value={stats.labReports} helper="Blood tests, labs" />
          <StatCard label="Radiology" value={stats.radiology} helper="X-rays, scans" />
          <StatCard label="Prescriptions" value={stats.prescriptions} helper="Medicines and dosage" />
          <StatCard label="Latest Record" value={stats.latest} helper="Most recent report date" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Recent Reports</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Your latest uploaded medical records
                  </p>
                </div>

                <Link
                  to="/reports"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  View all
                </Link>
              </div>

              {recentRecords.length > 0 ? (
                <div className="grid gap-4">
                  {recentRecords.map((record) => (
                    <ReportCard
                      key={record.id}
                      record={record}
                      onDelete={() => {}}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                  <p className="text-slate-500">No medical records found yet.</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Quick Summary</h2>
                <p className="text-sm text-slate-500 mt-1">
                  A quick snapshot of your records.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <p className="text-sm text-slate-500">Most common category</p>
                <p className="text-lg font-bold text-slate-800 mt-1">
                  {stats.labReports >= stats.radiology ? "Lab Report" : "Radiology"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <p className="text-sm text-slate-500">Profile Email</p>
                <p className="text-lg font-bold text-slate-800 mt-1 break-all">
                  {user?.email}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <p className="text-sm text-slate-500">Need to add a report?</p>
                <Link
                  to="/upload"
                  className="inline-block mt-3 rounded-lg bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700 transition"
                >
                  Upload Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;