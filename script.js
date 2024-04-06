// Define the Car class
class Car {
    constructor(brand, model, year, color, price, gas) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.price = price;
        this.gas = gas;
        this.totalDistance = 0; // Total distance traveled by the car div over 7 turns
        this.finishedRace = false; // Flag to track if the car has finished the race
    }

    // Method to display car details
    honk() {
        console.log(`${this.brand} | ${this.model} | ${this.year} | ${this.color} | $${this.price} | Gas: ${this.gas}`);
    }

    // Method to simulate a turn in the race
    raceTurn(currentYear) {
        // Check if the race has already finished for this car
        if (this.finishedRace) {
            return this.gas;
        }

        const yearsOld = currentYear - this.year;
        let gasLost = 5 + yearsOld; // Base gas lost
        
        // If the car is new, deduct only 5 litres
        if (yearsOld === 0) {
            gasLost = 5;
        }
        
        // Update gas remaining
        this.gas -= gasLost;

        // Check if gas remaining is less than zero
        if (this.gas < 0) {
            this.gas = 0; // Set gas to zero if it's less than zero
        }

        // Check if the race has finished for this car
        if (this.gas <= 0) {
            this.finishedRace = true;
            console.log(`${this.brand} has finished the race!`);
        }

        // Return updated gas remaining
        return this.gas;
    }

}

// Create car objects
const honda = new Car("Honda", "CR-V", 2023, "Red", 50000, 45);
const ford = new Car("Ford", "F-150", 2020, "Black", 25000, 30);
const bmw = new Car("BMW", "X5", 2022, "Green", 60000, 65);
const mazda = new Car("Mazda", "CX-5", 2019, "White", 15000, 60);
const audi = new Car("Audi", "Q7", 2018, "Silver", 52000, 47);
const kia = new Car("Kia", "Forte", 2020, "Blue", 21000, 56);

// Add event listener to the Honk button
document.addEventListener("DOMContentLoaded", function () {
    const honkBtn = document.querySelector(".honk-btn");
    const turnBtn = document.querySelector(".turn-btn");
    const resetBtn = document.querySelector(".reset-btn");
    const carDivs = document.querySelectorAll(".car");
    let currentYear = new Date().getFullYear();
    let raceTurnCount = 0; // Variable to track the number of race turns
    let currentTurn = 0; // Variable to track the current turn number

    honkBtn.addEventListener("click", function () {
        // Display car details without decreasing gas
        carDivs.forEach(function (carDiv, index) {
            const car = [honda, ford, bmw, mazda, audi, kia][index];
            car.honk();
            carDiv.innerHTML = `Tutt Tutt -> ${car.brand} | ${car.model} | ${car.year} | ${car.color} | $${car.price} | Gas Remaining: ${car.gas}`;
        });
    });

    turnBtn.addEventListener("click", function () {
        // Change the text of the turn button
        turnBtn.textContent = `Turn ${currentTurn + 1}`;

        // Deduct gas for each car
        carDivs.forEach(function (carDiv, index) {
            const car = [honda, ford, bmw, mazda, audi, kia][index];
            const gasRemaining = car.raceTurn(currentYear);
            carDiv.innerHTML = `Tutt Tutt -> ${car.brand} | ${car.model} | ${car.year} | ${car.color} | $${car.price} | Gas Remaining: ${gasRemaining}`;
        });

        // Increment the race turn count and update the current turn number
        raceTurnCount++;
        currentTurn++;

        // Check if all cars have finished the race or if the race has reached its limit
        if (raceTurnCount >= 7 || (honda.finishedRace && ford.finishedRace && bmw.finishedRace && mazda.finishedRace && audi.finishedRace && kia.finishedRace)) {
            console.log("Race finished!");
            // Disable the turn button to prevent further race turns
            turnBtn.disabled = true;
        }
    });

    resetBtn.addEventListener("click", function () {
        // Reload the page to reset all variables and UI
        location.reload();
    });
});
