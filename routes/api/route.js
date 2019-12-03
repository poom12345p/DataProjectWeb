const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
// let users =require('../../Users');
const session = require('express-session');
const db = require('./data');
const products = require('./tables/products');
const productlines = require('./tables/productlines');
const payments = require('./tables/payments');
const orders = require('./tables/orders');
const orderdetails = require('./tables/orderdetails');
const offices = require('./tables/offices');
const employees = require('./tables/employees');
const customers = require('./tables/customers');
const promotions = require('./tables/promotions');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', next);
  });

//get address  

router.get('/', (req, res, next) => {


  res.sendFile(path.join(__dirname, `..`, `..`, `ProductLotList.html`));
  // res.send(result);

});


router.get('/productslist', (req, res, next) => {
  res.sendFile(path.join(__dirname, `..`, `..`, `ProductLotList.html`), { name: req.user });
  // res.send(result);
});

router.get('/search/productlines', (req, res, next) => {

  productlines.findAll()
    .then(result => {
      //console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });

});

router.get('/login/:email', (req, res, next) => {
  employees.findAll({
    where: {
      email: '${req.params.email}',
    }
  }).then(result => {
    //console.log(result);
    res.send(result);
  }).catch(err => { console.log(next); });

});

//////////////////////products search api//////////////////////////
router.get('/search/products', (req, res, next) => {
  //console.log(`${req.params.size}`);
  /*
  ex. not select size and vendor
  http://localhost:9000/search/products/

  */
  //console.log(`${req.params.size}|${req.params.vender}|${req.params.name}`);
  // db.query(`SELECT * FROM products ORDER BY productName,productScale,productVendor `, { type: db.QueryTypes.SELECT})
  products.findAll({
    order: [`productName`, `productScale`, `productVendor`]
  })
    .then(result => {
      //console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });
});

router.get('/search/products/name=:name', (req, res, next) => {
  //console.log(`${req.params.size}`);
  /*
  ex. 
  http://localhost:9000/search/products/-&-/name=Alpine
  ex. not select size only
  */

  console.log(`${req.params.name}`);
  //db.query(`SELECT * FROM products WHERE productName LIKE '%${name}%' ORDER BY productName,productScale,productVendor`, { type: db.QueryTypes.SELECT})
  let name = req.params.name == '0' ? '%' : req.params.name;
  products.findAll({

    where:
    {
      productName: {
        [Op.like]: `%${name}%`
      }
    },
    order: [`productName`, `productScale`, `productVendor`]
  })
    .then(result => {
     // console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });
});

router.get('/search/products/code=:code', (req, res, next) => {
  /*
  ex. 
  http://localhost:9000/search/products/-&-/code=S12_1099
  ex. not select size only
  */
  //console.log(`${req.params.size}`);

  let code = req.params.code == '0' ? '%' : req.params.code;
  products.findAll({
    where:
    {
      productCode: {
        [Op.like]: `%${code}%`
      }
    },
    order: [`productCode`, `productName`, `productScale`, `productVendor`]
  })
    // db.query(`SELECT * FROM products WHERE productCode LIKE '%${code}%' ORDER BY productCode,productName,productScale,productVendor`, { type: db.QueryTypes.SELECT})
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });
});

router.get('/search/products/allSize', (req, res, next) => {
  //console.log(`${req.params.size}`);
  products.findAll({
    attributes: [Sequelize.literal('DISTINCT `productScale`'), 'productScale'],
    order: ['productScale']
  })
    // db.query(`SELECT productScale FROM products GROUP by productScale`, { type: db.QueryTypes.SELECT})
    .then(result => {
      //console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });

});
router.get('/search/products/allVendor', (req, res, next) => {
  //console.log(`${req.params.size}`);\
  products.findAll({
    attributes: [Sequelize.literal('DISTINCT `productVendor`'), 'productVendor'],
    order: ['productVendor']
  })
    // db.query(`SELECT productVendor FROM products GROUP by productVendor`, { type: db.QueryTypes.SELECT})
    .then(result => {
     // console.log(result);
      res.send(result);
    })
    // db.query(`SELECT productVendor FROM products GROUP by productVendor`, { type: db.QueryTypes.SELECT})
    .then(result => {
      //console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });

});

router.get('/data/products/:code', (req, res, next) => {
  /*
  ex. 
  http://localhost:9000/search/products/-&-/code=S12_1099
  ex. not select size only
  */
  //console.log(`${req.params.size}`);
  let code = req.params.code;
  products.findAll({
    where: {
      productCode: `${code}`
    }
  }).then(result => {
   // console.log(result);
    res.send(result);
  })
    .catch(err => { console.log(next); });
});

router.get('/productdetails=:code', (req, res, next) => {
  res.sendFile(path.join(__dirname, `..`, `..`, `productdetails.html`), { name: req.user });
  // res.send(result);
});

///////////////////////////custommer////////////////////////////////////////////
router.get('/search/customers', (req, res, next) => {
  customers.findAll({
    order: [`customerName`]
  })
    /* db.query(`SELECT *
     FROM customers
     ORDER by customerName `, { type: db.QueryTypes.SELECT})*/

    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });

});



router.get('/sreach/customers/name=:name', (req, res, next) => {

  customers.findAll({

    where:
    {
      customerName: {
        [Op.like]: `${req.params.name}%`
      }
    }
    ,
    order: [`customerName`]
  })
    /* db.query(`SELECT *
     FROM customers
     WHERE customerName LIKE '${req.params.name}%';
     ORDER by customerName  `, { type: db.QueryTypes.SELECT})*/
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });
});

router.get('/search/customers/number=:number', (req, res, next) => {
  customers.findAll({

    where:
    {
      customerNumber: {
        [Op.like]: `${req.params.number}%`
      }
    }
    ,
    order: [`customerName`]
  })
    /*db.query(`SELECT *
    FROM customers
    WHERE customerNumber LIKE '${req.params.number}%';
    ORDER by customerNumber,customerName  `, { type: db.QueryTypes.SELECT})*/
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });
});


router.get('/data/customers/number=:number', (req, res, next) => {
  customers.findAll({

    where:
    {
      customerNumber: `${req.params.number}`
    }
    ,
    order: [`customerNumber`, `customerName`]
  })
    /*db.query(`SELECT *
    FROM customers
    WHERE customerNumber = '${req.params.number}';
    ORDER by customerNumber,customerName`, { type: db.QueryTypes.SELECT})*/
    .then(result => {
      console.log(result);
      res.send(result[0]);
    })
    .catch(err => { console.log(next); });
});

router.get('/customerInfo=:code',(req,res)=>{
  res.sendFile(path.join(__dirname,`..`,`..`,`Profile.html`), { name: req.user });
 // res.send(result);
});

router.get('/customerlist',(req,res)=>{
  res.sendFile(path.join(__dirname,`..`,`..`,`CustomerList.html`));
 // res.send(result);
});


router.get('/customerorder=:code',(req,res)=>{
  res.sendFile(path.join(__dirname,`..`,`..`,`Customer_DetailOrder.html`));
 // res.send(result);
});

router.get('/data/customers',(req,res)=>{
  
  db.query(`SELECT *
  FROM customers
  ORDER by customerNumber,customerName`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});
///////////////////employees//////////////////////////
router.get('/employeelist',(req,res)=>{
  res.sendFile(path.join(__dirname,`..`,`..`,`EmployeeList.html`));
 // res.send(result);
});
router.get('/data/employee',(req,res)=>{
  
  db.query(`SELECT *
  FROM employees
  ORDER by employeeNumber,firstName`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});
router.get('/employeeInfo',(req,res)=>{
  res.sendFile(path.join(__dirname,`..`,`..`,`EmployeeInfo.html`), { name: req.user });
 // res.send(result);
});


router.get('/search/employees', (req, res, next) => {
  employees.findAll()
    /* db.query(`SELECT jobTitle
     FROM employees
     GROUP BY jobTitle`, { type: db.QueryTypes.SELECT})*/
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });
});

router.get('/search/employees/allTitle', (req, res, next) => {
  employees.findAll({
    attributes: [Sequelize.literal('DISTINCT `jobTitle`'), 'jobTitle']
  })
    /* db.query(`SELECT jobTitle
     FROM employees
     GROUP BY jobTitle`, { type: db.QueryTypes.SELECT})*/
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });
});

