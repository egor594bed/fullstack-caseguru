"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("positions", [
      {
        positionId: 1,
        position: "employee",
      },
      {
        positionId: 2,
        position: "hr",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("positions", null, {});
  },
};
