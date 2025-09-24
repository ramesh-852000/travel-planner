// Elements
const tripForm = document.getElementById('tripForm');
const tripList = document.getElementById('tripList');
const itineraryForm = document.getElementById('itineraryForm');
const itineraryList = document.getElementById('itineraryList');

let trips = JSON.parse(localStorage.getItem('trips')) || [];
let currentTripIndex = null;

// Save trips to localStorage
function saveTrips() {
    localStorage.setItem('trips', JSON.stringify(trips));
}

// Update trip list
function renderTrips() {
    tripList.innerHTML = "";
    trips.forEach((trip, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
      <div>
        <strong>${trip.destination}</strong> <br>
        📅 ${trip.startDate} → ${trip.endDate} <br>
        💰 Budget: ₹${trip.budget}
      </div>
    `;

        // Select trip button
        const selectBtn = document.createElement('button');
        selectBtn.textContent = "Select";
        selectBtn.onclick = () => {
            currentTripIndex = index;
            renderItinerary();
        };

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = () => {
            trips.splice(index, 1);
            saveTrips();
            renderTrips();
            itineraryList.innerHTML = "";
        };

        li.appendChild(selectBtn);
        li.appendChild(deleteBtn);
        tripList.appendChild(li);
    });
}

// Add new trip
tripForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const destination = document.getElementById('destination').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const budget = document.getElementById('budget').value;

    trips.push({ destination, startDate, endDate, budget, itinerary: [] });
    saveTrips();
    renderTrips();
    tripForm.reset();
});

// Render itinerary
function renderItinerary() {
    itineraryList.innerHTML = "";
    if (currentTripIndex === null) return;
    trips[currentTripIndex].itinerary.forEach((activity, index) => {
        const li = document.createElement('li');
        li.textContent = activity;

        // Delete activity
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = () => {
            trips[currentTripIndex].itinerary.splice(index, 1);
            saveTrips();
            renderItinerary();
        };

        li.appendChild(deleteBtn);
        itineraryList.appendChild(li);
    });
}

// Add activity
itineraryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (currentTripIndex === null) {
        alert("Select a trip first!");
        return;
    }
    const activity = document.getElementById('activity').value.trim();
    if (activity) {
        trips[currentTripIndex].itinerary.push(activity);
        saveTrips();
        renderItinerary();
        itineraryForm.reset();
    }
});

// Initial render
renderTrips();
