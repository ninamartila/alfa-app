'use strict';
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let dataProduk = JSON.parse(fs.readFileSync('./data/produk.json', 'utf8'))
    dataProduk.forEach(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
    });
    return queryInterface.bulkInsert("Produks", dataProduk)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Produks", null, {})
  }
};
