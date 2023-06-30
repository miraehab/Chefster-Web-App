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
      })
      .catch((error) => {
        // handle any errors
        console.error(error);
      });
  }, []); // run only once when the component mounts

  return (
    <div className="recipes-page">
      <h1>Recipes</h1>
      <div className="wrapper">
        {recipes.map((recipe) => {

          let imgURL = "https://img.freepik.com/premium-vector/smiling-chef-cartoon-character_8250-10.jpg?w=360";

        if(recipe.image.data.length !== 0){
            // Convert the buffer data to a base64 URL
            const base64URL = btoa(String.fromCharCode(...new Uint8Array(recipe.image.data)));
    
            // Set the src attribute of the img element to the base64 URL
            imgURL = `data:image/png;base64,${base64URL}`
        }

          return <RecipeCard
            key={recipe.id}
            img= {imgURL}
            title={recipe.title}
            cuisine={recipe.cuisine}
          />
        })}
      </div>
    </div>
  );
}