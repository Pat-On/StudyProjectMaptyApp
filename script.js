'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
    // newest solution which are not yet part 
    date = new Date();
    id = (Date.now() + '').slice(-10) // pseudo id

    constructor(coords, distance, duration) {
        // this.date = ... normal solution -> implement it after
        // this.id = ...
        this.coords = coords; // [lat, lng]
        this.distance = distance; //km
        this.duration = duration; //min
    }
}

class Running extends Workout {
    type = 'running'
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace() {
        // Pace - min/km
        this.pace = this.duration / this.distance;
        return this.pace
    }
}

class Cycling extends Workout {
    type = 'cycling'
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        // this.type = 'cycling'
    }
    calcSpeed() {
        //km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed
    }

}

class App {
    // implement it in different way to make it work with ES 6
    #map;
    #mapEvent;
    #workouts = [] //class field
    constructor() {
        // this.workouts = []; // old way
        this._getPosition();
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
    }

    _getPosition() {
        // 227 Geolocation API from browser + 228 Displaying a Map Using Leaflet Library
        if (navigator.geolocation) // check for older browser if it has this API;
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this), // first function when the data is going to be successfully fetched
                function () {
                    alert('Could not get your position');
                }, // function executed in case of failure
            );
    }

    _loadMap(position) {
        const { latitude, longitude } = position.coords;

        // console.log(latitude, longitude);
        // console.log(`https://www.google.com/maps/@${latitude},${longitude}`)
        //we need in our html element with the id map - empty div for example 
        //L = is the main function - like namespace 
        this.#map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`
        }).addTo(this.#map);


        //handling clicks on map
        this.#map.on('click', this._showForm.bind(this));
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        //helper functions
        const validInputs = (...inputs) =>
            inputs.every(inp => Number.isFinite(inp))

        const allPositive = (...inputs) => inputs.every(inp => inp > 0)

        e.preventDefault();

        //Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;
        //check if data is valid

        //if workout running, creat running obj.
        if (type === 'running') {
            const cadence = +inputCadence.value;
            if (!validInputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence))
                return alert('Inputs have to be positive number!')
            workout = new Running([lat, lng], distance, duration, cadence);
            this.#workouts.push(workout);
        }
        //if workout cycling, create cycling obj.
        if (type === 'running') {
            const elevation = +inputElevation.value;
            if (!validInputs(distance, duration, elevation) ||
                !allPositive(distance, duration))
                return alert('Inputs have to be positive number!')
            workout = new Running([lat, lng], distance, duration, elevation);
            ;
        }

        // add new object to workout array
        this.#workouts.push(workout)

        // Render workout on map as market


        //this one is going to display marker
        // console.log(this.#mapEvent);

        this.renderWorkoutMarker(workout);


        //Clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        console.log(this)

    }

    renderWorkoutMarker(workout) {
        console.log(workout)
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(L.popup({
                autoClose: false,
                maxWidth: 250,
                minWidth: 100,
                closeOnClick: false,
                className: `${workout.type}-popup`,
            })
            ).setPopupContent("something ")
            .openPopup()
    }

}

const app = new App()

