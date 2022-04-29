import React from "react";
import { Pie } from "@ant-design/plots";
import { Card, Tooltip, Button, Empty } from "antd";
import { Link } from "react-router-dom";

function VoteCard(props) {
  console.log("props", props);
  const ActionVote = (
    <Tooltip placement="left" title="Vote">
      <Link to={`/cast-vote/${props.poll.pollId}`}>
        <Button className="btn1">VOTE NOW</Button>
      </Link>
    </Tooltip>
  );

  const config = {
    appendPadding: 10,
    angleField: "value",
    colorField: "type", // or seriesField in some cases

    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
      {
        type: "pie-statistic-active",
      },
    ],
    statistic: {},
  };

  const Actions = [ActionVote];

  let dataValues = [];
  let color = [];
  props.poll.votes.forEach((v) => {
    dataValues.push({
      type: v.optionName,
      value: v.count,
    });
    color.push(v.color);
  });

  return (
    <section>
      <div>
        <Card className="voteItem" actions={Actions}>
          <h4 className="voteItemTitle">{props.poll.pollName}</h4>
          <p>{props.poll.pollDesc}</p>
          {props.poll ? (
            <Pie {...config} data={dataValues} color={color} />
          ) : (
            <Empty />
          )}
        </Card>
      </div>
    </section>
  );
}

export default VoteCard;
