"use strict";
const { nanoid } = require("nanoid");
const { faker } = require("@faker-js/faker");

// Generate fake tag data
function generateProduct(storeId, categoryId, subCategoryId) {
  const product = {
    id: nanoid(10),
    name: faker.word.adjective({
      length: { min: 5, max: 7 },
      strategy: "fail",
    }),
    shortDescription: faker.word.sample({ length: 25, strategy: "shortest" }),
    longDescription: faker.word.sample({ length: 25, strategy: "longest" }),
    amount: faker.number.float(),
    storeId: storeId,
    categoryId: categoryId,
    subCategoryId: subCategoryId,
    quantity: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  };
  return product;
}

// Generate an array of fake products
function generateProducts(count, stores, categories, subCategories) {
  const products = [];
  for (let i = 0; i < count; i++) {
    // const {} = stores[i]
    products.push(
      generateProduct(stores[i].id, categories[i].id, subCategories[i].id)
    );
  }
  return products;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const stores = await queryInterface.sequelize.query(
      `SELECT id FROM store;`
    );
    const categories = await queryInterface.sequelize.query(
      `SELECT id FROM category;`
    );
    const subCategories = await queryInterface.sequelize.query(
      `SELECT id FROM subCategory;`
    );

    await queryInterface.bulkInsert(
      "product",
      generateProducts(10, stores[0], categories[0], subCategories[0]),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("store", null, {});
    await queryInterface.bulkDelete("category", null, {});
    await queryInterface.bulkDelete("subCategory", null, {});
    await queryInterface.bulkDelete("product", null, {});
  },
};
