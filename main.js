let input = document.querySelector(".search-box input");
let button = document.querySelector(".search-box button");
let img = document.querySelector(".weather img");
let temperature = document.querySelector(".temperature");
let description = document.querySelector(".description");
let humidity = document.querySelector(".main-info");
let windInfo = document.querySelector(".info-wind span");
let notFound = document.querySelector(".not-found");
let container = document.querySelector(".container");
let weatherBox = document.querySelector(".weather-box");
let weatherDetails = document.querySelector(".weather-details");
let wind = document.querySelector(".wind");
async function getWeather(value) {
  try {
    const APIKey = "5f1077f561d87b1be334b15838fc01b4";
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${APIKey}`
    );
    let data = await response.json();
    console.log(data);
    if (data.cod === "404") {
      container.style.height = "400px";
      notFound.classList.add("active");
      weatherDetails.classList.remove("active");
      container.classList.remove("active");
      setTimeout(() => {
        const notyf = new Notyf({
          duration: 3000,
          ripple: true,
          position: {
            x: "right",
            y: "top",
          },
        });
        notyf.error("City have not found");
      }, 1000);
    } else {
      container.style.height = "555px";
      weatherBox.classList.add("active");
      container.classList.add("active");
      notFound.classList.remove("active");
      weatherDetails.classList.add("active");
      windInfo.textContent = `${Math.ceil(data.wind.speed)}Km/h`;
      humidity.textContent = `${data.main.humidity}%`;
      description.innerHTML = `${data.weather[0].description} `;
      let kelvin = data.main.temp;
      let celciy = kelvin - 273.15;
      temperature.innerHTML = `${Math.round(celciy)}°C`;
      setTimeout(() => {
        const notyf = new Notyf({
          duration: 3000,
          ripple: true,
          position: { x: "right", y: "top" },
        });
        notyf.success("Country successfully found");
      }, 1000);
      if (data.weather[0].main === "Clouds") {
        img.src = "./cloud.png";
      } else if (data.weather[0].main === "Rain") {
        img.src = "./rain.png";
      } else if (data.weather[0].main === "Snow") {
        img.src = "./snow.png";
      } else if (data.weather[0].main === "Clear") {
        img.src = "./sun.png";
      } else if (data.weather[0].main === "Mist") {
        img.src = "./mist.png";
      }
    }
  } catch (error) {
    console.log(error, "error");
  }
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value === "") {
    alert("please enter real place name");
  } else {
    getWeather(input.value);
  }
});
