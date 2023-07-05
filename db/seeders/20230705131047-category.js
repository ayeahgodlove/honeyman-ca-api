'use strict';

const { nanoid } = require("nanoid");
const { faker }  = require('@faker-js/faker');

// Generate fake category data
function generateCategory() {
  const category = {
    id: nanoid(10),
    name: faker.word.verb({ length: { min: 5, max: 7 }, strategy: "fail" }),
    description: faker.lorem.sentence(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  return category;
}

// Generate an array of fake categories
function generateCategories(count) {
  const categories = [];
  for (let i = 0; i < count; i++) {
    categories.push(generateCategory());
  }
  return categories;
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
    await queryInterface.bulkInsert('category', generateCategories(10), {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('category', null, {});
  }
};
