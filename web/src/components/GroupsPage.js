import React, { useEffect, useState } from "react";
import GroupCard from "./GroupCard"; 

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // fetch the recipes from the API endpoint
    fetch("http://localhost:3001/v1/groups")
      .then((response) => response.json())
      .then((data) => {
        // update the state with the recipes data
        setGroups(data.groups);
      })
      .catch((error) => {
        // handle any errors
        console.error(error);
      });
  }, []); // run only once when the component mounts

  return (
    <div className="groups-page">
      <h1>Groups</h1>
      <div className="wrapper">
        {groups.map((group) => {

          let imgURL = "https://media.istockphoto.com/id/1076072784/vector/chef-characters-set-cartoon-chief-cooking-in-restaurant-cook-with-tray-and-different-meals.jpg?s=612x612&w=0&k=20&c=JtMj8qS57-dluXBwRZza9Y96M4dhTroJuGxi6dHLt-s=";

        if(group.image.data.length !== 0){
            // Convert the buffer data to a base64 URL
            const base64URL = btoa(String.fromCharCode(...new Uint8Array(group.image.data)));
    
            // Set the src attribute of the img element to the base64 URL
            imgURL = `data:image/png;base64,${base64URL}`
        }

          return <GroupCard
            key={group.id}
            img= {imgURL}
            groupName={group.groupName}
          />
        })}
      </div>
    </div>
  );
}