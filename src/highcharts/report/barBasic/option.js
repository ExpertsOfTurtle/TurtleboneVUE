
export function getBarBasicOption(title, subtitle, categories, series) {
  var option = {
    chart: {
      type: 'bar'
    },
    title: {
      text: title
    },
    subtitle: {
      text: subtitle
    },
    xAxis: [{
      categories: categories,
      reversed: false,
      labels: {
        step: 1
      }
    }],
    yAxis: {
      title: {
        text: null
      },
      labels: {
        formatter: function() {
          return Math.abs(this.value)
        }
      }
    },

    plotOptions: {
      series: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },

    tooltip: {
      formatter: function() {
        return '<b>' + this.point.category + ': ' + this.point.y + '</b><br/>'
      }
    },
    series: series,
    _series: [{
      name: 'Top10代码行数',
      data: [

      ]
    }]
  }
  return option
}
