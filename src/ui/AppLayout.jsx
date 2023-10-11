import {Outlet} from "react-router-dom";
import {Header} from "./Header.jsx";
export const AppLayout = () => {
  return (
    <div>
      <Header/>
    <main>
      <Outlet/>
    </main>
    </div>
  )
}