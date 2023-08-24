"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("employees", [
      {
        username: "hr1",
        password: "123456",
        fullname: "Иванов Иван Иванович",
        birthday: "2000-01-01",
        salary: 100,
        dateOfHiring: "2022-01-01",
        employeePositionId: 2,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("employees", null, {});
  },
};
