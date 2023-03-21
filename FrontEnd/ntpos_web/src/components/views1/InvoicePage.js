import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBTable,
} from "mdb-react-ui-kit";

const InvoicePage = () => (
  <MDBContainer className="py-4">
    <section>
      <MDBCard className="mb-4">
        <MDBCardBody className="py-3">
          <MDBRow>
            <MDBCol sm="6" className="text-center text-sm-start">
              <h5 className="mb-3 mb-sm-0 mt-1">Invoice #124190</h5>
            </MDBCol>

            <MDBCol sm="6" className="text-center text-sm-end">
              <MDBBtn type="button" color="danger" className="me-2">
                Pay now
              </MDBBtn>
              <MDBBtn type="button">
                <MDBIcon fas icon="print" className="me-1" />
                Print
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

      <MDBCard className="mb-4">
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="6" className="mb-4 mb-md-0 text-center text-md-start">
              <p>
                <small>From:</small>
              </p>
              <p>
                <strong>Awesome Company Inc</strong>
              </p>
              <p>134 Richardson Ave</p>
              <p>San Francisco, CA 94123</p>
              <p>
                <strong>Invoice date:</strong> November 18, 2020
              </p>
              <p>
                <strong>Due date:</strong> December 2, 2020
              </p>
            </MDBCol>

            <MDBCol md="6" className="text-center text-md-end">
              <h5>
                <small>Invoice No.</small>
                <br />
                <strong>
                  <span className="text-primary">#124190</span>
                </strong>
              </h5>

              <p>
                <small>To:</small>
              </p>
              <p>
                <strong>The Company, Inc</strong>
              </p>
              <p>1-245 East Russel Road</p>
              <p>Munger, MI 48747</p>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

      <MDBCard>
        <MDBCardBody>
          <div className="table-responsive mb-4">
            <MDBTable>
              <thead>
                <tr>
                  <th>Item list</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Tax</th>
                  <th>Total price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MDBootstrap Corporate License</td>
                  <td>1</td>
                  <td>$319</td>
                  <td>$73.37</td>
                  <td>$319</td>
                </tr>
                <tr>
                  <td>Material Design for Wordpress</td>
                  <td>2</td>
                  <td>$69</td>
                  <td>$31.74</td>
                  <td>$138</td>
                </tr>
                <tr>
                  <td>MDBootstrap Portfolio Template Personal Licence</td>
                  <td>1</td>
                  <td>$49</td>
                  <td>$11.27</td>
                  <td>$49</td>
                </tr>
                <tr>
                  <td>MDBootstrap Magazine Corporate Licence</td>
                  <td>1</td>
                  <td>$249</td>
                  <td>$57.27</td>
                  <td>$249</td>
                </tr>
              </tbody>
            </MDBTable>
          </div>

          <ul className="list-unstyled text-end">
            <li>
              <strong>Sub Total:</strong>
              <span className="float-end ms-3">$755</span>
            </li>
            <li>
              <strong>TAX:</strong>
              <span className="float-end ms-3">$173,65</span>
            </li>
            <li>
              <strong>TOTAL:</strong>
              <span className="float-end ms-3">$755</span>
            </li>
          </ul>
        </MDBCardBody>
      </MDBCard>
    </section>
  </MDBContainer>
);

export default InvoicePage;
