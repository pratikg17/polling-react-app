import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Empty, Card, Radio } from "antd";
import {
  castVote,
  getPollResultById,
  getUserPollData,
} from "../../redux/actions/pollActions";
import VotePieChart from "./VotePieChart";
import { LeafPoll, Result } from "react-leaf-polls";
import "react-leaf-polls/dist/index.css";
import { webSocketUrl } from "../../config";
import useWebSocket, { ReadyState } from "react-use-websocket";

function CastVote({ match }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const { selectedPollForVote, userPollData } = useSelector(
    (state) => state.pollsReducer
  );
  const [result, setResult] = useState([]);
  const [pollMap, setPollMap] = useState({});
  const [indexMap, setIndexMap] = useState({});

  const [socketUrl, setSocketUrl] = useState(
    `${webSocketUrl}/api/v1/polls/get-live-poll-results-by-id`
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
      let msg = JSON.parse(lastMessage.data);
      let pollResult = msg.poll;
      setMessageHistory((prev) => prev.concat(lastMessage));
      if (pollResult[0].pollId == pollId) {
        setPoll(pollResult[0]);
        dispatch({ type: "GET_POLL_RESULT_BY_ID", payload: pollResult[0] });
      }
    }
  }, [lastMessage, setMessageHistory]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  let [poll, setPoll] = useState();
  let [userPollInfo, setUserPollInfo] = useState();

  const pollId = match.params.pollId;

  useEffect(() => {
    if (selectedPollForVote == null || selectedPollForVote.pollId != pollId) {
      dispatch(getPollResultById(pollId));
    } else {
      if (selectedPollForVote.pollId === pollId) {
        setPoll(selectedPollForVote);
      } else {
        dispatch(getPollResultById(pollId));
      }
    }

    if (selectedPollForVote != null) {
      let data = [];
      let pollMap = [];
      let indexMap = [];
      selectedPollForVote.votes.forEach((v, i) => {
        pollMap[i] = v;
        indexMap[v.pollOptionId] = i;
        data.push({
          id: i,
          text: v.optionName,
          votes: v.count,
          percentage: v.percentage,
        });
      });
      setResult(data);
      setPollMap(pollMap);
      setIndexMap(indexMap);
      console.log("result start", result);
    }
  }, [selectedPollForVote]);

  useEffect(() => {
    if (userPollData == null || userPollData.pollId != pollId) {
      dispatch(getUserPollData({ pollId }));
    } else {
      if (userPollData.pollId === pollId) {
        setUserPollInfo(userPollData);
      } else {
        dispatch(getUserPollData({ pollId }));
      }
    }
  }, [userPollData]);

  function vote(item, results) {
    let optionData = pollMap[item.id];
    dispatch(
      castVote({
        pollId: optionData.pollId,
        pollOptionId: optionData.pollOptionId,
      })
    );
    setResult(results);
  }

  const themeData = {
    textColor: "#19181f",
    mainColor: "#00B87B",
    backgroundColor: "white",
    alignment: "center",
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <section className="castVote">
        {poll ? (
          <Card>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <VotePieChart votes={poll.votes}></VotePieChart>
              </Col>
              <Col span={12}>
                <Card className="p-5">
                  <h1>{poll.pollName}</h1>
                  <h5>{poll.pollDesc}</h5>

                  {userPollInfo ? (
                    <div>
                      <LeafPoll
                        type="multiple"
                        results={result}
                        theme={themeData}
                        onVote={vote}
                        isVoted={true}
                        isVotedId={indexMap[userPollInfo.pollOptionId]}
                      />
                    </div>
                  ) : (
                    <LeafPoll
                      type="multiple"
                      results={result}
                      theme={themeData}
                      onVote={vote}
                    />
                  )}
                </Card>
              </Col>
            </Row>
          </Card>
        ) : (
          <Empty />
        )}
      </section>
    </DefaultLayout>
  );
}

export default CastVote;
