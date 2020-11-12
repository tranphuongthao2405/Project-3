import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Icon, Col, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import "./LandingPage.css";
import CheckBox from "./Sections/Checkbox";
import RadioBox from "./Sections/RadioBox";
import { FILTER_PLACE, PRICE } from "../../../constant/Constant";
import SearchBar from "./Sections/SearchBar";
import { Alert } from "antd";

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
  const [searchTerms, setSearchTerms] = useState("");

  const onClose = () => {};

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
        return (
          <Alert
            message="Error"
            description="Failed to fetch product data"
            type="error"
            closable
            onClose={onClose}
          />
        );
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
      searchTerm: searchTerms,
    };
    getTours(variables);
    setSkip(skipTemp);
  };

  const renderCards = tours.map((tour, index) => (
    <Col lg={6} md={8} xs={24}>
      <Card
        hoverable={true}
        cover={
          <a href={`/tour/${tour._id}`}>
            <ImageSlider images={tour.images} />
          </a>
        }
      >
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

  const updateSearchTerms = (newSearchTerms) => {
    const variables = {
      skip: 0,
      limit: limit,
      filters: filters,
      searchTerm: newSearchTerms,
    };
    setSkip(0);
    setSearchTerms(newSearchTerms);
    getTours(variables);
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

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "1rem auto",
            }}
          >
            <SearchBar refreshFunction={updateSearchTerms} />
          </div>

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
      </div>
    </>
  );
}

export default LandingPage;
