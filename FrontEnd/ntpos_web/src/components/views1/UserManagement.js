import { MDBCard, MDBCardBody, MDBContainer } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { MDBTableEditor } from "mdb-react-table-editor";

const UserManagement = () => {
  const advancedColumns = [
    {
      width: 250,
      label: "Company",
      field: "company",
    },
    {
      width: 250,
      sort: false,
      defaultValue: "Warsaw",
      options: ["London", "Warsaw", "New York"],
      inputType: "select",
      label: "Office",
      field: "office",
    },
    {
      width: 250,
      inputType: "number",
      defaultValue: 1,
      label: "Employees",
      field: "employees",
    },
    {
      width: 100,
      defaultValue: false,
      inputType: "checkbox",
      label: "International",
      field: "international",
    },
  ];

  const advancedRows = [
    {
      company: "Smith & Johnson",
      office: "London",
      employees: 30,
      international: true,
    },
    {
      company: "P.J. Company",
      office: "London",
      employees: 80,
      international: false,
    },
    {
      company: "Food & Wine",
      office: "London",
      employees: 12,
      international: false,
    },
    {
      company: "IT Service",
      office: "London",
      employees: 17,
      international: false,
    },
    {
      company: "A. Jonson Gallery",
      office: "London",
      employees: 4,
      international: false,
    },
    {
      company: "F.A. Architects",
      office: "London",
      employees: 4,
      international: false,
    },
  ];

  const [modalData, setModalData] = useState({
    columns: advancedColumns,
    rows: advancedRows,
  });

  return (
    <MDBContainer>
      <h1 className="h5 text-center py-5 mb-0">User management</h1>
      <MDBCard>
        <MDBCardBody>
          <MDBTableEditor
            modal
            data={modalData}
            entriesOptions={[5, 10, 15]}
            setData={(e) => setModalData({ ...modalData, rows: e })}
          />
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default UserManagement;
