import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedRecipes from './components/FeaturedDishes';
import IngredientSearch from './components/IngredientSearch';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedRecipes />
      <div id="ingredient-search">
        <IngredientSearch />
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;