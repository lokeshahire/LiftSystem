// routes/elevatorRoutes.js

const express = require("express");
const elevatorSystemController = require("../controllers/elevatorSystemController");

const router = express.Router();

// API route for initializing the elevator system
router.post("/initialize", elevatorSystemController.initializeElevatorSystem);

// ----------------------------------

// API route for fetching elevator data
router.get("/", elevatorSystemController.fetchElevatorData);

// API routes for managing elevators

router.get("/:elevatorId/requests", elevatorSystemController.fetchAllRequests);

router.get(
  "/:elevatorId/next-destination",
  elevatorSystemController.fetchNextDestination
);

router.get(
  "/:elevatorId/movement-status",
  elevatorSystemController.fetchMovementStatus
);

// -----------------------------------

router.post("/request", elevatorSystemController.saveUserRequest);

router.post(
  "/:elevatorId/maintenance",
  elevatorSystemController.markElevatorMaintenance
);

router.post("/:elevatorId/door", elevatorSystemController.openCloseDoor);

module.exports = router;
