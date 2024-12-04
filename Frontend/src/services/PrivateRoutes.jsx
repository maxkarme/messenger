import DataService from "../api/DataService";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PrivateRoute(props) {
  let token = localStorage.getItem("token");
  let isAllowed = props.Role == "all" || token;
  return isAllowed ? <Outlet /> : <Navigate to="/login" />;
}