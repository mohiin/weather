
let temp = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let heatIndex = document.querySelector(".heat-index");
let wind = document.querySelector(".wind");
let isDay = document.querySelector(".is-day");
let feelsLike = document.querySelector(".feels-like");
let btn = document.querySelector('.btn');


const api_url = "https://api.weatherapi.com/v1/"
const api_key = "77a42dbe007042c8864124951241610"


document.querySelector('.form').addEventListener('submit', (event) => {
    event.preventDefault();
    const city = document.querySelector('.inp').value;
    console.log(city);


    getInfo(city).then(result => {
        temp.innerText = result.temp;
        humidity.innerText = result.humidity;
        heatIndex.innerText = result.heatIndex;
        wind.innerText = result.wind;
        isDay.innerText = result.isDay === 0 ? "It's nighttime!" : "It's daytime!";
        feelsLike.innerText = result.feelsLike;
    })

});


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
            name: jsonRes.location.name,
        }
        console.log(result);

        return result;

    } catch (err) {
       return "Please enter a city name."; 

    }

}
