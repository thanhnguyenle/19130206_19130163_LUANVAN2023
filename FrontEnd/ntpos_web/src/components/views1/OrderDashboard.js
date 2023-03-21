import React, { useEffect, useState } from "react";
import {
  MDBCardHeader,
  MDBInput,
  MDBCardBody,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBDatatable,
  MDBChart,
} from "mdb-react-ui-kit";

const data = {
  columns: ["Order ID", "Customer", "Date", "Country", "Status", "Amount"],
  rows: [
    ["1", "Ezekiel Gibbs", "11-07-20", "Anguilla", "Paid", "$72.48"],
    ["2", "Richard Fry", "22-06-20", "Netherlands", "Unpaid", "$19.88"],
    ["3", "Forrest Gonzalez", "05-06-20", "Slovenia", "Unpaid", "$72.61"],
    ["4", "Herrod Norman", "13-11-19", "Slovakia", "Paid", "$40.36"],
    [
      "5",
      "Buckminster Richards",
      "11-11-20",
      "Congo (Brazzaville)",
      "Paid",
      "$58.45",
    ],
    [
      "6",
      "Conan Summers",
      "15-11-20",
      "Saint Pierre and Miquelon",
      "Paid",
      "$18.10",
    ],
    [
      "7",
      "Damon Collins",
      "21-06-20",
      "Saint Vincent and The Grenadines",
      "Paid",
      "$50.10",
    ],
    ["8", "Tyler Cobb", "02-04-21", "Thailand", "Unpaid", "$25.76"],
    ["9", "Alvin Nunez", "20-08-21", "Trinidad and Tobago", "Unpaid", "$16.24"],
    ["10", "Emerson Atkinson", "15-10-20", "Syria", "Paid", "$32.15"],
    ["11", "Stewart Pratt", "29-03-20", "Egypt", "Unpaid", "$56.17"],
    ["12", "Cooper Knowles", "01-07-20", "Ukraine", "Unpaid", "$47.89"],
    [
      "13",
      "Jonah Pugh",
      "16-03-20",
      "Heard Island and Mcdonald Islands",
      "Unpaid",
      "$58.31",
    ],
    ["14", "Hedley Roy", "07-01-21", "Cape Verde", "Unpaid", "$11.55"],
    ["15", "Elliott Rasmussen", "15-12-20", "Liechtenstein", "Paid", "$40.44"],
    ["16", "Chandler Waters", "20-08-20", "Israel", "Paid", "$58.81"],
    ["17", "Wayne Owen", "16-06-20", "Lesotho", "Unpaid", "$64.20"],
    ["18", "Uriah Holloway", "12-03-20", "Åland Islands", "Paid", "$53.30"],
    ["19", "Amery Bowman", "13-10-19", "Egypt", "Paid", "$63.97"],
    ["20", "Charles Campbell", "04-11-19", "Niger", "Paid", "$60.03"],
    ["21", "Mark Aguirre", "07-09-19", "Indonesia", "Unpaid", "$40.73"],
    ["22", "Brady Cook", "09-04-21", "Turkmenistan", "Unpaid", "$69.43"],
    ["23", "Evan Keith", "02-07-20", "Botswana", "Paid", "$66.74"],
    ["24", "Hedley Chan", "11-12-19", "Jamaica", "Unpaid", "$65.58"],
    [
      "25",
      "Chester Walker",
      "03-02-20",
      "Congo, the Democratic Republic of the",
      "Paid",
      "$62.13",
    ],
    ["26", "Allen Sheppard", "23-06-20", "Zambia", "Unpaid", "$20.62"],
    [
      "27",
      "Garrison Larson",
      "24-01-20",
      "United States Minor Outlying Islands",
      "Paid",
      "$36.99",
    ],
    ["28", "Blake Stuart", "18-09-19", "Argentina", "Unpaid", "$32.14"],
    ["29", "Isaac Morse", "10-08-20", "Bahrain", "Unpaid", "$62.92"],
    ["30", "Maxwell Barton", "04-04-20", "Djibouti", "Paid", "$6.02"],
    [
      "31",
      "Keegan Frazier",
      "03-11-19",
      "Central African Republic",
      "Unpaid",
      "$81.48",
    ],
    ["32", "Abraham Merritt", "30-07-20", "Mali", "Unpaid", "$28.72"],
    ["33", "Matthew Vaughn", "17-03-21", "Timor-Leste", "Paid", "$81.75"],
    ["34", "Dante Griffin", "15-12-19", "Marshall Islands", "Unpaid", "$33.71"],
    ["35", "Zachary Stewart", "26-10-20", "Korea, North", "Unpaid", "$67.54"],
    ["36", "Joshua Berg", "24-12-19", "Palau", "Unpaid", "$63.99"],
    ["37", "Emery Flores", "05-07-21", "Angola", "Unpaid", "$26.70"],
    ["38", "Tarik Dillon", "01-03-21", "Canada", "Unpaid", "$23.64"],
    ["39", "Acton Blair", "05-08-20", "Bhutan", "Paid", "$68.23"],
    ["40", "Edward Daniels", "08-01-21", "Cayman Islands", "Paid", "$10.66"],
    ["41", "Austin Branch", "12-06-21", "Bahamas", "Paid", "$77.53"],
    ["42", "Theodore Atkinson", "02-12-19", "Saudi Arabia", "Unpaid", "$58.21"],
    [
      "43",
      "Fitzgerald Parsons",
      "09-04-21",
      "Pitcairn Islands",
      "Paid",
      "$68.61",
    ],
    ["44", "Damian Morton", "24-06-20", "Monaco", "Paid", "$47.74"],
    ["45", "Isaiah Berry", "20-11-20", "Bulgaria", "Paid", "$97.60"],
    ["46", "Samson Morrison", "19-10-20", "Belarus", "Paid", "$10.67"],
    ["47", "Xavier Soto", "28-03-20", "Malaysia", "Unpaid", "$81.85"],
    ["48", "Cade Castaneda", "09-08-20", "Egypt", "Paid", "$36.72"],
    ["49", "Ivan Burke", "12-02-21", "Albania", "Unpaid", "$60.59"],
    ["50", "Galvin Christian", "16-10-19", "Mayotte", "Paid", "$94.28"],
    ["51", "Emmanuel Stephenson", "07-01-21", "South Sudan", "Paid", "$99.83"],
    ["52", "Lars Mills", "27-01-21", "Faroe Islands", "Paid", "$84.81"],
    ["53", "Baxter Lopez", "15-07-21", "Myanmar", "Unpaid", "$99.65"],
    [
      "54",
      "Amir Roman",
      "07-10-19",
      "Northern Mariana Islands",
      "Unpaid",
      "$27.39",
    ],
    ["55", "Cole Carey", "03-09-20", "Anguilla", "Paid", "$99.61"],
    ["56", "Ishmael Davenport", "21-10-20", "Tonga", "Unpaid", "$81.94"],
    ["57", "Amal Simon", "24-04-21", "Palau", "Paid", "$30.67"],
    ["58", "Oren Finley", "17-03-20", "Belgium", "Paid", "$77.74"],
    ["59", "Harding Blankenship", "10-12-20", "Saint Martin", "Paid", "$21.76"],
    ["60", "Garrett Logan", "06-04-20", "Antarctica", "Unpaid", "$1.03"],
    ["61", "Ross Wilkinson", "23-04-21", "Niue", "Paid", "$89.59"],
    ["62", "Graiden Curtis", "14-05-21", "Ecuador", "Unpaid", "$1.42"],
    ["63", "Vladimir David", "16-05-21", "Norway", "Unpaid", "$97.09"],
    ["64", "Tad Navarro", "30-12-20", "Sint Maarten", "Paid", "$94.35"],
    ["65", "Stephen Spencer", "11-12-20", "Netherlands", "Paid", "$55.91"],
    ["66", "Salvador Hendricks", "24-11-20", "Namibia", "Unpaid", "$86.97"],
    [
      "67",
      "Tiger Ryan",
      "29-09-19",
      "Saint Pierre and Miquelon",
      "Paid",
      "$52.88",
    ],
    ["68", "Louis Wiggins", "19-03-21", "Grenada", "Paid", "$90.50"],
    ["69", "Gareth Fleming", "08-05-20", "Martinique", "Unpaid", "$80.61"],
    ["70", "Fitzgerald Burris", "10-02-20", "Burkina Faso", "Unpaid", "$45.89"],
    ["71", "Jackson Ingram", "08-08-21", "Korea, North", "Unpaid", "$5.06"],
    ["72", "Porter Barr", "12-01-21", "Bulgaria", "Paid", "$22.54"],
    ["73", "Harlan Mcintyre", "11-04-20", "Togo", "Paid", "$97.43"],
    ["74", "Dalton Olsen", "26-02-20", "Armenia", "Unpaid", "$21.95"],
    ["75", "Sawyer Harper", "25-05-21", "France", "Unpaid", "$91.47"],
    ["76", "Dennis Vaughn", "20-09-20", "Bolivia", "Unpaid", "$45.12"],
    [
      "77",
      "Peter Townsend",
      "11-04-21",
      "Côte D'Ivoire (Ivory Coast)",
      "Paid",
      "$37.22",
    ],
    ["78", "Damian Shelton", "28-01-20", "Samoa", "Unpaid", "$92.59"],
    [
      "79",
      "Hector Cooke",
      "12-01-20",
      "Virgin Islands, United States",
      "Unpaid",
      "$62.38",
    ],
    ["80", "Davis Evans", "23-10-20", "Falkland Islands", "Unpaid", "$8.31"],
    [
      "81",
      "Keane Casey",
      "20-02-20",
      "Saint Vincent and The Grenadines",
      "Unpaid",
      "$24.31",
    ],
    ["82", "Conan Lucas", "20-02-20", "Jersey", "Paid", "$26.51"],
    ["83", "Aladdin Johnson", "15-09-20", "Ethiopia", "Unpaid", "$41.53"],
    [
      "84",
      "Buckminster Stevenson",
      "20-08-21",
      "United Arab Emirates",
      "Unpaid",
      "$1.22",
    ],
    ["85", "Zachery Powers", "15-07-21", "Lesotho", "Unpaid", "$9.17"],
    ["86", "Griffin Knowles", "13-08-20", "Libya", "Paid", "$98.94"],
    ["87", "Yuli Wheeler", "16-06-20", "San Marino", "Unpaid", "$78.86"],
    [
      "88",
      "Garrett Bryant",
      "09-04-20",
      "Côte D'Ivoire (Ivory Coast)",
      "Unpaid",
      "$70.97",
    ],
    ["89", "Hyatt Morse", "10-03-20", "Jersey", "Paid", "$84.41"],
    ["90", "Bradley Dominguez", "11-06-20", "Myanmar", "Unpaid", "$97.88"],
    ["91", "Hayes Norton", "25-10-20", "Falkland Islands", "Unpaid", "$48.18"],
    ["92", "Zahir Sexton", "09-06-20", "Somalia", "Unpaid", "$6.06"],
    ["93", "Burton Duffy", "12-07-20", "Antarctica", "Unpaid", "$56.97"],
    ["94", "Vladimir House", "03-09-19", "Mexico", "Unpaid", "$12.91"],
    ["95", "Timon Fletcher", "20-04-21", "Somalia", "Paid", "$52.38"],
    ["96", "Bernard Love", "11-02-21", "Japan", "Unpaid", "$72.35"],
    ["97", "Damian Gomez", "14-02-20", "Antarctica", "Paid", "$47.64"],
    ["98", "Yuli Richards", "22-04-21", "Morocco", "Unpaid", "$65.10"],
    ["99", "Yardley Rasmussen", "25-09-20", "Bahamas", "Paid", "$33.97"],
    ["100", "Grant Cunningham", "13-03-20", "Indonesia", "Unpaid", "$44.85"],
  ],
};

const OrderDashboard = () => {
  const [selected, setSelected] = useState([]);

  return (
    <MDBContainer>
      <h1 className="h4 text-center py-5 mb-0">Order dashboard</h1>

      <section className="mb-4">
        <MDBCard>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="6" className="mb-4">
                <MDBChart
                  type="line"
                  data={{
                    labels: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday ",
                    ],
                    datasets: [
                      {
                        label: "Sales in $",
                        data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
                      },
                    ],
                  }}
                />
              </MDBCol>

              <MDBCol md="6" className="mb-4">
                <MDBChart
                  type="bar"
                  data={{
                    labels: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday ",
                    ],
                    datasets: [
                      {
                        label: "Number of orders",
                        data: [21, 23, 25, 34, 23, 19, 9],
                      },
                    ],
                  }}
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </section>

      <section>
        <MDBCard>
          <MDBCardBody>
            <MDBDatatable
              search
              selectedRows={selected}
              setSelectedRows={setSelected}
              selectable
              multi
              striped
              data={data}
            />
          </MDBCardBody>
        </MDBCard>
      </section>
    </MDBContainer>
  );
};

export default OrderDashboard;
