'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const product = require("../dataJson/products.json")

    product.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })

    await queryInterface.bulkInsert("Products", product)

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

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};


