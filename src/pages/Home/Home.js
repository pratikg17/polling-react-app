import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Empty } from "antd";
import VoteCard from "../Vote/VoteCard";
import { getAllPollsResult } from "../../redux/actions/pollActions";
import { webSocketUrl } from "../../config";
import useWebSocket, { ReadyState } from "react-use-websocket";

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

  const [socketUrl, setSocketUrl] = useState(
    `${webSocketUrl}/api/v1/polls/get-live-poll-results`
  );
  const [messageHistory, setMessageHistory] = useState([]);
  const { lastMessage, readyState } = useWebSocket(socketUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("TETS", lastMessage);
      let msg = JSON.parse(lastMessage.data);
      let pollResults = msg.polls;
      setMessageHistory((prev) => prev.concat(lastMessage));
      console.log(pollResults);
      setPollsResult(pollResults);
      dispatch({ type: "GET_ALL_POLL_RESULTS", payload: pollResults });
    }
  }, [lastMessage, setMessageHistory]);

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
