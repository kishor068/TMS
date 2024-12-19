import React, { useState } from "react";

const ManageSpecialSevas = () => {
  const [specialSevas, setSpecialSevas] = useState([
    {
      id: 1,
      name: "Special Pooja",
      description: "Festive pooja",
      startDate: "2024-01-01",
      validity: "2024-12-31",
      isEnabled: true,
    },
  ]);

  const [newSeva, setNewSeva] = useState({
    name: "",
    description: "",
    startDate: "",
    validity: "",
    isEnabled: "Enabled",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // add, edit, view
  const [editId, setEditId] = useState(null);

  const openModal = (mode, seva = null) => {
    setModalMode(mode);
    if (seva) {
      setNewSeva({
        name: seva.name,
        description: seva.description,
        startDate: seva.startDate,
        validity: seva.validity,
        isEnabled: seva.isEnabled ? "Enabled" : "Disabled",
      });
      setEditId(seva.id);
    } else {
      setNewSeva({
        name: "",
        description: "",
        startDate: "",
        validity: "",
        isEnabled: "Enabled",
      });
      setEditId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewSeva({
      name: "",
      description: "",
      startDate: "",
      validity: "",
      isEnabled: "Enabled",
    });
    setEditId(null);
  };

  const handleSave = () => {
    if (!newSeva.name.trim() || !newSeva.startDate || !newSeva.validity) return;

    if (modalMode === "edit") {
      setSpecialSevas((prev) =>
        prev.map((seva) =>
          seva.id === editId
            ? {
                ...newSeva,
                id: seva.id,
                isEnabled: newSeva.isEnabled === "Enabled",
              }
            : seva
        )
      );
    } else {
      setSpecialSevas([
        ...specialSevas,
        {
          id: specialSevas.length + 1,
          ...newSeva,
          isEnabled: newSeva.isEnabled === "Enabled",
        },
      ]);
    }

    closeModal();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-br from-orange-50 to-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">Manage Special Sevas</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600"/>
      </div>

      {/* Add Button */}
      <button
        onClick={() => openModal("add")}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-6"
      >
        Add New Special Seva
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all">
            <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-orange-200 pb-2">
              {modalMode === "view" ? "View Special Seva" : modalMode === "edit" ? "Edit Special Seva" : "Add New Special Seva"}
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Seva Name</label>
                <input
                  type="text"
                  value={newSeva.name}
                  onChange={(e) => setNewSeva({ ...newSeva, name: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={modalMode === "view"}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  value={newSeva.description}
                  onChange={(e) => setNewSeva({ ...newSeva, description: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[100px]"
                  disabled={modalMode === "view"}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newSeva.startDate}
                    onChange={(e) => setNewSeva({ ...newSeva, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    disabled={modalMode === "view"}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Valid Until</label>
                  <input
                    type="date"
                    value={newSeva.validity}
                    onChange={(e) => setNewSeva({ ...newSeva, validity: e.target.value })}
                    className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    disabled={modalMode === "view"}
                  />
                </div>
              </div>
              {modalMode !== "view" && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Status</label>
                  <select
                    value={newSeva.isEnabled}
                    onChange={(e) => setNewSeva({ ...newSeva, isEnabled: e.target.value })}
                    className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  Close
                </button>
                {modalMode !== "view" && (
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-100">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-orange-50 to-orange-100">
              <th className="px-6 py-4 text-left text-orange-700 font-semibold">ID</th>
              <th className="px-6 py-4 text-left text-orange-700 font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-orange-700 font-semibold">Start Date</th>
              <th className="px-6 py-4 text-left text-orange-700 font-semibold">Validity</th>
              <th className="px-6 py-4 text-left text-orange-700 font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-orange-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            {specialSevas.map((seva) => (
              <tr key={seva.id} className="hover:bg-orange-50 transition-colors">
                <td className="px-6 py-4">{seva.id}</td>
                <td className="px-6 py-4 font-medium text-orange-700">{seva.name}</td>
                <td className="px-6 py-4">{formatDate(seva.startDate)}</td>
                <td className="px-6 py-4">{formatDate(seva.validity)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    seva.isEnabled 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {seva.isEnabled ? "Enabled" : "Disabled"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="space-x-2">
                    <button
                      onClick={() => openModal("view", seva)}
                      className="px-4 py-1.5 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openModal("edit", seva)}
                      className="px-4 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {specialSevas.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No Special Sevas Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Back
          </button>
      </div>
    </div>
  );
};

export default ManageSpecialSevas;
