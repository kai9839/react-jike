import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/Login";
import Layout from "@/components/Layout/index.js";
import AuthRouter from "@/components/AuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRouter><Layout /></AuthRouter>,
    children: [
      
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
])

export default router;