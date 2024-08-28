import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const myRef = useRef(null);
  useEffect(() => {
    const fetchedData = fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=ea8ff6fe&app_key=5bf25c6587a02d9d794aca783ff00719`
    )
      .then((res) => res.json())
      .then((data) => {
        setRecipeData(data.hits);
      });
  }, [query]);

  const handleclick = () => {
    setQuery(myRef.current.value);
  };
  return (
    <>
      <div className="container">
        <div className="inputBtn">
          <input type="text" placeholder="Enter ingrediant" ref={myRef} />
          <button onClick={handleclick}>Find Reciepe</button>
        </div>
        <div className="recipe-list">
          {recipeData.map((recipe, index) => (
            <div className="card" key={index}>
              <div className="card-image-container">
                <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              </div>
              <div className="content">
                <p className="card-title">{recipe.recipe.label}</p>
                <p className="card-des">
                  {recipe.recipe.source} - {recipe.recipe.calories.toFixed(2)}{" "}
                  kcal
                </p>
                <p>Ingredients:</p>
                <ul>
                  {recipe.recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient.text}</li>
                  ))}
                </ul>
                <a
                  href={recipe.recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Recipe
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
