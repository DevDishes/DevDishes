import React, { useState } from 'react';
import { Plus, X, Upload, ChefHat } from 'lucide-react';

interface AddRecipeProps {
  isLoggedIn: boolean;
  onClose: () => void;
}

const AddRecipe: React.FC<AddRecipeProps> = ({ isLoggedIn, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Other',
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
    prepTime: '',
    servings: 1,
    image: '',
    ingredients: [''],
    instructions: [''],
    tags: ['']
  });

  const categories = ['Healthy', 'Italian', 'Asian', 'Mexican', 'French', 'Seafood', 'Vegetarian', 'Dessert', 'Breakfast', 'Gourmet', 'Other'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'servings' ? parseInt(value) || 1 : value
    }));
  };

  const handleArrayChange = (index: number, value: string, field: 'ingredients' | 'instructions' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'ingredients' | 'instructions' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index: number, field: 'ingredients' | 'instructions' | 'tags') => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in to submit a recipe');
      return;
    }
    
    // Filter out empty items
    const cleanedData = {
      ...formData,
      ingredients: formData.ingredients.filter(item => item.trim()),
      instructions: formData.instructions.filter(item => item.trim()),
      tags: formData.tags.filter(item => item.trim())
    };
    
    console.log('Recipe submitted:', cleanedData);
    alert('Recipe submitted successfully! It will be reviewed before being published.');
    onClose();
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <ChefHat className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to submit your own recipes to DevDishes.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full">
                <ChefHat className="h-6 w-6 text-amber-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Add Your Recipe</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Enter recipe name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent resize-none"
                placeholder="Describe your recipe..."
                required
              />
            </div>

            {/* Recipe Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prep Time</label>
                <input
                  type="text"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="e.g., 30 min"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Servings</label>
                <input
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients *</label>
              <div className="space-y-3">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                      placeholder={`Ingredient ${index + 1}`}
                      required={index === 0}
                    />
                    {formData.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'ingredients')}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('ingredients')}
                  className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Ingredient</span>
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instructions *</label>
              <div className="space-y-3">
                {formData.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-medium mt-2">
                      {index + 1}
                    </div>
                    <textarea
                      value={instruction}
                      onChange={(e) => handleArrayChange(index, e.target.value, 'instructions')}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent resize-none"
                      rows={2}
                      placeholder={`Step ${index + 1}`}
                      required={index === 0}
                    />
                    {formData.instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'instructions')}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-2"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('instructions')}
                  className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Step</span>
                </button>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="space-y-3">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleArrayChange(index, e.target.value, 'tags')}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                      placeholder={`Tag ${index + 1} (e.g., healthy, quick, vegetarian)`}
                    />
                    {formData.tags.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'tags')}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('tags')}
                  className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Tag</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Submit Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;