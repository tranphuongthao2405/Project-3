import React, { useEffect, useState } from "react";
import { Button, Descriptions } from "antd";

function TourInfo(props) {
  const [tour, setTour] = useState({});
  useEffect(() => {
    setTour(props.detail);
  }, [props.detail]);

  return (
    <div>
      <Descriptions title="Product Infomation">
        <Descriptions.Item
          label="Price"
          span={3}
        >{`${tour.price}VND`}</Descriptions.Item>
        <Descriptions.Item label="Sold" span={3}>
          {tour.sold}
        </Descriptions.Item>
        <Descriptions.Item label="View" span={3}>
          {tour.views}
        </Descriptions.Item>
        <Descriptions.Item label="Blog" span={3}>
          <a href={tour.blog}>{tour.blog}</a>
        </Descriptions.Item>
        <Descriptions.Item label="Descriptions" span={3}>
          {tour.description}
        </Descriptions.Item>
        <Descriptions.Item label="Vehicle recommend" span={3}>
          {tour.vehicle}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shape="round" type="danger">
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default TourInfo;