import { Link } from "react-router-dom";

const ReportCard = ({ record, onDelete }) => {
  const hasFile = !!record.fileData;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{record.title}</h3>
          <p className="text-sm text-slate-500 mt-1">{record.type}</p>
        </div>

        <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
          {record.recordDate}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-sm">
        <div>
          <p className="text-slate-500">Hospital</p>
          <p className="font-medium text-slate-800">{record.hospital || "-"}</p>
        </div>

        <div>
          <p className="text-slate-500">Doctor</p>
          <p className="font-medium text-slate-800">{record.doctor || "-"}</p>
        </div>

        <div>
          <p className="text-slate-500">File</p>
          <p className="font-medium text-slate-800">
            {record.fileName || "No file attached"}
          </p>
        </div>

        <div>
          <p className="text-slate-500">Category</p>
          <p className="font-medium text-slate-800">{record.type}</p>
        </div>
      </div>

      {record.notes && (
        <div className="mt-5">
          <p className="text-slate-500 text-sm">Notes</p>
          <p className="text-slate-700 mt-1">{record.notes}</p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to={`/reports/${record.id}`}
          className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm hover:bg-slate-900 transition"
        >
          View Details
        </Link>

        <Link
          to={`/reports/${record.id}/edit`}
          className="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm hover:bg-amber-600 transition"
        >
          Edit
        </Link>

        {hasFile && (
          <a
            href={record.fileData}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
          >
            Open File
          </a>
        )}

        {hasFile && (
          <a
            href={record.fileData}
            download={record.fileName || "medical-record"}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition"
          >
            Download
          </a>
        )}

        <button
          onClick={() => onDelete(record.id)}
          className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReportCard;