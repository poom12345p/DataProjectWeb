var urlParams = new URLSearchParams(location.search);
let list1 = document.querySelector('.list-pro-color');
let widget = document.querySelector('.widget-content');
let bread = document.querySelector('.bread-crumb');
let URL = window.location.href;
console.log(URL);
var parsURL = URL.replace('http://localhost:9000/customerInfo=','');
console.log(parsURL);

let searchForm = document.querySelector('.smart-search-form');
searchForm.addEventListener('submit', searchText);
let textSearch = "";
let dataAll = [];
let dataMem = [];
var numberRow = 1;
var numberPage = 1;
if (urlParams.get('number') == null) urlParams.set('number', '103');

let customers = [];
if (urlParams.get('customers') != null && urlParams.get('customers') != '') urlParams.get('customers').split(',').forEach(customer => {
  customers.push(customer);
});

widget.innerHTML = `
<ul>
<li class="">
  <a href="/customerInfo=${parsURL}">Customer Profile</a>
</li>
<br>
<li class="">
  <a href="/customerorder=${parsURL}">Order</a>
</li>
</ul>`;

bread.innerHTML = `<a href="CustomerList.html">Customer</a> <span>Profile ID ${parsURL}</span>`;

$(document).ready(function () {

  //let list=$("");
  var user = JSON.parse(localStorage.getItem('User'));
  console.log(user);
  console.log(list1);
  const requestURL = '/search/customers/number='+parsURL;
  console.log('making ajax request to:', requestURL);
  // From: http://learn.jquery.com/ajax/jquery-ajax-methods/
  // Using the core $.ajax() method since it's the most flexible.
  // ($.get() and $.getJSON() are nicer convenience functions)
  $.ajax({
    // all URLs are relative to http://localhost:3000/
    url: requestURL,
    type: 'GET',
    dataType: 'json', // this URL returns data in JSON format
    success: (data) => {
      // console.log('You received some data!', data);
      dataAll = data;
      updateFilther(dataAll);
      var number = urlParams.get('number');
      //var maxpage = (data.length % numberRow == 0 ? data.length / numberRow : (data.length - (data.length % numberRow)) / numberRow + 1);
      console.log('number ' + number);
      updatePage(number);
    }
  });

  $("#submit").click(function () {
    // const requestURL = '/data/customers';
    // console.log('making ajax request to:', requestURL);
    // From: http://learn.jquery.com/ajax/jquery-ajax-methods/
    // Using the core $.ajax() method since it's the most flexible.
    // ($.get() and $.getJSON() are nicer convenience functions)
    // $.ajax({
    // all URLs are relative to http://localhost:3000/
    // url: requestURL,
    // type: 'GET',
    // dataType : 'json', // this URL returns data in JSON format
    // success: (data) => {
    // console.log('You received some data!', data);
    // for(var i=0;i<data.length;i++)
    //        {      
    //            list.innerHTML+=`${data[i].customerName} <br>`
    //        }
    //        console.log(list);
  });
});

function findCustomers(data) {
  let find = false;
  customers.forEach(customer => {
    if (data.customerNumber == customer) {
      console.log(`${data.customerNumber}|${customer}`);
      find = true;
    }
  });
  return find;
}

