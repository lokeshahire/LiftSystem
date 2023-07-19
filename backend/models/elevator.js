// models/elevator.js

class Elevator {
  constructor(elevatorId) {
    this.id = elevatorId;
    this.currentFloor = 1;
    this.isMoving = false;
    this.movementDirection = "up";
    this.requests = [];
    this.isOperational = true;
    this.doorOpen = false;
  }

  // Elevator methods (move, openDoor, closeDoor, etc.) can be added here
}

module.exports = Elevator;
