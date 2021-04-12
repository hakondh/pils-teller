import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

function BeerOverTime(props) {
  const [beerSums, setBeerSums] = useState([]);
  const [dates, setDates] = useState([]);
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Pils",
        data: beerSums,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(220,171,45,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(179,139,36,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(179,139,36,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      },
    ],
  };

  useEffect(() => {
    axios
      .get("/beers/beer-over-time")
      .then((res) => {
        const beerSumsArr = [];
        const datesArr = [];
        res.data.rows.forEach((e) => {
          beerSumsArr.push(e.sum);
          datesArr.push(Date.parse(e.date));
        });
        let firstDate = new Date(datesArr[0]);
        let lastDate = new Date(datesArr[datesArr.length - 1]);
        let filledBeerSumsArr = [];
        let filledDatesArr = [];
        for (var d = firstDate; d <= lastDate; d.setDate(d.getDate() + 1)) {
          let timeVal = d.getTime();
          filledDatesArr.push(timeVal);
          if (datesArr.includes(timeVal)) {
            filledBeerSumsArr.push(beerSumsArr[datesArr.indexOf(timeVal)]);
          } else {
            filledBeerSumsArr.push(0);
          }
        }
        setBeerSums(filledBeerSumsArr);
        setDates(filledDatesArr);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="chart-div">
      <h2 className="chart-title">Pils konsumert over tid</h2>
      <Line
        data={data}
        options={{
          layout: {
            padding: {
              left: 0,
              right: 30,
              top: 0,
              bottom: 0,
            },
          },
          responsive: true,
          maintainAspectRatio: true,
          legend: {
            labels: {
              fontColor: "white",
              fontSize: 15,
            },
          },
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "month",
                  tooltipFormat: "DD/MM/YY",
                },
                ticks: {
                  fontColor: "white",
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "white",
                },
              },
            ],
          },
          tooltips: {
            displayColors: false,
            callbacks: {
              // To display the percentage as well as the number of beers
              label: function (tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var currentValue = dataset.data[tooltipItem.index];
                return currentValue + " pils";
              },
            },
          },
        }}
      />
    </div>
  );
}

export default BeerOverTime;
