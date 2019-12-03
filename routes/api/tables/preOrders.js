
const Sequelize = require('sequelize');
const data=require('../data');

const db= data.define('preOrders',{
    preOrderNumber:{
        type:   Sequelize.TEXT,
        primaryKey: true
    },
    orderDate:{
        type:   Sequelize.TEXT
    },
    comments:{
        type:   Sequelize.TEXT
    },
    customerNumber:{
        type:   Sequelize.TEXT
    },
   
}, {
    timestamps: false
});

module.exports = db;