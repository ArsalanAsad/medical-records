import { useEffect, useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SearchBar from "../components/SearchBar";
import ReportCard from "../components/ReportCard";
import FilterChips from "../components/FilterChips";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";
import { seedDemoRecords } from "../services/localStorage";
import recordService from "../services/recordService";
import { useToast } from "../context/ToastContext";
import ConfirmModal from "../components/ConfirmModal"

const filterOptions = [
  "All",
  "Lab Report",
  "Radiology",
  "Prescription",
  "Discharge Summary",
  "Vaccination",
  "Other",
];

const Reports = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    seedDemoRecords(user.email);
    setRecords(recordService.getByUser(user.email));
  }, [user]);

  const handleDelete = () => {
  recordService.remove(selectedRecordId);

  setRecords(recordService.getByUser(user.email));

  setShowModal(false);
  setSelectedRecordId(null);

  showToast("Record deleted successfully.", "success");
};

  const filteredRecords = useMemo(() => {
    let filtered = [...records];

    if (activeFilter !== "All") {
      filtered = filtered.filter((record) => record.type === activeFilter);
    }

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();

      filtered = filtered.filter((record) => {
        return (
          record.title.toLowerCase().includes(query) ||
          record.type.toLowerCase().includes(query) ||
          record.hospital.toLowerCase().includes(query) ||
          record.doctor.toLowerCase().includes(query)
        );
      });
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.recordDate);
      const dateB = new Date(b.recordDate);

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [records, searchTerm, sortOrder, activeFilter]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Medical Reports"
          subtitle="Search, filter, sort, edit, and manage all your uploaded medical records."
        />

        <FilterChips
          options={filterOptions}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <ConfirmModal
          isOpen={showModal}
          title="Delete Record"
          message="This record will be permanently deleted."
          confirmText="Delete"
          onConfirm={handleDelete}
          onCancel={() => {
          setShowModal(false);
          setSelectedRecordId(null);
        }}
/>

        {filteredRecords.length > 0 ? (
          <div className="grid gap-4">
            {filteredRecords.map((record) => (
              <ReportCard
                key={record.id}
                record={record}
                onDelete={(id) => {
               setSelectedRecordId(id);
                setShowModal(true);
              }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center">
            <p className="text-slate-500 text-lg">No records match your filters.</p>
            <p className="text-slate-400 text-sm mt-2">
              Try changing the search term or category.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Reports;