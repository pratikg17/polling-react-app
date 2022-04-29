import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Empty } from "antd";
import VoteCard from "../Vote/VoteCard";
import { getAllPollsResult } from "../../redux/actions/pollActions";

function Home() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const { pollResults } = useSelector((state) => state.pollsReducer);

  const [pollsResult, setPollsResult] = useState([]);
  useEffect(() => {
    setPollsResult(pollResults);
  }, [pollResults]);

  useEffect(() => {
    dispatch(getAllPollsResult());
  }, []);

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <section className="vote">
        <Row type="flex" justify="center" align="middle" className="vote">
          {pollResults ? (
            pollsResult.map((poll) => {
              return (
                <Col md={12} sm={24} lg={8} key={poll._id}>
                  <VoteCard poll={poll} />
                </Col>
              );
            })
          ) : (
            <Empty />
          )}
        </Row>
      </section>
    </DefaultLayout>
  );
}

export default Home;
