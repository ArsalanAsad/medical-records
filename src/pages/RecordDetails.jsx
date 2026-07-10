
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import recordService from "../services/recordService";
import ConfirmModal from "../components/ConfirmModal";

const RecordDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const record = recordService.getById(id);

  const handleDelete = () => {
    recordService.remove(id);
    setShowModal(false);
    navigate("/reports");
  };

  if (!record) {
    return (
      <MainLayout>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-600">Record not found.</p>
        </div>
      </MainLayout>
    );
  }

  const isImage = record.fileType?.startsWith("image/");
  const isPdf = record.fileType === "application/pdf";

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {record.title}
            </h1>
            <p className="mt-2 text-slate-500">{record.type}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={`/reports/${record.id}/edit`}
              className="rounded-lg bg-amber-500 px-4 py-2 text-white transition hover:bg-amber-600"
            >
              Edit
            </Link>

            <button
              onClick={() => setShowModal(true)}
              className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Hospital</p>
            <p className="mt-1 font-medium text-slate-800">
              {record.hospital}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Doctor</p>
            <p className="mt-1 font-medium text-slate-800">{record.doctor}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Record Date</p>
            <p className="mt-1 font-medium text-slate-800">
              {record.recordDate}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">File Name</p>
            <p className="mt-1 font-medium text-slate-800">
              {record.fileName || "No file attached"}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-slate-500">Notes</p>
            <p className="mt-1 text-slate-700">
              {record.notes || "No notes added."}
            </p>
          </div>
        </div>

        {record.fileData ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex flex-wrap gap-3">
              <a
                href={record.fileData}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Open File
              </a>

              <a
                href={record.fileData}
                download={record.fileName || "medical-record"}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
              >
                Download File
              </a>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {isPdf ? "PDF Document" : isImage ? "Image File" : "Attached File"}
              </span>

              {record.fileName && (
                <span className="break-all text-sm text-slate-500">
                  {record.fileName}
                </span>
              )}
            </div>

            {isImage && (
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2">
                <img
                  src={record.fileData}
                  alt={record.title}
                  className="max-h-[600px] w-full rounded-lg object-contain"
                />
              </div>
            )}

            {isPdf && (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <iframe
                  src={record.fileData}
                  title={record.title}
                  className="h-[700px] w-full bg-white"
                />
              </div>
            )}

            {!isImage && !isPdf && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
                <p className="text-slate-600">
                  Preview is not available for this file type, but you can still
                  open or download it.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <h3 className="text-lg font-semibold text-slate-800">
                No file attached
              </h3>
              <p className="mt-2 text-slate-500">
                This medical record does not have any uploaded file yet.
              </p>
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={showModal}
          title="Delete Record"
          message="This record will be permanently deleted."
          confirmText="Delete"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      </div>
    </MainLayout>
  );
};

export default RecordDetails;
