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
																			<br></br>
																				<h2 class="title14">User's Name</h2>
																				<input type="hidden" id="enumber"
																					value="${dataMem[0].employeeNumber}">
																				
																				<input type="text" id="enumbers" 
																			value="">
																			</div>
																		</div>
																	</div>
																</td>
																<td width="50%">
																	<div class="row">
																		<div class="col-md-6 col-sm-6 col-xs-12">
																		<div class="newsletter-form footer-box">
																		<br></br>
																		<h2 class="title14">Position</h2>
																		
														
																		<select id="etitle">
																		<option value=""></option>
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
																	
																<button type="button" class="btn btn-info btn-lg edit" onclick="editclick()">Add</button>
																</td>
																
																
															</tr>
														
															<td width="50%">
															<div class="row">
																<div class="col-md-6 col-sm-6 col-xs-12">
																	<div class="newsletter-form footer-box">
																		<h2 class="title14">Extension</h2>
																		<input type="text" id="eexten"
																			value="">
																	</div>
																</div>
															</div>
                                                        </td>
                                                        <td width="50%">
															<div class="row">
																<div class="col-md-6 col-sm-6 col-xs-12">
																	<div class="newsletter-form footer-box">
																		<h2 class="title14">Report To</h2>
																		<input type="text" id="report"
																			value="">
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
																			<input type="text" id="efname" value="">
																			
																		</div>
																	</td>
																
																</tr>
																<tr>
																	<td align="center" width='55%'>
																	<div class="newsletter-form footer-box">
																	<h2 class="title14">LastName</h2>
																	
																	<input type="text" id ="elname" value="">
																</div>
																	</td>
                                                                </tr>
                                                                <tr>
																	<td align="center" width='55%'>
																	<div class="newsletter-form footer-box">
																	<h2 class="title14">Password</h2>
																	
																	<input type="text" id ="pass" value="">
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
																			<input type="text" id="eemail" value="">
																		</div>
																	</td>
																</tr>
																<tr>
																	<td align="center" width='55%'>
																		<div class="newsletter-form footer-box">
																			<h2 class="title14">Office Code</h2>
																			<input type="text" id="ofc" value="">
																		</div>
																	</td>
																</tr>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
										
										
										<div class="col-md-6 col-sm-6 col-xs-12">
											<table align="center" width='50%'>
												<tr>
												
													<td align="right">
													<br></br>
														<button type="button"
															class="btn btn-secondary btn-lg btn-block cancle" id = "cancle" style="visibility:hidden; onclick="cancleclick()">Cancal</button>
															
														</td>
													
												</tr>
											</table>
										</div>
										<div class="col-md-6 col-sm-6 col-xs-12 ">
											<table align="center" width='50%'>
												<tr>
												
													<td class= "buttonsave" align="right" >
													<br></br>
														<button type="button"
															class="btn btn-warning btn-lg btn-block updatevalue" id = "save" style="visibility:hidden; onclick="">Save</button>
															
													</td>
													
												</tr>
											</table>
										</div>
										
									</div>
									<br></br>
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
	
	document.getElementById('cancle').style.visibility = 'visible';
	document.getElementById('save').style.visibility = 'visible';
	
	

}


