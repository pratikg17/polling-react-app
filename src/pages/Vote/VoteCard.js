import React from "react";

import { Card, Tooltip, Button, Empty } from "antd";
import { Link } from "react-router-dom";
import VotePieChart from "./VotePieChart";

function VoteCard(props) {
  return (
    <section>
      {props.poll ? (
        <div>
          <Card
            className="voteItem"
            actions={[
              <Tooltip placement="left" title="Vote">
                <Link to={`/cast-vote/${props.poll.pollId}`}>
                  <Button className="btn1">VOTE NOW</Button>
                </Link>
              </Tooltip>,
            ]}
          >
            <h4 className="voteItemTitle">{props.poll.pollName}</h4>
            <p>{props.poll.pollDesc}</p>
            {props.poll ? <VotePieChart votes={props.poll.votes} /> : <Empty />}
          </Card>
        </div>
      ) : (
        <Empty />
      )}
    </section>
  );
}

export default VoteCard;
