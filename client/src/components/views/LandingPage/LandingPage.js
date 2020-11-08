import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Icon, Col, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./LandingPage.css";
import CheckBox from "./Sections/Checkbox";
import RadioBox from "./Sections/RadioBox";
import { FILTER_PLACE, FILTER_PLACES, PRICE } from "../../../constant/Constant";

const { Meta } = Card;
const position = [51.505, -0.09];

function LandingPage() {
  const [tours, setTours] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [filters, setFilters] = useState({
    places: [],
    price: [],
  });

  const getTours = (variables) => {
    axios.post("/api/product/getTours", variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setTours([...tours, ...response.data.tours]);
        } else {
          setTours(response.data.tours);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("Failed to fetch product data");
      }
    });
  };

  useEffect(() => {
    const variables = {
      skip: skip,
      limit: limit,
    };
    getTours(variables);
  }, []);

  const onLoadMore = () => {
    let skipTemp = skip + limit;
    const variables = {
      skip: skipTemp,
      limit: limit,
      loadMore: true,
      filters: filters,
    };
    getTours(variables);
    setSkip(skipTemp);
  };

  const renderCards = tours.map((tour, index) => (
    <Col lg={6} md={8} xs={24}>
      <Card hoverable={true} cover={<ImageSlider images={tour.images} />}>
        <Meta title={tour.title} description={`${tour.price}VND`} />
      </Card>
    </Col>
  ));

  const showFilterResults = (filter) => {
    const variables = {
      skip: 0,
      limit: limit,
      filters: filter,
    };
    getTours(variables);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = PRICE;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };

  const handleFilters = (filter, category) => {
    const newFilters = { ...filters };
    newFilters[category] = filter;

    if (category === "price") {
      let priceValues = handlePrice(filter);
      newFilters[category] = priceValues;
    }

    console.log(newFilters);

    showFilterResults(newFilters);
    setFilters(newFilters);
  };

  return (
    <>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            Let's travel <Icon type="rocket" />
          </h2>

          <br />

          <Row gutter={[16, 16]}>
            <Col lg={12} xs={24}>
              <CheckBox
                list={FILTER_PLACE}
                handleFilters={(filters) => handleFilters(filters, "places")}
              />
            </Col>
            <Col lg={12} xs={24}>
              <RadioBox
                list={PRICE}
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            </Col>
          </Row>

          <br />
          <br />
          {tours.length === 0 ? (
            <div
              style={{
                display: "flex",
                height: "300px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2>Loading...</h2>
            </div>
          ) : (
            <div>
              <Row gutter={[16, 16]}>{renderCards}</Row>
            </div>
          )}
          <br />
          <br />

          {postSize >= limit && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={onLoadMore}>Load more</Button>
            </div>
          )}
        </div>
        <div>
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
