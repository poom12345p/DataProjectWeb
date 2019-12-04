const Sequelize = require('sequelize');
const data=require('../data');

const db= data.define('orderspromotions',{
    orderNumber:{
        type:   Sequelize.TEXT,
        primaryKey: true
    },
    code:{
        type:   Sequelize.TEXT,
        primaryKey: true
    }
   
}, {
    timestamps: false
});

module.exports = db;