import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "antd";
import TourImage from "./Sections/TourImage";
import TourInfo from "./Sections/TourInfo";
import { addToCart } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import WeatherInfo from "./Sections/WeatherInfo";
import { API_KEY } from "../../../constant/Constant";
import { concatSeries } from "async";

function DetailTourPage(props) {
  const dispatch = useDispatch();
  const tourId = props.match.params.tourId;
  const [tour, setTour] = useState();
  const [position, setPosition] = useState([]);
  const [weatherData, setWeatherData] = useState();
  const [soundFile, setSoundFile] = useState();
  const numberOfCityReturn = 1;

  const url = `api.openweathermap.org/data/2.5/find?lat=${position[0]}&lon=${position[1]}&cnt=${numberOfCityReturn}&appid=${API_KEY}`;

  useEffect(() => {
    axios
      .get(`/api/product/tours_by_id?id=${tourId}&type=single`)
      .then((response) => {
        setTour(response.data[0]);
        const array = response.data[0].position.map((item) => parseFloat(item));
        setPosition(array);
      });
  }, []);

  useEffect(() => {
    axios.post(`/api/product/updateSoundFile?id=${tourId}`).then((response) => {
      setSoundFile(response.data.sound);
    });
  }, []);

  useEffect(() => {
    if (position && position.length > 0) {
      axios.get(`https://${url}`).then((response) => {
        setWeatherData({
          City: response.data.list[0].name,
          Weather: response.data.list[0].weather[0].main,
          Temperature: `${parseFloat(
            response.data.list[0].main.temp - 272.15
          ).toFixed(2)} °C`,
          Feel: `${parseFloat(
            response.data.list[0].main.feels_like - 272.15
          ).toFixed(2)} °C`,
          Humidity: `${response.data.list[0].main.humidity}%`,
          Image: `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}.png`,
        });
      });
    }
  }, [position]);

  const addToCartHandler = (tourId) => {
    dispatch(addToCart(tourId));
  };

  return (
    <div className="detailPage" style={{ width: "100%", padding: "3rem 4rem" }}>
      {tour ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>{tour.title}</h1>
          </div>
          <br />
          <Row gutter={[16, 16]}>
            <Col lg={12} xs={24} style={{ padding: "2rem" }}>
              <TourImage detail={tour} />
            </Col>
            <Col lg={12} xs={24} style={{ paddingLeft: "2rem" }}>
              <TourInfo
                addToCart={addToCartHandler}
                detail={tour}
                sound={soundFile}
              />
            </Col>
          </Row>
        </>
      ) : (
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Loading images and informations about the destination...
        </h2>
      )}
      <br />
      <br />

      {weatherData && position && position.length > 0 ? (
        <Row gutter={[16, 16]}>
          <Col lg={5} xs={24} style={{ padding: "2rem" }}>
            <WeatherInfo weatherData={weatherData} />
          </Col>
          <Col lg={19} xs={24} style={{ padding: "2rem" }}>
            <div
              className="map"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2 style={{ marginBottom: "2rem" }}>
                See the map for further infomation:
              </h2>
              <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>{tour.title}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </Col>
        </Row>
      ) : (
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Loading weather and map information...
        </h2>
      )}
    </div>
  );
}

export default DetailTourPage;
