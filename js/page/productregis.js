let list = document.querySelector('.list-pro-color')

$(document).ready(function () {
  $("#addProduct-btn").click(function (event) {
    event.preventDefault();
    console.log("submit product");
    let data = {
      productCode: $("#code").val(),
      productName: $("#name").val(),
      productLine: $("#line").val(),
      productScale: $("#size").val(),
      productVendor: $("#vendor").val(),
      productDescription: $("#description").val(),
      quantityInStock: $("#stock").val(),
      buyPrice: $("#price").val(),
      MSRP: $("#msrp").val()
    }
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: "/search/products",
      type: 'GET',
      dataType: 'json', // this URL returns data in JSON format
      success: (products) => {
        console.log("product number " + products.length);
        products.forEach(product => {
          if (product.productCode == data.productCode) {
            console.log("Duplicate product code");
            alert("Duplicate product code");
            return 0;
          }
        });
      }
    }).always(function () {
      $.ajax({
        type: "POST",
        url: "/product",
        data: data,
        dataType: "json",
        success: (item) => {
          console.log("product success");
          //   if (localStorage.getItem('contacts') === null) {
          //     var contacts = [];
          //     contacts.push(myContact);
          //     localStorage.setItem('contacts', JSON.stringify(contacts));
          //   } else {
          //     var contacts = JSON.parse(localStorage.getItem('contacts'));
          //     contacts.push(myContact);
          //     localStorage.setItem('contacts', JSON.stringify(contacts));
          //   }
          // sessionStorage.setItem('PROMOTION', JSON.stringify(item));
          // location.replace(location.origin + `/productslist`);
        }
      });
    })
  });
});
// const path = require('path');
// const db=require('../../routes/api/data');
// function createlist()
// {
//     db.query("SELECT * FROM  productlines", { type: db.QueryTypes.SELECT})
//   .then(result => {
//       console.log(result);
//         for(var i=0;i<result.length;i++)
//         {      
//             list.innerHTML+=`${result[i]} <br>`
//         }
//     }
//     )
//   .catch(err => {console.log(err);});
// }