var urlParams = new URLSearchParams(location.search);
let list1 = document.querySelector('.list-pro-color');
if (urlParams.get('name') == null) urlParams.set('name', '1');
let names = [];

$(document).ready(function () {

    //let list=$("");
    console.log(list1);
    const requestURL = '/search/customers';
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
            console.log('You received some data!', data);
            try {
                for (var i = 0; i < data.length; i++) {
                  //if(i==data[1]){
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
                           <td align="left" width="55%">
                            <h1>My Profile</h1>
                           </td>
                           <td align="right" width="25%">
                           <button type="button" class="btn btn-danger btn-lg">Remove</button>
                           </td>
                           <td align="right" width="20%">
                           <button type="button" class="btn btn-info btn-lg">Edit</button>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                      <div class="col-md-12 col-sm-12 col-xs-12">
                       <h4 align="center">Sale Employee Number : ${data[i].salesRepEmployeeNumber}</h4>
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
                          <h4 align="center">Private Information</h4>
                          <table width='90%' align="center" style="padding: 5px; border:1px solid;">
                           <tr>
                            <td align="center">
                             <img src="image/opro.png" alt="" width="75"
                                  height="70">
                            </td>
                            <td align="center">
                             <table width="90%">
                              <div class="footer-list-box">
                               <div class="row">
                                <p>First Name</p>
                                <input type="text" value="${data[i].contactFirstName}">
                                </div>
                                </div>
                              <div class="footer-list-box">
                               <div class="row">
                                <p>Last Name</p>
                                <input type="text" value="${data[i].contactLastName}">
                                </div>
                                </div>
                              <div class="footer-list-box">
                               <div class="row">
                                <p>Username</p>
                                <input type="text" value="${data[i].customerName}">
                                </div>
                                </div>
                              <div class="footer-list-box">
                               <div class="row">
                                <p>UserNumber</p>
                                <input type="text" value="${data[i].customerNumber}">
                               </div>
                              </div>
                             </table>
                            </td>
                           </tr>
                          <tr>
                          <td align="center">
                              <img src="image/passwordo.png" alt="" width="55"
                                  height="55">
                          </td>
                          <td align="center">
                           <table width="90%">
                            <div class="footer-list-box">
                             <div class="row">
                              <p>Change Password</p>
                              <input type="text" value="xxxxxxxx">
                             </div>
                            </div>
                           </table>
                          </td>
                         </tr>
                         <tr>
                          <td align="center">
                           <img src="image/ogender.png" alt="" width="60" height="60">
                          </td>
                          <td align="center">
                           <table width="90%">
                            <div class="footer-list-box">
                             <div class="row">
                              <p>Gender</p>
                              <input type="text" value="xxxxx">
                             </div>
                            </div>
                           </table>
                          </td>
                         </tr>
                         <tr>
                          <td align="center">
                           <img src="image/opoint.png" alt="" width="65" height="65">
                          </td>
                          <td align="center">
                           <table width="90%">
                            <div class="footer-list-box">
                             <div class="row">
                              <p>My Points</p>
                              <input type="text" value="xxxxx">
                             </div>
                            </div>
                           </table>
                          </td>
                         </tr>
                         <tr>
                          <td align="center">
                           <img src="image/ocreditlimit.png" alt=""
                                  width="60" height="60">
                          </td>
                          <td align="center">
                           <table width="90%">
                            <div class="footer-list-box">
                             <div class="row">
                              <p>Credit Limit</p>
                              <input type="text" value="${data[i].creditLimit}$">
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
                        <h4 align="center">Contact</h4>
                        <table width='90%' align="center"
                          style="padding: 5px;   border:1px solid;">
                        <tr>
                         <td align="center">
                          <img src="image/oaddress.png" alt="" width="65"
                           height="65">
                         </td>
                         <td align="center">
                          <table width="90%">
                           <div class="footer-list-box">
                            <div class="row">
                             <p>AddressLine1</p>
                             <input type="text" value="${data[i].addressLine1}">
                             </div>
                                </div>
                              <div class="footer-list-box">
                               <div class="row">
                             <p>AddressLine2</p>
                             <input type="text" value="${data[i].addressLine2}">
                             </div>
                                </div>
                              <div class="footer-list-box">
                               <div class="row">
                             <p>Country</p>
                             <input type="text" value="${data[i].country}">
                             </div>
                                </div>
                              <div class="footer-list-box">
                               <div class="row">
                             <p>City</p>
                             <input type="text" value="${data[i].city}">
                             </div>
                                </div>
                              <div class="footer-list-box">
                               <div class="row">
                             <p>State</p>
                             <input type="text" value="${data[i].state}">
                             </div>
                                </div>
                              <div class="footer-list-box">
                               <div class="row">
                             <p>PostalCode</p>
                             <input type="text" value="${data[i].postalCode}">
                            </div>
                           </div>
                          </table>
                         </td>
                        </tr>
                        <tr>
                          <td align="center">
                           <img src="image/ophone.png" alt="" width="60"
                                  height="60">
                          </td>
                          <td align="center">
                           <table width="90%">
                            <div class="footer-list-box">
                             <div class="row">
                              <p>Phone Number</p>
                              <input type="text" value="${data[i].phone}">
                             </div>
                            </div>
                           </table>
                          </td>
                        </tr>
                        </table>
                       </div>
                      </div>
                     </div>
                     
                     <table align="center" width='50%'>
                     <tr>
                     <td align="center" width='30%'>
                     <button type="button" class="btn btn-secondary btn-lg">Discard</button>
                     </td>
                     <td align="left" width='20%'>
                     <button type="button" class="btn btn-warning btn-lg">Save</button>
                     </td>
                     </tr>
                 </table>
                    </div>
                   </div>
                  </div>
                 <!-- End Item -->
                 </div>`;
                  //}
                    
                }
            }
            catch (err) { }
      
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

function findNames(data) {
    let find = false;
    names.forEach(name => {
      if (data.customerName == name) {
        find = true;
  
      }
    });
    return find;
  }