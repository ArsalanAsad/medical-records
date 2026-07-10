const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-slate-500 mt-2">{subtitle}</p>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;