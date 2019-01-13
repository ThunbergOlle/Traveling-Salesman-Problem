let theChart = new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: undefined,
      datasets: [{ 
          data: undefined,
          label: "Distance",
          borderColor: "#3e95cd",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Total distance of the best DNA.'
      }
    }
  });