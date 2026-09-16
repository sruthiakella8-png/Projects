import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  TestTube,
  Clock,
  IndianRupee,
  Eye,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import axiosInstance from "../../api/axiosInstance";


// =====================================================
// TESTS PAGE
// =====================================================

export default function Tests() {

  // ===================================================
  // STATE
  // ===================================================

  const [tests, setTests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingTest, setEditingTest] = useState(null);

  const [viewingTest, setViewingTest] = useState(null);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    test_name: "",
    description: "",
    price: "",
    report_time: "",
  });


  // ===================================================
  // API ENDPOINT
  // ===================================================

  const TESTS_ENDPOINT =
    "/diagnostics/dashboard/tests/";


  // ===================================================
  // LOAD TESTS
  // ===================================================

  useEffect(() => {
    loadTests();
  }, []);


  const loadTests = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await axiosInstance.get(
          TESTS_ENDPOINT
        );

      const data =
        Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];

      setTests(data);

    } catch (err) {

      console.error(
        "Failed to load diagnostic tests:",
        err
      );

      setError(
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        "Unable to load diagnostic tests."
      );

    } finally {

      setLoading(false);

    }
  };


  // ===================================================
  // OPEN ADD MODAL
  // ===================================================

  const openAddModal = () => {

    setEditingTest(null);

    setFormData({
      test_name: "",
      description: "",
      price: "",
      report_time: "",
    });

    setShowModal(true);

  };


  // ===================================================
  // OPEN EDIT MODAL
  // ===================================================

  const openEditModal = (test) => {

    setEditingTest(test);

    setFormData({
      test_name:
        test.test_name || "",

      description:
        test.description || "",

      price:
        test.price || "",

      report_time:
        test.report_time || "",
    });

    setShowModal(true);

  };

  // ===================================================
// OPEN VIEW DETAILS
// ===================================================

const openViewModal = (test) => {
  setViewingTest(test);
};

