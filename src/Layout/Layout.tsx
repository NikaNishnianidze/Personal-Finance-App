import { Outlet, useNavigate } from "react-router-dom";
import Header from "../pages/Header";
import { useEffect } from "react";

export default function Layout() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/signup");
  }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
