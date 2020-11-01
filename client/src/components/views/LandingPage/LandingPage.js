import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Icon, Col, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";

const { Meta } = Card;

function LandingPage() {
  const [tours, setTours] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);

  const getTours = (variables) => {
    axios.post("/api/product/getTours", variables).then((response) => {
      if (response.data.success) {
        setTours([...tours, ...response.data.tours]);
        setPostSize(response.data.postSize);
        console.log(response.data.tours);
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
    };
    getTours(variables);
    setSkip(skipTemp);
  };

  const renderCards = tours.map((tour, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card hoverable={true} cover={<ImageSlider images={tour.images} />}>
          <Meta title={tour.title} description={`${tour.price} VND`} />
        </Card>
      </Col>
    );
  });
  return (
    <>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            Let's travel <Icon type="rocket" />
          </h2>
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
              <h2>No posts yet...</h2>
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
