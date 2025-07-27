import Card from "../components/ui/Card"
import { Sidebar } from "../components/ui/Sidebar"
import { Navbar } from "../components/ui/Navbar"
import { useContent } from "../hooks/useContent"
import { useEffect } from "react"

function Dashboard() {

  const {contents, refresh} = useContent()

  useEffect( () => {
    refresh()
  }, [])

  return ( <div>
    <div className="w-72 border-2 bg-white h-screen fixed top-0 left-0">
      <Sidebar/>
    </div>
    <div className="pl-96 top-0 left-0">

      <Navbar/>
      
      <div className="flex gap-4 p-4 w-full flex-wrap">
        {contents.map(({type, title, link, tags, _id}) => 
            <Card 
              title={title} 
              link={link} 
              type={type}
              contentId={_id}
            />
        )}
        
      </div>
    </div>
  </div>
  )
}

export default Dashboard