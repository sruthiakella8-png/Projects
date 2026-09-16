import { useState, useEffect } from "react";
import { getPharmacyConversations } from "../../services/pharmacyService";
import ChatWindow from "../../components/pharmacy/ChatWindow";

export default function PharmacyInbox() {
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPharmacyConversations()
      .then((res) => setConversations(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex h-[calc(100vh-0px)]">
      <div className="w-72 border-r overflow-y-auto">
        <div className="p-3 font-semibold border-b">Conversations</div>
        {loading && <p className="p-3 text-gray-500 text-sm">Loading...</p>}
        {!loading && conversations.length === 0 && (
          <p className="p-3 text-gray-500 text-sm">No conversations yet.</p>
        )}
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => setSelected(conv)}
            className={`w-full text-left p-3 border-b hover:bg-gray-50 ${
              selected?.id === conv.id ? "bg-blue-50" : ""
            }`}
          >
            <p className="font-medium text-sm">
              {conv.customer?.username || "Customer"}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(conv.updated_at).toLocaleString()}
            </p>
          </button>
        ))}
      </div>

      <div className="flex-1">
        {selected ? (
          <ChatWindow conversation={selected} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a conversation to view messages
          </div>
        )}
      </div>
    </div>
  );
}