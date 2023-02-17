import home from "@pages/home.module.css"

import { Link } from "react-router-dom"

export default function Home(){

  return(
    <div className={home.container}>
      <h1>
        🚀 Welcome, let&apos;s improve your time usage! 🚀
      </h1>
      <Link to="/panel">Start</Link>
    </div>
  )
}
