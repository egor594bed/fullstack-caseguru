import { baseUri } from "../const/config";
import { CreateEmployeeDto, EmployeeDto } from "../types/EmployeeTypes";

class ApiEmployeeService {
  getEmployeeStatistics() {
    return fetch(`${baseUri}employee/getEmployeeStatistics`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  createEmployee(body: CreateEmployeeDto) {
    return fetch(`${baseUri}employee/createEmployee`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
  }

  editEmployee(body: EmployeeDto) {
    return fetch(`${baseUri}employee/editEmployee`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
  }

  getEmployees() {
    return fetch(`${baseUri}employee/getEmployees`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  dismissEmployee(employeeId: number) {
    return fetch(
      `${baseUri}employee/dismissEmployee/?employeeId=${employeeId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }
}

export default new ApiEmployeeService();
