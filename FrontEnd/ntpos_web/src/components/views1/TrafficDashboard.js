import React, { useState } from "react";
import {
  MDBCardBody,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBIcon,
  MDBSelect,
  MDBDatepicker,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBChart,
} from "mdb-react-ui-kit";

const TrafficDashboard = () => {
  const [basicActive, setBasicActive] = useState("Users");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  const usersChartOptions = {
    scales: {
      y: {
        stacked: false,
      },
    },
  };

  const pieChartCurrentChartData = {
    labels: ["New visitor", "Returning visitor"],
    datasets: [
      {
        label: "Traffic",
        data: [502355, 423545],
        backgroundColor: ["rgba(66, 133, 244, 0.6)", "rgba(77, 182, 172, 0.6)"],
      },
    ],
  };

  const pieChartOptions = {
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
          let dataArr = pieChartCurrentChartData.datasets[0].data;
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
              size: "14",
            },
          },
        },
      },
    },
  };

  return (
    <MDBContainer>
      <h1 className="h3 text-center py-5 mb-0">Traffic dashboard</h1>

      <section className="mb-4">
        <MDBCard>
          <MDBCardBody className="p-4">
            <MDBRow>
              <MDBCol className="mb-4 md-mb-0" md="6">
                <MDBSelect
                  label="Date"
                  data={[
                    { text: "Today", value: 1 },
                    { text: "Yesterday", value: 2 },
                    { text: "Last 7 days", value: 3, selected: true },
                    { text: "Last 28 days", value: 4 },
                    { text: "Last 90 days", value: 5 },
                  ]}
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBDatepicker labelText="Date" />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </section>

      <section>
        <MDBRow>
          <MDBCol lg="3" md="6" className="mb-4">
            <MDBCard>
              <MDBCardBody>
                <p className="text-uppercase small mb-2">
                  <strong>USERS</strong>
                </p>
                <h5 className="mb-0">
                  <strong>14 567</strong>
                  <small className="text-success ms-2">
                    <MDBIcon fas icon="arrow-up" size="sm" className="pe-1" />
                    13,48%
                  </small>
                </h5>

                <hr />

                <p className="text-uppercase text-muted small mb-2">
                  Previous period
                </p>
                <h5 className="text-muted mb-0">11 467</h5>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4">
            <MDBCard>
              <MDBCardBody>
                <p className="text-uppercase small mb-2">
                  <strong>PAGE VIEWS</strong>
                </p>
                <h5 className="mb-0">
                  <strong>51 354 </strong>
                  <small className="text-success ms-2">
                    <MDBIcon fas icon="arrow-up" size="sm" className="pe-1" />
                    23,58%
                  </small>
                </h5>

                <hr />

                <p className="text-uppercase text-muted small mb-2">
                  Previous period
                </p>
                <h5 className="text-muted mb-0">38 454</h5>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4">
            <MDBCard>
              <MDBCardBody>
                <p className="text-uppercase small mb-2">
                  <strong>AVERAGE TIME</strong>
                </p>
                <h5 className="mb-0">
                  <strong>00:04:20</strong>
                  <small className="text-danger ms-2">
                    <MDBIcon fas icon="arrow-down" size="sm" className="pe-1" />
                    23,58%
                  </small>
                </h5>

                <hr />

                <p className="text-uppercase text-muted small mb-2">
                  Previous period
                </p>
                <h5 className="text-muted mb-0">00:05:20</h5>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4">
            <div className="card">
              <div className="card-body">
                <p className="text-uppercase small mb-2">
                  <strong>BOUNCE RATE</strong>
                </p>
                <h5 className="mb-0">
                  <strong>32.35%</strong>
                  <small className="text-danger ms-2">
                    <i className="fas fa-arrow-down fa-sm pe-1"></i>23,58%
                  </small>
                </h5>

                <hr />

                <p className="text-uppercase text-muted small mb-2">
                  Previous period
                </p>
                <h5 className="text-muted mb-0">24.35%</h5>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </section>

      <section>
        <MDBRow>
          <MDBCol md="8" className="mb-4">
            <MDBCard>
              <MDBCardBody>
                <MDBTabs
                  className="nav nav-pills nav-justified mb-3"
                  id="ex1"
                  role="tablist"
                >
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleBasicClick("Users")}
                      active={basicActive === "Users"}
                    >
                      Users
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleBasicClick("Page views")}
                      active={basicActive === "Page views"}
                    >
                      Page views
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleBasicClick("Average time")}
                      active={basicActive === "Average time"}
                    >
                      Average time
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleBasicClick("Bounce rate")}
                      active={basicActive === "Bounce rate"}
                    >
                      Bounce rate
                    </MDBTabsLink>
                  </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>
                  <MDBTabsPane show={basicActive === "Users"}>
                    <MDBChart
                      type="line"
                      options={usersChartOptions}
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
                            label: "Current period",
                            data: [65, 59, 80, 81, 56, 55, 40],
                          },
                          {
                            label: "Previous period",
                            data: [28, 48, 40, 19, 86, 27, 90],
                            backgroundColor: "rgba(66, 133, 244, 0.0)",
                            borderColor: "#33b5e5",
                            pointBorderColor: "#33b5e5",
                            pointBackgroundColor: "#33b5e5",
                          },
                        ],
                      }}
                    />
                  </MDBTabsPane>
                  <MDBTabsPane show={basicActive === "Page views"}>
                    <MDBChart
                      type="line"
                      options={usersChartOptions}
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
                            label: "Current period",
                            data: [25, 49, 40, 21, 56, 75, 30],
                          },
                          {
                            label: "Previous period",
                            data: [58, 18, 30, 59, 46, 77, 90],
                            backgroundColor: "rgba(66, 133, 244, 0.0)",
                            borderColor: "#33b5e5",
                            pointBorderColor: "#33b5e5",
                            pointBackgroundColor: "#33b5e5",
                          },
                        ],
                      }}
                    />
                  </MDBTabsPane>
                  <MDBTabsPane show={basicActive === "Average time"}>
                    <MDBChart
                      type="line"
                      options={usersChartOptions}
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
                            label: "Current period",
                            data: [431, 123, 435, 123, 345, 234, 124],
                          },
                          {
                            label: "Previous period",
                            data: [654, 234, 123, 432, 533, 422, 222],
                            backgroundColor: "rgba(66, 133, 244, 0.0)",
                            borderColor: "#33b5e5",
                            pointBorderColor: "#33b5e5",
                            pointBackgroundColor: "#33b5e5",
                          },
                        ],
                      }}
                    />
                  </MDBTabsPane>
                  <MDBTabsPane show={basicActive === "Bounce rate"}>
                    <MDBChart
                      type="line"
                      options={usersChartOptions}
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
                            label: "Current period",
                            data: [41, 12, 35, 13, 45, 34, 12],
                          },
                          {
                            label: "Previous period",
                            data: [65, 24, 13, 43, 33, 42, 22],
                            backgroundColor: "rgba(66, 133, 244, 0.0)",
                            borderColor: "#33b5e5",
                            pointBorderColor: "#33b5e5",
                            pointBackgroundColor: "#33b5e5",
                          },
                        ],
                      }}
                    />
                  </MDBTabsPane>
                </MDBTabsContent>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="4" className="mb-4">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <p className="text-center">
                  <strong>Current period</strong>
                </p>
                <MDBChart
                  datalabels
                  type="pie"
                  options={pieChartOptions}
                  data={pieChartCurrentChartData}
                />
              </MDBCardBody>
            </MDBCard>

            <MDBCard>
              <MDBCardBody>
                <p className="text-center">
                  <strong>Previous period</strong>
                </p>
                <MDBChart
                  datalabels
                  type="pie"
                  options={pieChartOptions}
                  data={{
                    labels: ["New visitor", "Returning visitor"],
                    datasets: [
                      {
                        label: "Traffic",
                        data: [402355, 523545],
                        backgroundColor: [
                          "rgba(66, 133, 244, 0.6)",
                          "rgba(77, 182, 172, 0.6)",
                        ],
                      },
                    ],
                  }}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
    </MDBContainer>
  );
};

export default TrafficDashboard;
