import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard"; 

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // fetch the recipes from the API endpoint
    fetch("http://localhost:3001/v1/recipes")
      .then((response) => response.json())
      .then((data) => {
        // update the state with the recipes data
        setRecipes(data.recipes);
        console.log(data.recipes)
      })
      .catch((error) => {
        // handle any errors
        console.error(error);
      });
  }, []); // run only once when the component mounts

  return (
    <div className="recipes-page">
      <h1>Recipes</h1>
      <div className="recipes-container">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            img="https://c4.wallpaperflare.com/wallpaper/778/966/360/olives-lettuce-greek-cooking-wallpaper-preview.jpg"
            title={recipe.title}
            cuisine={recipe.cuisine}
          />
        ))}
      </div>
    </div>
  );
}