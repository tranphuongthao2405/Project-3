/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Carousel } from 'antd';

function ImageSlider(props) {
  const date = new Date();
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image) => (
          <div key={`${image}${date.toISOString}`}>
            <img
              style={{
                width: '100%',
                maxWidth: '270px',
                height: '100%',
                maxHeight: '160px',
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
