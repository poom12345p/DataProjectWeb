let list = document.querySelector('.detail-info');
let list1 = document.querySelector('.bread-crumb');
var urlParams = new URLSearchParams(location.search);
let productsCode = urlParams.get('productsCode');

$(document).ready(function() {
   console.log(list);
   const requestURL = `/data/products/${productsCode}`;
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
       try{list1.innerHTML += `<a href="/">Product</a><span>${data[0].productName}</span>`;
           list.innerHTML+=`<div class = "pname"><h2 class="title-detail">${data[0].productName}</h2></div>
           <input type="hidden" id="pcodes" value="${data[0].productCode}">
           <div class = "pcode"><p class="desc">Product Code : ${data[0].productCode}</p></div>
           <div class = "pdes"><p class="desc">${data[0].productDescription}</p></div>
           <div>
             <div class = "pscale">  <strong>Size : </strong>
               <span>${data[0].productScale}</span></div>
           </div>
           <div>
            <div class = "pven">   <strong>Vendor : </strong>
                <span>${data[0].productVendor}</span></div>
           </div>
           <div>
              <div class = "pline"> <strong>Product Line : </strong>
                <span>${data[0].productLine}</span></div>
           </div>
           <div class="available">
             <div class = "pstock">  <strong>Stock : </strong>
               <span class="in-stock">${data[0].quantityInStock}</span></div>
           </div>
           <div class="attr-detail attr-color">
               <div class="attr-title">
               <div class = "pprice"><strong><sup>*</sup>Buy Price :</strong><span class="current-color">$${data[0].buyPrice}</span> </div>
               </div>
               
           </div>	
           <div class="attr-detail attr-size">
               <div class="attr-title">
               <div class = "pmsrp"> <strong><sup>*</sup>MSRP :</strong><span class="current-size">$${data[0].MSRP}</span></div>
               </div>
               
           </div>	
           <div class="detail-extralink">
               
               <div class="product-extra-link2">
                   
                <a class="addcart-link " id = "edit" onclick="editclick()">Edit</a>
                   <a class="addcart-link deletevalue" id = "delete" >Delete</a>
                   <a class="addcart-link savevalue" id = "save" >Save</a>
                   <a class="addcart-link cancle" id = "cancle" >Cancle</a>
                   
               </div>
               
           </div>`;
           
       }catch(err){console.log();} 
       
        console.log(list);
     }
   });
});
function editclick(){ 
    const requestURL = `/data/products/${productsCode}`;
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
       try{
        document.querySelector('.pname').innerHTML=`<input type="text" id = "pname" value="${data[0].productName}">`                      
        document.querySelector('.pcode').innerHTML=`<p class="desc">Product Code : <input type="text" id = "pcode" value="${data[0].productCode}"></p>`
        document.querySelector('.pdes').innerHTML=`<p class="desc">Description :<input type="text" id = "pdes" value="${data[0].productDescription}"></p>`
        document.querySelector('.pscale').innerHTML=`<strong>Size : </strong><input type="text" id = "pscale" value="${data[0].productScale}">`
        document.querySelector('.pven').innerHTML=`<strong>Vendor : </strong><input type="text" id = "pven" value="${data[0].productVendor}">`
        document.querySelector('.pline').innerHTML=`<strong>Productline : </strong><input type="text" id = "pline" value="${data[0].productLine}">`
        document.querySelector('.pstock').innerHTML=`<strong>Stock : </strong><input type="text" id = "pstock" value="${data[0].quantityInStock}">`
        document.querySelector('.pprice').innerHTML=`<strong><sup>*</sup>Buy Price :</strong><span class="current-color">$<input type="text" id = "pprice" value="${data[0].buyPrice}"></span> </div>`
        document.querySelector('.pmsrp').innerHTML=`<strong><sup>*</sup>MSRP :</strong><span class="current-color">$<input type="text" id = "pmsrp" value="${data[0].MSRP}"></span> </div>`
        }catch(err){console.log(err);} 
       
        console.log(list);
     }
   });
   document.getElementById('edit').style.visibility = 'hidden';

}

