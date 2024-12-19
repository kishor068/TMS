import React, { useState } from 'react';

const ManageDeity = () => {
  const [deities, setDeities] = useState([
    { id: 1, name: 'Ganesha', isEnabled: true, specialOccasions: true },
    { id: 2, name: 'Lakshmi', isEnabled: false, specialOccasions: false },
  ]);

  const [newDeity, setNewDeity] = useState({ name: '', isEnabled: 'Enabled', specialOccasions: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDeity, setSelectedDeity] = useState(null);
  const [editMode, setEditMode] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewDeity({ name: '', isEnabled: 'Enabled', specialOccasions: false });
    setEditMode(null);
  };

  const openViewModal = (deity) => {
    setSelectedDeity(deity);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedDeity(null);
    setIsViewModalOpen(false);
  };

  const addOrEditDeity = () => {
    if (!newDeity.name.trim()) return;

    const isEnabled = newDeity.isEnabled === 'Enabled';

    if (editMode !== null) {
      setDeities((prev) =>
        prev.map((deity) =>
          deity.id === editMode ? { ...deity, ...newDeity, isEnabled } : deity
        )
      );
    } else {
      setDeities([...deities, { id: deities.length + 1, ...newDeity, isEnabled }]);
    }

    closeModal();
  };

  const handleEdit = (id) => {
    const deityToEdit = deities.find((deity) => deity.id === id);
    if (deityToEdit) {
      setNewDeity({
        name: deityToEdit.name,
        isEnabled: deityToEdit.isEnabled ? 'Enabled' : 'Disabled',
        specialOccasions: deityToEdit.specialOccasions,
      });
      setEditMode(id);
      openModal();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-orange-50 to-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-orange-600">Manage Deities</h1>

      {/* Add Deity Button */}
      <button
        onClick={openModal}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-2 px-4 rounded-md hover:bg-gradient-to-r hover:from-orange-600 hover:to-orange-700 transition-colors mb-4"
      >
        Add Deity
      </button>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-orange-600">
              {editMode !== null ? 'Edit Deity' : 'Add New Deity'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Deity Name</label>
                <input
                  type="text"
                  placeholder="Enter deity name"
                  value={newDeity.name}
                  onChange={(e) => setNewDeity({ ...newDeity, name: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-200 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={newDeity.isEnabled}
                  onChange={(e) => setNewDeity({ ...newDeity, isEnabled: e.target.value })}
                  className="w-full px-4 py-2 border border-orange-200 rounded-md"
                >
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Special Occasions</label>
                <input
                  type="checkbox"
                  checked={newDeity.specialOccasions}
                  onChange={(e) => setNewDeity({ ...newDeity, specialOccasions: e.target.checked })}
                  className="mr-2"
                />
                <span>Associated with special occasions</span>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={addOrEditDeity}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-md hover:bg-gradient-to-r hover:from-orange-600 hover:to-orange-700 transition-colors"
                >
                  {editMode !== null ? 'Save Changes' : 'Add Deity'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedDeity && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-orange-600">Deity Details</h2>
            <div className="space-y-2">
              <p>
                <strong>ID:</strong> {selectedDeity.id}
              </p>
              <p>
                <strong>Name:</strong> {selectedDeity.name}
              </p>
              <p>
                <strong>Status:</strong> {selectedDeity.isEnabled ? 'Enabled' : 'Disabled'}
              </p>
              <p>
                <strong>Special Occasions:</strong> {selectedDeity.specialOccasions ? 'Yes' : 'No'}
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

      {/* Deities Table */}
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white border border-orange-200 shadow-md rounded-lg">
          <thead>
            <tr className="text-left bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Special Occasions</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deities.map((deity) => (
              <tr key={deity.id} className="border-b border-orange-200 hover:bg-orange-50">
                <td className="px-6 py-4">{deity.id}</td>
                <td className="px-6 py-4">{deity.name}</td>
                <td className="px-6 py-4">{deity.isEnabled ? 'Enabled' : 'Disabled'}</td>
                <td className="px-6 py-4">{deity.specialOccasions ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openViewModal(deity)}
                     className="bg-green-500 text-white px-3 py-1  mx-3 rounded-md hover:bg-green-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(deity.id)}
                  className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors mt-4"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ManageDeity;
