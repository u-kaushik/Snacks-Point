import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Package, List, Menu as MenuIcon, X } from 'lucide-react';
import { foodItems as initialFoodItems } from '../data/mockData';

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('menu');
  const [foodItems, setFoodItems] = useState(initialFoodItems);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDelete = (id: number) => {
    setFoodItems(foodItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button 
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          <button
            onClick={() => {
              setActiveTab('menu');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'menu' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <List className="w-5 h-5 mr-3" />
            Menu Management
          </button>
          <button
            onClick={() => {
              setActiveTab('orders');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'orders' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <Package className="w-5 h-5 mr-3" />
            Order Tracking
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => navigate('/login')}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center">
          <button 
            className="text-gray-600 hover:text-gray-800 mr-4"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">
            {activeTab === 'menu' ? 'Menu Management' : 'Order Tracking'}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {activeTab === 'menu' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 gap-4 sm:gap-0">
                <h2 className="hidden lg:block text-3xl font-bold text-gray-800">Menu Management</h2>
                <button className="w-full sm:w-auto flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Item
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 font-semibold text-gray-600">Image</th>
                        <th className="px-6 py-4 font-semibold text-gray-600">Name</th>
                        <th className="px-6 py-4 font-semibold text-gray-600">Category</th>
                        <th className="px-6 py-4 font-semibold text-gray-600">Price</th>
                        <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foodItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-md object-cover"
                            />
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                          <td className="px-6 py-4 text-gray-600">{item.category}</td>
                          <td className="px-6 py-4 text-gray-600">${item.price}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-3">
                              <button className="text-blue-500 hover:text-blue-700 transition-colors">
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="hidden lg:block text-3xl font-bold text-gray-800 mb-8">Order Tracking</h2>
              <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500 mt-4 lg:mt-0">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">No active orders at the moment.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
