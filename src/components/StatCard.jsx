const StatCard = ({ label, value, helper }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
      <p className="text-slate-500 text-sm">{label}</p>
      <h3 className="text-3xl font-bold text-slate-800 mt-2">{value}</h3>
      {helper && <p className="text-xs text-slate-400 mt-2">{helper}</p>}
    </div>
  );
};

export default StatCard;