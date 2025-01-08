import Header from "./components/Header"
import {Outlet} from 'react-router'

function App() {

  return (
    <main className="flex flex-col mx-auto w-screen h-screen">
      <Header/>
      <div className=" flex-grow flex flex-col justify-center items-center ">
        <Outlet/>
      </div>
    </main>
  )
}

export default App
