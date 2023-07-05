'use strict';
const { nanoid } = require("nanoid");
const { faker } = require("@faker-js/faker");

// Generate fake tag data
function generateProduct(storeId) {
  const product = {
    id: nanoid(10),
    name: faker.word.adjective({
      length: { min: 5, max: 7 },
      strategy: "fail",
    }),
    description: faker.word.sample({ length: 25, strategy: "shortest" }),
    longDescription: faker.word.sample({ length: 25, strategy: "longest" }),
    amount: faker.number.float(),
    durationOfRentage: faker.number.int({ min: 0, max: 12 }),
    condition: faker.word.verb({ strategy: "shortest" }),
    availabilityStartDate: faker.date.soon(),
    availabilityEndDate: faker.date.soon(),
    availabilityStartTime: faker.date.soon(),
    availabilityEndTime: faker.date.soon(),
    storeId: storeId,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  };
  return product;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
