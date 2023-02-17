import { createBrowserRouter } from "react-router-dom"

import Home from "@pages/home"
import Panel from "@pages/panel"
import Layout from "@pages/layout"

import ErrorPage from "@pages/error.page"

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/panel",
        element:<Panel/>
      }
    ]
  }
])

export default router;
