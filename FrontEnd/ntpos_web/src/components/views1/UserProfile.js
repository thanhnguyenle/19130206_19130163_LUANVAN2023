import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBContainer,
  MDBInput,
  MDBTextArea,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { MDBFileUpload } from "mdb-react-file-upload";

const UserProfile = () => (
  <MDBContainer>
    <h1 className="h5 text-center py-5 mb-0">User profile</h1>
    <section>
      <MDBRow>
        <MDBCol md="8" className="mb-4 mb-md-0">
          <MDBCard className="mb-4">
            <MDBCardHeader className="card-header py-3">
              <strong>Edit profile</strong>
            </MDBCardHeader>
            <MDBCardBody className="text-center">
              <div className="mb-3">
                <strong>Profile photo</strong>
              </div>

              <form action="">
                <div className="d-flex justify-content-center mb-4">
                  <MDBFileUpload defaultFile="https://mdbootstrap.com/img/new/avatars/1.jpg" />
                </div>
                <MDBInput
                  className="mb-4"
                  label="Name"
                  defaultValue="John Doe"
                />

                <MDBInput
                  type="email"
                  className="mb-4"
                  label="Email"
                  defaultValue="johndoe@gmail.com"
                />

                <MDBInput
                  className="mb-4"
                  label="Name"
                  defaultValue="Founder"
                />

                <MDBTextArea
                  rows={4}
                  className="mb-4"
                  label="Description"
                  defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ullam nihil impedit. Porro minus nemo nobis maiores numquam tempora architecto a, nisi consectetur, expedita illum, debitis aliquam incidunt molestias eveniet.
                  "
                />

                <MDBBtn type="button" className="mb-2">
                  Update profile
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>

          <MDBCard>
            <MDBCardHeader className="py-3">
              <strong>Change password</strong>
            </MDBCardHeader>
            <MDBCardBody className="text-center pt-4">
              <form action="">
                <MDBInput className="mb-4" label="New password" />
                <MDBInput className="mb-4" label="Confirm password" />

                <MDBBtn type="button" className="mb-2">
                  Apply
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="4" className="mb-4 mb-md-0">
          <MDBCard className="card">
            <div className="card-body text-center">
              <img
                className="rounded-circle shadow-1 mb-3"
                src="https://mdbootstrap.com/img/new/avatars/1.jpg"
                alt="avatar"
                style={{ width: "150px" }}
              />

              <p className="mb-1">
                <strong>John Doe</strong>
              </p>
              <p className="mb-2">
                <small>Founder</small>
              </p>
              <p className="mb-2 text-muted">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
                deserunt pariatur voluptatem consequuntur! Aliquid, placeat
                nobis odit delectus ad est, nemo repudiandae possimus
                repellendus voluptas debitis, numquam modi asperiores beatae?
              </p>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </section>
  </MDBContainer>
);

export default UserProfile;
