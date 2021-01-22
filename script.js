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


// to get access to values  inside the function 
// let map, mapEvent

class App {
    #map;
    #mapEvent;

    constructor() {
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
        e.preventDefault();
        //Clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        console.log(this)

        //this one is going to display marker
        // console.log(this.#mapEvent);
        const { lat, lng } = this.#mapEvent.latlng;

        L.marker([lat, lng])
            .addTo(this.#map)
            .bindPopup(L.popup({
                autoClose: false,
                maxWidth: 250,
                minWidth: 100,
                closeOnClick: false,
                className: 'running-popup',
            })
            ).setPopupContent('Workout')
            .openPopup()
    }

}

const app = new App()





