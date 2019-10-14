const express = require('express');
const router = express.Router();
const uuid =require('uuid');
const fs= require('fs');
const path = require('path');
// let users =require('../../Users');
const db=require('./data');

 db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
router.get('/orderlist',(req,res)=>{


    res.sendFile(path.join(__dirname,`..`,`..`,`Order_list.html`));
   // res.send(result);
  
});


router.get('/data/productlines',(req,res)=>{
  
  db.query(`SELECT * FROM  productlines`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});
//products sreach api
router.get('/data/products/:size&:vender',(req,res)=>{
  //console.log(`${req.params.size}`);
  /*
  ex. not select size and vendor
  http://localhost:9000/data/products/-&-
  ex. not select size only
  http://localhost:9000/data/products/1:700&-
   ex. not select size and vendor
  http://localhost:9000/data/products/1:700&Min Lin Diecast

  */
  console.log(`${req.params.size}|${req.params.vender}|${req.params.name}`);
  let size= req.params.size=='-'?'%':req.params.size;
  let vendor= req.params.vender=='-'?'%':req.params.vender;

  db.query(`SELECT * FROM products WHERE productScale LIKE "${size}" AND productVendor LIKE "${vendor}" ORDER BY productName,productScale,productVendor `, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/data/products/:size&:vender/name=:name',(req,res)=>{
  //console.log(`${req.params.size}`);
  /*
  ex. 
  http://localhost:9000/data/products/-&-/name=Alpine
  ex. not select size only
  */

  console.log(`${req.params.size}|${req.params.vender}|${req.params.name}`);
  let size= req.params.size=='-'?'%':req.params.size;
  let vendor= req.params.vender=='-'?'%':req.params.vender;
  let name= req.params.name=='-'?'%':req.params.name;
  db.query(`SELECT * FROM products WHERE productScale LIKE "${size}" AND productVendor LIKE "${vendor}" AND productName LIKE '%${name}%' ORDER BY productName,productScale,productVendor`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/data/products/:size&:vender/code=:code',(req,res)=>{
  /*
  ex. 
  http://localhost:9000/data/products/-&-/code=S12_1099
  ex. not select size only
  */
  //console.log(`${req.params.size}`);
  console.log(`${req.params.size}|${req.params.vender}|${req.params.name}`);
  let size= req.params.size=='-'?'%':req.params.size;
  let vendor= req.params.vender=='-'?'%':req.params.vender;
  let name= req.params.code=='-'?'%':req.params.code;
  db.query(`SELECT * FROM products WHERE productScale LIKE "${size}" AND productVendor LIKE "${vendor}" AND productCodeLIKE '%${name}%' ORDER BY productCode,productName,productScale,productVendor`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});
router.get('/data/products/:size&:vender/name&:name',(req,res)=>{
  //console.log(`${req.params.size}`);
  console.log(`${req.params.size}|${req.params.vender}|${req.params.name}`);
  let size= req.params.size=='-'?'%':req.params.size;
  let vendor= req.params.vender=='-'?'%':req.params.vender;
  let name= req.params.name=='-'?'%':req.params.name;
  db.query(`SELECT * FROM products WHERE productScale LIKE "${size}" AND productVendor LIKE "${vendor}" AND productName LIKE '%${name}%' ORDER BY productName `, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});

router.get('/data/products/size',(req,res)=>{
  //console.log(`${req.params.size}`);
  db.query(`SELECT productScale FROM products GROUP by productScale`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});

});
router.get('/data/products/vendor',(req,res)=>{
  //console.log(`${req.params.size}`);
  db.query(`SELECT productVendor FROM products GROUP by productVendor`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});

});



router.get('/i',(req,res)=>{

  db.query(`SELECT ${req,this.param,name} FROM  productlines`, { type: db.QueryTypes.SELECT})
  .then(result => {console.log(result);
  res.send(result);
  })
  .catch(err => {console.log(err);});
});
    


module.exports = router;