const baseUrl = "http://localhost:3000/elevator-system";

// Function to make API requests using Fetch API
async function fetchAPI(url, method, data = {}) {
  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method === "GET") {
      // For "GET" requests, exclude the body from the options
      delete options.headers["Content-Type"];
    } else {
      // For other methods (e.g., "POST"), include the body in the options
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    // Check if the response status is between 200 and 299 (indicating success)
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error in fetchAPI:", error);
    throw error;
  }
}

// Function to display elevators data in the frontend
async function displayElevators() {
  try {
    const elevatorsData = await fetchAPI(`${baseUrl}`, "GET");
    console.log(elevatorsData); // Log the fetched data (for debugging)

    // Implement logic to update the UI with the fetched data (e.g., display elevator information)
  } catch (error) {
    // Handle errors from fetchAPI here (e.g., display error messages)
    console.error("Error in displayElevators:", error);
  }
}

// Function to handle the elevator request form submission
async function requestElevator(event) {
  event.preventDefault();

  try {
    const form = event.target;
    const formData = new FormData(form);

    const requestData = {
      elevatorId: Number(formData.get("elevatorId")),
      requestedFloor: Number(formData.get("requestedFloor")),
    };

    const response = await fetchAPI(`${baseUrl}/request`, "POST", requestData);
    console.log(response); // Log the response from the server (for debugging)

    // Implement logic to handle the response here (e.g., update UI, display success/error messages, etc.)
  } catch (error) {
    // Handle errors from fetchAPI here (e.g., display error messages)
    console.error("Error in requestElevator:", error);
  }
}

// Function to initialize the elevator system
async function initializeElevatorSystem(event) {
  event.preventDefault();

  try {
    const form = event.target;
    const formData = new FormData(form);

    const requestData = {
      numberOfElevators: Number(formData.get("numberOfElevators")),
    };

    const response = await fetchAPI(
      `${baseUrl}/initialize`,
      "POST",
      requestData
    );
    console.log(response); // Log the response from the server (for debugging)

    // Implement logic to handle the response here (e.g., update UI, display success/error messages, etc.)
  } catch (error) {
    // Handle errors from fetchAPI here (e.g., display error messages)
    console.error("Error in initializeElevatorSystem:", error);
  }
}

// Add event listeners to the forms
const requestForm = document.getElementById("requestForm");
requestForm.addEventListener("submit", requestElevator);

const initializeForm = document.getElementById("initializeForm");
initializeForm.addEventListener("submit", initializeElevatorSystem);

// Call the function to display elevators when the DOM is ready
document.addEventListener("DOMContentLoaded", displayElevators);
