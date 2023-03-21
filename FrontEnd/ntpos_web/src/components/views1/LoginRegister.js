import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCol,
  MDBCardBody,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
  MDBTabsContent,
  MDBIcon,
  MDBCheckbox,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";

const LoginRegister = () => {
  const [fillActive, setFillActive] = useState("tab-login");

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  return (
    <MDBContainer className="pt-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody className="p-4">
              <MDBTabs pills fill className="mb-3">
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleFillClick("tab-login")}
                    active={fillActive === "tab-login"}
                  >
                    Login
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleFillClick("tab-register")}
                    active={fillActive === "tab-register"}
                  >
                    Register
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <MDBTabsContent>
                <MDBTabsPane
                  show={fillActive === "tab-login"}
                  aria-labelledby="tab-login"
                >
                  <form>
                    <div className="text-center mb-3">
                      <p>Sign in with:</p>
                      <MDBBtn type="button" floating className="mx-1">
                        <MDBIcon fab icon="facebook-f" />
                      </MDBBtn>

                      <MDBBtn type="button" floating className="mx-1">
                        <MDBIcon fab icon="google" />
                      </MDBBtn>

                      <MDBBtn type="button" floating className="mx-1">
                        <MDBIcon fab icon="twitter" />
                      </MDBBtn>

                      <MDBBtn type="button" floating className="mx-1">
                        <MDBIcon fab icon="github" />
                      </MDBBtn>
                    </div>

                    <p className="text-center">or:</p>

                    <MDBInput
                      className="mb-4"
                      type="email"
                      id="loginName"
                      label="Email or username"
                    />

                    <MDBInput
                      className="mb-4"
                      type="password"
                      id="loginPassword"
                      label="Password"
                    />

                    <MDBRow className="mb-4">
                      <MDBCol md="6" className="d-flex justify-content-center">
                        <MDBCheckbox
                          className=" mb-3 mb-md-0"
                          defaultChecked
                          label=" Remember me"
                        />
                      </MDBCol>

                      <MDBCol md="6" className="d-flex justify-content-center">
                        <a href="#!">Forgot password?</a>
                      </MDBCol>
                    </MDBRow>

                    <MDBBtn type="submit" block className="mb-4">
                      Sign in
                    </MDBBtn>

                    <div className="text-center">
                      <p>
                        Not a member? <a href="#!">Register</a>
                      </p>
                    </div>
                  </form>
                </MDBTabsPane>
                <MDBTabsPane
                  show={fillActive === "tab-register"}
                  aria-labelledby="tab-register"
                >
                  <form>
                    <div className="text-center mb-3">
                      <p>Sign up with:</p>
                      <MDBBtn type="button" floating className="mx-1">
                        <MDBIcon fab icon="facebook-f" />
                      </MDBBtn>

                      <MDBBtn type="button" floating className="mx-1">
                        <MDBIcon fab icon="google" />
                      </MDBBtn>

                      <MDBBtn type="button" floating className="mx-1">
                        <MDBIcon fab icon="twitter" />
                      </MDBBtn>

                      <MDBBtn type="button" floating className="mx-1">
                        <MDBIcon fab icon="github" />
                      </MDBBtn>
                    </div>

                    <p className="text-center">or:</p>

                    <MDBInput
                      className="mb-4"
                      type="text"
                      id="registerName"
                      label="Name"
                    />

                    <MDBInput
                      className="mb-4"
                      type="text"
                      id="registerUsername"
                      label="Username"
                    />

                    <MDBInput
                      className="mb-4"
                      type="email"
                      id="registerEmail"
                      label="Email"
                    />

                    <MDBInput
                      className="mb-4"
                      type="password"
                      id="registerPassword"
                      label="Password"
                    />

                    <MDBInput
                      className="mb-4"
                      type="password"
                      id="registerRepeatPassword"
                      label="Repeat password"
                    />

                    <MDBCheckbox
                      wrapperClass="d-flex justify-content-center mb-4"
                      defaultChecked
                      label="I have read and agree to the terms"
                    />

                    <MDBBtn type="submit" block className="mb-3">
                      Sign in
                    </MDBBtn>
                  </form>
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginRegister;
