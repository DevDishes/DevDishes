import React from 'react';
import { ChefHat } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-8 w-8 text-amber-600" />
              <span className="text-2xl font-bold">DevDishes</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your ultimate destination for tested recipes, cooking tips, and culinary inspiration. Making great cooking accessible to everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#recipes" className="text-gray-400 hover:text-white transition-colors">Recipes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Recipe Collections</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Popular Recipes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New Recipes</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Healthy Recipes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Italian Cuisine</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Desserts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Seafood</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Quick Meals</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cooking Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kitchen Basics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ingredient Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Recipe Videos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Meal Planning</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 DevDishes. All rights reserved. Made with ❤️ for home cooks everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;