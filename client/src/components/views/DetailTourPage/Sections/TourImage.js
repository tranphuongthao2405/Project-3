import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

function TourImage(props) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let imagesArray = [];

      props.detail.images &&
        props.detail.images.map((item) => {
          imagesArray.push({
            original: `http://localhost:5000/${item}`,
            thumbnail: `http://localhost:5000/${item}`,
          });
        });
      setImages(imagesArray);
    }
  }, [props.detail.images]);
  return (
    <div>
      <ImageGallery items={images} />
    </div>
  );
}

export default TourImage;
