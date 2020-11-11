import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import { Result, Empty } from "antd";

function CartPage(props) {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cartItems = [];
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart));
      }
    }
  }, [props.user.userData]);

  const calculateTotal = (cartDetail) => {
    let totalPrice = 0;

    cartDetail.map((item) => {
      totalPrice += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(totalPrice);
  };

  useEffect(() => {
    if (props.user.cartDetail && props.user.cartDetail.length > 0) {
      calculateTotal(props.user.cartDetail);
    }
  }, [props.user.cartDetail]);

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <div>
        <UserCardBlock tours={props.user.cartDetail} />
        <div style={{ marginTop: "3rem" }}>
          <h2>Total amount: {total}VND</h2>
        </div>
        <Result status="success" title="Successfully purchased items" />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <br />
          <Empty description={false} />
          <p>No items in the cart</p>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
