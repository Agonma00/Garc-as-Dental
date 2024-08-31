$(function () {


  var options_pressure_semi_circle = {
    series: [100],
    chart: {
      fontFamily: '"Nunito Sans", sans-serif',
      type: "radialBar",
      offsetY: -20,
      width: 450,
      height: 350,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#2962ff",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "22px",
            color: "#a1aab2",
            formatter: function (val) {
              return "2.1bar";
            },
            minAngle: 23, // 2.5/10 * 180
            maxAngle: 90, // 10/10 * 180
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        color: "#00b0ff",
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ["Average Results"],
  };

  var pressure_semi_circle = new ApexCharts(
      document.querySelector("#pressure-semi-circle"),
      options_pressure_semi_circle
  );
  pressure_semi_circle.render();

  var water_pressure_options_semi_circle = {
    series: [100],
    chart: {
      fontFamily: '"Nunito Sans", sans-serif',
      type: "radialBar",
      offsetY: -20,
      width: 450,
      height: 350,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#2962ff",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "22px",
            color: "#a1aab2",
            formatter: function (val) {
              return "45º";
            },
            minAngle: 23, // 2.5/10 * 180
            maxAngle: 90, // 10/10 * 180
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        color: "#00b0ff",
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ["Average Results"],
  };

  var water_pressure_semi_circle = new ApexCharts(
      document.querySelector("#water-pressure-semi-circle"),
      water_pressure_options_semi_circle
  );
  water_pressure_semi_circle.render();


// Stroked Gauge Radial Bar Chart -------> RADIAL CHART
  var options_strocked = {
    series: [100],
    chart: {
      fontFamily: '"Nunito Sans", sans-serif',
      height: 300,
      type: "radialBar",
      offsetY: -10,
    },
    colors: ["#2962ff"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "16px",
            color: undefined,
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: "22px",
            color: "#a1aab2",
            formatter: function (val) {
              return "6.7Kw";
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: [""],
  };

  var chart_radial_strocked = new ApexCharts(
      document.querySelector("#consumo-semi-circle-stroked"),
      options_strocked
  );
  chart_radial_strocked.render();
});
