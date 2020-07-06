export class DefaultChartSettings {
  chartType = "line";
  chartData: {data: number[], label: string, fill: boolean, lineTension: number}[] = [{ data: [], label: "", fill: false, lineTension: 0 }];
  chartLabels: Date[] = [];

  chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    label: { display: false },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          tooltipFormat: 'MM.DD.YYYY HH:mm:ss',
          unit: 'day',
          stepSize: 1
        }
      }]
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };
  chartColors = [
    {
      borderColor: "#144f61",
      borderWidth: 3,
      pointBorderWidth: 1,
      pointBackgroundColor: "#5bc0de",
      pointBorderColor: "#144f61",
      pointHoverBackgroundColor: "#5bc0de",
      pointHoverBorderColor: "#144f61",
    }
  ];
    constructor() {
    }
  ngOnInit() {
  }
}
