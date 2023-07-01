import ImproveSkills from "./ImproveSkills"

export default function HomePage() { 
    return(
        <div className="container">
            <div className= "section home">
                <div className= "col">
                    <h1 className= "title">Cook, share, and discover with Chefster</h1>
                    <button className="btn">Explore Now</button>
                </div>
                <div className= "col gallery">
                    <div className= "custom-image">
                        <img src={require("../images/img1.jpg")} alt="food-image1" />
                    </div>
                    <div className= "custom-image">
                        <img src={require("../images/img2.jpg")} alt="food-image2" />
                    </div>
                    <div className= "custom-image">
                        <img src={require("../images/img3.jpg")} alt="food-image3" />
                    </div>
                    <div className= "custom-image">
                        <img src={require("../images/img4.jpg")} alt="food-image4" />
                    </div>
                    <div className= "custom-image">
                        <img src={require("../images/img5.jpg")} alt="food-image5" />
                    </div>
                    <div className= "custom-image">
                        <img src={require("../images/img6.jpg")} alt="food-image6" />
                    </div>
                    <div className= "custom-image">
                        <img src={require("../images/img7.jpg")} alt="food-image7" />
                    </div>
                    <div className= "custom-image">
                        <img src={require("../images/img8.jpg")} alt="food-image8"/>
                    </div>
                    <div className= "custom-image">
                        <img src={require("../images/img9.jpg")} alt="food-image9"/>
                    </div>
                </div>
            </div>
            <ImproveSkills/>
        </div>
    )
}