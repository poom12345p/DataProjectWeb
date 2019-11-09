
const Sequelize = require('sequelize');
const data=require('../data');

const db= data.define('preorderdetails',{
    orderNumber:{
        type:   Sequelize.TEXT,
        primaryKey: true
    },
    productCode:{
        type:   Sequelize.TEXT
    },
    quantityOrdered:{
        type:   Sequelize.TEXT
    },
    priceEach:{
        type:   Sequelize.TEXT
    },
    orderLineNumbe:{
        type:   Sequelize.TEXT
    },
    status:{
        type:   Sequelize.TEXT
    }
}, {
    timestamps: false
});
db.removeAttribute('id');
module.exports = db;