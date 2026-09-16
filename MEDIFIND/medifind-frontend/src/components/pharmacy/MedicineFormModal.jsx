import { useState, useEffect } from "react";
import { addMedicine, updateMedicine } from "../../services/pharmacyService";

export default function MedicineFormModal({ medicine, onClose, onSaved }) {
  const isEdit = Boolean(medicine);

  const [form, setForm] = useState({
    medicine_name: "",
    generic_name: "",
    category: "",
    manufacturer: "",
    description: "",
    price: "",
    stock_quantity: "",
    expiry_date: "",
    prescription_required: false,
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      setForm({
        medicine_name: medicine.medicine_name || "",
        generic_name: medicine.generic_name || "",
        category: medicine.category || "",
        manufacturer: medicine.manufacturer || "",
        description: medicine.description || "",
        price: medicine.price || "",
        stock_quantity: medicine.stock_quantity || "",
        expiry_date: medicine.expiry_date || "",
        prescription_required: medicine.prescription_required || false,
        image: null, // only replace if user picks a new file
      });
    }
  }, [medicine]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }));
    } else if (type === "file") {
      setForm((f) => ({ ...f, [name]: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        payload.append(key, value);
      }
    });

    try {
      if (isEdit) {
        await updateMedicine(medicine.id, payload);
      } else {
        await addMedicine(payload);
      }
      onSaved(); // tells parent to refresh the list
      onClose();
    } catch (err) {
      setError(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">
          {isEdit ? "Edit Medicine" : "Add Medicine"}
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3 break-words">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="medicine_name"
            value={form.medicine_name}
            onChange={handleChange}
            placeholder="Medicine name"
            required
            className="w-full border rounded p-2"
          />
          <input
            name="generic_name"
            value={form.generic_name}
            onChange={handleChange}
            placeholder="Generic name"
            className="w-full border rounded p-2"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border rounded p-2"
          />
          <input
            name="manufacturer"
            value={form.manufacturer}
            onChange={handleChange}
            placeholder="Manufacturer"
            className="w-full border rounded p-2"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded p-2"
          />
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full border rounded p-2"
          />
          <input
            type="number"
            name="stock_quantity"
            value={form.stock_quantity}
            onChange={handleChange}
            placeholder="Stock quantity"
            className="w-full border rounded p-2"
          />
          <input
            type="date"
            name="expiry_date"
            value={form.expiry_date}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="prescription_required"
              checked={form.prescription_required}
              onChange={handleChange}
            />
            Prescription required
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}