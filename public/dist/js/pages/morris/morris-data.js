// Dashboard 1 Morris-chart

document.getElementById('water-chart').style.height = '110px';
document.getElementById('production-chart').style.height = '110px';
document.getElementById('pool-chart').style.height = '110px';
$(function () {
  "use strict";

  Morris.Area({
    element: "water-chart",
    data: [
      {
        period: "2010",
        iphone: 0,
        ipad: 0,
      },
      {
        period: "2011",
        iphone: 4,
        ipad: 1,
      },
      {
        period: "2012",
        iphone: 3,
        ipad: 4,
      },
      {
        period: "2013",
        iphone: 0,
        ipad: 1,
      },
      {
        period: "2014",
        iphone: 1,
        ipad: 2,
      },
      {
        period: "2015",
        iphone: 3,
        ipad: 4,
      },
      {
        period: "2016",
        iphone: 3,
        ipad: 2,
      },
    ],
    lineColors: ["#21ff6f", "#11c0ff"],
    xkey: "period",
    ykeys: ["iphone", "ipad"],
    labels: ["Leves", "Graves"],
    pointSize: 0,
    lineWidth: 0,
    resize: true,
    fillOpacity: 0.8,
    behaveLikeLine: true,
    xLabelFormat: function(x) { return ""; },
    gridLineColor: "#e0e0e0",
    hideHover: "auto",
  });

  Morris.Area({
    element: "production-chart",
    data: [
      {
        period: "2010",
        iphone: 0,
        ipad: 0,
      },
      {
        period: "2011",
        iphone: 4,
        ipad: 1,
      },
      {
        period: "2012",
        iphone: 3,
        ipad: 4,
      },
      {
        period: "2013",
        iphone: 0,
        ipad: 1,
      },
      {
        period: "2014",
        iphone: 1,
        ipad: 2,
      },
      {
        period: "2015",
        iphone: 3,
        ipad: 4,
      },
      {
        period: "2016",
        iphone: 3,
        ipad: 2,
      },
    ],
    lineColors: ["#21ff6f", "#11c0ff"],
    xkey: "period",
    ykeys: ["iphone", "ipad"],
    labels: ["Leves", "Graves"],
    pointSize: 0,
    lineWidth: 0,
    resize: true,
    fillOpacity: 0.8,
    behaveLikeLine: true,
    xLabelFormat: function(x) { return ""; },
    gridLineColor: "#e0e0e0",
    hideHover: "auto",
  });

  Morris.Area({
    element: "pool-chart",
    data: [
      {
        period: "2010",
        iphone: 0,
        ipad: 0,
      },
      {
        period: "2011",
        iphone: 4,
        ipad: 1,
      },
      {
        period: "2012",
        iphone: 3,
        ipad: 4,
      },
      {
        period: "2013",
        iphone: 0,
        ipad: 1,
      },
      {
        period: "2014",
        iphone: 1,
        ipad: 2,
      },
      {
        period: "2015",
        iphone: 3,
        ipad: 4,
      },
      {
        period: "2016",
        iphone: 3,
        ipad: 2,
      },
    ],
    lineColors: ["#21ff6f", "#11c0ff"],
    xkey: "period",
    ykeys: ["iphone", "ipad"],
    labels: ["Leves", "Graves"],
    pointSize: 0,
    lineWidth: 0,
    resize: true,
    fillOpacity: 0.8,
    behaveLikeLine: true,
    xLabelFormat: function(x) { return ""; },
    gridLineColor: "#e0e0e0",
    hideHover: "auto",
  });

});
