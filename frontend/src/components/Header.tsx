import React, { useState } from 'react';
import { Menu, X, ChefHat, Search, Plus } from 'lucide-react';
import Login from './Login';
import AddRecipe from './AddRecipe';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from your auth system

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-amber-600" />
              <span className="text-2xl font-bold text-gray-900">DevDishes</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                Home
              </a>
              <a href="#recipes" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                Recipes
              </a>
              <a href="#ingredient-search" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                Find by Ingredients
              </a>
            </nav>

            {/* Search and Login */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent w-64"
                />
              </div>
              {isLoggedIn && (
                <button
                  onClick={() => setIsAddRecipeOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Recipe</span>
                </button>
              )}
              <button
               onClick={() => setIsLoginOpen(true)}
                className={`px-3 py-1.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  isLoggedIn 
                    ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                {isLoggedIn ? 'Profile' : 'Sign In'}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-amber-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  />
                </div>
              </div>
              <nav className="flex flex-col space-y-4">
                <a href="#home" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                  Home
                </a>
                <a href="#recipes" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                  Recipes
                </a>
                <a href="#ingredient-search" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                  Find by Ingredients
                </a>
                {isLoggedIn && (
                  <button
                    onClick={() => setIsAddRecipeOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 w-fit flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Recipe</span>
                  </button>
                )}
                <button
                 onClick={() => setIsLoginOpen(true)}
                className={`px-3 py-1.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  isLoggedIn 
                    ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                {isLoggedIn ? 'Profile' : 'Sign In'}
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Login Modal */}
      {isLoginOpen && (
        <Login 
          onClose={() => setIsLoginOpen(false)} 
          onLogin={() => setIsLoggedIn(true)}
        />
      )}
      
      {/* Add Recipe Modal */}
      {isAddRecipeOpen && (
        <AddRecipe 
          isLoggedIn={isLoggedIn}
          onClose={() => setIsAddRecipeOpen(false)} 
        />
      )}
    </>
  );
};

export default Header;
