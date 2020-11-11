import React from "react";
import { Carousel } from "antd";

function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img
              style={{
                width: "100%",
                maxWidth: "270px",
                height: "100%",
                maxHeight: "160px",
              }}
              src={`http://localhost:5000/${image}`}
              alt="tourImage"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
