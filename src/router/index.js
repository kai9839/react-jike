import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/Login";
import Layout from "@/components/Layout/index.js";
import Publish from '@/pages/Publish'
import Article from '@/pages/Article'
import Home from '@/pages/Home'

import AuthRouter from "@/components/AuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRouter>
      <Layout />
    </AuthRouter>,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/publish",
        element: <Publish />,
      },
      {
        path: "/article",
        element: <Article />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
])

export default router;