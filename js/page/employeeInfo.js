var urlParams = new URLSearchParams(location.search);
let list1 = document.querySelector('.list-pro-color');
let searchForm = document.querySelector('.smart-search-form');
searchForm.addEventListener('submit', searchText);
let textSearch = "";
let dataAll = [];
let dataMem = [];
var numberRow = 1;
var numberPage = 1;
if (urlParams.get('number') == null) urlParams.set('number', '1002');

let names = [];
if (urlParams.get('names') != null && urlParams.get('names') != '') urlParams.get('names').split(',').forEach(name => {
  names.push(name);
});

$(document).ready(function () {

  console.log(list1);
  const requestURL = '/search/employees';
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
    // const requestURL = '/data/employees';
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
    if (data.firstName == name) {
      console.log(`${data.firstName}|${name}`);
      find = true;
    }
  });
  return find;
}

function updatePage(number) {
  try {
    list1.innerHTML = ``;
    for (var i = numberRow * (number - 1); i < numberRow * number; i++) {
      //ex. http://localhost:9000/employeeInfo?number=1
      // var number =urlParams.get('number');
      // list1.innerHTML+=`${data[i].productNumber} <br>`;
      // Product list
      list1.innerHTML += `
      <div class="item-product-list">
										<div class="row">
											<table width='90%' align="center">
												<tr>
													<td align="center" width="15%">
														<img src="image/orange_profile.png" alt="">
													</td>
													<td align="center">
														<table width="90%">
															<tr>
																<td width="50%">
																	<div class="row">
																		<div class="col-md-6 col-sm-6 col-xs-12">
																			<div class="newsletter-form footer-box">
																				<h2 class="title14">User's Name</h2>
																				<input type="text"
																					value="${dataMem[i].employeeNumber}">
																			</div>
																		</div>
																	</div>
																</td>

																<td align="right" width="40%">
																	<button type="button"
																		class="btn btn-danger btn-lg">Remove</button>
																	<button type="button"
																		class="btn btn-info btn-lg">Edit</button>
																</td>
															</tr>
															<tr>
																<td width="50%">
																	<div class="row">
																		<div class="col-md-6 col-sm-6 col-xs-12">
																			<div class="newsletter-form footer-box">
																				<h2 class="title14">Department</h2>
																				<input type="text"
																					value="xxxxxxxxxxxxx">
																			</div>
																		</div>
																		<div class="col-md-6 col-sm-6 col-xs-12">
																			<div class="newsletter-form footer-box">
																				<h2 class="title14">Working Hours</h2>
																				<input type="text" value="xxx">
																			</div>
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<td width="20%">
																	<div class="row">
																		<div class="col-md-6 col-sm-6 col-xs-12">
																			<div class="newsletter-form footer-box">
																				<h2 class="title14">Position</h2>
																				<input type="text" value="${dataMem[i].jobTitle}">

																			</div>

																		</div>
																		<div class="col-md-6 col-sm-6 col-xs-12">
																			<div class="newsletter-form footer-box">
																				<h2 class="title14">Status</h2>
																				<input type="text" value="xxxxxxxxxxx">
																			</div>
																		</div>
																	</div>
																</td>
															</tr>
													</td>
												</tr>
											</table>
											</td>
											</tr>
											</table>
										</div>
									</div>

									<div class="item-product-list">
										<div id="footer">
											<div class="row">
												<div class="col-md-6 col-sm-6 col-xs-12">
													<div class="banner-flash">
														<div class="flash-info">
															<h4 class="title-shop-page" align="center">Private
																Information</h4>
															<table width='80%' align="center">
																<tr>
																	<td align="center" width='55%'>
																		<div class="newsletter-form footer-box">
																			<h2 class="title14">Name</h2>
																			<input type="text" value="${dataMem[i].firstName} | ${dataMem[i].lastName}">
																		</div>
																	</td>
																</tr>
																<tr>
																	<td align="center" width='55%'>
																		<div class="newsletter-form footer-box">
																			<h2 class="title14">Address</h2>
																			<input type="text" value="xxxxxxxxxxxxx">
																		</div>
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
															<table width='80%' align="center">
																<tr>
																	<td align="center" width='55%'>
																		<div class="newsletter-form footer-box">
																			<h2 class="title14">Email</h2>
																			<input type="text" value="${dataMem[i].email}">
																		</div>
																	</td>
																</tr>
																<tr>
																	<td align="center" width='55%'>
																		<div class="newsletter-form footer-box">
																			<h2 class="title14">Number Phone</h2>
																			<input type="text" value="xxxxxxxxxxxxx">
																		</div>
																	</td>
																</tr>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div class="item-product-list">
											<div class="col-md-6 col-sm-6 col-xs-12">
												<table align="center" width='50%'>
													<tr>
														<td align="right">
															<button type="button"
																class="btn btn-secondary btn-lg btn-block">Cancal</button>
														</td>
													</tr>
												</table>
											</div>
											<div class="col-md-6 col-sm-6 col-xs-12">
												<table align="center" width='50%'>
													<tr>
														<td align="right">
															<button type="button"
																class="btn btn-warning btn-lg btn-block">Save</button>
														</td>
													</tr>
												</table>
											</div>
									</div>
									<!-- End Item -->`;

    }
  }
  catch (err) { }
}

function updateFilther(data) {
  dataMem = [];
  for (var i = 0; i < data.length; i++) {
    if ((names.length > 0 ? findNames(data[i]) : true) && (data[i].firstName.toUpperCase().search(textSearch.toUpperCase()) != -1)) {
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


//let list =document.querySelector('.list-pro-color')
//$(document).ready(function() {
//    const requestURL = '/search/employees';
//    console.log('making ajax request to:', requestURL);
    // From: http://learn.jquery.com/ajax/jquery-ajax-methods/
    // Using the core $.ajax() method since it's the most flexible.
    // ($.get() and $.getJSON() are nicer convenience functions)
//    $.ajax({
      // all URLs are relative to http://localhost:3000/
//      url: requestURL,
//      type: 'GET',
//      dataType : 'json', // this URL returns data in JSON format
//      success: (data) => {
//        console.log('You received some data!', data);
//        for(var i=0;i<data.length;i++)
//                {      
//                   list.innerHTML+=`${data[i].employeeNumber},${data[i].firstName} <br>`
//                }
//                console.log(list);
//      }
//    });
//});

// const path = require('path');
// const db=require('../../routes/api/data');
// function createlist()
// {
//     db.query("SELECT * FROM  employees", { type: db.QueryTypes.SELECT})
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