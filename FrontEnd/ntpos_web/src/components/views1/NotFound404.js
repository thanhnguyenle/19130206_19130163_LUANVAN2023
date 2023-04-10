import React from "react";
import { MDBBtn, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const NotFound404 = () => (
  <MDBContainer>
    <MDBRow>
      <div className="col-12">
        <section className="my-5 text-center">
          <h1 className="display-1">404</h1>

          <h4 className="mb-4">Page not found</h4>

          <p className="mb-0">
            The Page you are looking for doesn't exist or an other error
            eccured.
          </p>
          <p className="mb-4">
            Go back, or ahead over to example.com to choose a new direction.
          </p>
          <Link to="/">
            <MDBBtn>Go back to the homepage</MDBBtn>
          </Link>
        </section>
      </div>
    </MDBRow>
  </MDBContainer>
);

export default NotFound404;
