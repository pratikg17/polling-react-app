import React, { useState } from "react";
import { Pie } from "@ant-design/plots";
import { Card, Tooltip, Popconfirm, Button } from "antd";

function VoteCard(props) {
  const ActionVote = (
    <Tooltip placement="left" title="Vote">
      <Button>Vote </Button>
    </Tooltip>
  );

  const data = [
    {
      type: "Test 1",
      value: 27,
    },
    {
      type: "Test 2",
      value: 25,
    },
  ];

  const color = ["#FF5733", "#3AC335", "#19E012"];
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
    ],
    statistic: {},
  };

  const Actions = [ActionVote];

  return (
    <section>
      <div>
        <Card className="voteItem" actions={Actions}>
          <h4 className="voteItemTitle">Test vs Test 2</h4>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It{" "}
          </p>
          <Pie {...config} data={data} color={color} />
        </Card>
      </div>
    </section>
  );
}

export default VoteCard;
