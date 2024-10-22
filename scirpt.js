
let temp = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let heatIndex = document.querySelector(".heat-index");
let wind = document.querySelector(".wind");
let isDay = document.querySelector(".is-day");
let feelsLike = document.querySelector(".feels-like");
let place = document.querySelector(".city");
let country = document.querySelector(".country");
let desc = document.querySelector(".desc");
let err = document.querySelector(".err")
let btn = document.querySelector(".btn");


const api_url = "https://api.weatherapi.com/v1/"
const api_key = "77a42dbe007042c8864124951241610"

let getInfo = async (city) => {
    try {
        let respoonse = await fetch(`${api_url}/current.json?key=${api_key}&q=${city}&aqi=no&unit=metric`);
        let jsonRes = await respoonse.json();
        console.log(jsonRes);
        let result = {
            temp: jsonRes.current.temp_c,
            humidity: jsonRes.current.humidity,
            heatIndex: jsonRes.current.heatindex_c,
            wind: jsonRes.current.wind_kph,
            isDay: jsonRes.current.is_day,
            feelsLike: jsonRes.current.feelslike_c,
            place: jsonRes.location.name,
            country: jsonRes.location.country,
            desc: jsonRes.current.condition.text,
        };

         // Update the DOM elements
         temp.innerText = result.temp;
         humidity.innerText = result.humidity;
         heatIndex.innerText = result.heatIndex;
         wind.innerText = result.wind;
         isDay.innerText = result.isDay === 0 ? "nighttime!" : "daytime!";
         feelsLike.innerText = result.feelsLike;
         place.innerText = result.place;
         country.innerText = result.country;
         desc.innerText = result.desc;
         err.innerText = "";      
        
    } catch (error) {
        err.innerText = "Please enter a city name";  
    }
}

// for search functionality
document.querySelector(".form").addEventListener("submit", (event) => {
    event.preventDefault();
    let city = document.querySelector(".inp").value;

    getInfo(city);
});

//function to call the getInfo function everyday at 6AM and 6PM
function scheduleNextCalls(city){
    const now = new Date();//current date and time
    const morningTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0)//6AM
    const nighttime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0)//6PM

    //Adjust morningTime and nightTime for the next day if necessary
    if(now > morningTime){
        morningTime.setDate(morningTime.getDate() + 1);
    }

    if(now > nighttime){
        nighttime.setDate(nighttime.setDate() + 1);
    }

    const timeUnitMorning = morningTime - now;
    const timeUnitNight = nighttime - now;

    //Schedule the next calls
    setTimeout(() => {
        getInfo(city);
        scheduleNextCalls(city)// Reschedule for the next calls
    }, timeUnitMorning);

    setTimeout(() => {
        getInfo(city);
        scheduleNextCalls(city)// Reschedule for the next calls
    }, timeUnitNight);
}

// Call the function immediately
city = "Dhaka";
getInfo(city);
scheduleNextCalls(city);



