import React from "react";
import Chart from "react-google-charts";

const Piechart = props => {
  return (
    <div>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Task", "Hours per Day"],
          ["Work", 11],
          ["Eat", 2],
          ["Commute", 2],
          ["Watch TV", 2],
          ["Sleep", 7]
        ]}
        options={{
          title: "Posts Percentage",
          is3D: true
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};
export default Piechart;
