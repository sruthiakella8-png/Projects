export default function MedicineTable({ medicines, onEdit, onDelete }) {
  if (medicines.length === 0) {
    return <p className="text-gray-500 mt-4">No medicines added yet.</p>;
  }

  return (
    <table className="w-full mt-4 border-collapse">
      <thead>
        <tr className="text-left border-b bg-gray-50">
          <th className="p-2">Name</th>
          <th className="p-2">Category</th>
          <th className="p-2">Price</th>
          <th className="p-2">Stock</th>
          <th className="p-2">Expiry</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {medicines.map((med) => (
          <tr key={med.id} className="border-b hover:bg-gray-50">
            <td className="p-2">{med.medicine_name}</td>
            <td className="p-2">{med.category || "—"}</td>
            <td className="p-2">₹{med.price}</td>
            <td className="p-2">{med.stock_quantity}</td>
            <td className="p-2">{med.expiry_date || "—"}</td>
            <td className="p-2 space-x-2">
              <button
                onClick={() => onEdit(med)}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(med.id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}