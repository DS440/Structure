// Initialize variables
const cameras = document.querySelector(".cameras");
const addCameraButton = document.querySelector("#add-camera-button");
const deleteCameraButton = document.querySelector("#delete-camera-button");
const dailyUserSpan = document.querySelector("#daily-users");
const monthlyUserSpan = document.querySelector("#monthly-users");
const percentageGrowthSpan = document.querySelector("#percentage-growth");
const histogramCanvas = document.querySelector("#bar-chart");
let cameraId = 0;

const ctx = document.getElementById('bar-chart');    
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: '# of visitors',
      data: [10, 55, 100, 130, 500, 780, 1020, 3000, 7000, 10000, 5400, 10020],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Function to add a new camera to the camera section
addCameraButton.onclick = function() {
  cameraId++;
  const camera = document.createElement("div");
  camera.classList.add("camera");
  camera.id = `camera-${cameraId}`;
  camera.innerHTML = `
    <h3>Camera ${cameraId}</h3>
    <form method="post" action="/submit">
		<label for="ip_address">Select Camera:</label>
		<input type="file" id="camera${cameraId}" name="ip_address">
    </label>
  `;
  cameras.appendChild(camera);
}
// <p class="signal" id="camera-${cameraId}-signal">No Signal</p>
//     <p class="license-plate" id="camera-${cameraId}-license-plate"></p>
deleteCameraButton.onclick = function() {
  const element = document.getElementById(`camera-${cameraId}`);
  element.remove();
  cameraId--;
}


// Function to update signal and license plate information for a specific camera
function updateCameraSignal(cameraId, signal, licensePlate) {
  const cameraSignal = document.querySelector(`#camera-${cameraId}-signal`);
  cameraSignal.textContent = signal;

  const cameraLicensePlate = document.querySelector(`#camera-${cameraId}-license-plate`);
  cameraLicensePlate.textContent = licensePlate;
}
 const query = `SELECT * FROM appUser.User1_LPs WHERE LP_Num = '${licenseNum}' AND state = '${stateABV}'`;


// Function to update the daily and monthly user count
function updateUserCount(daily, monthly) {
  dailyUserSpan.textContent = daily;
  monthlyUserSpan.textContent = monthly;
}

// Function to update the percentage growth compared to the prior period
function updatePercentageGrowth(percentage) {
  percentageGrowthSpan.textContent = percentage;
}

// Function to update the histogram
function updateHistogram(data) {
  // Render the histogram using a library such as Chart.js
  const histogram = new Chart(histogramCanvas, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Weekly Users',
        data: data.values,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          type: 'logarithmic',
          ticks: {
            min: 0,
            max: 10000,
            callback: function(value, index, values) {
              return Number(value.toString());
            }
          }
        }]
      }
    }
  });
}


// Call the functions to update the user count and histogram with initial data
updateUserCount(100, 1000);

updatePercentageGrowth("10%");

updateHistogram(histogramData);