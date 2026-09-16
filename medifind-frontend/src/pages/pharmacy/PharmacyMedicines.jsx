import { useState, useEffect, useCallback } from "react";
import { getMedicines, deleteMedicine } from "../../services/pharmacyService";
import MedicineTable from "../../components/pharmacy/MedicineTable";
import MedicineFormModal from "../../components/pharmacy/MedicineFormModal";

export default function PharmacyMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [error, setError] = useState(null);

  const fetchMedicines = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMedicines(search);
      setMedicines(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load medicines.");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  const handleAdd = () => {
    setEditingMedicine(null);
    setShowModal(true);
  };

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;
    try {
      await deleteMedicine(id);
      fetchMedicines();
    } catch {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Medicines</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Medicine
        </button>
      </div>

      <input
        placeholder="Search by name, category, manufacturer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 w-full max-w-sm"
      />

      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {!loading && !error && (
        <MedicineTable
          medicines={medicines}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showModal && (
        <MedicineFormModal
          medicine={editingMedicine}
          onClose={() => setShowModal(false)}
          onSaved={fetchMedicines}
        />
      )}
    </div>
  );
}