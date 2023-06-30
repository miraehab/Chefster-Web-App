
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
  /* useEffect(() => {
    // fetch the recipes from the API endpoint
    fetch(`http://localhost:3001/v1/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // update the state with the recipes data
        setUser(data.user);
      })
      .catch((error) => {
        // handle any errors
        console.error(error);
      });
  }, []); // run only once when the component mounts */

  return (
    <section>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">example@example.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
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