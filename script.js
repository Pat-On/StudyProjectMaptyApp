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

// 227 Geolocation API from browser
if (navigator.geolocation) // check for older browser if it has this API;
    navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;

        console.log(latitude, longitude);
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`)


    }, // first function when the data is going to be successfully fetched
        function () {
            alert('Could not get your position');
        }, // function executed in case of failure
    );