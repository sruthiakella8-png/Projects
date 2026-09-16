import { useState, useEffect, useCallback } from "react";
import { getDocuments, deleteDocument } from "../../services/pharmacyService";
import DocumentUploadModal from "../../components/pharmacy/DocumentUploadModal";

const TYPE_LABELS = {
  LICENSE: "Pharmacy License",
  REGISTRATION: "Registration Certificate",
  OWNER_ID: "Owner ID",
  ADDRESS_PROOF: "Address Proof",
};

export default function PharmacyDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDocuments();
      setDocuments(res.data);
      setError(null);
    } catch {
      setError("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await deleteDocument(id);
      fetchDocuments();
    } catch {
      alert("Failed to delete document.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Documents</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Upload Document
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && documents.length === 0 && (
        <p className="text-gray-500 mt-4">No documents uploaded yet.</p>
      )}

      {!loading && documents.length > 0 && (
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="text-left border-b bg-gray-50">
              <th className="p-2">Type</th>
              <th className="p-2">File</th>
              <th className="p-2">Uploaded At</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  {TYPE_LABELS[doc.document_type] || doc.document_type}
                </td>
                
                <td className="p-2"><a
                    href={doc.document}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View file
                  </a>
                </td>
                <td className="p-2">
                  {new Date(doc.uploaded_at).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <DocumentUploadModal
          onClose={() => setShowModal(false)}
          onUploaded={fetchDocuments}
        />
      )}
    </div>
  );
}