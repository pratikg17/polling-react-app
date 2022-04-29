import React, { useState, useEffect } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Empty } from "antd";
import VoteCard from "../Vote/VoteCard";
import { getPollResultById } from "../../redux/actions/pollActions";

function CastVote({ match }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const { selectedPollForVote } = useSelector((state) => state.pollsReducer);

  let [poll, setPoll] = useState();
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
  }, [selectedPollForVote]);

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      CastVote
    </DefaultLayout>
  );
}

export default CastVote;