// router.get('/search/employees/name=:name',(req,res,next)=>{

//   let name= req.params.name=='0'?'%':req.params.name;
//   employees.findAll({

//     where:
//     {
//       customerNumber:{
//         [Op.like]: `${req.params.number}%`
//       }
//   }
//   ,
//       order:[`customerName`]
//   })
//   db.query(`SELECT *
//   FROM employees
//   WHERE employees.firstName||" "||employees.lastName LIKE '%${name}% '
//   ORDER BY employees.firstName,employees.lastName`, { type: db.QueryTypes.SELECT})
//   .then(result => {console.log(result);
//   res.send(result);
//   })
//   .catch(err => {console.log(next);});
// });


router.get('/search/employees/number=:number', (req, res, next) => {

  let number = req.params.number == '0' ? '%' : req.params.number;
  employees.findAll({

    where:
    {
      employeeNumber: {
        [Op.like]: `%${number}%`
      }
    }
    ,
    order: [`employeeNumber`, `firstName`, `lastName`]
  })
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });
});


router.get('/data/employees/:number', (req, res, next) => {
  employees.findAll({

    where:
    {
      employeeNumber: `${req.params.number}`
    }
  })
    .then(result => {
      //console.log(result);
      res.send(result[0]);

    })
    .catch(err => { console.log(next); });
});
//////////////order/////////////////////////////////////
router.get('/orderlist',(req,res)=>{
  res.sendFile(path.join(__dirname,`..`,`..`,`Order_list.html`));
 // res.send(result);
});

