import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Tag, ShoppingCart, MapPin, Heart, Star, Menu as MenuIcon, X, User, Trash2, LogOut } from 'lucide-react';
import { categories, foodItems } from '../data/mockData';

export default function Menu() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Burger');
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const filteredItems = selectedCategory === 'Favourites'
    ? foodItems.filter((item) => wishlist.includes(item.id))
    : foodItems.filter((item) => item.category === selectedCategory);

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((itemId) => itemId !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const addToCart = (id: number) => {
    setCartItems([...cartItems, id]);
  };

  const removeFromCart = (indexToRemove: number) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden relative">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold italic text-gray-800">
            Snacks<br />
            <span className="text-red-500 text-xl ml-8">Point</span>
          </h1>
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {['About', 'Services', 'Your Orders', 'Wishlists', 'Cart', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full relative">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
          
          {/* Mobile Header Layout */}
          <div className="flex items-center justify-between w-full lg:hidden gap-3">
            <button 
              className="text-gray-600 hover:text-gray-800 flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            
            {/* Centered Search */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-100 border-transparent rounded-full text-sm focus:bg-white focus:border-red-300 focus:ring-2 focus:ring-red-200 outline-none transition-all"
              />
            </div>

            {/* Right Side: Basket then User */}
            <div className="flex items-center gap-2 flex-shrink-0 relative">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <User className="w-6 h-6" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsUserMenuOpen(false)} 
                  />
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold">
                          JD
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">John Doe</p>
                          <p className="text-xs text-gray-500">john.doe@example.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button 
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setSelectedCategory('Favourites');
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
                      >
                        <Heart className="w-4 h-4 mr-3" />
                        My Favourites ({wishlist.length})
                      </button>
                      <button 
                        onClick={() => navigate('/login')}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Header Layout */}
          <div className="hidden lg:flex items-center w-full justify-between">
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 border border-red-200 text-red-500 rounded-full hover:bg-red-50 transition-colors">
                <Search className="w-4 h-4 mr-2" />
                Search
              </button>
              <button className="flex items-center px-4 py-2 border border-red-200 text-red-500 rounded-full hover:bg-red-50 transition-colors">
                <Tag className="w-4 h-4 mr-2" />
                Offers
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="flex items-center px-4 py-2 border border-red-200 text-red-500 rounded-full hover:bg-red-50 transition-colors"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {cartItems.length} Items
              </button>
              <button className="flex items-center px-4 py-2 border border-red-200 text-red-500 rounded-full hover:bg-red-50 transition-colors">
                <MapPin className="w-4 h-4 mr-2" />
                Address
              </button>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors flex items-center"
            >
              <User className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex flex-col lg:flex-row">
          {/* Categories (Mobile/Tablet) */}
          <div className="lg:hidden mb-6">
            <h3 className="text-xl font-bold text-red-400 mb-4">Go For Hunt</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center flex-shrink-0 px-4 py-2 rounded-full transition-colors border ${
                    selectedCategory === category.name 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-6 h-6 rounded-full object-cover mr-2"
                  />
                  <span className={`font-medium text-sm ${
                    selectedCategory === category.name ? 'text-red-500' : 'text-gray-700'
                  }`}>
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Food Items Grid */}
          <div className="flex-1 lg:pr-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-red-400 mb-6 lg:mb-8">{selectedCategory}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-pink-50 rounded-2xl p-4 relative group">
                  <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 rounded-md flex items-center text-xs font-bold z-10">
                    <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                    {item.rating}
                  </div>
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm z-10 hover:bg-gray-50"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wishlist.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                      }`}
                    />
                  </button>
                  <div className="aspect-square rounded-full overflow-hidden mb-4 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 font-medium">Price : $ {item.price}</p>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 bg-red-500 text-white px-3 py-1 rounded-md text-sm transition-opacity"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories Sidebar (Desktop) */}
          <div className="hidden lg:block w-64 pl-8 border-l border-gray-200">
            <h3 className="text-2xl font-bold text-red-400 mb-6">Go For Hunt</h3>
            <div className="space-y-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                    selectedCategory === category.name ? 'bg-red-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-10 h-10 rounded-full object-cover mr-4"
                  />
                  <span className={`font-medium ${
                    selectedCategory === category.name ? 'text-red-500' : 'text-gray-700'
                  }`}>
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Overlay */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div 
              className="fixed inset-0 bg-black/50 transition-opacity" 
              onClick={() => setIsCartOpen(false)} 
            />
            <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2 text-red-500" />
                  Your Cart
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                    <ShoppingCart className="w-16 h-16 text-gray-300" />
                    <p className="text-lg">Your cart is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-red-500 hover:text-red-600 font-medium"
                    >
                      Continue browsing
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((id, index) => {
                      const item = foodItems.find(f => f.id === id);
                      if (!item) return null;
                      return (
                        <div key={index} className="flex items-center gap-4 bg-white">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-20 h-20 rounded-xl object-cover shadow-sm" 
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                            <p className="text-red-500 font-bold">${item.price}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(index)} 
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-between mb-2 text-gray-600">
                    <span>Subtotal</span>
                    <span>${cartItems.reduce((total, id) => total + (foodItems.find(f => f.id === id)?.price || 0), 0)}</span>
                  </div>
                  <div className="flex justify-between mb-4 text-gray-600">
                    <span>Delivery Fee</span>
                    <span>$5</span>
                  </div>
                  <div className="flex justify-between mb-6 font-bold text-xl text-gray-800">
                    <span>Total</span>
                    <span>${cartItems.reduce((total, id) => total + (foodItems.find(f => f.id === id)?.price || 0), 0) + 5}</span>
                  </div>
                  <button className="w-full py-4 bg-red-500 text-white rounded-xl font-bold text-lg hover:bg-red-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
