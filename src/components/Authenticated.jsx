import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Authenticated() {
  const location = useLocation();

  const authenticated = localStorage.getItem("loggedin");

  if (!authenticated) {
    return (
      <Navigate
        to="login"
        state={{ message: "You must log in first", from: location.pathname }}
        replace
      />
    );
  }

  return <Outlet />;
}
