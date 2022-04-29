import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Row, Col, Input, Form } from "antd";
import VoteCard from "../Vote/VoteCard";

function Home() {
  return (
    <DefaultLayout>
      <section className="vote">
        <Row type="flex" justify="center" align="middle" className="vote">
          <Col md={12} sm={24} lg={8}>
            <VoteCard />
          </Col>
          <Col md={12} sm={24} lg={8}>
            <VoteCard />
          </Col>
          <Col md={12} sm={24} lg={8}>
            <VoteCard />
          </Col>
          <Col md={12} sm={24} lg={8}>
            <VoteCard />
          </Col>
          <Col md={12} sm={24} lg={8}>
            <VoteCard />
          </Col>
        </Row>
      </section>
    </DefaultLayout>
  );
}

export default Home;
