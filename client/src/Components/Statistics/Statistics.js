import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "./Statistics.css";
import axios from "axios";
import { useState } from "react";

function Statistics(props) {
  const [beerSums, setBeerSums] = useState([]);
  const [names, setNames] = useState([]);

  const data = {
    labels: names,
    datasets: [
      {
        data: beerSums,
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

  useEffect(() => {
    axios
      .get("/beers/beer-sum-per-user")
      .then((res) => {
        let beerSumArr = [];
        let nameArr = [];
        res.data.forEach((e) => {
          beerSumArr.push(e.count);
          nameArr.push(e.NAME);
        });
        setBeerSums(beerSumArr);
        setNames(nameArr);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="chart-div">
      <h2 className="chart-title">Pils konsumert per person</h2>
      <Doughnut
        className="doughnut"
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          legend: {
            labels: {
              fontColor: "white",
              fontSize: 15,
            },
          },
          tooltips: {
            callbacks: {
              // To display the percentage as well as the number of beers
              label: function (tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                var total = meta.total;
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = parseFloat(
                  ((currentValue / total) * 100).toFixed(1)
                );
                return currentValue + " (" + percentage + "%)";
              },
              title: function (tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
              },
            },
          },
          /* title: {
            display: true,
            text: "Pils konsumert per person",
            fontColor: "white",
            fontSize: 15,
            fontStyle: "",
          }, */
        }}
      />
    </div>
  );
}

export default Statistics;
