import Card from "../components/ui/Card"
import { Sidebar } from "../components/ui/Sidebar"
import { Navbar } from "../components/ui/Navbar"

function Dashboard() {
  return ( <div>
    <div className="w-72 border-2 bg-white h-screen fixed top-0 left-0">
      <Sidebar/>
    </div>
    <div className="pl-96 top-0 left-0">

      <Navbar/>
      
      <div className="flex gap-4 p-4 w-full flex-wrap">
        <Card title="Random Lorem Ipsum Random Lorem Ipsum Random Lorem Ipsum Random Lorem Ipsum" link="https://youtu.be/5X1uwNJkZFw" type="video"/>
        <Card title="Random" link="https://x.com/kirat_tw/status/1875218603966136424" type="tweet"/>
        <Card title="Random" link="https://open.spotify.com/track/0fAPcsD7qrEAfO2EH0ce4V?si=c889fc15ae6f4c7d" type="audio"/>
        <Card title="Random" link="https://open.spotify.com/track/4d2jV5fmX6hbRwaRbY39dt?si=8fd5eb61b3ae459c" type="audio"/>
        <Card title="Random" link="random.com" type="article"/>
        <Card title="Random" link="https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?cs=srgb" type="image"/>
      </div>
    </div>
  </div>
  )
}

export default Dashboard