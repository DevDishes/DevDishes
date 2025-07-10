import React, { useState } from 'react';
import { Search, Plus, X, ChefHat } from 'lucide-react';
import { recipes, Recipe } from './RecipeData';

const IngredientSearch = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [matchingRecipes, setMatchingRecipes] = useState<Recipe[]>([]);

  // Common ingredients for suggestions
  const commonIngredients = [
    'chicken', 'beef', 'salmon', 'shrimp', 'eggs', 'cheese', 'tomatoes', 'onion', 'garlic',
    'rice', 'pasta', 'potatoes', 'mushrooms', 'spinach', 'carrots', 'bell peppers',
    'flour', 'butter', 'olive oil', 'lemon', 'herbs', 'milk', 'bread', 'avocado'
  ];

  const addIngredient = (ingredient: string) => {
    if (ingredient && !selectedIngredients.includes(ingredient.toLowerCase())) {
      const newIngredients = [...selectedIngredients, ingredient.toLowerCase()];
      setSelectedIngredients(newIngredients);
      setIngredientInput('');
      findMatchingRecipes(newIngredients);
    }
  };

  const removeIngredient = (ingredient: string) => {
    const newIngredients = selectedIngredients.filter(item => item !== ingredient);
    setSelectedIngredients(newIngredients);
    findMatchingRecipes(newIngredients);
  };

  const findMatchingRecipes = (ingredients: string[]) => {
    if (ingredients.length === 0) {
      setMatchingRecipes([]);
      return;
    }

    const matches = recipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
      const matchCount = ingredients.filter(ingredient => 
        recipeIngredients.some(recipeIng => recipeIng.includes(ingredient))
      ).length;
      return matchCount > 0;
    }).sort((a, b) => {
      // Sort by number of matching ingredients (descending)
      const aMatches = ingredients.filter(ingredient => 
        a.ingredients.some(ing => ing.toLowerCase().includes(ingredient))
      ).length;
      const bMatches = ingredients.filter(ingredient => 
        b.ingredients.some(ing => ing.toLowerCase().includes(ingredient))
      ).length;
      return bMatches - aMatches;
    });

    setMatchingRecipes(matches);
  };

  const getMatchPercentage = (recipe: Recipe) => {
    const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
    const matchCount = selectedIngredients.filter(ingredient => 
      recipeIngredients.some(recipeIng => recipeIng.includes(ingredient))
    ).length;
    return Math.round((matchCount / selectedIngredients.length) * 100);
  };

  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <ChefHat className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Recipes by Ingredients
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us what ingredients you have, and we'll suggest delicious recipes you can make right now.
          </p>
        </div>

        {/* Ingredient Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Add an ingredient..."
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addIngredient(ingredientInput)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => addIngredient(ingredientInput)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>

            {/* Common Ingredients */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Popular ingredients:</p>
              <div className="flex flex-wrap gap-2">
                {commonIngredients.filter(ing => !selectedIngredients.includes(ing)).slice(0, 12).map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => addIngredient(ingredient)}
                    className="px-3 py-1 bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-700 rounded-full text-sm transition-colors"
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Ingredients */}
            {selectedIngredients.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-3">Your ingredients:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedIngredients.map((ingredient) => (
                    <div
                      key={ingredient}
                      className="flex items-center space-x-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full"
                    >
                      <span className="text-sm font-medium">{ingredient}</span>
                      <button
                        onClick={() => removeIngredient(ingredient)}
                        className="hover:bg-amber-200 rounded-full p-1 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Matching Recipes */}
        {matchingRecipes.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Recipes you can make ({matchingRecipes.length} found)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {matchingRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {getMatchPercentage(recipe)}% match
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {recipe.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{recipe.name}</h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">{recipe.description}</p>
                    
                    {/* Matching Ingredients */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Matching ingredients:</p>
                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients
                          .filter(ing => selectedIngredients.some(selected => ing.toLowerCase().includes(selected)))
                          .slice(0, 4)
                          .map((ingredient, index) => (
                            <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              {ingredient}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{recipe.prepTime}</span>
                      <span>{recipe.servings} servings</span>
                      <span className="text-amber-600 font-medium">{recipe.difficulty}</span>
                    </div>

                    <button 
                      onClick={() => alert(`View Recipe: ${recipe.name}`)} // Добавлен обработчик onClick
                      className="w-full bg-gray-900 hover:bg-amber-600 text-white py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedIngredients.length > 0 && matchingRecipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes found</h3>
            <p className="text-gray-500">Try adding different ingredients or removing some to find more matches</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientSearch;
