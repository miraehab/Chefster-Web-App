export default function ImproveSkills(){
    return (
        <div className= "section improve-skills">
            <div className= "col img">
                    <img src={require("../images/img.jpg")} alt="food-image1" />
            </div>
            <div className= "col">
                <h1 className= "title">Improve your Culinary Skills</h1>
                <p className= "skill-item">Learn New Recipes</p>
                <p className= "skill-item">Experiment with Food</p>
                <p className= "skill-item">Learn New Recipes</p>
                <p className= "skill-item">Write your own Recipe</p>
                <p className= "skill-item">Get Cooking Tips</p>
                <button className="btn">Sign Up Now</button>
            </div>
        </div>
    )
}