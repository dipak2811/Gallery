import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "react-use-cookie";

const PrivateRoute = ({ children }) => {
  const token = getCookie("token");
  return <>{token ? <>{children}</> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
