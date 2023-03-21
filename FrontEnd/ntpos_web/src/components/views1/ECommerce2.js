import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBDatepicker,
  MDBRow,
  MDBSelect,
  MDBChart,
  MDBIcon,
} from "mdb-react-ui-kit";

const ECommerce2 = () => {
  const usersSessionChartData = {
    labels: [
      "20 Sep",
      "21 Sep",
      "22 Sep",
      "23 Sep",
      "24 Sep",
      "25 Sep",
      "26 Sep",
    ],
    datasets: [
      {
        label: "Users",
        data: [650, 590, 800, 810, 560, 550, 400],
      },
      {
        label: "Sessions",
        data: [750, 690, 900, 910, 660, 750, 500],
        backgroundColor: "rgba(66, 133, 244, 0.0)",
        borderColor: "#33b5e5",
        pointBorderColor: "#33b5e5",
        pointBackgroundColor: "#33b5e5",
      },
    ],
  };

  const revenueConversionChartOptions = {
    scales: {
      y: {
        ticks: {
          display: false,
        },
      },
      y1: {
        position: "left",
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return "$" + value;
          },
        },
      },
      y2: {
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  const revenueConversionChartData = {
    labels: [
      "20 Sep",
      "21 Sep",
      "22 Sep",
      "23 Sep",
      "24 Sep",
      "25 Sep",
      "26 Sep",
    ],
    datasets: [
      {
        label: "Transactions",
        yAxisID: "y1",
        data: [21, 23, 25, 34, 23, 19, 9],
        order: 2,
      },
      {
        label: "Conversion rate %",

        yAxisID: "y2",
        data: [1.5, 2, 0.5, 3, 1.2, 4, 3.4],
        type: "line",
        order: 1,
        backgroundColor: "rgba(66, 133, 244, 0.0)",
        borderColor: "#94DFD7",
        borderWidth: 2,
        pointBorderColor: "#94DFD7",
        pointBackgroundColor: "#94DFD7",
        lineTension: 0.0,
      },
    ],
  };

  const siteHealthChartOptions = {
    scales: {
      y: {
        ticks: {
          display: false,
        },
      },
      y1: {
        position: "left",
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return value + " " + "%";
          },
        },
      },
      y2: {
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };
  const siteHealthChartData = {
    labels: [
      "20 Sep",
      "21 Sep",
      "22 Sep",
      "23 Sep",
      "24 Sep",
      "25 Sep",
      "26 Sep",
    ],
    datasets: [
      {
        label: "Bounce rate",
        yAxisID: "y1",
        data: [51, 53, 55, 54, 53, 59, 59],
        order: 2,
      },
      {
        label: "Avg. Page Load Time (sec)",

        yAxisID: "y2",
        data: [1.5, 2, 0.5, 3, 1.2, 4, 3.4],
        type: "line",
        order: 1,
        backgroundColor: "rgba(66, 133, 244, 0.0)",
        borderColor: "#94DFD7",
        borderWidth: 2,
        pointBorderColor: "#94DFD7",
        pointBackgroundColor: "#94DFD7",
        lineTension: 0.0,
      },
    ],
  };
  const devicePerformanceChartOptions = {
    scales: {
      y: {
        stacked: false,
      },
      ticks: {
        beginAtZero: true,
      },
      x: {
        stacked: false,
      },
    },
  };
  const devicePerformanceChartData = {
    labels: ["Desktop", "Mobile", "Tablet"],

    datasets: [
      {
        label: "Users",
        data: [510, 653, 255],
      },
      {
        label: "Page views",
        data: [1251, 1553, 1355],
        backgroundColor: "#94DFD7",
        borderColor: "#94DFD7",
      },
    ],
  };
  const transactionsChartOptions = {
    scales: {
      y: {
        ticks: {
          display: false,
        },
      },
      y1: {
        display: true,
        position: "left",
        id: "y1",
      },
      y2: {
        display: true,
        position: "right",
        id: "y2",
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return value + " " + "%";
          },
        },
      },
      x: {
        stacked: false,
      },
    },
  };
  const transactionsChartData = {
    labels: ["Desktop", "Mobile", "Tablet"],

    datasets: [
      {
        label: "Transactions",
        data: [51, 65, 25],
        yAxisID: "y1",
      },
      {
        label: "Conversion rate %",
        data: [0.2, 0.8, 0.4],
        yAxisID: "y2",
        backgroundColor: "#94DFD7",
        borderColor: "#94DFD7",
      },
    ],
  };
  const sessionsChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        formatter: (value) => {
          let sum = 0;
          let dataArr = sessionsChartData.value.datasets[0].data;
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
  const sessionsChartData = {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
      {
        label: "Traffic",
        data: [3230, 4531, 1832],
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
      <h1 className="h3 text-center py-5 mb-0">General dashboard</h1>

      <section className="mb-4">
        <MDBCard>
          <MDBCardBody className="p-4">
            <MDBRow>
              <MDBCol md="6" className="mb-md-0">
                <MDBSelect
                  label="Date"
                  data={[
                    { text: "Today", value: 1, selected: true },
                    { text: "Yesterday", value: 2 },
                    { text: "Last 7 days", value: 3 },
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

      <section className="text-center">
        <MDBRow>
          <MDBCol xl="4" className="mb-4">
            <MDBCard>
              <MDBCardHeader background="light" className="border-0 py-3">
                <p className="mb-0">
                  <strong>Users & sessions</strong>
                </p>
              </MDBCardHeader>
              <MDBCardBody>
                <div className="d-flex justify-content-around">
                  <div>
                    <p className="mb-2">Users</p>
                    <h5>38.6K</h5>
                    <p className="text-success small">
                      <MDBIcon fas icon="caret-up" className="me-1" />
                      <span>72.0%</span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">Sessions</p>
                    <h5>50.9K</h5>
                    <p className="text-success small">
                      <MDBIcon fas icon="caret-up" className="me-1" />
                      <span>82.0%</span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">New Users</p>
                    <h5>34.0K</h5>
                    <p className="text-danger small">
                      <MDBIcon fas icon="caret-down" className="me-1" />
                      <span>12.0%</span>
                    </p>
                  </div>
                </div>

                <MDBChart type="line" data={usersSessionChartData} />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol xl="4" className="mb-4">
            <MDBCard>
              <MDBCardHeader background="light" className="border-0 py-3">
                <p className="mb-0">
                  <strong>Revenue & Conversion Rate</strong>
                </p>
              </MDBCardHeader>
              <MDBCardBody>
                <div className="d-flex justify-content-around">
                  <div>
                    <p className="mb-2">Product Revenue</p>
                    <h5>$5.35KK</h5>
                    <p className="text-success small">
                      <MDBIcon fas icon="caret-up" className="me-1" />
                      <span>21.6%</span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">Transactions</p>
                    <h5>88</h5>
                    <p className="text-danger small">
                      <MDBIcon fas icon="caret-down" className="me-1" />
                      <span>-22.8%</span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">Conversion Rate</p>
                    <h5>0.2%</h5>
                    <p className="text-danger small">
                      <MDBIcon fas icon="caret-down" className="me-1" />
                      <span>-1.7%</span>
                    </p>
                  </div>
                </div>

                <MDBChart
                  type="line"
                  data={revenueConversionChartData}
                  options={revenueConversionChartOptions}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol xl="4" className="mb-4">
            <MDBCard>
              <MDBCardHeader background="light" className="border-0 py-3">
                <p className="mb-0">
                  <strong>Site Health</strong>
                </p>
              </MDBCardHeader>
              <MDBCardBody>
                <div className="d-flex justify-content-around">
                  <div>
                    <p className="mb-2">Bounce Rate</p>
                    <h5>41.4%</h5>
                    <p className="text-danger small">
                      <MDBIcon fas icon="caret-down" className="me-1" />
                      <span>-3.3%</span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">Avg. Session Duration</p>
                    <h5>03:20</h5>
                    <p className="text-success small">
                      <MDBIcon fas icon="caret-up" className="me-1" />
                      <span>3.6%</span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">Avg. Page Load Time</p>
                    <h5>3.9s</h5>
                    <p className="text-danger small">
                      <MDBIcon fas icon="caret-down" className="me-1" />
                      <span>12.0%</span>
                    </p>
                  </div>
                </div>

                <MDBChart
                  type="line"
                  data={siteHealthChartData}
                  options={siteHealthChartOptions}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol xl="4" className="mb-4">
            <MDBCard>
              <MDBCardHeader background="light" className="border-0 py-3">
                <strong>Device Performance</strong>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBChart
                  type="bar"
                  data={devicePerformanceChartData}
                  options={devicePerformanceChartOptions}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol xl="4" className="mb-4">
            <MDBCard>
              <MDBCardHeader background="light" className="border-0 py-3">
                <strong>Transactions</strong>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBChart
                  type="bar"
                  data={transactionsChartData}
                  options={transactionsChartOptions}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol xl="4" className="mb-4">
            <MDBCard>
              <MDBCardHeader background="light" className="border-0 py-3">
                <strong>Sessions</strong>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBChart
                  type="pie"
                  data={sessionsChartData}
                  options={sessionsChartOptions}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
    </MDBContainer>
  );
};

export default ECommerce2;
