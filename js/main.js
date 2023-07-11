// //Today's Card Variables:
let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    humidity = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search-bar");

    //Next Days Variables:
let nextDay = document.getElementsByClassName("nextDay"),
nextDayIcon = document.getElementsByClassName("nextDay-icon"),
maxDegree = document.getElementsByClassName("max-degree"),
minDegree = document.getElementsByClassName("min-degree"),
nextDayDescription = document.getElementsByClassName("nextDay-description"),
currentCity = "Cairo",
  apiResponse,
  responseData,
  monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
  days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

// get data from Api


async function GetWeatherData() {
  apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ca69ed8da68248c1a94165723232002&q=${currentCity}&days=3`);

  responseData = await apiResponse.json('')
  console.log(responseData)
  GetDaysWeather()
  ShowDataWeather()
}

GetWeatherData()

function GetDaysWeather() {

  let newDays = new Date

  today.innerHTML = days[newDays.getDay()];
  todayDate.innerHTML = `${newDays.getDate()} ${monthName[newDays.getMonth()]}`;
  cityLocation.innerHTML =  responseData.location.name;
  todayDegree.innerHTML= responseData.current.temp_c;
  todayIcon.setAttribute('src' , `http:${responseData.current.condition.icon}`)
  description.innerHTML = responseData.current.condition.text;
  humidity.innerHTML= responseData.current.humidity;
  wind.innerHTML= responseData.current.wind_dir;
  compass.innerHTML= responseData.current.wind_kph;

}

function ShowDataWeather() {

  for(let i = 0; i < nextDay.length; i++) {
    nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
    nextDayIcon[i].setAttribute('src', `http:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
    maxDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c;
    minDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.mintemp_c;

  }
}


searchBar.addEventListener("keyup" , function(){
  currentCity = searchBar.value;
  console.log(currentCity)
  GetWeatherData()
})

 