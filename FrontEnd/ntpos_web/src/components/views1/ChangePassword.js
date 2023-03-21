import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import React from "react";

const ChangePassword = () => (
  <MDBContainer className="pt-5">
    <MDBRow className="row d-flex justify-content-center">
      <MDBCol md="6">
        <MDBCard className="text-center">
          <MDBCardHeader className="p-4">
            <h5 className="mb-0">
              <strong>Change password</strong>
            </h5>
          </MDBCardHeader>
          <MDBCardBody className="p-4">
            <p className="mb-4">Set a new password</p>

            <form action="" className="mb-4">
              <MDBInput label="New password" className="mb-4" />
              <MDBInput label="Confirm password" className="mb-4" />

              <MDBBtn type="button">Apply</MDBBtn>
            </form>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <u>
                <a href="">Back to Log In</a>
              </u>

              <u>
                <a href="">Register</a>
              </u>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);

export default ChangePassword;
