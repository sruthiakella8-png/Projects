import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative w-full max-w-md">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}