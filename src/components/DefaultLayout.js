import React from "react";
import { Menu, Dropdown, Button, Space, Row, Col } from "antd";
import { Link } from "react-router-dom";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const menu = (
    <div>
      <Menu>
        <Menu.Item as="div" key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item as="div" key="polls">
          <Link to="/polls">Polls</Link>
        </Menu.Item>
        <Menu.Item
          as="div"
          key="logout-user"
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          <li style={{ color: "orangered" }}>Logout</li>
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>Poll Station</h1>

              <Dropdown overlay={menu} placement="bottomCenter">
                <Button>{user.userName}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
