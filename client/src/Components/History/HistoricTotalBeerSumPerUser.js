import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

function HistoricTotalBeerSumPerUser(props) {
    // Historic beer sums per user data
  const userSums = [
    {
        "count": "101",
        "NAME": "Gåtten"
    },
    {
        "count": "97",
        "NAME": "Gustav Von Skrapelodd"
    },
    {
        "count": "56",
        "NAME": "Henning"
    },
    {
        "count": "45",
        "NAME": "BjørnBajas"
    },
    {
        "count": "43",
        "NAME": "MjødMagnus"
    },
    {
        "count": "40",
        "NAME": "henrikgranlund"
    },
    {
        "count": "33",
        "NAME": "Reinn"
    },
    {
        "count": "26",
        "NAME": "Håkon"
    },
    {
        "count": "23",
        "NAME": "Murrebassen"
    },
    {
        "count": "14",
        "NAME": "faderbens"
    }
]

    // Parse array
    let beerSumArr = [];
    let nameArr = [];
    userSums.forEach(userSum => {
        beerSumArr.push(parseInt(userSum.count));
        nameArr.push(userSum.NAME);
    })

    const total = beerSumArr.reduce((acc, curr) => acc + curr);
    console.log(total)

  const data = {
    labels: nameArr,
    datasets: [
      {
        data: beerSumArr,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(219,112,147, 0.2)",
          "rgba(255,255,0, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(250, 250, 210, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255,0,0, 0.2)",
          "rgba(139, 105, 105, 0.2)",
          "rgba(0,128,0, 0.2)",
          "rgba(131, 139, 131, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(219,112,147, 1)",
          "rgba(255,255,0, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(250, 250, 210, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255,0,0, 1)",
          "rgba(139, 105, 105, 1)",
          "rgba(0,128,0, 1)",
          "rgba(131, 139, 131, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-div">
      <h2 className="chart-title">Pils konsumert per person</h2>
      <Doughnut
        className="doughnut"
        data={data}
        height={window.matchMedia("(max-width: 768px)").matches ? 300 : null}
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
                return currentValue + " pils" + " (" + percentage + "%)";
              },
              title: function (tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
              },
            },
            displayColors: false,
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
      <br />
    </div>
  );
}

export default HistoricTotalBeerSumPerUser;
