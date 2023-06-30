export default function GroupCard(props) {
    return (
      <div className="group">
        <div className="group__body">
          <img src={props.img} className="group__image" alt = "group-default"/>
          <h2 className="group__name">{props.groupName}</h2>
        </div>
        <button className="group__btn">View Group</button>
      </div>
    );
  }