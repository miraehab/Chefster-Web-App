
import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import GroupCard from './GroupCard';

export default function UserProfile() {
  const [groups, setGroups] = useState([]);
  const [user, setUser] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  let imgURL = "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg";

  /* useEffect(() => {
    // fetch the recipes from the API endpoint
    fetch("http://localhost:3001/v1/users/membership")
      .then((response) => response.json())
      .then((data) => {
        // update the state with the recipes data
        setGroups(data.userGroups);
      })
      .catch((error) => {
        // handle any errors
        console.error(error);
      });
  }, []); // run only once when the component mounts */
  useEffect(() => {
    fetch(`http://localhost:3001/v1/users/${userId}`, {headers: {Authorization: `Bearer ${token}`}})
      .then((response) => response.json())
      .then((data) => {
        if(data.error){
          throw data.error
        } 

        setUser(data.user);

        // Update the image if exist
        if(data.user.image.data.length !== 0){
          // Convert the buffer data to a base64 URL
          const base64URL = btoa(String.fromCharCode(...new Uint8Array(data.user.image.data)));

          // Set the src attribute of the img element to the base64 URL
          imgURL = `data:image/png;base64,${base64URL}`
        }
      })
      .catch((error) => {
        // handle any errors
        console.error(error);
      });
  }, []);
  
  console.log()


  return (
    <section>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={imgURL}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">Username</p>
                <p className="text-muted mb-4">{user.username}</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>first Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.firstName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Last Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.lastName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {/* <h2>Your Groups: </h2>
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
      </div> */}
    </section>
  );
}