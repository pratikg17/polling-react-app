import React from "react";
import { Menu, Dropdown, Button, Space, Row, Col, Layout } from "antd";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
const { Header, Content, Footer } = Layout;

function DefaultLayout(props) {
  function getLocalStorage() {
    return localStorage;
  }

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          backgroundColor: "#BF1223",
          minHeight: "9vh",
        }}
      >
        <div className="logo">
          <Link to="/">
            <img
              height="50px"
              width="50px"
              src="https://prod.cloud.rockstargames.com/crews/sc/8628/735/publish/emblem/emblem_128.png"
            ></img>
          </Link>
        </div>
        <Menu
          mode="horizontal"
          style={{
            backgroundColor: "#BF1223",
            color: "#F6F8F7",
            display: "flex",
            justifyContent: "end",
            fontSize: "20px",
          }}
        >
          <Menu.Item as="div" key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item as="div" key="add-poll">
            <Link to="/add-poll">Add Polls</Link>
          </Menu.Item>
          <Menu.Item as="div" key="my-polls">
            <Link to="/my-polls">My Polls</Link>
          </Menu.Item>
          {getLocalStorage().getItem("user") ? (
            <Menu.Item
              key="logout-user"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              <li>Logout</li>
            </Menu.Item>
          ) : (
            <Menu.Item
              key="login-user"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              <li>Login</li>
            </Menu.Item>
          )}
        </Menu>
      </Header>

      <Content
        style={{
          padding: "0 50px",
          marginTop: 64,
          backgroundColor: "#F6F8F7",
          minHeight: "90vh",
        }}
        className="site-layout"
      >
        {props.children}
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#BF1223",
          color: "#F6F8F7",
        }}
      >
        IGN Poller © {new Date().getFullYear()} Created by Pratik Gawand
      </Footer>
    </Layout>
  );
}

export default DefaultLayout;
