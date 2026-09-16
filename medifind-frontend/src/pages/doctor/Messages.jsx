
import {
  MessageCircle,
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
} from "lucide-react";
import { useState } from "react";

const initialMessages = [
  {
    id: 1,
    name: "Ravi Kumar",
    patientId: "P001",
    lastMessage: "Doctor, I am feeling better today.",
    time: "10:30 AM",
    unread: 2,
    online: true,
    messages: [
      {
        sender: "patient",
        text: "Hello Doctor, I have a question about my medication.",
        time: "10:20 AM",
      },
      {
        sender: "doctor",
        text: "Sure Ravi, please tell me what is troubling you.",
        time: "10:25 AM",
      },
      {
        sender: "patient",
        text: "Doctor, I am feeling better today.",
        time: "10:30 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Ananya Sharma",
    patientId: "P002",
    lastMessage: "Can I visit tomorrow?",
    time: "09:45 AM",
    unread: 1,
    online: true,
    messages: [
      {
        sender: "patient",
        text: "Hello Doctor.",
        time: "09:35 AM",
      },
      {
        sender: "patient",
        text: "Can I visit tomorrow?",
        time: "09:45 AM",
      },
    ],
  },
  {
    id: 3,
    name: "Suresh Reddy",
    patientId: "P003",
    lastMessage: "Thank you, Doctor.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      {
        sender: "doctor",
        text: "Please continue the prescribed medicines.",
        time: "Yesterday",
      },
      {
        sender: "patient",
        text: "Thank you, Doctor.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: 4,
    name: "Priya Patel",
    patientId: "P004",
    lastMessage: "I will send the report shortly.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      {
        sender: "patient",
        text: "Doctor, I have completed the test.",
        time: "Yesterday",
      },
      {
        sender: "doctor",
        text: "Please send me the report when available.",
        time: "Yesterday",
      },
      {
        sender: "patient",
        text: "I will send the report shortly.",
        time: "Yesterday",
      },
    ],
  },
];

export default function Messages() {
  const [conversations, setConversations] =
    useState(initialMessages);

  const [selectedId, setSelectedId] = useState(1);

  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");

  const selectedConversation = conversations.find(
    (item) => item.id === selectedId
  );

  const filteredConversations = conversations.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = () => {
    if (!message.trim()) {
      return;
    }

    const newMessage = {
      sender: "doctor",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === selectedId
          ? {
              ...conversation,
              lastMessage: message,
              time: "Just now",
              messages: [
                ...conversation.messages,
                newMessage,
              ],
            }
          : conversation
      )
    );

    setMessage("");
  };

  const selectConversation = (id) => {
    setSelectedId(id);

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === id
          ? {
              ...conversation,
              unread: 0,
            }
          : conversation
      )
    );
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
          <MessageCircle size={25} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Messages
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Communicate with your patients.
          </p>
        </div>

      </div>

      {/* Messages Container */}
      <div className="grid h-[650px] grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-3">

        {/* Conversation List */}
        <div className="border-b border-slate-200 lg:border-b-0 lg:border-r">

          {/* Search */}
          <div className="border-b border-slate-200 p-4">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search patients..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

          </div>

          {/* Conversations */}
          <div className="max-h-[570px] overflow-y-auto">

            {filteredConversations.map((conversation) => (

              <button
                key={conversation.id}
                type="button"
                onClick={() =>
                  selectConversation(conversation.id)
                }
                className={`flex w-full items-center gap-3 border-b border-slate-100 p-4 text-left transition ${
                  selectedId === conversation.id
                    ? "bg-blue-50"
                    : "hover:bg-slate-50"
                }`}
              >

                {/* Avatar */}
                <div className="relative">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                    {conversation.name.charAt(0)}
                  </div>

                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  )}

                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">

                  <div className="flex items-center justify-between gap-2">

                    <h3 className="truncate text-sm font-semibold text-slate-800">
                      {conversation.name}
                    </h3>

                    <span className="shrink-0 text-xs text-slate-400">
                      {conversation.time}
                    </span>

                  </div>

                  <div className="mt-1 flex items-center justify-between gap-2">

                    <p className="truncate text-xs text-slate-500">
                      {conversation.lastMessage}
                    </p>

                    {conversation.unread > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                        {conversation.unread}
                      </span>
                    )}

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Chat Area */}
        <div className="flex min-h-0 flex-col lg:col-span-2">

          {/* Chat Header */}
          {selectedConversation && (
            <>
              <div className="flex items-center justify-between border-b border-slate-200 p-4">

                <div className="flex items-center gap-3">

                  <div className="relative">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                      {selectedConversation.name.charAt(0)}
                    </div>

                    {selectedConversation.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                    )}

                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-800">
                      {selectedConversation.name}
                    </h2>

                    <p className="text-xs text-slate-500">
                      {selectedConversation.online
                        ? "Online"
                        : "Offline"}{" "}
                      · {selectedConversation.patientId}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-1">

                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600"
                    title="Call"
                  >
                    <Phone size={19} />
                  </button>

                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600"
                    title="Video call"
                  >
                    <Video size={19} />
                  </button>

                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    title="More"
                  >
                    <MoreVertical size={19} />
                  </button>

                </div>

              </div>

              {/* Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5">

                <div className="text-center">
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-400 shadow-sm">
                    Today
                  </span>
                </div>

                {selectedConversation.messages.map(
                  (msg, index) => (

                    <div
                      key={index}
                      className={`flex ${
                        msg.sender === "doctor"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                          msg.sender === "doctor"
                            ? "rounded-br-md bg-blue-600 text-white"
                            : "rounded-bl-md bg-white text-slate-700 shadow-sm"
                        }`}
                      >

                        <p className="text-sm">
                          {msg.text}
                        </p>

                        <div
                          className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                            msg.sender === "doctor"
                              ? "text-blue-100"
                              : "text-slate-400"
                          }`}
                        >
                          <span>{msg.time}</span>

                          {msg.sender === "doctor" && (
                            <CheckCheck size={13} />
                          )}
                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

              {/* Message Input */}
              <div className="border-t border-slate-200 bg-white p-4">

                <div className="flex items-center gap-3">

                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={sendMessage}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                    title="Send message"
                  >
                    <Send size={19} />
                  </button>

                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Press Enter to send
                </p>

              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

