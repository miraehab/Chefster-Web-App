export default function CustomImage({imgSrc}) {
    return(
        <div className= "custom-image">
            <img src={imgSrc} alt={imgSrc}/>
        </div>
    )
}