import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "../components/Layout";
import { Authorization } from "../pages/Authorization";
import { EmployeeListPage } from "../pages/EmployeeListPage";
import { EmployeeStatisticPage } from "../pages/EmployeeStatisticPage";
import { NewEmployeeAuth } from "../pages/NewEmployeeAuth";
import { RootState } from "../redux/store";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";

export const Navigation = () => {
  //   const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <Routes>
      {isAuth ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<EmployeeListPage />} />
          <Route path="statistic" element={<EmployeeStatisticPage />} />
        </Route>
      ) : (
        <Route path="/">
          <Route index element={<Authorization />} />
          <Route
            path="registration/:employeeId"
            element={<NewEmployeeAuth />}
          />
          <Route path="*" element={<Authorization />} />
        </Route>
      )}
    </Routes>
  );
};
