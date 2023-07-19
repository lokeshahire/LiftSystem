// controllers/elevatorSystemController.js

const Elevator = require("../models/elevator");

const elevators = [
  {
    id: 1,
    isMoving: true,
    movementDirection: "up",
    nextDestination: 5,
    requests: [],
  },
  {
    id: 2,
    isMoving: false,
    movementDirection: null,
    nextDestination: 0,
    requests: [],
  },
  {
    id: 3,
    isMoving: true,
    movementDirection: "down",
    nextDestination: 2,
    requests: [],
  },
];

const elevatorSystemController = {
  // elevators: [],
  fetchElevatorData(req, res) {
    try {
      // Fetch elevator data from the backend or use the sample data
      // For example, if you are using a database, you can fetch elevator information from the database here
      // In this example, we'll simply return the sample data defined above

      return res.status(200).json(elevators);
    } catch (error) {
      console.error("Error fetching elevator data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  initializeElevatorSystem(req, res) {
    const { numElevators } = req.body;
    this.elevators = Array.from(
      { length: numElevators },
      (_, index) => new Elevator(index + 1)
    );
    return res.status(200).json({
      message: `Elevator system initialized with ${numElevators} elevators.`,
    });
  },

  fetchAllRequests(req, res) {
    const { elevatorId } = req.params;
    if (!this.elevators[elevatorId - 1]) {
      return res
        .status(404)
        .json({ message: `Elevator with ID ${elevatorId} not found.` });
    }

    const requests = this.elevators[elevatorId - 1].requests;
    return res.status(200).json({ elevatorId, requests });
  },

  fetchNextDestination(req, res) {
    const { elevatorId } = req.params;
    if (!this.elevators[elevatorId - 1]) {
      return res
        .status(404)
        .json({ message: `Elevator with ID ${elevatorId} not found.` });
    }

    // Implement logic to calculate the next destination based on pending requests
    // For simplicity, we'll assume the elevator moves to the next requested floor.
    const nextDestination =
      this.elevators[elevatorId - 1].requests[0] ||
      this.elevators[elevatorId - 1].currentFloor;
    return res.status(200).json({ elevatorId, nextDestination });
  },

  fetchMovementStatus(req, res) {
    const { elevatorId } = req.params;
    if (!this.elevators[elevatorId - 1]) {
      return res
        .status(404)
        .json({ message: `Elevator with ID ${elevatorId} not found.` });
    }

    const movementStatus = this.elevators[elevatorId - 1].isMoving
      ? this.elevators[elevatorId - 1].movementDirection
      : "stopped";
    return res.status(200).json({ elevatorId, movementStatus });
  },

  saveUserRequest(req, res) {
    try {
      // Get elevatorId and requestedFloor from the request body
      const { elevatorId, requestedFloor } = req.body;

      // Validate the inputs (ensure that elevatorId and requestedFloor are positive integers)
      if (
        !Number.isInteger(elevatorId) ||
        !Number.isInteger(requestedFloor) ||
        elevatorId <= 0 ||
        requestedFloor <= 0
      ) {
        return res.status(400).json({
          error:
            "Invalid input. elevatorId and requestedFloor must be positive integers.",
        });
      }

      // Find the specific elevator by its ID
      const elevator = elevators.find((elevator) => elevator.id === elevatorId);

      // If elevator with the specified ID is not found, return an error
      if (!elevator) {
        return res.status(404).json({ error: "Elevator not found." });
      }

      // Add the requested floor to the elevator's requests array
      elevator.requests.push(requestedFloor);

      // Send a success response
      return res.status(200).json({ message: "Elevator request successful." });
    } catch (error) {
      console.error("Error handling elevator request:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  markElevatorMaintenance(req, res) {
    const { elevatorId } = req.params;
    if (!this.elevators[elevatorId - 1]) {
      return res
        .status(404)
        .json({ message: `Elevator with ID ${elevatorId} not found.` });
    }

    this.elevators[elevatorId - 1].isOperational = false;
    return res
      .status(200)
      .json({ message: `Elevator ${elevatorId} marked as under maintenance.` });
  },

  openCloseDoor(req, res) {
    const { elevatorId } = req.params;
    if (!this.elevators[elevatorId - 1]) {
      return res
        .status(404)
        .json({ message: `Elevator with ID ${elevatorId} not found.` });
    }

    const { action } = req.body;
    const elevator = this.elevators[elevatorId - 1];

    if (action === "open") {
      elevator.doorOpen = true;
      return res
        .status(200)
        .json({ message: `Elevator ${elevatorId} door opened.` });
    } else if (action === "close") {
      elevator.doorOpen = false;
      return res
        .status(200)
        .json({ message: `Elevator ${elevatorId} door closed.` });
    } else {
      return res
        .status(400)
        .json({ message: 'Invalid action. Use "open" or "close".' });
    }
  },

  // Add other controller methods here as needed
};

module.exports = elevatorSystemController;
