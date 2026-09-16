import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Ban,
  CheckCircle,
  Users as UsersIcon,
  UserPlus,
  X,
  Mail,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";

const Users = () => {
  // =========================================================
  // SAMPLE USERS
  // =========================================================

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      phone: "+91 9876543210",
      location: "Hyderabad",
      registered: "10 Aug 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Reddy",
      email: "priya.reddy@gmail.com",
      phone: "+91 9123456780",
      location: "Bangalore",
      registered: "09 Aug 2026",
      status: "Active",
    },
    {
      id: 3,
      name: "Arjun Kumar",
      email: "arjun.kumar@gmail.com",
      phone: "+91 9988776655",
      location: "Chennai",
      registered: "08 Aug 2026",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Sneha Rao",
      email: "sneha.rao@gmail.com",
      phone: "+91 9012345678",
      location: "Mumbai",
      registered: "07 Aug 2026",
      status: "Active",
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@gmail.com",
      phone: "+91 9345678901",
      location: "Delhi",
      registered: "06 Aug 2026",
      status: "Active",
    },
    {
      id: 6,
      name: "Ananya Patel",
      email: "ananya.patel@gmail.com",
      phone: "+91 9234567890",
      location: "Ahmedabad",
      registered: "05 Aug 2026",
      status: "Inactive",
    },
    {
      id: 7,
      name: "Kiran Reddy",
      email: "kiran.reddy@gmail.com",
      phone: "+91 9456789012",
      location: "Hyderabad",
      registered: "04 Aug 2026",
      status: "Active",
    },
    {
      id: 8,
      name: "Meena Devi",
      email: "meena.devi@gmail.com",
      phone: "+91 9567890123",
      location: "Pune",
      registered: "03 Aug 2026",
      status: "Active",
    },
    {
      id: 9,
      name: "Rohit Verma",
      email: "rohit.verma@gmail.com",
      phone: "+91 9678901234",
      location: "Kolkata",
      registered: "02 Aug 2026",
      status: "Active",
    },
    {
      id: 10,
      name: "Divya Nair",
      email: "divya.nair@gmail.com",
      phone: "+91 9789012345",
      location: "Kochi",
      registered: "01 Aug 2026",
      status: "Inactive",
    },
  ]);

  // =========================================================
  // STATES
  // =========================================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // =========================================================
  // FILTER USERS
  // =========================================================

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  // =========================================================
  // TOGGLE USER STATUS
  // =========================================================

  const toggleStatus = (id) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : user
      )
    );
  };

  // =========================================================
  // DELETE USER
  // =========================================================

  const confirmDelete = () => {
    if (!userToDelete) return;

    setUsers((currentUsers) =>
      currentUsers.filter(
        (user) => user.id !== userToDelete.id
      )
    );

    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  // =========================================================
  // USER COUNTS
  // =========================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  // =========================================================
  // AVATAR COLOR
  // =========================================================

  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-teal-100 text-teal-600",
      "bg-purple-100 text-purple-600",
      "bg-cyan-100 text-cyan-600",
      "bg-indigo-100 text-indigo-600",
      "bg-green-100 text-green-600",
    ];

    const index = name.length % colors.length;

    return colors[index];
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-blue-100 rounded-xl">
            <UsersIcon
              size={28}
              className="text-blue-600"
            />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Users
            </h1>

            <p className="text-slate-500 mt-1">
              Manage MEDIFIND registered users
            </p>
          </div>

        </div>

        <button
          onClick={() =>
            alert("Add user functionality will be connected to the backend.")
          }
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          <UserPlus size={19} />
          Add User
        </button>

      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

        {/* Total */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total Users
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {totalUsers}
              </h2>
            </div>

            <div className="p-3 bg-blue-100 rounded-xl">
              <UsersIcon
                size={24}
                className="text-blue-600"
              />
            </div>

          </div>

        </div>

        {/* Active */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Active Users
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {activeUsers}
              </h2>
            </div>

            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle
                size={24}
                className="text-green-600"
              />
            </div>

          </div>

        </div>

        {/* Inactive */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Inactive Users
              </p>

              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {inactiveUsers}
              </h2>
            </div>

            <div className="p-3 bg-red-100 rounded-xl">
              <Ban
                size={24}
                className="text-red-600"
              />
            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* Search */}

          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

          </div>

          {/* Status Filter */}

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="appearance-none w-full lg:w-48 pl-11 pr-8 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="All">
                All Users
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

          </div>

        </div>

      </div>

      {/* =====================================================
          USER TABLE
      ===================================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Table Header */}

        <div className="p-6 border-b border-slate-100">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Registered Users
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {filteredUsers.length} users found
              </p>
            </div>

          </div>

        </div>

        {/* Desktop Table */}

        <div className="hidden lg:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  User
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Contact
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Location
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Registered
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Status
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="hover:bg-slate-50 transition"
                >

                  {/* User */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center font-bold ${getAvatarColor(
                          user.name
                        )}`}
                      >
                        {user.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>

                        <p className="font-semibold text-slate-700">
                          {user.name}
                        </p>

                        <p className="text-sm text-slate-400">
                          User #{user.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Contact */}

                  <td className="px-6 py-5">

                    <p className="text-sm text-slate-700">
                      {user.email}
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      {user.phone}
                    </p>

                  </td>

                  {/* Location */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <MapPin
                        size={15}
                        className="text-slate-400"
                      />

                      {user.location}

                    </div>

                  </td>

                  {/* Registered */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <Calendar
                        size={15}
                        className="text-slate-400"
                      />

                      {user.registered}

                    </div>

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">

                    {user.status === "Active" ? (

                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">

                        <span className="w-2 h-2 bg-green-500 rounded-full" />

                        Active

                      </span>

                    ) : (

                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-xs font-semibold">

                        <span className="w-2 h-2 bg-red-500 rounded-full" />

                        Inactive

                      </span>

                    )}

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex items-center justify-end gap-2">

                      {/* View */}

                      <button
                        onClick={() =>
                          setSelectedUser(user)
                        }
                        title="View User"
                        className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                      >
                        <Eye size={17} />
                      </button>

                      {/* Block */}

                      <button
                        onClick={() =>
                          toggleStatus(user.id)
                        }
                        title={
                          user.status === "Active"
                            ? "Block User"
                            : "Activate User"
                        }
                        className={`p-2.5 rounded-lg transition ${
                          user.status === "Active"
                            ? "text-orange-600 bg-orange-50 hover:bg-orange-100"
                            : "text-green-600 bg-green-50 hover:bg-green-100"
                        }`}
                      >
                        {user.status === "Active" ? (
                          <Ban size={17} />
                        ) : (
                          <CheckCircle size={17} />
                        )}
                      </button>

                      {/* Delete */}

                      <button
                        onClick={() => {
                          setUserToDelete(user);
                          setShowDeleteModal(true);
                        }}
                        title="Delete User"
                        className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* ===================================================
            MOBILE USER CARDS
        =================================================== */}

        <div className="lg:hidden divide-y divide-slate-100">

          {filteredUsers.map((user) => (

            <div
              key={user.id}
              className="p-5"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-3">

                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-bold ${getAvatarColor(
                      user.name
                    )}`}
                  >
                    {user.name.charAt(0)}
                  </div>

                  <div>

                    <p className="font-semibold text-slate-700">
                      {user.name}
                    </p>

                    <p className="text-sm text-slate-400">
                      User #{user.id}
                    </p>

                  </div>

                </div>

                {user.status === "Active" ? (

                  <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Active
                  </span>

                ) : (

                  <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                    Inactive
                  </span>

                )}

              </div>

              <div className="mt-4 space-y-2">

                <div className="flex items-center gap-2 text-sm text-slate-500">

                  <Mail size={15} />

                  {user.email}

                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">

                  <Phone size={15} />

                  {user.phone}

                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">

                  <MapPin size={15} />

                  {user.location}

                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">

                  <Calendar size={15} />

                  {user.registered}

                </div>

              </div>

              <div className="flex gap-2 mt-4">

                <button
                  onClick={() =>
                    setSelectedUser(user)
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium"
                >
                  <Eye size={16} />
                  View
                </button>

                <button
                  onClick={() =>
                    toggleStatus(user.id)
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg text-sm font-medium"
                >
                  {user.status === "Active" ? (
                    <>
                      <Ban size={16} />
                      Block
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} />
                      Activate
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setUserToDelete(user);
                    setShowDeleteModal(true);
                  }}
                  className="px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* No Users */}

        {filteredUsers.length === 0 && (

          <div className="p-12 text-center">

            <UsersIcon
              size={45}
              className="mx-auto text-slate-300"
            />

            <h3 className="text-lg font-semibold text-slate-700 mt-4">
              No users found
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              Try changing your search or filter.
            </p>

          </div>

        )}

      </div>

      {/* =====================================================
          VIEW USER MODAL
      ===================================================== */}

      {selectedUser && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">

            {/* Modal Header */}

            <div className="flex items-center justify-between p-6 border-b border-slate-100">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  User Details
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Complete user information
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedUser(null)
                }
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X size={20} />
              </button>

            </div>

            {/* Modal Content */}

            <div className="p-6">

              <div className="flex flex-col items-center mb-6">

                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${getAvatarColor(
                    selectedUser.name
                  )}`}
                >
                  {selectedUser.name.charAt(0)}
                </div>

                <h3 className="text-xl font-bold text-slate-800 mt-3">
                  {selectedUser.name}
                </h3>

                <span
                  className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedUser.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedUser.status}
                </span>

              </div>

              <div className="space-y-4">

                <div className="flex items-center gap-3">

                  <Mail
                    size={18}
                    className="text-blue-500"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Email
                    </p>

                    <p className="text-sm font-medium text-slate-700">
                      {selectedUser.email}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Phone
                    size={18}
                    className="text-teal-500"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Phone
                    </p>

                    <p className="text-sm font-medium text-slate-700">
                      {selectedUser.phone}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <MapPin
                    size={18}
                    className="text-purple-500"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Location
                    </p>

                    <p className="text-sm font-medium text-slate-700">
                      {selectedUser.location}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Calendar
                    size={18}
                    className="text-orange-500"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Registered
                    </p>

                    <p className="text-sm font-medium text-slate-700">
                      {selectedUser.registered}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Modal Footer */}

            <div className="p-6 border-t border-slate-100 flex justify-end">

              <button
                onClick={() =>
                  setSelectedUser(null)
                }
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}

      {showDeleteModal && userToDelete && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

            <div className="flex items-center gap-4">

              <div className="p-3 bg-red-100 rounded-xl">

                <Trash2
                  size={24}
                  className="text-red-600"
                />

              </div>

              <div>

                <h2 className="text-lg font-bold text-slate-800">
                  Delete User?
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  This action cannot be undone.
                </p>

              </div>

            </div>

            <div className="mt-5 p-4 bg-slate-50 rounded-xl">

              <p className="font-semibold text-slate-700">
                {userToDelete.name}
              </p>

              <p className="text-sm text-slate-500 mt-1">
                {userToDelete.email}
              </p>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setUserToDelete(null);
                }}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium"
              >
                Delete User
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Users;