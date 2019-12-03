let list = document.querySelector('.detail-info');
let list1 = document.querySelector('.bread-crumb');
let URL = window.location.href;
console.log(URL);
var parsURL = URL.replace('http://localhost:9000/productdetails=','');
console.log(parsURL);

$(document).ready(function() {
   console.log(list);
   const requestURL = '/search/products/code='+parsURL;
   console.log('making ajax request to:', requestURL);
    //From: http://learn.jquery.com/ajax/jquery-ajax-methods/
    //Using the core $.ajax() method since it's the most flexible.
    //($.get() and $.getJSON() are nicer convenience functions)
   $.ajax({
      //all URLs are relative to http://localhost:3000/
     url: requestURL,
     type: 'GET',
     dataType : 'json', // this URL returns data in JSON format
     success: (data) => {
       //console.log('You received some data!', data);    
       try{list1.innerHTML += `<a href="/">Product</a> <span>${data[0].productName}</span>`;
           list.innerHTML+=`<h2 class="title-detail">${data[0].productName}</h2>
           <p class="desc">Product Code : ${data[0].productCode}</p>
           <p class="desc">${data[0].productDescription}</p>
           <div>
               <strong>Size : </strong>
               <span>${data[0].productScale}</span>
           </div>
           <div>
               <strong>Vendor : </strong>
               <span>${data[0].productVendor}</span>
           </div>
           <div>
               <strong>Product Line : </strong>
               <span>${data[0].productLine}</span>
           </div>
           <div class="available">
               <strong>Stock : </strong>
               <span class="in-stock">${data[0].quantityInStock}</span>
           </div>
           <div class="attr-detail attr-color">
               <div class="attr-title">
                   <strong><sup>*</sup>Buy Price :</strong><span class="current-color">$${data[0].buyPrice}</span>
               </div>
               
           </div>	
           <div class="attr-detail attr-size">
               <div class="attr-title">
                   <strong><sup>*</sup>MSRP :</strong><span class="current-size">$${data[0].MSRP}</span>
               </div>
               
           </div>	
           <div class="detail-extralink">
               
               <div class="product-extra-link2">
                   <a class="addcart-link" href="http://demo.7uptheme.com/html/kuteshop/detail.html?fbclid=IwAR0lMh5eJUqyEFAWzgHqTo_TaAx3umKntyESabM0IK1nP_z4ebpeQeMPLds#">Edit</a>
                   <a class="addcart-link" href="http://demo.7uptheme.com/html/kuteshop/detail.html?fbclid=IwAR0lMh5eJUqyEFAWzgHqTo_TaAx3umKntyESabM0IK1nP_z4ebpeQeMPLds#">Delete</a>
                   
               </div>
           </div>`;
           
       }catch(err){console.log(GG);} 
       
        console.log(list);
     }
   });
});