import { baseUri } from "../const/config";
import { CreateEmployeeDto, EmployeeDto } from "../types/EmployeeTypes";

class ApiEmployeeService {
  getEmployeeStatistics() {
    return fetch(`${baseUri}employee/getEmployeeStatistics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  createEmployee(body: CreateEmployeeDto) {
    return fetch(`${baseUri}employee/createEmployee`, {
      method: "POST",
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  dismissEmployee(employeeId: string) {
    return fetch(
      `${baseUri}employee/dismissEmployee/?employeeId=${employeeId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }
}

export default new ApiEmployeeService();