const closeViewModal = () => {
  setViewingTest(null);
};


  // ===================================================
  // CLOSE MODAL
  // ===================================================

  const closeModal = () => {

    if (saving) {
      return;
    }

    setShowModal(false);

    setEditingTest(null);

    setFormData({
      test_name: "",
      description: "",
      price: "",
      report_time: "",
    });

  };


  // ===================================================
  // FORM CHANGE
  // ===================================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // ===================================================
  // CREATE / UPDATE TEST
  // ===================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!formData.test_name.trim()) {

      alert(
        "Please enter the test name."
      );

      return;
    }

    if (!formData.price) {

      alert(
        "Please enter the test price."
      );

      return;
    }

    try {

      setSaving(true);

      // ===============================================
      // UPDATE
      // ===============================================

      if (editingTest) {

        const response =
          await axiosInstance.patch(
            `${TESTS_ENDPOINT}${editingTest.id}/`,
            formData
          );

        setTests((previous) =>
          previous.map((test) =>
            test.id === editingTest.id
              ? response.data
              : test
          )
        );

        alert(
          "Test updated successfully."
        );

      }

      // ===============================================
      // CREATE
      // ===============================================

      else {

        const response =
          await axiosInstance.post(
            TESTS_ENDPOINT,
            formData
          );

        setTests((previous) => [
          response.data,
          ...previous,
        ]);

        alert(
          "Test added successfully."
        );

      }

      closeModal();

    } catch (err) {

      console.error(
        "Failed to save diagnostic test:",
        err
      );

      console.error(
        "Backend response:",
        err?.response?.data
      );

      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        Object.values(
          err?.response?.data || {}
        )
          .flat()
          .join(" ") ||
        "Unable to save the test.";

      alert(message);

    } finally {

      setSaving(false);

    }
  };


  // ===================================================
  // DELETE TEST
  // ===================================================

  const handleDelete = async (testId) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this test?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await axiosInstance.delete(
        `${TESTS_ENDPOINT}${testId}/`
      );

      setTests((previous) =>
        previous.filter(
          (test) => test.id !== testId
        )
      );

      alert(
        "Test deleted successfully."
      );

    } catch (err) {

      console.error(
        "Failed to delete diagnostic test:",
        err
      );

      console.error(
        "Backend response:",
        err?.response?.data
      );

      alert(
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        "Unable to delete the test."
      );

    }
  };


  // ===================================================
  // SEARCH
  // ===================================================

  const filteredTests =
    tests.filter((test) => {

      const search =
        searchTerm
          .trim()
          .toLowerCase();

      if (!search) {
        return true;
      }

      return (
        test?.test_name
          ?.toLowerCase()
          .includes(search) ||

        test?.description
          ?.toLowerCase()
          .includes(search)
      );

    });


  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="space-y-6">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          flex
          flex-col
          justify-between
          gap-4
          md:flex-row
          md:items-center
        "
      >

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            Diagnostic Tests
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage the tests offered by your diagnostic center.
          </p>

        </div>


        {/* ADD TEST */}

        <button
          type="button"
          onClick={openAddModal}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-teal-500
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-md
            transition
            hover:scale-[1.02]
            hover:shadow-lg
          "
        >

          <Plus size={18} />

          Add New Test

        </button>

      </motion.div>


      {/* =================================================
          SEARCH + COUNT
      ================================================= */}

      <div
        className="
          flex
          flex-col
          gap-4
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-sm
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        {/* SEARCH */}

        <div className="relative w-full sm:max-w-md">

          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search tests..."
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              pl-10
              pr-4
              text-sm
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

        </div>


        {/* COUNT */}

        <div className="text-sm text-slate-500">

          Showing{" "}

          <span className="font-semibold text-slate-800">
            {filteredTests.length}
          </span>

          {" "}of{" "}

          <span className="font-semibold text-slate-800">
            {tests.length}
          </span>

          {" "}tests

        </div>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div
          className="
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-600
          "
        >
          {error}
        </div>
      )}


      {/* =================================================
          TEST TABLE
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead className="bg-slate-50">

              <tr>

                <th
                  className="
                    px-5
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  Test
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  Description
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  Price
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  Report Time
                </th>

                <th
                  className="
                    px-5
                    py-4
                    text-right
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  Actions
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-slate-100">

              {/* LOADING */}

              {loading && (

                <tr>

                  <td
                    colSpan="5"
                    className="
                      px-5
                      py-12
                      text-center
                      text-sm
                      text-slate-400
                    "
                  >
                    Loading diagnostic tests...
                  </td>

                </tr>

              )}


              {/* EMPTY */}

              {!loading &&
                filteredTests.length === 0 && (

                  <tr>

                    <td
                      colSpan="5"
                      className="px-5 py-14"
                    >

                      <div className="flex flex-col items-center justify-center">

                        <div
                          className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-blue-50
                            text-blue-600
                          "
                        >
                          <TestTube size={25} />
                        </div>

                        <p className="mt-4 text-sm font-semibold text-slate-700">
                          No tests found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Add your first diagnostic test to get started.
                        </p>

                      </div>

                    </td>

                  </tr>

                )}


              {/* TESTS */}

              {!loading &&
                filteredTests.map((test) => (

                  <tr
                    key={test.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* TEST NAME */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            flex
                            h-10
                            w-10
                            flex-shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                          "
                        >
                          <TestTube size={18} />
                        </div>

                        <div>

                          <p className="text-sm font-semibold text-slate-800">
                            {test.test_name}
                          </p>

                          <p className="text-xs text-slate-400">
                            Test ID: #{test.id}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* DESCRIPTION */}

                    <td className="max-w-sm px-5 py-4">

                      <p className="truncate text-sm text-slate-500">
                        {test.description || "—"}
                      </p>

                    </td>


                    {/* PRICE */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">

                        <IndianRupee size={14} />

                        {test.price}

                      </div>

                    </td>


                    {/* REPORT TIME */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2 text-sm text-slate-600">

                        <Clock
                          size={15}
                          className="text-teal-500"
                        />

                        {test.report_time || "—"}

                      </div>

                    </td>


                    {/* ACTIONS */}

                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        {/* VIEW */}

  <button
    type="button"
    onClick={() => openViewModal(test)}
    className="
      rounded-lg
      p-2
      text-slate-500
      transition
      hover:bg-teal-50
      hover:text-teal-600
    "
    title="View test details"
  >
    <Eye size={17} />
  </button>


                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(test)
                          }
                          className="
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-blue-50
                            hover:text-blue-600
                          "
                          title="Edit test"
                        >

                          <Pencil size={17} />

                        </button>


                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(test.id)
                          }
                          className="
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-red-50
                            hover:text-red-600
                          "
                          title="Delete test"
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

      </motion.div>


      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {showModal && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-900/50
            px-4
            backdrop-blur-sm
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              w-full
              max-w-lg
              rounded-2xl
              bg-white
              shadow-2xl
            "
          >

            {/* MODAL HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-200
                px-6
                py-4
              "
            >

              <div>

                <h2 className="text-lg font-bold text-slate-800">

                  {editingTest
                    ? "Edit Diagnostic Test"
                    : "Add New Diagnostic Test"}

                </h2>

                <p className="mt-1 text-xs text-slate-500">

                  {editingTest
                    ? "Update the test details below."
                    : "Enter the details for the new test."}

                </p>

              </div>


              <button
                type="button"
                onClick={closeModal}
                className="
                  rounded-lg
                  p-2
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                "
              >

                <X size={19} />

              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* TEST NAME */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Test Name
                </label>

                <input
                  type="text"
                  name="test_name"
                  value={formData.test_name}
                  onChange={handleChange}
                  placeholder="e.g. Complete Blood Count"
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    text-sm
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                  "
                />

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe the diagnostic test..."
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                  "
                />

              </div>


              {/* PRICE + REPORT TIME */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Price
                  </label>

                  <div className="relative">

                    <IndianRupee
                      size={16}
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="750"
                      min="0"
                      step="0.01"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        pl-9
                        pr-4
                        text-sm
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                      "
                    />

                  </div>

                </div>


                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Report Time
                  </label>

                  <div className="relative">

                    <Clock
                      size={16}
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      type="text"
                      name="report_time"
                      value={formData.report_time}
                      onChange={handleChange}
                      placeholder="12 hrs"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        pl-9
                        pr-4
                        text-sm
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                      "
                    />

                  </div>

                </div>

              </div>


              {/* BUTTONS */}

              <div
                className="
                  flex
                  justify-end
                  gap-3
                  border-t
                  border-slate-100
                  pt-5
                "
              >

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-slate-600
                    transition
                    hover:bg-slate-50
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    to-teal-500
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:shadow-md
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  {saving
                    ? "Saving..."
                    : editingTest
                      ? "Save Changes"
                      : "Add Test"}

                </button>

              </div>

            </form>

          </motion.div>

        </div>

      )}
      {/* =================================================
    VIEW TEST DETAILS MODAL
================================================= */}

{viewingTest && (

  <div
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-slate-900/50
      px-4
      backdrop-blur-sm
    "
    onClick={closeViewModal}
  >

    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
        y: 10,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      onClick={(event) => event.stopPropagation()}
      className="
        w-full
        max-w-lg
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-2xl
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          bg-gradient-to-r
          from-blue-600
          to-teal-500
          px-6
          py-5
          text-white
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-white/20
            "
          >
            <TestTube size={22} />
          </div>

          <div>

            <h2 className="text-lg font-bold">
              Test Details
            </h2>

            <p className="text-xs text-white/80">
              Diagnostic test information
            </p>

          </div>

        </div>


        <button
          type="button"
          onClick={closeViewModal}
          className="
            rounded-lg
            p-2
            text-white/80
            transition
            hover:bg-white/20
            hover:text-white
          "
          title="Close"
        >
          <X size={20} />
        </button>

      </div>


      {/* CONTENT */}

      <div className="space-y-5 p-6">

        {/* TEST NAME */}

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Test Name
          </p>

          <div className="mt-2 flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-blue-600
              "
            >
              <TestTube size={18} />
            </div>

            <p className="text-lg font-bold text-slate-800">
              {viewingTest.test_name}
            </p>

          </div>

        </div>


        {/* DESCRIPTION */}

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Description
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {viewingTest.description || "No description provided."}
          </p>

        </div>


        {/* PRICE + REPORT TIME */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* PRICE */}

          <div
            className="
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              p-4
            "
          >

            <div className="flex items-center gap-2">

              <IndianRupee
                size={17}
                className="text-teal-500"
              />

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Price
              </p>

            </div>

            <p className="mt-2 text-lg font-bold text-slate-800">
              ₹{viewingTest.price}
            </p>

          </div>


          {/* REPORT TIME */}

          <div
            className="
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              p-4
            "
          >

            <div className="flex items-center gap-2">

              <Clock
                size={17}
                className="text-teal-500"
              />

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Report Time
              </p>

            </div>

            <p className="mt-2 text-lg font-bold text-slate-800">
              {viewingTest.report_time || "Not specified"}
            </p>

          </div>

        </div>


        {/* STATUS */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
          "
        >

          <div>

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Status
            </p>

            <div className="mt-1 flex items-center gap-2">

              {viewingTest.is_active ? (
                <>
                  <CheckCircle2
                    size={17}
                    className="text-emerald-500"
                  />

                  <span className="text-sm font-semibold text-emerald-600">
                    Active
                  </span>
                </>
              ) : (
                <>
                  <XCircle
                    size={17}
                    className="text-red-500"
                  />

                  <span className="text-sm font-semibold text-red-600">
                    Inactive
                  </span>
                </>
              )}

            </div>

          </div>


          {/* TEST ID */}

          <div className="text-right">

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Test ID
            </p>

            <p className="mt-1 text-sm font-bold text-slate-700">
              #{viewingTest.id}
            </p>

          </div>

        </div>


        {/* CREATED DATE */}

        {viewingTest.created_at && (

          <div className="border-t border-slate-100 pt-4">

            <p className="text-xs text-slate-400">
              Created on
            </p>

            <p className="mt-1 text-sm font-medium text-slate-600">
              {new Date(
                viewingTest.created_at
              ).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

          </div>

        )}

      </div>


      {/* FOOTER */}

      <div
        className="
          flex
          justify-end
          border-t
          border-slate-100
          bg-slate-50
          px-6
          py-4
        "
      >

        <button
          type="button"
          onClick={closeViewModal}
          className="
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-teal-500
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:shadow-md
          "
        >
          Close
        </button>

      </div>

    </motion.div>

  </div>

)}

    </div>
  );
}