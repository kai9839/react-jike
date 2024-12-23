import { useRef, useEffect } from 'react'
import * as echarts from 'echarts'

const BarChart = ({ xData, sData, style = { width: '400px', height: '400px' }}) => {
  const chartRef = useRef()
  useEffect(() => {
    const chart = echarts.init(chartRef.current)
    chart.setOption({
      xAxis: {
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data: sData
        }
      ]
    })
  }, [sData, xData])
  return <div ref={chartRef} style={style}></div>
}

export default BarChart