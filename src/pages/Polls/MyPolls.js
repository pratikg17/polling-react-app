import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Table, Button, Space } from "antd";
import { Link } from "react-router-dom";
import { deletePollById, getAllMyPolls } from "../../redux/actions/pollActions";

function MyPolls() {
  const dispatch = useDispatch();
  const { myPolls } = useSelector((state) => state.pollsReducer);
  const [totalPolls, setTotalPolls] = useState([]);
  useEffect(() => {
    setTotalPolls(myPolls);
  }, [myPolls]);

  const columns = [
    {
      title: "Poll Name",
      dataIndex: "pollName",
      key: "pollName",
    },
    {
      title: "Poll Description",
      dataIndex: "pollDesc",
      key: "pollDesc",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/edit-poll/${record.pollId}`}>
            <Button type="dashed" danger>
              EDIT
            </Button>
          </Link>
          <Button
            className="btn1"
            type="dashed"
            danger
            onClick={() => {
              dispatch(deletePollById(record.pollId));
            }}
          >
            DELETE
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllMyPolls());
  }, []);
  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-4">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Poll List</h3>
            <button className="btn1">
              <Link to={`/add-poll/`}>Add Poll</Link>
            </button>
          </div>
        </Col>
        <Space></Space>
        <Col lg={20} sm={24}>
          <Table dataSource={totalPolls} columns={columns} />
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default MyPolls;
