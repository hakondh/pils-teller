import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function DrinkTypeCount() {
  const [labels, setLabels] = useState([]);
  const [counts, setCounts] = useState([]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "antall enheter drukket",
        data: counts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  useEffect(() => {
    axios
      .get("/drink-types/count")
      .then((res) => {
        const resultList = res.data.rows;
        console.log(resultList);
        const labels = resultList.map((element) => element.name);
        const counts = resultList.map((element) => element.count);
        setLabels(labels);
        setCounts(counts);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="chart-div">
      <h2 className="chart-title">Antall konsumerte enheter per enhetstype</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default DrinkTypeCount;
