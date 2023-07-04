'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "slug" from table "sub_category"
 * removeColumn "slug" from table "order"
 * removeColumn "slug" from table "product"
 * removeColumn "slug" from table "category"
 * removeColumn "slug" from table "payment"
 * removeColumn "slug" from table "product_image"
 *
 **/

const info = {
    "revision": 2,
    "name": "init-migrations",
    "created": "2023-07-04T14:36:21.544Z",
    "comment": ""
};

const migrationCommands = [

    {
        fn: "createTable",
        params: [
            "SequelizeMigrationsMeta",
            {
                "revision": {
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "state": {
                    "allowNull": false,
                    "type": Sequelize.JSON
                },
            },
            {}
        ]
    },
    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision
            }],
            {}
        ]
    },
    {
        fn: "bulkInsert",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
                name: info.name,
                state: '{"revision":2,"tables":{"user":{"tableName":"user","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"username":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"firstname":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"lastname":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"email":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"password":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"address":{"seqType":"Sequelize.STRING(255)","allowNull":true},"phoneNumber":{"seqType":"Sequelize.STRING(13)"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"sub_category":{"tableName":"sub_category","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"categoryId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"category","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"order":{"tableName":"order","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"productId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"product","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"totalQtty":{"seqType":"Sequelize.INTEGER","allowNull":false},"total":{"seqType":"Sequelize.INTEGER","allowNull":false},"orderNo":{"seqType":"Sequelize.STRING(40)","allowNull":false,"unique":true},"status":{"seqType":"Sequelize.STRING(10)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"product":{"tableName":"product","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"categoryId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"category","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"subCategoryId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"sub_category","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"amount":{"seqType":"Sequelize.DECIMAL","allowNull":false,"unique":false},"shortDescription":{"seqType":"Sequelize.TEXT","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false,"unique":true},"quantity":{"seqType":"Sequelize.STRING(5)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"category":{"tableName":"category","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"payment":{"tableName":"payment","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"orderId":{"seqType":"Sequelize.STRING(40)","allowNull":false,"unique":true,"references":{"model":"order","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"status":{"seqType":"Sequelize.STRING(10)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"review":{"tableName":"review","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"userId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"productId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"product","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"rating":{"seqType":"Sequelize.INTEGER","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"product_image":{"tableName":"product_image","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"productId":{"seqType":"Sequelize.STRING(50)","allowNull":false,"references":{"model":"product","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false},"url":{"seqType":"Sequelize.STRING(255)","allowNull":false},"shortDescription":{"seqType":"Sequelize.TEXT","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}}}}'
            }],
            {}
        ]
    },



    {
        fn: "removeColumn",
        params: ["sub_category", "slug"]
    },
    {
        fn: "removeColumn",
        params: ["order", "slug"]
    },
    {
        fn: "removeColumn",
        params: ["product", "slug"]
    },
    {
        fn: "removeColumn",
        params: ["category", "slug"]
    },
    {
        fn: "removeColumn",
        params: ["payment", "slug"]
    },
    {
        fn: "removeColumn",
        params: ["product_image", "slug"]
    }
];

const rollbackCommands = [

    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
            }],
            {}
        ]
    },



    {
        fn: "addColumn",
        params: [
            "sub_category",
            "slug",
            {
                "unique": true,
                "allowNull": false,
                "type": Sequelize.STRING(128)
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "order",
            "slug",
            {
                "unique": true,
                "allowNull": false,
                "type": Sequelize.STRING(128)
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "product",
            "slug",
            {
                "unique": true,
                "allowNull": false,
                "type": Sequelize.STRING(128)
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "category",
            "slug",
            {
                "unique": true,
                "allowNull": false,
                "type": Sequelize.STRING(128)
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "payment",
            "slug",
            {
                "unique": true,
                "allowNull": false,
                "type": Sequelize.STRING(128)
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "product_image",
            "slug",
            {
                "allowNull": false,
                "type": Sequelize.STRING(128)
            }
        ]
    }
];

module.exports = {
  pos: 0,
  up: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else resolve();
      }

      next();
    });
  },
  down: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < rollbackCommands.length) {
          let command = rollbackCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        }
        else resolve();
      }

      next();
    });
  },
  info
};
