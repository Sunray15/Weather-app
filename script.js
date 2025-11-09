const apiKey = "ce85aa5b8da810424a5d87693443222b"; //OpenWeather API key

//Function to fetch weather data for a given city
function fetchWeather(city){
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
        city + "&units=metric&appid=" + apiKey
       ).then(function(response){
    if(!response.ok){
      alert("No Weather found!")
      throw new Error("no weather found!");
    }
    return response.json(); //converts the data in json
  }).then(function(data){
    displayWeather(data); // display the weather data fetched by the API
  })
}//Function to display weather data
function displayWeather(data){
  const name = data.name;
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  const temp = data.main.temp;
  const feels_like = data.main.feels_like;
  const temp_min = data.main.temp_min;
  const temp_max = data.main.temp_max;
  const humidity = data.main.humidity;
  const speed = data.wind.speed;
  document.querySelector(".city").innerText = "Weather in: " + name;
  document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = temp + "°C";
  document.querySelector(".feels-like").innerText = "Feels Like: " + feels_like + "°C";
  document.querySelector(".min-temp").innerText = "Min Temp: " + temp_min + "°C";
  document.querySelector(".max-temp").innerText = "Max Temp: " + temp_max + "°C";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
  let backgroundImageUrl;
  
  if(temp < 0){
    backgroundImageUrl = "https://www.shutterstock.com/image-photo/winter-forest-south-park-sofia-600nw-2483073899.jpg";
  }else if(temp >= 0 && temp < 15){
    backgroundImageUrl = "https://media.istockphoto.com/id/1448326946/photo/bare-trees-in-a-misty-winter-landscape.jpg?s=612x612&w=0&k=20&c=6HNuV4ZEY27ZagqZxWKy7GnbYJLvSRKVK1Iy36Cb2Mg=";
  }else if(temp >= 15 && temp < 28){
    backgroundImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJFMgUd3biS2IyRlZjfSWybvJCT3YUaFzPFQ&s";
  }else{
    backgroundImageUrl = "https://www.shutterstock.com/image-photo/beauty-sunny-day-on-lake-260nw-75664066.jpg";
  }
  
  document.body.style.backgroundImage = 'url(' + backgroundImageUrl + ')';
  document.querySelector(".weather").classList.remove("loading");
}
//function to search city
function search(){
  const city = document.querySelector(".search-bar").value;
  fetchWeather(city);
}
//click events
document.querySelector(".search button").addEventListener("click",function(){
  search();
})
document.querySelector(".search-bar").addEventListener("keyup", function(event){
  if(event.key === "Enter"){
    search();
  }
})

fetchWeather("Siliguri");
