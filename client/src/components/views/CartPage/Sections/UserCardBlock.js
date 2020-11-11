import React from "react";
import "./UserCardBlock.css";

function UserCardBlock(props) {
  const renderCartImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Tour Image</th>
            <th>Tour Quantity</th>
            <th>Tour Price</th>
            <th>Remove From Cart</th>
          </tr>
        </thead>
        <tbody>
          {props.tours &&
            props.tours.map((tour) => (
              <tr key={tour._id}>
                <td>
                  <img
                    style={{ width: "70px" }}
                    alt="tour"
                    src={renderCartImage(tour.images)}
                  />
                </td>
                <td>{tour.quantity}</td>
                <td>{`${tour.price}VND`}</td>
                <td>
                  <button onClick>Remove</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
