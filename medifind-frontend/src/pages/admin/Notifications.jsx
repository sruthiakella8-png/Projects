import React, { useState } from "react";
import {
  Bell,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  Send,
  Users,
  User,
  Stethoscope,
  Building2,
  AlertTriangle,
} from "lucide-react";

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Appointment Reminder",
      message: "Your appointment is scheduled for today at 10:30 AM.",
      type: "Appointment",
      audience: "Users",
      date: "10 Aug 2026",
      time: "10:00 AM",
      status: "Sent",
    },
    {
      id: 2,
      title: "Doctor Verification",
      message: "A new doctor registration is waiting for admin verification.",
      type: "Verification",
      audience: "Admin",
      date: "10 Aug 2026",
      time: "09:30 AM",
      status: "Sent",
    },
    {
      id: 3,
      title: "New Hospital Registration",
      message: "City Care Hospital has submitted a registration request.",
      type: "Hospital",
      audience: "Admin",
      date: "10 Aug 2026",
      time: "09:00 AM",
      status: "Pending",
    },
    {
      id: 4,
      title: "Emergency Alert",
      message: "An emergency request requires immediate attention.",
      type: "Emergency",
      audience: "Doctors",
      date: "10 Aug 2026",
      time: "08:45 AM",
      status: "Sent",
    },
    {
      id: 5,
      title: "System Maintenance",
      message: "MEDIFIND will undergo scheduled maintenance tonight.",
      type: "System",
      audience: "All Users",
      date: "09 Aug 2026",
      time: "06:00 PM",
      status: "Draft",
    },
  ]);

  // Search notifications
  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      notification.message
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      notification.type
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      notification.audience
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Statistics
  const sentCount = notifications.filter(
    (notification) => notification.status === "Sent"
  ).length;

  const pendingCount = notifications.filter(
    (notification) => notification.status === "Pending"
  ).length;

  const draftCount = notifications.filter(
    (notification) => notification.status === "Draft"
  ).length;

  // Delete
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notification?"
    );

    if (confirmDelete) {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }
  };

  // Send notification
  const handleSend = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, status: "Sent" }
          : notification
      )
    );
  };

  // Status style
  const getStatusStyle = (status) => {
    if (status === "Sent") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  // Notification type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case "Appointment":
        return <Clock size={18} className="text-blue-600" />;

      case "Verification":
        return <CheckCircle size={18} className="text-green-600" />;

      case "Hospital":
        return <Building2 size={18} className="text-teal-600" />;

      case "Emergency":
        return <AlertTriangle size={18} className="text-red-600" />;

      case "System":
        return <Bell size={18} className="text-purple-600" />;

      default:
        return <Bell size={18} className="text-blue-600" />;
    }
  };

  // Notification type background
  const getTypeBackground = (type) => {
    switch (type) {
      case "Appointment":
        return "bg-blue-100";

      case "Verification":
        return "bg-green-100";

      case "Hospital":
        return "bg-teal-100";

      case "Emergency":
        return "bg-red-100";

      case "System":
        return "bg-purple-100";

      default:
        return "bg-blue-100";
    }
  };

  return (
    <div className="p-6 md:p-8 bg-slate-100 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <div className="flex items-center gap-3">

            <div className="p-3 bg-blue-100 rounded-xl">
              <Bell
                size={28}
                className="text-blue-600"
              />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                Notifications
              </h1>

              <p className="text-slate-500 mt-1">
                Manage and send notifications across MEDIFIND
              </p>
            </div>

          </div>
        </div>

        {/* Create Notification */}
        <button
          onClick={() =>
            alert("Create Notification form will be added here.")
          }
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          <Plus size={20} />
          Create Notification
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* Total */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total Notifications
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {notifications.length}
              </h2>
            </div>

            <div className="p-3 bg-blue-100 rounded-xl">
              <Bell
                size={24}
                className="text-blue-600"
              />
            </div>

          </div>

        </div>

        {/* Sent */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Sent
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {sentCount}
              </h2>
            </div>

            <div className="p-3 bg-green-100 rounded-xl">
              <Send
                size={24}
                className="text-green-600"
              />
            </div>

          </div>

        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                {pendingCount}
              </h2>
            </div>

            <div className="p-3 bg-yellow-100 rounded-xl">
              <Clock
                size={24}
                className="text-yellow-600"
              />
            </div>

          </div>

        </div>

        {/* Drafts */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Drafts
              </p>

              <h2 className="text-3xl font-bold text-slate-600 mt-2">
                {draftCount}
              </h2>
            </div>

            <div className="p-3 bg-slate-100 rounded-xl">
              <Pencil
                size={24}
                className="text-slate-600"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Quick Notification Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        {/* Users */}
        <button
          onClick={() =>
            alert("Create notification for users.")
          }
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition text-left"
        >
          <div className="flex items-center gap-4">

            <div className="p-3 bg-blue-100 rounded-xl">
              <Users
                size={23}
                className="text-blue-600"
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                Notify Users
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Send updates to patients and users
              </p>
            </div>

          </div>
        </button>

        {/* Doctors */}
        <button
          onClick={() =>
            alert("Create notification for doctors.")
          }
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition text-left"
        >
          <div className="flex items-center gap-4">

            <div className="p-3 bg-teal-100 rounded-xl">
              <Stethoscope
                size={23}
                className="text-teal-600"
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                Notify Doctors
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Send updates to registered doctors
              </p>
            </div>

          </div>
        </button>

        {/* All */}
        <button
          onClick={() =>
            alert("Create system-wide notification.")
          }
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition text-left"
        >
          <div className="flex items-center gap-4">

            <div className="p-3 bg-red-100 rounded-xl">
              <Bell
                size={23}
                className="text-red-600"
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                System Notification
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Notify everyone on the platform
              </p>
            </div>

          </div>
        </button>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-6">

        <div className="relative max-w-md">

          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

        </div>

      </div>

      {/* Notifications Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        {/* Table Header */}
        <div className="px-6 py-5 border-b border-slate-200">

          <h2 className="text-lg font-semibold text-slate-800">
            Notification History
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            View and manage notifications
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Notification
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Type
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Audience
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Date & Time
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-slate-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredNotifications.length > 0 ? (

                filteredNotifications.map((notification) => (

                  <tr
                    key={notification.id}
                    className="hover:bg-slate-50 transition"
                  >

                    {/* Notification */}
                    <td className="px-6 py-4">

                      <div className="flex items-start gap-3">

                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center ${getTypeBackground(
                            notification.type
                          )}`}
                        >
                          {getTypeIcon(notification.type)}
                        </div>

                        <div className="max-w-md">

                          <p className="font-semibold text-slate-800">
                            {notification.title}
                          </p>

                          <p className="text-sm text-slate-500 mt-1">
                            {notification.message}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Type */}
                    <td className="px-6 py-4">

                      <span className="text-sm font-medium text-slate-600">
                        {notification.type}
                      </span>

                    </td>

                    {/* Audience */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2 text-slate-600">

                        {notification.audience === "Doctors" ? (
                          <Stethoscope size={16} />
                        ) : notification.audience === "Admin" ? (
                          <User size={16} />
                        ) : notification.audience === "All Users" ? (
                          <Users size={16} />
                        ) : (
                          <User size={16} />
                        )}

                        <span>
                          {notification.audience}
                        </span>

                      </div>

                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">

                      <p className="text-sm text-slate-700">
                        {notification.date}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {notification.time}
                      </p>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                          notification.status
                        )}`}
                      >
                        {notification.status}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">

                      <div className="flex items-center justify-center gap-2">

                        {/* View */}
                        <button
                          title="View"
                          onClick={() =>
                            alert(
                              `${notification.title}\n\n${notification.message}`
                            )
                          }
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                        >
                          <Eye size={18} />
                        </button>

                        {/* Edit */}
                        <button
                          title="Edit"
                          onClick={() =>
                            alert(
                              `Edit notification: ${notification.title}`
                            )
                          }
                          className="p-2 rounded-lg text-teal-600 hover:bg-teal-50 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* Send */}
                        {notification.status !== "Sent" && (
                          <button
                            title="Send"
                            onClick={() =>
                              handleSend(notification.id)
                            }
                            className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition"
                          >
                            <Send size={18} />
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          title="Delete"
                          onClick={() =>
                            handleDelete(notification.id)
                          }
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <Bell
                        size={42}
                        className="text-slate-300 mb-3"
                      />

                      <p className="text-slate-500 font-medium">
                        No notifications found
                      </p>

                      <p className="text-sm text-slate-400 mt-1">
                        Try changing your search.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Notifications;