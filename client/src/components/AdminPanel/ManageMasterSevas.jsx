import React, { useState } from 'react';

const ManageMasterSevas = () => {
  const [masterSevas, setMasterSevas] = useState([
    { id: 1, name: 'Abhishekam', description: 'Ritual bathing of the deity', isEnabled: true },
    { id: 2, name: 'Archanai', description: 'Offering prayers and flowers', isEnabled: false },
  ]);

  const [newSeva, setNewSeva] = useState({ name: '', description: '', isEnabled: 'Enabled' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSeva, setSelectedSeva] = useState(null);
  const [editMode, setEditMode] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewSeva({ name: '', description: '', isEnabled: 'Enabled' });
    setEditMode(null);
  };

  const openViewModal = (seva) => {
    setSelectedSeva(seva);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedSeva(null);
    setIsViewModalOpen(false);
  };

  const addOrEditSeva = () => {
    if (!newSeva.name.trim()) return;

    const isEnabled = newSeva.isEnabled === 'Enabled';

    if (editMode !== null) {
      // Edit Mode
      setMasterSevas((prev) =>
        prev.map((seva) =>
          seva.id === editMode ? { ...seva, ...newSeva, isEnabled } : seva
        )
      );
    } else {
      // Add New Seva
      setMasterSevas([ ...masterSevas, { id: masterSevas.length + 1, ...newSeva, isEnabled } ]);
    }

    closeModal();
  };

  const handleEdit = (id) => {
    const sevaToEdit = masterSevas.find((seva) => seva.id === id);
    if (sevaToEdit) {
      setNewSeva({ name: sevaToEdit.name, description: sevaToEdit.description, isEnabled: sevaToEdit.isEnabled ? 'Enabled' : 'Disabled' });
      setEditMode(id);
      openModal();
    }
  };

  const handleEnableDisable = (id) => {
    setMasterSevas((prev) =>
      prev.map((seva) =>
        seva.id === id ? { ...seva, isEnabled: !seva.isEnabled } : seva
      )
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-orange-50 to-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-orange-600">Manage Master Sevas</h1>

      {/* Button to Open Add Modal */}
      <button
        onClick={openModal}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-2 px-4 rounded-md hover:bg-gradient-to-r hover:from-orange-600 hover:to-orange-700 transition-colors mb-4"
      >
        Add New Master Seva
      </button>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-orange-600">
              {editMode !== null ? 'Edit Master Seva' : 'Add New Master Seva'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Seva Name</label>
                <input
                  type="text"
                  placeholder="Enter seva name"
                  value={newSeva.name}
                  onChange={(e) => setNewSeva({ ...newSeva, name: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-200 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  placeholder="Enter seva description"
                  value={newSeva.description}
                  onChange={(e) => setNewSeva({ ...newSeva, description: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-200 rounded-md min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={newSeva.isEnabled}
                  onChange={(e) => setNewSeva({ ...newSeva, isEnabled: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-200 rounded-md"
                >
                  <option>Enabled</option>
                  <option>Disabled</option>
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
                  onClick={addOrEditSeva}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-md hover:bg-gradient-to-r hover:from-orange-600 hover:to-orange-700 transition-colors"
                >
                  {editMode !== null ? 'Save Changes' : 'Add Seva'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedSeva && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-orange-600">Master Seva Details</h2>
            <div className="space-y-2">
              <p>
                <strong>ID:</strong> {selectedSeva.id}
              </p>
              <p>
                <strong>Name:</strong> {selectedSeva.name}
              </p>
              <p>
                <strong>Description:</strong> {selectedSeva.description}
              </p>
              <p>
                <strong>Status:</strong> {selectedSeva.isEnabled ? 'Enabled' : 'Disabled'}
              </p>
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

      {/* Master Sevas Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-orange-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-orange-50 to-orange-100">
              <th className="p-4 text-left border-b text-orange-600">ID</th>
              <th className="p-4 text-left border-b text-orange-600">Name</th>
              <th className="p-4 text-left border-b text-orange-600">Description</th>
              <th className="p-4 text-left border-b text-orange-600">Status</th>
              <th className="p-4 text-left border-b text-orange-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {masterSevas.map((seva) => (
              <tr key={seva.id} className="hover:bg-orange-50">
                <td className="p-4 border-b">{seva.id}</td>
                <td className="p-4 border-b">{seva.name}</td>
                <td className="p-4 border-b">{seva.description}</td>
                <td className="p-4 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      seva.isEnabled
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {seva.isEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </td>
                <td className="p-4 border-b space-x-2">
                  <button
                    onClick={() => openViewModal(seva)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(seva.id)}
                    className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600"
                  >
                    Edit
                  </button>
                  {/* <button
                    onClick={() => handleEnableDisable(seva.id)}
                    className={`${
                      seva.isEnabled ? 'bg-red-500' : 'bg-green-500'
                    } text-white px-3 py-1 rounded-md hover:bg-opacity-80`}
                  >
                    {seva.isEnabled ? 'Disable' : 'Enable'}
                  </button> */}
                  
                </td>
              </tr>
            ))}
            {masterSevas.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No Master Sevas Available
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

export default ManageMasterSevas;
