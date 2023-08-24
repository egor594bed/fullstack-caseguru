import { AppBar, Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    navigate(`${newValue}`);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={activeTab} onChange={handleChange}>
        <Tab label="Список сотрудников" value={"/"} />
        <Tab label="Статистика по сотрудникам" value={"/statistic"} />
      </Tabs>
    </Box>
  );
};
