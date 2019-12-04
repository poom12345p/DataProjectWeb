let list = document.querySelector('.list-pro-color')

$(document).ready(function () {
  $("#addProduct-btn").click(function (event) {
    event.preventDefault();
    console.log("submit promotion");
    let data = {
      code: $("#code").val(),
      amount: $("#amount").val(),
      discount: $("#discount").val(),
      expire: $("#expire").val()
    }
    $.ajax({
      type: "POST",
      url: "/promotion",
      data: data,
      dataType: "json",
      success: (promo) => {
        //   if (localStorage.getItem('contacts') === null) {
        //     var contacts = [];
        //     contacts.push(myContact);
        //     localStorage.setItem('contacts', JSON.stringify(contacts));
        //   } else {
        //     var contacts = JSON.parse(localStorage.getItem('contacts'));
        //     contacts.push(myContact);
        //     localStorage.setItem('contacts', JSON.stringify(contacts));
        //   }
        // sessionStorage.setItem('PROMOTION', JSON.stringify(promo));
        // location.replace(location.origin + `/productslist`);
      },


    });
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