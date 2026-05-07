"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const configs = [
      {
        id: 1,
        address:
          "سعادت آباد، میدان کاج، سرو شرقی، بین خیابان بهزاد و خیابان مجد، پلاک157",
        phone: "22366217-20",
        email: "GaderiExchange@gmail.com",
        telegram: "9891298765432",
        instagram: "9891298765432",
        whatsApp: "9891298765432",
        workHours: "شنبه تا چهار شنبه ، 9 تا 16 ، پنج شنبه 9 تا 13",
        aboutUs:
          "شرکت تضامنی فرهاد ارغوان و شرکاء در سال 1398 در اداره کل ثبت شرکت ها به ثبت رسیده و موفق به دریافت مجوز رسمی از بانک مرکزی جمهوری اسلامی ایران گردیده است.",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Configs", configs, {
      ignoreDuplicates: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};