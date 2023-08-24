import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { Container, Paper } from "@mui/material";

export const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Paper sx={{ padding: 3, marginTop: 3 }}>
          <Outlet />
        </Paper>
      </Container>
    </>
  );
};
