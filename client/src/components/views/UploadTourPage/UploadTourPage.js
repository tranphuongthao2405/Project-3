import React, { useState } from "react";
import { Form, Input, Button, Typography, Select } from "antd";
import FileUpload from "../../utils/FileUpload";
import axios from "axios";
import { TRAVEL_PLACE, VEHICLES } from "../../../constant/Constant";
import { Alert } from "antd";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function UploadTourPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [blog, setBlog] = useState("");
  const [place, setPlace] = useState("");
  const [vehicle, setVehicle] = useState("");

  const onTitleChange = (evt) => {
    setTitle(evt.target.value);
  };
  const onDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  const onPriceChange = (evt) => {
    setPrice(evt.target.value);
  };

  const onTravelPlaceChange = (value) => {
    setPlace(value);
  };

  const onBlogChange = (evt) => {
    setBlog(evt.target.value);
  };

  const onVehicleChange = (value) => {
    setVehicle(value);
  };

  const updateImages = (newImage) => {
    setImages(newImage);
  };

  const onClose = () => {};

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (!title || !description || !vehicle || !price || !images || !place) {
      return (
        <Alert
          message="Error"
          description="Fill all the fields first"
          type="error"
          closable
          onClose={onClose}
        />
      );
    }
    const values = {
      writer: props.user.userData._id,
      title: title,
      description: description,
      blog: blog,
      vehicle: vehicle,
      price: price,
      images: images,
      place: place,
    };
    axios.post("/api/product/uploadTour", values).then((response) => {
      if (response.data.success) {
        return (
          <Alert
            message="Error"
            description="Tour is successfully uploaded"
            type="error"
            closable
            onClose={onClose}
          />
        );
        props.history.push("/");
      } else {
        return (
          <Alert
            message="Error"
            description="Failed to upload tour"
            type="error"
            closable
            onClose={onClose}
          />
        );
      }
    });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Travel Tour</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>Title:</label>
        <Input onChange={onTitleChange} value={title} />
        <br />
        <br />
        <label>Description:</label>
        <TextArea onChange={onDescriptionChange} value={description} />
        <br />
        <br />
        <label>Blog related:</label>
        <Input onChange={onBlogChange} value={blog} />
        <br />
        <br />
        <label>Vehicle recommended:</label>
        <Select onChange={onVehicleChange}>
          {VEHICLES.map((item) => (
            <Option key={item.key} value={item.value}>
              {item.value}
            </Option>
          ))}
        </Select>
        <br />
        <br />
        <label>Price (VND):</label>
        <Input onChange={onPriceChange} value={price} type="number" />
        <br />
        <br />
        <label>Place:</label>
        <Select onChange={onTravelPlaceChange}>
          {TRAVEL_PLACE.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <br />
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadTourPage;
