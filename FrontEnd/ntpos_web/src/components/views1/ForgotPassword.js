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

const ForgotPassword = () => (
  <MDBContainer className="pt-5">
    <MDBRow className="d-flex justify-content-center">
      <MDBCol md="6">
        <MDBCard className="text-center">
          <MDBCardHeader className="p-4">
            <h5 className="mb-0">
              <strong>Forgot Password</strong>
            </h5>
          </MDBCardHeader>
          <MDBCardBody className="p-4">
            <p className="mb-4">
              Enter your email address and we’ll send a link to reset your
              password
            </p>

            <form action="" className="mb-4">
              <MDBInput
                type="email"
                id="emailInput"
                className="mb-4"
                label="Your e-mail address"
              />

              <MDBBtn type="button">Request password</MDBBtn>
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

export default ForgotPassword;
