import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Navigation from './Navigation';
import Header from './Header';
import About from './About';
import Recipe from './Recipe';
import Footer from './Footer';
import './App.css';

const App = () => {
  const APP_ID = "634e01ef";
  const APP_KEY = "290c17555ad20b9f02fbd2a70843b950	";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState([]);
  

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();

    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    
    <div className="App">
      <Navigation />
     
      <Header />

      <Routes>
      <Route path="/about" element={<About />} />
    </Routes>
      
      <form onSubmit={getSearch} className="search-form">
        <h2>Search</h2>
        <input className="form-control" type="text" value={search} onChange={updateSearch} />
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
