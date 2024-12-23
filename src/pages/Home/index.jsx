import BarChart from "@/components/Charts/BarChart"

const Home = () => {
  return (
    <div>
      <BarChart 
        xData={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} 
        sData={[120, 132, 101, 134, 90, 230, 210]}
      />
      <BarChart
        xData={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} 
        sData={[220, 182, 191, 234, 290, 330, 310]} 
        style={{ width: '500px', height: '500px' }}
      />
    </div>
  )
}

export default Home