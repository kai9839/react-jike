import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/Login";
import Layout from "@/components/Layout/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
])

export default router;