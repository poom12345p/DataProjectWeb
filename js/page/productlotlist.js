let list = document.querySelector('.widget-content');
//let vendors = [];
//let sizes = [];
/*if (urlParams.get('vendors') != null && urlParams.get('vendors') != '') urlParams.get('vendors').split(',').forEach(vendor => {
  vendors.push(vendor);
  console.log('ve ' + vendor);
});
if (urlParams.get('sizes') != null && urlParams.get('sizes') != '') urlParams.get('sizes').split(',').forEach(size => {
  sizes.push(size);
});*/

$(document).ready(function () {


  console.log(list1);
  const requestURL1 = '/search/products/allSize';
  const requestURL2 = '/search/products/allVendor';
  console.log('making ajax request to:', requestURL1);
  // From: http://learn.jquery.com/ajax/jquery-ajax-methods/
  // Using the core $.ajax() method since it's the most flexible.
  // ($.get() and $.getJSON() are nicer convenience functions)
  $.ajax({
    // all URLs are relative to http://localhost:3000/
    url: requestURL1,
    type: 'GET',
    dataType: 'json', // this URL returns data in JSON format
    success: (data) => {
      console.log('You received some data!', data);
      for (var i = 0; i < data.length; i++) {
        let status = false;
        sizes.forEach(size => {
          if (data[i].productScale == size) status = true;
        });
        if (status == true) {
          var checkbox = "<input type='checkbox'name ='scale' value='" + data[i].productScale + "'onclick ='scaleclick(this)' autocomplete='off' checked='true' />"

          document.querySelector('.widget-content').innerHTML += checkbox + data[i].productScale + "<br/>"
        } else {
          var checkbox = "<input type='checkbox'name ='scale' value='" + data[i].productScale + "'onclick ='scaleclick(this)' autocomplete='off' />"

          document.querySelector('.widget-content').innerHTML += checkbox + data[i].productScale + "<br/>"
        }



      }

      console.log(list1);
    }
  });
  $.ajax({
    // all URLs are relative to http://localhost:3000/
    url: requestURL2,
    type: 'GET',
    dataType: 'json', // this URL returns data in JSON format
    success: (data) => {
      console.log('You received some data!', data);
      for (var i = 0; i < data.length; i++) {


        var checkbox = "<input type='checkbox'name ='vendor' value='" + data[i].productVendor + "'onclick ='vendorclick(this)' autocomplete='off' />"

        document.querySelector('.vendor').innerHTML += checkbox + data[i].productVendor + "<br/>"


      }

      console.log(list1);
    }
  });
});
/*function scaleclick(){
    var cboxes = document.getElementsByName('scale');
    console.log(cboxes);
    alert(cboxes[0].value + cboxes[0].checked);
    alert(cboxes[1].value + cboxes[1].checked);

}
function vendorclick(){
  var cboxes = document.getElementsByName('vendor');
  console.log(cboxes);
  alert(cboxes[0].value + cboxes[0].checked);
  alert(cboxes[1].value + cboxes[1].checked);

}*/
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