import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "antd";
import TourImage from "./Sections/TourImage";
import TourInfo from "./Sections/TourInfo";
import { addToCart } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

function DetailTourPage(props) {
  const dispatch = useDispatch();
  const tourId = props.match.params.tourId;
  const [tour, setTour] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/product/tours_by_id?id=${tourId}&type=single`)
      .then((response) => {
        setTour(response.data[0]);
        console.log(tour);
      });
  }, []);

  const addToCartHandler = (tourId) => {
    dispatch(addToCart(tourId));
  };

  return (
    <div className="detailPage" style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{tour.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24} style={{ padding: "2rem" }}>
          <TourImage detail={tour} />
        </Col>
        <Col lg={12} xs={24} style={{ padding: "2rem" }}>
          <TourInfo addToCart={addToCartHandler} detail={tour} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailTourPage;
