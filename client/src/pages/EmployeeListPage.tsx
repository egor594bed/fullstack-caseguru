import { AddNewEmployee } from "../components/EmployeeListPage/AddNewEmployee";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ruRU } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DefaultContainer } from "../components/UI/DefaultContainer/DefaultContainer";
import { useHttp } from "../hooks/http.hook";
import { useCallback, useEffect, useMemo, useState } from "react";
import apiEmployeeService from "../services/api-employee-service";
import { EmployeeList } from "../components/EmployeeListPage/EmployeeList";
import { Loading } from "../components/UI/Loading/Loading";
import { EmployeeAboutMe } from "../components/EmployeeListPage/EmployeeAboutMe";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { EmployeeDtoWhithPosition } from "../types/EmployeeTypes";

export const EmployeeListPage = () => {
  const { request, loading } = useHttp();
  const [employees, setEmployees] = useState<EmployeeDtoWhithPosition[]>([]);
  const employeeId = useSelector((state: RootState) => state.auth.employeeId);

  const update = useCallback(() => {
    request(() => apiEmployeeService.getEmployees()).then(
      (data: EmployeeDtoWhithPosition[]) => {
        setEmployees(data);
      }
    );
  }, []);

  useEffect(() => {
    update();
  }, []);

  const aboutMe = useMemo(() => {
    return employees.find((employee) => employee.employeeId === employeeId);
  }, [employees, employeeId]);

  if ((loading && !employees) || !aboutMe) {
    return <Loading />;
  }

  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={
          ruRU.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <DefaultContainer>
          <EmployeeAboutMe aboutMe={aboutMe} />
        </DefaultContainer>
        <DefaultContainer>
          <AddNewEmployee />
        </DefaultContainer>
        <DefaultContainer>
          <EmployeeList employees={employees} update={update} />
        </DefaultContainer>
      </LocalizationProvider>
    </>
  );
};
