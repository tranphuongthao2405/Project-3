import React from "react";

function WeatherInfo(props) {
  return (
    <div>
      <div style={{ border: "1px solid rgba(0, 0, 0, 0.65)", width: "100%" }}>
        <h2 style={{ display: "flex", padding: "1rem" }}>
          Current weather at the destination:
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <img
            alt=""
            src={props.weatherData.Image}
            style={{ width: "80px", height: "80px", justifyContent: "center" }}
          />
          <p>City: {props.weatherData.City}</p>
          <p>Weather: {props.weatherData.Weather}</p>
          <p>Temperature: {props.weatherData.Temperature}</p>
          <p>Feels like: {props.weatherData.Feel}</p>
          <p>Humidity: {props.weatherData.Humidity}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
