/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu, Icon, Badge } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector((state) => state.user);
  let name;
  let isAdmin = false;
  if (user !== undefined) {
    if (user.userData !== undefined) {
      isAdmin = user.userData.isAdmin;
      name = user.userData.firstname + " " + user.userData.lastname;
    }
  }

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Failed to log out");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Sign In</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Sign Up</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="name" style={{ marginBottom: -4 }}>
          <p>Hi, {name}</p>
        </Menu.Item>
        <Menu.Item key="history">
          <a href="/history" style={{ marginRight: -15 }}>
            History
          </a>
        </Menu.Item>
        {isAdmin ? (
          <Menu.Item key="upload">
            <a
              href="/tour/upload"
              style={{ marginRight: -20, color: "#667777", marginBottom: -4 }}
            >
              <Icon type="upload" style={{ fontSize: 25 }} />
            </a>
          </Menu.Item>
        ) : (
          <></>
        )}
        <Menu.Item key="cart" style={{ marginBottom: 5 }}>
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" style={{ marginRight: -20, color: "#667777" }}>
              <Icon type="shopping-cart" style={{ fontSize: 25 }} />
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Log Out</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
