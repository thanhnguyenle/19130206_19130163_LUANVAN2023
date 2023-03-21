import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBCol,
  MDBChart,
} from "mdb-react-ui-kit";

const SEODashboard = () => {
  const devicesChartOptions = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10,
        },
      },
      datalabels: {
        formatter: (value) => {
          let sum = 0;
          let dataArr = devices1ChartData.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "white",
        labels: {
          title: {
            font: {
              size: "9",
            },
          },
        },
      },
    },
  };
  const devices1ChartData = {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
      {
        label: "Traffic",
        data: [2112, 2343, 2545],
        backgroundColor: [
          "rgba(63, 81, 181, 0.5)",
          "rgba(77, 182, 172, 0.5)",
          "rgba(66, 133, 244, 0.5)",
        ],
      },
    ],
  };
  const devices2ChartData = {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
      {
        label: "Traffic",
        data: [2112, 2943, 1545],
        backgroundColor: [
          "rgba(63, 81, 181, 0.5)",
          "rgba(77, 182, 172, 0.5)",
          "rgba(66, 133, 244, 0.5)",
        ],
      },
    ],
  };

  return (
    <MDBContainer>
      <h1 className="h3 text-center py-5 mb-0">SEO dashboard</h1>

      <section>
        <MDBRow>
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBRow>
              <MDBCol lg="6" className="mb-4">
                <MDBCard className="text-center">
                  <MDBCardHeader className="bg-light border-0">
                    <strong>Indexed Pages on Google</strong>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-2">Unique pages</p>
                    <h5>34</h5>

                    <hr />

                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="mb-2">
                          <small>Percentage change</small>
                        </p>
                        <p className="mb-2 text-success">
                          <i className="fas fa-caret-up me-1"></i>
                          <span>3.0%</span>
                        </p>
                      </div>
                      <div>
                        <p className="mb-2">
                          <small>Absolute change</small>
                        </p>
                        <p className="mb-2 text-success">
                          <i className="fas fa-caret-up me-1"></i>
                          <span>1</span>
                        </p>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol lg="6" className="mb-4">
                <MDBCard className="text-center">
                  <MDBCardHeader className="bg-light border-0">
                    <strong>Indexed Queries on Google</strong>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-2">Unique Keywords</p>
                    <h5>860</h5>

                    <hr />

                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="mb-2">
                          <small>Percentage change</small>
                        </p>
                        <p className="mb-2 text-danger">
                          <i className="fas fa-caret-down me-1"></i>
                          <span>-12.7%</span>
                        </p>
                      </div>
                      <div>
                        <p className="mb-2">
                          <small>Absolute change</small>
                        </p>
                        <p className="mb-2 text-danger">
                          <i className="fas fa-caret-down me-1"></i>
                          <span>-125</span>
                        </p>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol lg="6" className="mb-4">
                <MDBCard>
                  <MDBCardBody>
                    <MDBChart
                      type="doughnut"
                      data={devices1ChartData}
                      options={devicesChartOptions}
                      datalabels
                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol lg="6">
                <MDBCard>
                  <MDBCardBody>
                    <MDBChart
                      type="doughnut"
                      data={devices2ChartData}
                      options={devicesChartOptions}
                      datalabels
                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>

          <MDBCol lg="6" className="mb-4">
            <MDBCard>
              <MDBCardBody>
                <div className="chart" style={{ height: "390px" }}>
                  <MDBChart
                    type="line"
                    data={{
                      labels: [
                        "06.08.2020",
                        "07.08.2020",
                        "08.08.2020",
                        "09.08.2020",
                        "10.08.2020",
                        "11.08.2020",
                        "12.08.2020",
                      ],
                      datasets: [
                        {
                          label: "Unique pages",
                          data: [25, 49, 40, 21, 56, 75, 30],
                        },
                        {
                          label: "Unique queries",
                          data: [58, 18, 30, 59, 46, 77, 90],
                          backgroundColor: "rgba(66, 133, 244, 0.0)",
                          borderColor: "#33b5e5",
                          pointBorderColor: "#33b5e5",
                          pointBackgroundColor: "#33b5e5",
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          stacked: false,
                        },
                      },
                    }}
                  />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>

      <section className="mb-4">
        <MDBCard>
          <MDBCardHeader className="text-center py-3 bg-light border-0">
            <strong>Google Organic Search KPIs</strong>
          </MDBCardHeader>
          <MDBCardBody>
            <div className="table-responsive">
              <MDBTable hover className="text-nowrap">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Impressions</th>
                    <th scope="col">Clicks</th>
                    <th scope="col">Site CTR</th>
                    <th scope="col">Average Position</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Value</th>
                    <td>17,842</td>
                    <td>168</td>
                    <td>0.94%</td>
                    <td>48.5</td>
                  </tr>
                  <tr>
                    <th scope="row">Percentage change</th>
                    <td>
                      <span className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>17.7%</span>
                      </span>
                    </td>
                    <td>
                      <span className="text-danger">
                        <i className="fas fa-caret-down me-1"></i>
                        <span>-38.2%</span>
                      </span>
                    </td>
                    <td>
                      <span className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>25.0%</span>
                      </span>
                    </td>
                    <td>
                      <span className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>10.3%</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Absolute change</th>
                    <td>
                      <span className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>3,825</span>
                      </span>
                    </td>
                    <td>
                      <span className="text-danger">
                        <i className="fas fa-caret-down me-1"></i>
                        <span>-104</span>
                      </span>
                    </td>
                    <td>
                      <span className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>0.31%</span>
                      </span>
                    </td>
                    <td>
                      <span className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>4.52</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </MDBTable>
            </div>
          </MDBCardBody>
        </MDBCard>
      </section>

      <section>
        <div className="card">
          <MDBCardBody>
            <div className="mb-4" style={{ height: "300px" }}>
              <MDBChart
                type="line"
                data={{
                  labels: [
                    "06.08.2020",
                    "07.08.2020",
                    "08.08.2020",
                    "09.08.2020",
                    "10.08.2020",
                    "11.08.2020",
                    "12.08.2020",
                    "13.08.2020",
                    "14.08.2020",
                    "15.08.2020",
                    "16.08.2020",
                    "17.08.2020",
                    "18.08.2020",
                    "19.08.2020",
                  ],
                  datasets: [
                    {
                      label: "Impressions",
                      data: [
                        125, 449, 340, 521, 256, 475, 130, 125, 449, 340, 521,
                        256, 475, 130,
                      ],
                    },
                    {
                      label: "Clicks",
                      data: [
                        358, 518, 130, 759, 246, 377, 190, 358, 518, 130, 759,
                        246, 377, 190,
                      ],
                      backgroundColor: "rgba(66, 133, 244, 0.0)",
                      borderColor: "#33b5e5",
                      pointBorderColor: "#33b5e5",
                      pointBackgroundColor: "#33b5e5",
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      stacked: false,
                    },
                  },
                }}
              />
            </div>
            <div className="table-responsive">
              <MDBTable className="text-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Week</th>
                    <th scope="col">Impressions</th>
                    <th scope="col">Clicks</th>
                    <th scope="col">Site CTR</th>
                    <th scope="col">Average position</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">31.08.2020 - 6.02.2020</th>
                    <td>1586</td>
                    <td>17</td>
                    <td>1.07%</td>
                    <td>48.98</td>
                  </tr>
                  <tr>
                    <th scope="row">24.08.2020 - 30.08.2020</th>
                    <td>4,693</td>
                    <td>56</td>
                    <td>1.19%</td>
                    <td>49.15</td>
                  </tr>
                  <tr>
                    <th scope="row">17.08.2020 - 23.08.2020</th>
                    <td>4,613</td>
                    <td>44</td>
                    <td>0.95%</td>
                    <td>49.34</td>
                  </tr>
                  <tr>
                    <th scope="row">10.08.2020 - 16.08.2020</th>
                    <td>4,911</td>
                    <td>48</td>
                    <td>0.98%</td>
                    <td>47.95</td>
                  </tr>
                </tbody>
              </MDBTable>
            </div>
          </MDBCardBody>
        </div>
      </section>
    </MDBContainer>
  );
};

export default SEODashboard;
