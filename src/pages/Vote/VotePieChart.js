import { Pie } from "@ant-design/plots";
import React from "react";

function VotePieChart({ votes }) {
  console.log("VotePieChart", votes);
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

  let dataValues = [];
  let color = [];
  votes.forEach((v) => {
    dataValues.push({
      type: v.optionName,
      value: v.count,
    });
    color.push(v.color);
  });

  return <Pie {...config} data={dataValues} color={color} />;
}

export default VotePieChart;
