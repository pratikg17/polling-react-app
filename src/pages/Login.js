import React, { useEffect } from "react";
import { Row, Col, Input, Form } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin");
    console.log("this", isAuthenticated);
    if (isAuthenticated) {
      history.push("/");
    }
  });

  function onFinish(values) {
    dispatch(userLogin(values));
    console.log(values);
  }
  return (
    <div className="login">
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img src="https://cdn.vox-cdn.com/thumbor/f3vZQsUgEUzG8J_SrwucezgvQQo=/0x0:1000x800/1200x800/filters:focal(420x320:580x480)/cdn.vox-cdn.com/uploads/chorus_image/image/58194493/IGN_logo_2.0.jpg"></img>
          <h1 className="login-logo">IGN Polling Booth</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Login</h1>
            <Form.Item
              name="userName"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>

            <button className="btn1 mt-2 ">Login </button>
            <hr />
            <Link to="/register">Click here to Register</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
