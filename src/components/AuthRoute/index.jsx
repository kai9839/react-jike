import { Navigate } from "react-router-dom";

export default function AuthRouter({ children }) {
  const isLogin = localStorage.getItem("token");
  if(isLogin) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
  // return isLogin ? <Navigate to="/" /> : <Navigate to="/login" />;
}