export default function RecipeCard(props) {
    return (
      <div className="card">
        <div className="card__body">
          <img src={props.img} className="card__image" alt = "recipe-default"/>
          <h2 className="card__title">{props.title}</h2>
          <p className="card__cuisine">{props.cuisine}</p>
        </div>
        <button className="card__btn">View Recipe</button>
      </div>
    );
  }