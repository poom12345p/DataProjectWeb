
const Sequelize = require('sequelize');
const data=require('../data');

const db= data.define('promotions',{
    code:{
        type:   Sequelize.TEXT,
        primaryKey: true
    },
   amount:{
        type:   Sequelize.INTEGER
    },
    discount:{
        type:   Sequelize.FLOAT
    },
    expire:{
        type:   Sequelize.DATE
    }
}, {
    timestamps: false
});

module.exports = db;