import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Empty, Card, Radio } from "antd";
import { getPollResultById } from "../../redux/actions/pollActions";
import VotePieChart from "./VotePieChart";
import { LeafPoll, Result } from "react-leaf-polls";
import "react-leaf-polls/dist/index.css";

function CastVote({ match }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const { selectedPollForVote } = useSelector((state) => state.pollsReducer);
  const [result, setResult] = useState([]);
  const [pollMap, setPollMap] = useState({});
  useEffect(() => {
    console.log(result);
  }, [result]);

  let pollData = [];
  let [poll, setPoll] = useState();

  useEffect(() => {}, [poll]);

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
      console.log("selectedPollForVote", selectedPollForVote);
      console.log("poll", poll);
      let data = [];
      let pollMap = [];
      selectedPollForVote.votes.forEach((v, i) => {
        pollMap[i] = v;
        data.push({
          id: i,
          text: v.optionName,
          votes: v.count,
        });
      });
      setResult(data);
      setPollMap(pollMap);
    }
  }, [selectedPollForVote]);

  function vote(item) {
    console.log(item);
    console.log(pollMap[item.id]);
  }

  const themeData = {
    textColor: "#19181f",
    mainColor: "#00B87B",
    backgroundColor: "white",
    alignment: "center",
  };

  const resData2 = [
    { id: "0", text: "React", votes: 9 },
    { id: "1", text: "Vue", votes: 7 },
    { id: "2", text: "Angular", votes: 2 },
  ];

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
                  {pollData.length}
                  <LeafPoll
                    type="multiple"
                    results={result}
                    theme={themeData}
                    onVote={vote}
                  />
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
