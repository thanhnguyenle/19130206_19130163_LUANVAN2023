import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBDatatable,
  MDBChart,
} from "mdb-react-ui-kit";
import React from "react";

const AdsDashboard = () => {
  const visibilityChartData = {
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
        label: "Impressions",
        data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
        order: 2,
      },
      {
        label: "Impressions (absolute top) %",
        data: [211, 2543, 2745, 3123, 2765, 1485, 587],
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

  const acquisitionChartData = {
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
        label: "Clicks",
        data: [25, 49, 40, 21, 56, 75, 30],
        order: 2,
      },
      {
        label: "CTR %",
        data: [58, 18, 30, 59, 46, 77, 90],
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

  const conversionChartData = {
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
        label: "Conversions",
        data: [77, 305, 312, 142, 177, 223, 468],
        order: 2,
      },
      {
        label: "Conversion rate %",
        data: [39, 43, 60, 59, 46, 77, 53],
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

  const costChartData = {
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
        label: "Cost $",
        data: [15, 29, 30, 21, 36, 45, 30],
        order: 2,
      },
      {
        label: "Avg. CPC $",
        data: [8, 1, 3, 5, 4, 7, 9],
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

  const tableData = {
    columns: [
      "Campaign ID",
      "Impressions",
      "Impr. Abs Top (%)",
      "Clicks",
      "CTR (%)",
      "Conversions",
      "Conversion rate (%)",
      "Cost / conv. ($)",
      "Cost ($)",
      "Avg. CPC ($)",
      "Avg. CPM ($)",
    ],
    rows: [
      [100059, 1729, 8, 906, 72, 77, 39, 2, 699, 3, 275],
      [100060, 2812, 38, 737, 13, 305, 43, 9, 489, 3, 140],
      [100061, 8943, 15, 46, 70, 312, 60, 75, 387, 3, 292],
      [100062, 4721, 68, 379, 9, 142, 53, 37, 879, 4, 20],
      [100063, 4715, 16, 627, 11, 177, 53, 99, 606, 4, 241],
      [100064, 7719, 5, 109, 71, 223, 41, 3, 822, 1, 192],
      [100065, 9343, 16, 895, 80, 468, 90, 64, 204, 3, 282],
      [100066, 3653, 88, 13, 56, 346, 28, 36, 637, 3, 234],
      [100067, 777, 4, 165, 47, 257, 48, 17, 717, 3, 13],
      [100068, 6173, 94, 323, 45, 24, 17, 74, 33, 2, 292],
      [100069, 3899, 34, 660, 14, 244, 90, 34, 67, 1, 38],
      [100070, 5657, 64, 810, 89, 165, 8, 87, 597, 1, 223],
      [100071, 5582, 27, 915, 10, 224, 26, 1, 124, 3, 298],
      [100072, 4956, 22, 760, 66, 154, 55, 25, 657, 4, 177],
      [100073, 3920, 88, 976, 47, 98, 76, 20, 280, 1, 300],
      [100074, 6727, 95, 674, 17, 144, 50, 82, 73, 1, 219],
      [100075, 1310, 31, 241, 90, 381, 13, 36, 112, 1, 244],
      [100076, 3756, 96, 979, 52, 124, 8, 59, 548, 3, 123],
      [100077, 6460, 46, 970, 11, 62, 4, 86, 285, 1, 78],
      [100078, 8554, 47, 600, 97, 420, 72, 24, 423, 1, 235],
      [100079, 1830, 25, 228, 35, 484, 49, 51, 570, 1, 178],
      [100080, 2091, 23, 963, 56, 34, 35, 4, 42, 1, 84],
      [100081, 8188, 26, 744, 58, 197, 97, 35, 123, 3, 128],
      [100082, 6601, 81, 368, 93, 390, 23, 96, 528, 4, 160],
      [100083, 6970, 85, 317, 89, 103, 56, 4, 230, 1, 43],
      [100084, 7070, 5, 405, 36, 253, 64, 44, 810, 5, 160],
      [100085, 2608, 57, 243, 40, 66, 98, 97, 869, 3, 261],
      [100086, 6855, 79, 373, 7, 202, 93, 53, 620, 5, 219],
      [100087, 2393, 86, 149, 21, 357, 34, 32, 758, 4, 152],
      [100088, 1819, 76, 287, 14, 98, 95, 82, 32, 3, 257],
      [100089, 4891, 62, 566, 77, 201, 16, 37, 606, 3, 156],
      [100090, 9539, 73, 105, 40, 442, 42, 77, 615, 2, 154],
      [100091, 6112, 99, 208, 5, 142, 64, 24, 36, 2, 191],
      [100092, 4338, 15, 458, 55, 123, 77, 60, 508, 3, 269],
      [100093, 6816, 61, 283, 20, 391, 6, 65, 532, 5, 12],
      [100094, 2435, 65, 391, 26, 11, 84, 86, 68, 5, 50],
      [100095, 5970, 81, 647, 8, 122, 21, 24, 621, 4, 209],
      [100096, 5223, 94, 84, 73, 163, 88, 45, 834, 5, 234],
      [100097, 9000, 51, 497, 27, 167, 54, 17, 632, 5, 41],
      [100098, 7308, 23, 257, 40, 136, 61, 58, 813, 5, 10],
      [100099, 3127, 20, 784, 19, 166, 83, 52, 86, 4, 54],
      [100100, 454, 23, 461, 41, 439, 35, 39, 29, 4, 112],
      [100101, 7520, 15, 747, 49, 161, 3, 88, 814, 1, 100],
      [100102, 7118, 60, 915, 34, 306, 66, 86, 399, 2, 18],
      [100103, 3831, 59, 453, 45, 461, 9, 11, 619, 2, 158],
      [100104, 7337, 69, 782, 91, 10, 22, 97, 878, 2, 297],
      [100105, 9165, 55, 10, 11, 323, 85, 89, 675, 2, 275],
      [100106, 3896, 16, 535, 97, 308, 62, 59, 782, 4, 71],
      [100107, 7161, 5, 762, 46, 416, 70, 13, 663, 2, 264],
      [100108, 5847, 94, 984, 59, 143, 50, 21, 421, 3, 226],
      [100109, 212, 79, 527, 92, 3, 81, 38, 334, 3, 246],
      [100110, 1370, 21, 82, 68, 224, 20, 54, 627, 3, 50],
      [100111, 3560, 55, 538, 60, 351, 75, 76, 344, 1, 149],
      [100112, 8102, 52, 135, 50, 212, 88, 7, 766, 1, 143],
      [100113, 6763, 17, 298, 69, 21, 98, 53, 555, 1, 241],
      [100114, 9687, 49, 683, 35, 146, 33, 64, 636, 3, 20],
      [100115, 3959, 47, 945, 82, 49, 99, 39, 584, 3, 150],
      [100116, 6105, 56, 747, 19, 46, 28, 94, 550, 3, 105],
      [100117, 3582, 75, 628, 99, 372, 54, 92, 241, 4, 261],
      [100118, 1932, 83, 891, 18, 68, 58, 37, 380, 5, 15],
      [100119, 2987, 80, 302, 64, 8, 44, 92, 696, 3, 94],
      [100120, 6058, 59, 85, 24, 372, 28, 46, 876, 2, 274],
      [100121, 9558, 76, 17, 2, 147, 90, 51, 31, 2, 217],
      [100122, 5288, 68, 176, 66, 299, 65, 8, 174, 1, 178],
      [100123, 4873, 14, 626, 16, 46, 11, 22, 887, 2, 42],
      [100124, 5722, 57, 175, 35, 478, 88, 88, 579, 5, 123],
      [100125, 3317, 100, 964, 44, 9, 9, 97, 393, 1, 191],
      [100126, 8413, 72, 681, 23, 264, 11, 92, 726, 2, 204],
      [100127, 1795, 100, 849, 27, 149, 45, 34, 744, 2, 170],
      [100128, 6383, 26, 197, 60, 334, 48, 66, 741, 4, 79],
      [100129, 5061, 45, 611, 41, 98, 94, 56, 702, 4, 131],
      [100130, 5531, 82, 486, 84, 371, 7, 25, 201, 4, 94],
      [100131, 7206, 32, 415, 52, 201, 13, 18, 838, 1, 255],
      [100132, 2705, 45, 52, 61, 136, 42, 44, 480, 5, 264],
      [100133, 9558, 44, 87, 72, 434, 3, 47, 630, 2, 196],
      [100134, 389, 2, 424, 51, 452, 81, 71, 268, 3, 288],
      [100135, 7190, 57, 374, 84, 120, 69, 55, 496, 3, 51],
      [100136, 9389, 30, 229, 5, 213, 58, 6, 532, 1, 12],
      [100137, 2130, 44, 994, 93, 443, 90, 51, 64, 3, 295],
      [100138, 3114, 85, 374, 6, 360, 73, 39, 268, 1, 122],
      [100139, 9505, 67, 178, 23, 243, 7, 6, 651, 1, 226],
      [100140, 8755, 21, 148, 16, 180, 36, 21, 824, 2, 28],
      [100141, 449, 40, 139, 20, 184, 9, 78, 368, 3, 12],
      [100142, 1293, 75, 147, 15, 466, 79, 66, 772, 4, 51],
      [100143, 955, 54, 973, 97, 404, 47, 68, 517, 3, 153],
      [100144, 663, 60, 297, 2, 393, 83, 24, 658, 3, 232],
      [100145, 950, 23, 558, 14, 199, 97, 93, 850, 3, 21],
      [100146, 4876, 87, 928, 22, 357, 99, 87, 370, 1, 137],
      [100147, 6947, 63, 701, 41, 407, 9, 71, 160, 1, 273],
      [100148, 9680, 47, 503, 23, 456, 94, 70, 733, 1, 207],
      [100149, 495, 56, 108, 58, 206, 100, 10, 213, 3, 238],
      [100150, 3686, 3, 661, 70, 407, 64, 74, 825, 2, 259],
      [100151, 1098, 43, 33, 10, 261, 63, 11, 161, 1, 35],
      [100152, 8495, 94, 397, 97, 167, 24, 11, 804, 1, 183],
      [100153, 6299, 81, 247, 95, 5, 14, 70, 602, 2, 294],
      [100154, 5679, 34, 892, 79, 125, 87, 47, 245, 1, 17],
      [100155, 5791, 43, 531, 9, 425, 5, 50, 28, 2, 23],
      [100156, 9616, 34, 572, 7, 177, 39, 34, 381, 2, 131],
      [100157, 6206, 2, 275, 72, 35, 12, 82, 615, 1, 261],
    ],
  };

  return (
    <MDBContainer>
      <h1 className="h3 text-center py-5 mb-0">Ads dashboard</h1>

      <section className="text-center">
        <MDBRow>
          <MDBCol md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader className="py-3">
                <h5 className="mb-0">Visibility</h5>
              </MDBCardHeader>
              <MDBCardBody>
                <div className="d-flex justify-content-around">
                  <div>
                    <p className="mb-2">Impr. Top</p>
                    <h5>
                      90%
                      <small className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>3.0%</span>
                      </small>
                    </h5>
                  </div>
                  <div>
                    <p className="mb-2">Impr. Abs Top</p>
                    <h5>
                      86.3
                      <small className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>4.5%</span>
                      </small>
                    </h5>
                  </div>
                </div>
                <div style={{ height: "350px" }}>
                  <MDBChart type="bar" data={visibilityChartData} />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader className="py-3">
                <h5 className="mb-0">Acquisition</h5>
              </MDBCardHeader>
              <MDBCardBody>
                <div className="d-flex justify-content-around">
                  <div>
                    <p className="mb-2">Clicks</p>
                    <h5>
                      4.9K
                      <small className="text-danger">
                        <i className="fas fa-caret-down me-1"></i>
                        <span> -71.9%</span>
                      </small>
                    </h5>
                  </div>
                  <div>
                    <p className="mb-2">CTR</p>
                    <h5>
                      31.13%
                      <small className="text-danger">
                        <i className="fas fa-caret-down me-1"></i>
                        <span>-2.6%</span>
                      </small>
                    </h5>
                  </div>
                </div>
                <div style={{ height: "350px" }}>
                  <MDBChart type="bar" data={acquisitionChartData} />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader className="py-3">
                <h5 className="mb-0">Conversion</h5>
              </MDBCardHeader>
              <MDBCardBody>
                <div className="d-flex justify-content-around">
                  <div>
                    <p className="mb-2">Conversions</p>
                    <h5>
                      859.5
                      <small className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>72.0%</span>
                      </small>
                    </h5>
                  </div>
                  <div>
                    <p className="mb-2">Conversion rate</p>
                    <h5>
                      17.7%
                      <small className="text-success">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>3.0%</span>
                      </small>
                    </h5>
                  </div>
                  <div>
                    <p className="mb-2">Cost / conv.</p>
                    <h5>
                      $1.86
                      <small className="text-danger">
                        <i className="fas fa-caret-up me-1"></i>
                        <span>4.5%</span>
                      </small>
                    </h5>
                  </div>
                </div>
                <div style={{ height: "350px" }}>
                  <MDBChart type="bar" data={conversionChartData} />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader className="py-3">
                <h5 className="mb-0">Cost</h5>
              </MDBCardHeader>
              <MDBCardBody>
                <div className="d-flex justify-content-around">
                  <div>
                    <p className="mb-2">Cost</p>
                    <h5>
                      $1.60K
                      <small className="text-success">
                        <i className="fas fa-caret-down me-1"></i>
                        <span> -71.9%</span>
                      </small>
                    </h5>
                  </div>
                  <div>
                    <p className="mb-2">Avg. CPC</p>
                    <h5>
                      $0.3
                      <small className="text-success">
                        <i className="fas fa-caret-down me-1"></i>
                        <span>-11.1%</span>
                      </small>
                    </h5>
                  </div>
                  <div>
                    <p className="mb-2">Avg. CPM</p>
                    <h5>
                      $102.55
                      <small className="text-success">
                        <i className="fas fa-caret-down me-1"></i>
                        <span>-13.4%</span>
                      </small>
                    </h5>
                  </div>
                </div>
                <div style={{ height: "350px" }}>
                  <MDBChart type="bar" data={costChartData} />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>

      <section>
        <MDBCard>
          <MDBCardBody>
            <MDBDatatable data={tableData} />
          </MDBCardBody>
        </MDBCard>
      </section>
    </MDBContainer>
  );
};

export default AdsDashboard;
