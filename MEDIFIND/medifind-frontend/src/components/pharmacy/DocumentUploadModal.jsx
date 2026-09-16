import { useState } from "react";
import { uploadDocument } from "../../services/pharmacyService";

const DOCUMENT_TYPES = [
  { value: "LICENSE", label: "Pharmacy License" },
  { value: "REGISTRATION", label: "Registration Certificate" },
  { value: "OWNER_ID", label: "Owner ID" },
  { value: "ADDRESS_PROOF", label: "Address Proof" },
];

export default function DocumentUploadModal({ onClose, onUploaded }) {
  const [documentType, setDocumentType] = useState("LICENSE");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please choose a file.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("document_type", documentType);
    formData.append("document", file);

    try {
      await uploadDocument(formData);
      onUploaded();
      onClose();
    } catch (err) {
      setError(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Upload Document</h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="w-full border rounded p-2"
          >
            {DOCUMENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border rounded p-2"
            required
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
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}