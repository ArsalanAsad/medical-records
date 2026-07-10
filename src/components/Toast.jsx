const Toast = ({ message, type = "success" }) => {
  const typeClasses =
    type === "error"
      ? "bg-red-500"
      : type === "warning"
      ? "bg-amber-500"
      : "bg-emerald-600";

  return (
    <div className="fixed top-5 right-5 z-[9999]">
      <div
        className={`text-white px-5 py-3 rounded-xl shadow-lg ${typeClasses} min-w-[250px]`}
      >
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Toast;