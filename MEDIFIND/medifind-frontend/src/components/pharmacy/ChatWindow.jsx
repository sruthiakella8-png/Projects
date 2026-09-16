import { useState, useEffect, useRef, useCallback } from "react";
import {
  getConversationMessages,
  sendPharmacyReply,
} from "../../services/pharmacyService";

// Get the logged-in pharmacy user's id however you store it —
// adjust this to match your auth setup (e.g. decoded JWT, context, etc.)
function getCurrentUserId() {
  return localStorage.getItem("user_id");
}

export default function ChatWindow({ conversation }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const currentUserId = getCurrentUserId();

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getConversationMessages(conversation.id);
      setMessages(res.data);
    } finally {
      setLoading(false);
    }
  }, [conversation.id]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !file) return;

    setSending(true);
    const formData = new FormData();
    formData.append("message", text);
    if (file) formData.append("attachment", file);

    try {
      await sendPharmacyReply(conversation.id, formData);
      setText("");
      setFile(null);
      fetchMessages();
    } catch {
      alert("Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full border-l">
      <div className="p-3 border-b font-semibold">
        {conversation.customer?.username || "Customer"}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading && <p className="text-gray-500 text-sm">Loading...</p>}
        {!loading &&
          messages.map((msg) => {
            const isMine = String(msg.sender) === String(currentUserId);
            return (
              <div
                key={msg.id}
                className={`max-w-xs p-2 rounded ${
                  isMine
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                {msg.attachment && (
                  <a
                    href={msg.attachment}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs underline block mt-1"
                  >
                    Attachment
                  </a>
                )}
                <span className="text-[10px] opacity-70 block mt-1">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </span>
              </div>
            );
          })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a reply..."
          className="flex-1 border rounded p-2"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-32 text-xs"
        />
        <button
          type="submit"
          disabled={sending}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}