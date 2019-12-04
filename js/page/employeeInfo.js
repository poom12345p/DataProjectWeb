var urlParams = new URLSearchParams(location.search);
let list1 = document.querySelector('.list-pro-color');
let searchForm = document.querySelector('.smart-search-form');
searchForm.addEventListener('submit', searchText);
let textSearch = "";
let dataAll = [];
let dataMem = [];
var numberRow = 1;
var numberPage = 1;
if (urlParams.get('number') == null) urlParams.set('number', '1');

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
    
    
      //ex. http://localhost:9000/employeeInfo?number=12
      // var number =urlParams.get('number');
	  // list1.innerHTML+=`${data[i].productNumber} <br>`;
	  
	  // Product list
	 
      list1.innerHTML = `
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
																				<input id="enumber" type="text"
																					value="${dataMem[0].employeeNumber}">
																			</div>
																		</div>
																	</div>
																</td>
																<td width="50%">
																	<div class="row">
																		<div class="col-md-6 col-sm-6 col-xs-12">
																		<div class="newsletter-form footer-box">
																		<h2 class="title14">Position</h2>
																		<select id="etitle">
																			<option value="${dataMem[0].jobTitle}">${dataMem[0].jobTitle}</option>
																			<option value="President">President</option>
																			<option value="Sale Manager (EMEA)">Sale Manager (EMEA)</option>
																			<option value="Sales Manager (APAC)">Sales Manager (APAC)</option>
																			<option value="Sales Manager (NA)">Sales Manager (NA)</option>
																			<option value="Sales Rep">Sales Rep</option>
																			<option value="VP Marketing">VP Marketing</option>
																			<option value="VP Sales">VP Sales</option>
																		</select>
																		</div>
																</div>
																	</div>
																</td>
																
																<td class ="buttonclick" align="right" width="40%">
																	
																<button type="button" class="btn btn-info btn-lg" onclick="editclick()">Edit</button>
																		
																</td>
															</tr>
														
															<td width="50%">
															<div class="row">
																<div class="col-md-6 col-sm-6 col-xs-12">
																	<div class="newsletter-form footer-box">
																		<h2 class="title14">Extension</h2>
																		<input type="text" id="eexten"
																			value="${dataMem[0].extension}">
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

									<div class="item-product-list aaas">
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
																			<h2 class="title14">FirstName</h2>
																			<input type="text" id="efname" value="${dataMem[0].firstName}">
																			
																		</div>
																	</td>
																
																</tr>
																<tr>
																	<td align="center" width='55%'>
																	<div class="newsletter-form footer-box">
																	<h2 class="title14">LastName</h2>
																	
																	<input type="text" id ="elname" value="${dataMem[0].lastName}">
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
																			<input type="text" id="eemail" value="${dataMem[0].email}">
																		</div>
																	</td>
																</tr>
																<tr>
																	<td align="center" width='55%'>
																		
																	</td>
																</tr>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- End Item -->`;
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

function editclick(){
	
		document.querySelector('.buttonclick').innerHTML =`<button type="button"
	class="btn btn-danger btn-lg" onclick="deleteclick()">Remove</button>`
	
	document.querySelector('.aaas').innerHTML +=`<div class="item-product-list">
		<div class="col-md-6 col-sm-6 col-xs-12">
			<table align="center" width='50%'>
				<tr>
					<td align="right">
						<button type="button"
							class="btn btn-secondary btn-lg btn-block" onclick="cancleclick()">Cancal</button>
					</td>
				</tr>
			</table>
		</div>
		<div class="col-md-6 col-sm-6 col-xs-12">
			<table align="center" width='50%'>
				<tr>
					<td align="right">
						<button type="button"
							class="btn btn-warning btn-lg btn-block updatevalue" onclick="saveclick()">Save</button>
					</td>
				</tr>
			</table>
		</div>
	</div>`;

}
function deleteclick(){

}
function cancleclick(){
	location.reload(true);
}
function saveclick(){
	
    // From: http://learn.jquery.com/ajax/jquery-ajax-methods/
    // Using the core $.ajax() method since it's the most flexible.
    // ($.get() and $.getJSON() are nicer convenience functions)
    console.log("Am in");
	const requestURL1 = '/employee/update/';
	console.log('making ajax request to:', requestURL1);
	
	var memvalue = {
		employeeNumber :$('#enumber').val(), 
		firstName : $('#efname').val(), 
		lastName : $('#elname').val(),
		jobTitle : $('#etitle').val(),
		email : $('#eemail').val(),
		extension : $('#eexten').val(),
		employeeNumbers : $('#enumber').val()
	};
	console.log($('#enumber').val());
	$.ajax({
	// all URLs are relative to http://localhost:3000/
	url: requestURL1,
	type: 'PUT',
	data: memvalue,
	dataType: 'json', // this URL returns data in JSON format
	success: (memvalue) => {
		alert(memvalue);
	}
	});
	console.log(memvalue);
}
