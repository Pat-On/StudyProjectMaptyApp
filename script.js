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

// 227 Geolocation API from browser + 228 Displaying a Map Using Leaflet Library
if (navigator.geolocation) // check for older browser if it has this API;
    navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;

        console.log(latitude, longitude);
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`)
        //we need in our html element with the id map - empty div for example 
        //L = is the main function - like namespace 
        const map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`
        }).addTo(map);



        map.on('click', function (mapEvent) {
            console.log(mapEvent);
            const { lat, lng } = mapEvent.latlng;

            L.marker([lat, lng])
                .addTo(map)
                .bindPopup(L.popup({
                    autoClose: false,
                    maxWidth: 250,
                    minWidth: 100,
                    closeOnClick: false,
                    className: 'running-popup',
                })
                ).setPopupContent('Workout')
                .openPopup()
        })

    }, // first function when the data is going to be successfully fetched
        function () {
            alert('Could not get your position');
        }, // function executed in case of failure
    );