router.get('/data/order',(req,res)=>{
  
  db.query(`SELECT *
  FROM orders
  ORDER by orderNumber,orderDate`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/search/orders', (req, res, next) => {
  orders.findAll()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });
});

router.get('/search/orders/allTitle', (req, res, next) => {
  orders.findAll({
    attributes: [Sequelize.literal('DISTINCT `status`'), 'status']
  })
    /* db.query(`SELECT status
     FROM orders
     GROUP BY orders`, { type: db.QueryTypes.SELECT})*/
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });
});

router.get('/search/customerorders/number=:number', (req, res, next) => {
  orders.findAll({

    where:
    {
      customerNumber: {
        [Op.like]: `${req.params.number}%`
      }
    }
    ,
    order: [`orderNumber`]
  })
    /*db.query(`SELECT *
    FROM orders
    WHERE customerNumber LIKE '${req.params.number}%';
    ORDER by orderNumber  `, { type: db.QueryTypes.SELECT})*/
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => { console.log(next); });
});
//////////////////////////////////////////////////////////////////////////////////////////

router.get('/i', (req, res, next) => {

  db.query(`INSERT INTO productlines SELECT * FROM productlines`, { type: db.QueryTypes.INSERT })
    .then(result => {
      console.log(result);
      res.sendFile(path.join(__dirname, `..`, `..`, `LOGIN.html`));
    })
    .catch(err => { console.log(next); });
});

/////////////////////////
router.get('/login', (req, res, next) => {


  res.sendFile(path.join(__dirname, `..`, `..`, `LOGIN.html`));
  // res.send(result);

});


router.post('/login', (req, res, next) => {
  // console.log(req);
  // (req, res) => res.sendFile('productslist', req.user)

  console.log(req.body.username);
  console.log(req.body.password);
  const username = req.body.username;
  const password = req.body.password;
  employees.findAll({
    where: {
      employeeNumber: `${username}`
    }
  }).then(result => {
    // console.log(result[0]);
    const user = result[0];
    if (user == undefined) {
      console.log("authirize fail :user not found");

    }
    else {
      // let hashPass;
      // bcrypt.genSalt(10, function (err, salt) {
      //   bcrypt.hash(password, salt, function (err, hash) {
      //     hashPass=hash;
      //     console.log(`hash:${hashPass}|||${user.password}`);

      //   });
      // });

      bcrypt.compare(password,user.password, function(err, resq) {
        if(resq)
        {
        console.log("authirize succes");
        res.send(user);
        }
        else
        {
          console.log("authirize fail worng password");

        }
    });
      // if (user.password === hashPass) {
      //   console.log("authirize succes");
      //   res.send(user);
      // }
       
    }
  });

});

router.post('/promotion', (req, res, next) => {
  const promotion = req.body;
  return promotions.create({
    code:promotion.code,
    amount:promotion.amount,
    discount:promotion.discount,
    expire:promotion.expire
}).then(function (promo) {
    if (promo) {
        response.send(promo);
    } else {
        response.status(400).send('Error in insert new promotion');
    }
});


});

router.post('/order', (req, res, next) => {
  const order = req.body;
  return orders.create({
    orderNumber:order.orderNumber,
    orderDate:order.orderDate,
    requiredDate:order.requiredDate,
    shippedDate:order.shippedDate,
    status:"in progress",
    comments:order.comments,
    customerNumber:order.  customerNumber
  }).then(function (order) {
    if (order) {
        response.send(order);
    } else {
        response.status(400).send('Error in insert new order');
    }
});
});

router.post('/orderdetail', (req, res, next) => {
  const orderdetail = req.body;
  return orderdetails.create({
    orderNumber:orderdetail.orderNumber,
    productCode:orderdetail.productCode,
    quantityOrdered:orderdetail. quantityOrdered,
    priceEach:orderdetail.priceEach,
    orderLineNumber:orderdetail.orderLineNumber
  }).then(function (order) {
    if (order) {
        response.send(order);
    } else {
        response.status(400).send('Error in insert new order');
    }
});


});

router.post('/preorder', (req, res, next) => {
  const order = req.body;
  return preOrders.create({
    orderNumber:order.orderNumber,
    orderDate:order.orderDate,
    comments:order.comments,
    customerNumber:order.customerNumber
  }).then(function (order) {
    if (order) {
        response.send(order);
    } else {
        response.status(400).send('Error in insert new order');
    }
});
});

router.post('/preorderdetail', (req, res, next) => {
  const orderdetail = req.body;
  return preorderdetails.create({
    preOrderNumber:orderdetail.orderNumber,
    productCode:orderdetail.productCode,
    quantityOrdered:orderdetail. quantityOrdered,
    priceEach:orderdetail.priceEach,
    orderLineNumber:orderdetail.orderLineNumber
  }).then(function (order) {
    if (order) {
        response.send(order);
    } else {
        response.status(400).send('Error in insert new order');
    }
});
});

module.exports = router;
