
export function getColumnDoubleOption(title, subtitle, categories, series, yTitle1, yTitle2) {
  var option = {
    chart: {
      type: 'column'
    },
    title: {
      text: title
    },
    subtitle: {
      text: subtitle
    },
    xAxis: [{
      categories: categories,
      crosshair: true
    }],
    yAxis: [{
      title: {
        text: yTitle1
      },
      labels: {
        format: '{value}'
      }
    }, {
      gridLineWidth: 0,
      title: {
        text: yTitle2
      },
      labels: {
        format: '{value}'
      },
      opposite: true
    }],

    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        dataLabels: {
          enabled: true
        }
      },
      spline: {
        dataLabels: {
          enabled: true
        }
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    series: series
  }
  return option
}
