export default function RecipeCard(props) {
    return (
      <div className="card">
        <div className="card__body">
          <img src={props.img} class="card__image" />
          <h2 className="card__title">{props.title}</h2>
          <p className="card__cuisine">{props.cuisine}</p>
        </div>
        <button className="btn">View Recipe</button>
      </div>
    );
  }