function updatePage(number) {
  try {
    list1.innerHTML = ``;
    
      //ex. http://localhost:9000/customerInfo?number=1
      // var number =urlParams.get('number');
      // list1.innerHTML+=`${data[i].productNumber} <br>`;
      // Product list
      list1.innerHTML += `
      <div class="item-product-list">
      <div class="row">
       <table width='90%' align="center">
        <tr>
         <td align="center" width="20%">
          <img src="image/orange_profile.png" alt="">
         </td>
         <td align="center">
          <table width="90%">
           <tr>
            <td align="left" width="40%">
             <h2 class="title-shop-page">Customer ID : ${parsURL}</h2>
            </td>
            <td align="right" width="40%">
            <button type="button" class="btn btn-danger btn-lg">Remove</button>
            <button type="button" class="btn btn-info btn-lg">Edit</button>
            </td>
           </tr>
          </table>
         </td>
        </tr>
       </table>
       <div class="col-md-12 col-sm-12 col-xs-12">
        <h4 align="center">Sale Employee Number : ${dataMem[0].salesRepEmployeeNumber}</h4>
       </div>
      </div>
     </div>
     <!-- End Item -->
     <div class="item-product-list">
      <div id="footer">
       <div class="row">
        <div class="col-md-6 col-sm-6 col-xs-12">
         <div class="banner-flash">
          <div class="flash-info">
           <h4 class="title-shop-page" align="center">Private Information</h4>
           <table width='90%' align="center" style="padding: 5px; border:1px ">
            <tr>
             <td align="left">
              <img src="image/opro.png" alt="" width="70"
                   height="65">
             </td>
             <td align="center">
              <table width="90%">
               <div class="footer-list-box">
                <div class="row">
                   <div class="newsletter-form footer-box">
                       <h2 class="title14">First Name</h2>
                           <input type="text" value="${dataMem[0].contactFirstName}">
                   </div>
                </div>
               </div>
               <div class="footer-list-box">
                <div class="row">
                 <div class="newsletter-form footer-box">
                   <h2 class="title14">Last Name</h2>
                       <input type="text" value="${dataMem[0].contactLastName}">
                 </div>
                </div>
               </div>
               <div class="footer-list-box">
                <div class="row">
                 <div class="newsletter-form footer-box">
                   <h2 class="title14">Username</h2>
                       <input type="text" value="${dataMem[0].customerName}">
                 </div>
                </div>
               </div>
               <div class="footer-list-box">
                <div class="row">
                 <div class="newsletter-form footer-box">
                   <h2 class="title14">Usernumber</h2>
                       <input type="text" value="${dataMem[0].customerNumber}">
                 </div>
                </div>
               </div>
              </table>
             </td>
            </tr>
           <tr>
           <td align="left">
               <img src="image/passwordo.png" alt="" width="55"
                   height="55">
           </td>
           <td align="center">
            <table width="90%">
             <div class="footer-list-box">
              <div class="row">
               <div class="newsletter-form footer-box">
                 <h2 class="title14">Change Password</h2>
                     <input type="text" value="xxxxxxxx">
               </div>
              </div>
             </div>
            </table>
           </td>
          </tr>
          <tr>
           <td align="left">
            <img src="image/ogender.png" alt="" width="55" height="55">
           </td>
           <td align="center">
            <table width="90%">
             <div class="footer-list-box">
              <div class="row">
               <div class="newsletter-form footer-box">
                 <h2 class="title14">Gender</h2>
                     <input type="text" value="xxxx">
               </div>
              </div>
             </div>
            </table>
           </td>
          </tr>
          <tr>
           <td align="left">
            <img src="image/opoint.png" alt="" width="65" height="65">
           </td>
           <td align="center">
            <table width="90%">
             <div class="footer-list-box">
              <div class="row">
               <div class="newsletter-form footer-box">
                 <h2 class="title14">My Points</h2>
                     <input type="text" value="xxxxx">
               </div>
              </div>
             </div>
            </table>
           </td>
          </tr>
          <tr>
           <td align="left">
            <img src="image/ocreditlimit.png" alt=""
                   width="60" height="60">
           </td>
           <td align="center">
            <table width="90%">
             <div class="footer-list-box">
              <div class="row">
               <div class="newsletter-form footer-box">
                 <h2 class="title14">Credit Limit</h2>
                     <input type="text" value="${dataMem[0].creditLimit}">
               </div>
              </div>
             </div>
            </table>
           </td>
          </tr>
         </table>
        </div>
       </div>
      </div>
      <div class="col-md-6 col-sm-6 col-xs-12">
       <div class="banner-flash">
        <div class="flash-info">
         <h4 class="title-shop-page" align="center">Contact</h4>
         <table width='90%' align="center"
           style="padding: 5px;   border:1px ">
         <tr>
          <td align="left">
           <img src="image/oaddress.png" alt="" width="60"
            height="60">
          </td>
          <td align="center">
           <table width="90%">
            <div class="footer-list-box">
             <div class="row">
              <div class="newsletter-form footer-box">
                <h2 class="title14">AddressLine1</h2>
                    <input type="text" value="${dataMem[0].addressLine1}">
              </div>
             </div>
            </div>
            <div class="footer-list-box">
             <div class="row">
              <div class="newsletter-form footer-box">
                <h2 class="title14">AddressLine2</h2>
                    <input type="text" value="${dataMem[0].addressLine2}">
              </div>
             </div>
            </div>
            <div class="footer-list-box">
            <div class="row">
            <div class="newsletter-form footer-box">
                <h2 class="title14">Country</h2>
                    <input type="text" value="${dataMem[0].country}">
            </div>
         </div>
                 </div>
               <div class="footer-list-box">
               <div class="row">
               <div class="newsletter-form footer-box">
                   <h2 class="title14">City</h2>
                       <input type="text" value="${dataMem[0].city}">
               </div>
            </div>
                 </div>
               <div class="footer-list-box">
               <div class="row">
               <div class="newsletter-form footer-box">
                   <h2 class="title14">State</h2>
                       <input type="text" value="${dataMem[0].state}">
               </div>
            </div>
                 </div>
               <div class="footer-list-box">
               <div class="row">
               <div class="newsletter-form footer-box">
                   <h2 class="title14">PostalCode</h2>
                       <input type="text" value="${dataMem[0].postalCode}">
               </div>
            </div>
            </div>
           </table>
          </td>
         </tr>
         <tr>
           <td align="left">
            <img src="image/ophone.png" alt="" width="55"
                   height="55">
           </td>
           <td align="center">
            <table width="90%">
             <div class="footer-list-box">
             <div class="row">
             <div class="newsletter-form footer-box">
                 <h2 class="title14">Number Phone</h2>
                     <input type="text" value="${dataMem[0].phone}">
             </div>
          </div>
             </div>
            </table>
           </td>
         </tr>
         </table>
        </div>
       </div>
      </div>
      
      <table align="center" width='40%'>
      <tr>
      <td align="center">
      <button type="button" class="btn btn-secondary btn-lg btn-block">Cancal</button>
      </td>
      </tr>
  </table>
  <table align="center" width='40%'>
      <tr>
      <td align="left">
      <button type="button" class="btn btn-warning btn-lg btn-block">Save</button>
      </td>
      </tr>
      <br>
  </table>
     </div>
    </div>
   </div>
  <!-- End Item -->
  </div>
									<!-- End Item -->`;

    
  }
  catch (err) { }
}

function updateFilther(data) {
  dataMem = [];
  for (var i = 0; i < data.length; i++) {
    if ((customers.length > 0 ? findCustomers(data[i]) : true) && (data[i].customerNumber.toUpperCase().search(textSearch.toUpperCase()) != -1)) {
      dataMem.push(data[i]);
    }
  }
}

function searchText(e) {
  e.preventDefault();
  let type = document.querySelector('a.category-toggle-link').innerHTML;
  textSearch = searchForm.querySelector('input[type=text]').value;
  if (textSearch == "Search...") textSearch = "";
  updateFilther(dataAll);
  updatePage(1);
}
