export default function Filter({
  label,
  options,
  value,
  onChange,
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="font-medium">{label}</label>

      <select
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}