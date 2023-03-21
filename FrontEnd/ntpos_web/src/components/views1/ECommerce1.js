import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBDatatable,
  MDBDatepicker,
  MDBRow,
  MDBSelectDeprecated,
  MDBTable,
  MDBChart,
} from "mdb-react-ui-kit";

const ECommerce1 = () => {
  const shoppingFunnelChartData = {
    labels: ["Product views", "Checkout", "Purchases"],
    datasets: [
      {
        data: [2112, 343, 45],
        barPercentage: 1.24,
      },
    ],
  };

  const shoppingFunnelChartOptions = {
    indexAxis: "y",
    scales: {
      x: {
        stacked: true,
        grid: {
          display: true,
          drawBorder: true,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    legend: {
      display: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value) => {
          let sum = 0;
          // Assign the data to the variable and format it according to your needs
          let dataArr = shoppingFunnelChartData.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "#4f4f4f",
        labels: {
          title: {
            font: {
              size: "13",
            },
            anchor: "end",
            align: "right",
          },
        },
      },
    },
  };

  const productRevenueChartData = {
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
        label: "Product revenue $",
        yAxisID: "y1",
        data: [211, 234, 254, 342, 236, 198, 98],
        order: 1,
      },
      {
        label: "Unique purchases",
        yAxisID: "y2",
        data: [52, 42, 69, 60, 45, 23, 89],
        type: "line",
        order: 0,
        backgroundColor: "rgba(66, 133, 244, 0.0)",
        borderColor: "#94DFD7",
        borderWidth: 2,
        pointBorderColor: "#94DFD7",
        pointBackgroundColor: "#94DFD7",
        lineTension: 0.0,
      },
    ],
  };

  const productRevenueChartOptions = {
    scales: {
      y: {
        ticks: {
          display: false,
        },
      },
      y1: {
        position: "left",
        grid: {
          drawOnChartArea: false,
          drawBorder: false,
          drawTicks: false,
        },
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

  const datasetRevenue = {
    columns: [
      "Product ID",
      "Quantity",
      "Purchases",
      "Δ",
      "Product revenue",
      "%Δ",
      "Buy-to-details %",
    ],
    rows: [
      [123, 21, 9, 2, "$448.29", "112.54%", "17.55%"],
      [124, 42, 24, 0, "$182.71", "59.32%", "37.62%"],
      [125, 4, 18, 2, "$41.15", "118.58%", "3.40%"],
      [126, 37, 30, 0, "$64.67", "65.36%", "10.69%"],
      [127, 13, 13, 1, "$202.18", "135.11%", "86.85%"],
      [128, 2, 25, 1, "$22.29", "75.34%", "78.13%"],
      [129, 38, 5, 3, "$21.42", "34.96%", "3.14%"],
      [130, 23, 2, 2, "$362.59", "159.01%", "0.88%"],
      [131, 10, 26, 1, "$223.64", "199.88%", "38.05%"],
      [132, 43, 34, 2, "$148.31", "36.15%", "13.58%"],
      [133, 21, 10, 0, "$293.35", "142.13%", "59.93%"],
      [134, 17, 12, 2, "$325.35", "145.78%", "22.33%"],
      [135, 18, 26, 1, "$425.38", "86.88%", "8.39%"],
      [136, 24, 14, 3, "$175.65", "188.03%", "6.04%"],
      [137, 44, 18, 2, "$492.13", "27.94%", "96.88%"],
      [138, 40, 34, 2, "$474.20", "165.88%", "75.91%"],
      [139, 1, 26, 2, "$291.67", "23.56%", "98.18%"],
      [140, 1, 23, 0, "$409.04", "59.10%", "12.43%"],
      [141, 41, 26, 2, "$145.37", "60.38%", "16.67%"],
      [142, 29, 8, 1, "$88.48", "132.66%", "99.17%"],
      [143, 42, 33, 2, "$153.96", "16.81%", "2.54%"],
      [144, 25, 24, 3, "$484.25", "199.82%", "6.29%"],
      [145, 44, 19, 0, "$133.35", "169.73%", "14.36%"],
      [146, 34, 24, 2, "$345.58", "187.76%", "78.83%"],
      [147, 26, 28, 1, "$151.04", "192.89%", "55.87%"],
      [148, 16, 18, 1, "$273.32", "184.14%", "77.91%"],
      [149, 11, 24, 1, "$186.84", "73.08%", "54.91%"],
      [150, 45, 25, 0, "$286.30", "164.72%", "25.93%"],
      [151, 24, 22, 3, "$44.99", "72.07%", "92.68%"],
      [152, 16, 20, 0, "$434.77", "167.60%", "18.78%"],
      [153, 44, 33, 0, "$241.04", "38.81%", "39.98%"],
      [154, 17, 15, 3, "$196.36", "180.25%", "54.47%"],
      [155, 10, 34, 1, "$441.65", "87.35%", "80.55%"],
      [156, 22, 2, 3, "$404.08", "159.30%", "55.65%"],
      [157, 29, 23, 0, "$176.42", "116.25%", "19.23%"],
      [158, 21, 1, 0, "$256.70", "180.01%", "47.55%"],
      [159, 27, 20, 0, "$375.41", "30.42%", "23.45%"],
      [160, 33, 25, 3, "$313.54", "108.37%", "6.57%"],
      [161, 42, 14, 2, "$328.28", "193.06%", "18.86%"],
      [162, 13, 23, 3, "$159.28", "75.18%", "11.20%"],
      [163, 31, 2, 1, "$259.08", "17.79%", "65.96%"],
      [164, 28, 22, 1, "$426.61", "120.66%", "85.42%"],
      [165, 19, 16, 2, "$269.72", "191.67%", "56.66%"],
      [166, 31, 7, 0, "$412.03", "72.91%", "94.83%"],
      [167, 26, 4, 0, "$279.67", "184.87%", "75.28%"],
      [168, 38, 31, 0, "$385.86", "24.37%", "12.64%"],
      [169, 17, 7, 2, "$63.91", "118.32%", "16.15%"],
      [170, 24, 22, 2, "$418.11", "194.73%", "21.31%"],
      [171, 25, 30, 1, "$79.84", "175.77%", "80.91%"],
      [172, 37, 7, 0, "$94.17", "68.17%", "28.84%"],
      [173, 23, 7, 2, "$51.40", "42.51%", "51.99%"],
      [174, 44, 8, 0, "$481.79", "42.39%", "21.23%"],
      [175, 27, 2, 1, "$464.96", "14.03%", "71.42%"],
      [176, 9, 8, 0, "$456.77", "35.47%", "29.23%"],
      [177, 13, 10, 2, "$393.63", "135.96%", "27.17%"],
      [178, 9, 9, 2, "$472.77", "144.47%", "96.86%"],
      [179, 16, 30, 0, "$398.08", "22.40%", "20.55%"],
      [180, 25, 34, 0, "$228.47", "128.91%", "49.39%"],
      [181, 28, 24, 0, "$261.91", "98.72%", "47.21%"],
      [182, 13, 33, 3, "$252.99", "32.71%", "63.10%"],
      [183, 14, 30, 2, "$224.74", "137.10%", "41.33%"],
      [184, 1, 30, 1, "$252.26", "99.49%", "13.51%"],
      [185, 31, 9, 2, "$223.09", "118.81%", "27.53%"],
      [186, 43, 22, 0, "$48.90", "26.04%", "51.45%"],
      [187, 37, 6, 0, "$318.10", "99.73%", "75.86%"],
      [188, 14, 27, 2, "$209.26", "20.59%", "72.29%"],
      [189, 43, 9, 0, "$384.09", "8.86%", "27.94%"],
      [190, 37, 6, 0, "$374.42", "175.92%", "11.88%"],
      [191, 37, 20, 0, "$361.86", "46.65%", "50.08%"],
      [192, 3, 24, 2, "$194.17", "145.60%", "51.01%"],
      [193, 33, 1, 0, "$467.07", "175.79%", "17.64%"],
      [194, 18, 10, 1, "$475.56", "57.07%", "72.85%"],
      [195, 7, 22, 1, "$412.53", "174.03%", "42.28%"],
      [196, 20, 23, 3, "$132.04", "71.93%", "9.82%"],
      [197, 31, 23, 0, "$89.61", "51.00%", "64.26%"],
      [198, 11, 4, 1, "$161.92", "31.70%", "51.51%"],
      [199, 34, 17, 2, "$288.24", "155.64%", "80.52%"],
      [200, 14, 8, 1, "$492.15", "105.02%", "91.67%"],
      [201, 19, 13, 0, "$295.88", "147.76%", "51.82%"],
      [202, 14, 14, 0, "$442.03", "2.37%", "63.23%"],
      [203, 43, 23, 2, "$91.59", "85.70%", "56.46%"],
      [204, 6, 31, 1, "$271.90", "52.35%", "34.57%"],
      [205, 25, 32, 1, "$363.69", "130.85%", "63.04%"],
      [206, 18, 22, 1, "$296.75", "34.37%", "34.00%"],
      [207, 35, 11, 2, "$447.56", "192.33%", "70.81%"],
      [208, 25, 26, 2, "$126.01", "149.90%", "11.23%"],
      [209, 26, 26, 2, "$81.56", "65.17%", "19.00%"],
      [210, 36, 17, 3, "$462.68", "173.03%", "57.81%"],
      [211, 30, 4, 3, "$62.55", "82.38%", "16.23%"],
      [212, 39, 32, 0, "$152.69", "175.26%", "77.08%"],
      [213, 26, 32, 3, "$408.57", "80.71%", "68.45%"],
      [214, 41, 30, 1, "$169.70", "154.79%", "35.07%"],
      [215, 42, 16, 2, "$99.86", "69.91%", "11.05%"],
      [216, 35, 31, 1, "$127.80", "7.89%", "98.83%"],
      [217, 3, 23, 2, "$147.81", "38.74%", "51.48%"],
      [218, 32, 5, 1, "$201.46", "111.46%", "50.59%"],
      [219, 38, 34, 1, "$475.83", "126.78%", "40.13%"],
      [220, 14, 27, 2, "$48.21", "191.19%", "78.24%"],
      [221, 35, 8, 3, "$342.09", "68.43%", "27.41%"],
      [222, 16, 10, 1, "$255.18", "101.63%", "78.90%"],
    ],
  };

  const revenueSourcesChartData = {
    labels: ["Google", "YouTube", "Facebook", "Twitter"],
    datasets: [
      {
        data: [2112, 1343, 545, 324],
      },
    ],
  };

  const revenueSourcesChartOptions = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return "$" + value;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value) => {
          let sum = 0;
          let dataArr = revenueSourcesChartData.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "#4f4f4f",
        labels: {
          title: {
            font: {
              size: "13",
            },
            anchor: "end",
            align: "top",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (value) {
            return `$ ${value.parsed.y}`;
          },
        },
      },
    },
  };

  const marketingSourcesChartData = {
    labels: ["Organic search", "Direct", "Social"],
    datasets: [
      {
        label: "Traffic",
        data: [8112, 5343, 3545],
        backgroundColor: [
          "rgba(63, 81, 181, 0.5)",
          "rgba(77, 182, 172, 0.5)",
          "rgba(66, 133, 244, 0.5)",
        ],
      },
    ],
  };

  const marketingSourcesChartOptions = {
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
          let dataArr = marketingSourcesChartData.datasets[0].data;
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
              size: "13",
            },
          },
        },
      },
    },
  };

  return (
    <MDBContainer>
      <h1 className="h3 text-center py-5 mb-0">eCommerce dashboard</h1>

      <section>
        <MDBRow>
          <MDBCol md="4" className="mb-4">
            <MDBCard>
              <MDBCardBody>
                <MDBSelectDeprecated
                  label="Product"
                  data={[
                    { text: "Product 1", value: 1, selected: true },
                    { text: "Product 2", value: 2 },
                    { text: "Product 3", value: 3 },
                    { text: "Product 4", value: 4 },
                    { text: "Product 5", value: 5 },
                  ]}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="8" className="mb-4">
            <MDBCard>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md="6" className="mb-4 mb-md-0">
                    <MDBSelectDeprecated
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

                  <div className="col-md-6">
                    <MDBDatepicker labelText="Date" />
                  </div>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>

      <section className="mb-4">
        <MDBCard>
          <MDBCardHeader className="text-center py-3 bg-light border-0">
            <strong>Sales Performance KPIs</strong>
          </MDBCardHeader>
          <MDBCardBody>
            <div className="table-responsive">
              <MDBTable hover className="text-nowrap">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Product Detail Views</th>
                    <th scope="col">Unique Purchases</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Product Revenue</th>
                    <th scope="col">Avg. Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Value</th>
                    <td>18,492</td>
                    <td>228</td>
                    <td>350</td>
                    <td>$4,787.64</td>
                    <td>$13.68</td>
                  </tr>
                  <tr>
                    <th scope="row">Percentage change</th>
                    <td>
                      <span className="text-danger">
                        <i className="fas fa-caret-down me-1"></i>
                        <span>-48.8%%</span>
                      </span>
                    </td>
                    <td>
                      <span className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>14.0%</span>
                      </span>
                    </td>
                    <td>
                      <span className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>46.4%</span>
                      </span>
                    </td>
                    <td>
                      <span className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>29.6%</span>
                      </span>
                    </td>
                    <td>
                      <span className="text-danger">
                        <i className="fas fa-caret-down me-1"></i>
                        <span>-11.5%</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Absolute change</th>
                    <td>
                      <span className="text-danger">
                        <i className="fas fa-caret-down me-1"></i>
                        <span>-17,654</span>
                      </span>
                    </td>
                    <td>
                      <span className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>28</span>
                      </span>
                    </td>
                    <td>
                      <span className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>111</span>
                      </span>
                    </td>
                    <td>
                      <span className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>$1,092.72</span>
                      </span>
                    </td>
                    <td>
                      <span className="text-danger">
                        <i className="fas fa-caret-down me-1"></i>
                        <span>$-1.78</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </MDBTable>
            </div>
          </MDBCardBody>
        </MDBCard>
      </section>

      <section className="mb-4">
        <MDBRow>
          <MDBCol md="5" className="mb-4">
            <MDBCard>
              <MDBCardHeader className="text-center border-0 bg-light py-3">
                <strong>Shopping Funnel</strong>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBChart
                  type="bar"
                  data={shoppingFunnelChartData}
                  options={shoppingFunnelChartOptions}
                  datalabels
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="7" className="mb-4">
            <MDBCard>
              <MDBCardBody>
                <MDBChart
                  type="bar"
                  data={productRevenueChartData}
                  options={productRevenueChartOptions}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>

      <section>
        <MDBCard>
          <MDBCardHeader className="bg-light border-0 p-3 text-center">
            <strong>Revenue sources</strong>
          </MDBCardHeader>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="4" className="mb-4">
                <div className="mb-5">
                  <MDBChart
                    type="bar"
                    data={revenueSourcesChartData}
                    options={revenueSourcesChartOptions}
                    datalabels
                  />
                </div>
                <MDBChart
                  type="pie"
                  data={marketingSourcesChartData}
                  options={marketingSourcesChartOptions}
                  datalabels
                />
              </MDBCol>

              <MDBCol md="8" className=" mb-4">
                <MDBDatatable data={datasetRevenue} />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </section>
    </MDBContainer>
  );
};

export default ECommerce1;
