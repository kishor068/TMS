import React, { useState } from 'react';

const ManageSubSevas = () => {
  const [subSevas, setSubSevas] = useState([
    { id: 1, parentSeva: 'Master Seva 1', deity: 'Lord Shiva', name: 'Sub-Seva 1', price: '500', isEnabled: 'Enabled' },
    { id: 2, parentSeva: 'Special Seva 1', deity: 'Lord Vishnu', name: 'Sub-Seva 2', price: '750', isEnabled: 'Disabled' },
  ]);

  const [newSubSeva, setNewSubSeva] = useState({ parentSeva: '', deity: '', name: '', price: '', isEnabled: 'Enabled' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewSubSeva, setViewSubSeva] = useState(null);
  const [editMode, setEditMode] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewSubSeva({ parentSeva: '', deity: '', name: '', price: '', isEnabled: 'Enabled' });
    setEditMode(null);
  };

  const openViewModal = (subSeva) => {
    setViewSubSeva(subSeva);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewSubSeva(null);
    setIsViewModalOpen(false);
  };

  const addOrEditSubSeva = () => {
    if (!newSubSeva.name.trim() || !newSubSeva.deity.trim()) return;

    if (editMode !== null) {
      // Edit Mode
      setSubSevas(prev => prev.map(subSeva => subSeva.id === editMode ? { ...subSeva, ...newSubSeva } : subSeva));
    } else {
      // Add New Sub-Seva
      setSubSevas([...subSevas, { id: subSevas.length + 1, ...newSubSeva }]);
    }
    closeModal();
  };

  const handleEdit = (id) => {
    const subSevaToEdit = subSevas.find(subSeva => subSeva.id === id);
    if (subSevaToEdit) {
      setNewSubSeva({ ...subSevaToEdit });
      setEditMode(id);
      openModal();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-orange-50 to-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-orange-600">Manage Sub-Sevas</h1>

      {/* Button to Open Add Modal */}
      <button
        onClick={openModal}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-2 px-4 rounded-md hover:bg-gradient-to-r hover:from-orange-600 hover:to-orange-700 transition-colors mb-4"
      >
        Add New Sub-Seva
      </button>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-orange-600">
              {editMode !== null ? "Edit Sub-Seva" : "Add New Sub-Seva"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Parent Seva</label>
                <select
                  value={newSubSeva.parentSeva}
                  onChange={(e) => setNewSubSeva({ ...newSubSeva, parentSeva: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-200 rounded-md"
                >
                  <option value="">--Select--</option>
                  <option value="Master Seva 1">Master Seva 1</option>
                  <option value="Special Seva 1">Special Seva 1</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Select Deity</label>
                <select
                  value={newSubSeva.deity}
                  onChange={(e) => setNewSubSeva({ ...newSubSeva, deity: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-200 rounded-md"
                >
                  <option value="">--Select--</option>
                  <option value="Lord Shiva">Lord Shiva</option>
                  <option value="Lord Vishnu">Lord Vishnu</option>
                  <option value="Goddess Lakshmi">Goddess Lakshmi</option>
                  <option value="Lord Ganesha">Lord Ganesha</option>
                  <option value="Shree Pradhana Devarige">Shree Pradhana Devarige</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Sub-Seva Name</label>
                <input
                  type="text"
                  placeholder="Enter sub-seva name"
                  value={newSubSeva.name}
                  onChange={(e) =>
                    setNewSubSeva({ ...newSubSeva, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-orange-200 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="text"
                  placeholder="Enter price"
                  value={newSubSeva.price}
                  onChange={(e) =>
                    setNewSubSeva({ ...newSubSeva, price: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-orange-200 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={newSubSeva.isEnabled}
                  onChange={(e) =>
                    setNewSubSeva({ ...newSubSeva, isEnabled: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-orange-200 rounded-md"
                >
                  <option value="Enabled">Enabled</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={addOrEditSubSeva}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-md hover:bg-gradient-to-r hover:from-orange-600 hover:to-orange-700 transition-colors"
                >
                  {editMode !== null ? "Save Changes" : "Add Sub-Seva"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewSubSeva && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-orange-600">Sub-Seva Details</h2>
            <div className="space-y-2">
              <p><strong>ID:</strong> {viewSubSeva.id}</p>
              <p><strong>Parent Seva:</strong> {viewSubSeva.parentSeva}</p>
              <p><strong>Deity:</strong> {viewSubSeva.deity}</p>
              <p><strong>Name:</strong> {viewSubSeva.name}</p>
              <p><strong>Price:</strong> ₹{viewSubSeva.price}</p>
              <p><strong>Status:</strong> {viewSubSeva.isEnabled}</p>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={closeViewModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Sevas Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-orange-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-orange-50 to-orange-100">
              <th className="p-4 text-left border-b text-orange-600">ID</th>
              <th className="p-4 text-left border-b text-orange-600">Parent Seva</th>
              <th className="p-4 text-left border-b text-orange-600">Deity</th>
              <th className="p-4 text-left border-b text-orange-600">Name</th>
              <th className="p-4 text-left border-b text-orange-600">Price</th>
              <th className="p-4 text-left border-b text-orange-600">Status</th>
              <th className="p-4 text-left border-b text-orange-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subSevas.map((subSeva) => (
              <tr key={subSeva.id} className="hover:bg-orange-50">
                <td className="p-4 border-b">{subSeva.id}</td>
                <td className="p-4 border-b">{subSeva.parentSeva}</td>
                <td className="p-4 border-b">{subSeva.deity}</td>
                <td className="p-4 border-b">{subSeva.name}</td>
                <td className="p-4 border-b">₹{subSeva.price}</td>
                {/* <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    subSeva.isEnabled 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {subSeva.isEnabled ? "Enabled" : "Disabled"}
                  </span>
                </td> */}
                <td className="px-6 py-4">
  <span
    className={`px-3 py-1 rounded-full text-sm ${
      subSeva.isEnabled === "Enabled"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {subSeva.isEnabled}
  </span>
</td>
                <td className="p-4 border-b space-x-2">
                  <button
                    onClick={() => openViewModal(subSeva)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(subSeva.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {subSevas.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-orange-600">
                  No Sub-Sevas Available
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

export default ManageSubSevas;
