import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { Container, Paper } from "@mui/material";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
