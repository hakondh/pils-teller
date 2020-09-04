import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

function TotalBeerSumPerUser(props) {
  const [beerSums, setBeerSums] = useState([]);
  const [names, setNames] = useState([]);

  const data = {
    labels: names,
    datasets: [
      {
        data: beerSums,
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

  useEffect(() => {
    axios
      .get("/beers/beer-sum-per-user")
      .then(async (res) => {
        var beerSumArr = [];
        let nameArr = [];
        res.data.forEach((e) => {
          beerSumArr.push(e.count);
          nameArr.push(e.NAME);
        });
        await axios
          .get("/beers")
          .then((res) => {
            var count = 0;
            res.data.forEach((b) => {
              count += b.amount;
            });
            const reducer = (accumulator, currentValue) =>
              parseInt(accumulator) + parseInt(currentValue);
            var topCount = beerSumArr.reduce(reducer);
            if (count > topCount) {
              console.log("TRUE!");
              beerSumArr.push(count - topCount);
              nameArr.push("Andre");
            }
          })
          .catch((err) => console.log(err));
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

export default TotalBeerSumPerUser;
