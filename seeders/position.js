"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("employees", null, {});
    await queryInterface.bulkDelete("positions", null, {});

    const positions = [
      {
        positionId: 1,
        position: "employee",
      },
      {
        positionId: 2,
        position: "hr",
      },
    ];

    for (const position of positions) {
      const existingPosition = await queryInterface.rawSelect(
        "positions",
        {
          where: { positionId: position.positionId },
        },
        []
      );

      if (!existingPosition) {
        await queryInterface.bulkInsert("positions", [position]);
      }
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("positions", null, {});
  },
};
