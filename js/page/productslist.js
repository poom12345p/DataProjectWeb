var urlParams = new URLSearchParams(location.search);
let list1 = document.querySelector('.list-pro-color');
let pagi = document.querySelector('.pagi-bar');
let searchForm = document.querySelector('.smart-search-form');
searchForm.addEventListener('submit', searchText);
let textSearch = "";
let dataAll = [];
let dataMem = [];
var numberRow = 10;
var numberPage = 10;
if (urlParams.get('page') == null) urlParams.set('page', '1');
let vendors = [];
let sizes = [];
if (urlParams.get('vendors') != null && urlParams.get('vendors') != '') urlParams.get('vendors').split(',').forEach(vendor => {
  vendors.push(vendor);
  console.log('ve ' + vendor);
});
if (urlParams.get('sizes') != null && urlParams.get('sizes') != '') urlParams.get('sizes').split(',').forEach(size => {
  sizes.push(size);
});

$(document).ready(function () {

  //let list=$("");
  //var user = JSON.parse(localStorage.getItem('User'));
  var user = JSON.parse(sessionStorage.getItem('USER'));
  console.log(list1);
  const requestURL = '/search/products';
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
      var page = urlParams.get('page');
      //var maxpage = (data.length % numberRow == 0 ? data.length / numberRow : (data.length - (data.length % numberRow)) / numberRow + 1);
      console.log('page ' + page);
      updatePage(page);
    }
  });
});

function pageclick(page) {
  console.log('pc ' + page.innerHTML);
  console.log(location.hostname);
  //location.href = `/Productslist?page=${page.innerHTML}&sizes=${sizes}&vendors=${vendors}`;
  updatePage(page.innerHTML);
}

function nextpage() {
  var next = parseInt(document.querySelector('.current-page').innerHTML) + 1;
  console.log('np ' + next);
  //location.href = `/Productslist?page=${next}&sizes=${sizes}&vendors=${vendors}`;
  updatePage(next);
}

function findSizes(data) {
  let find = false;
  sizes.forEach(size => {
    if (data.productScale == size) {
      console.log(`${data.productScale}|${size}`);
      find = true;
    }
  });
  return find;
}

function findVendors(data) {
  let find = false;
  vendors.forEach(vendor => {
    if (data.productVendor == vendor) {
      find = true;
    }
  });
  return find;
}

function scaleclick(click) {
  console.log(click.value + '  ' + click.checked);
  if (click.checked == true) sizes.push(click.value);
  else {
    let temp = [];
    sizes.forEach(value => {
      if (click.value != value) temp.push(value);
    });
    sizes = temp;
  }
  console.log('sizes ' + sizes);
  //location.href = `/Productslist?page=1&sizes=${sizes}&vendors=${vendors}`;
  updateFilther(dataAll);
  updatePage(1);
}
function vendorclick(click) {
  if (click.checked == true) vendors.push(click.value);
  else {
    let temp = [];
    vendors.forEach(value => {
      if (click.value != value) temp.push(value);
    });
    vendors = temp;
  }
  //location.href = `/Productslist?page=1&sizes=${sizes}&vendors=${vendors}`;
  updateFilther(dataAll);
  updatePage(1);
}

function updatePage(page) {
  var maxpage = (dataMem.length % numberRow == 0 ? dataMem.length / numberRow : (dataMem.length - (dataMem.length % numberRow)) / numberRow + 1)
  try {
    list1.innerHTML = ``;
    for (var i = numberRow * (page - 1); i < numberRow * page; i++) {
      //ex. http://localhost:9000/productslist?page=1
      // var page =urlParams.get('page');
      // list1.innerHTML+=`${data[i].productName}|${data[i].productScale} <br>`;
      // Product list
      list1.innerHTML += `
                  <div class="item-product-list">
                  <div class="row">
                  <div class="col-md-3 col-sm-4 col-xs-12">
                    <div class="item-pro-color">
                      <div class="product-thumb">
                        <a href="http://localhost:9000/productdetails?productsCode=${dataMem[i].productCode}"
                          class="product-thumb-link">
                          <img data-color="black" class="active"
                            src="./image/2(1).png"
                            alt="">
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-9 col-sm-8 col-xs-12">
                    <div class="product-info">
                      <h5 class="product-title"><a
                        href="http://localhost:9000/productdetails?productsCode=${dataMem[i].productCode}"><font size="4"><b>${dataMem[i].productName}</b></font></h5><font size="3.5">Product Code : ${dataMem[i].productCode}</font></a>
                      <div class="product-price">
                        <!--<ins><span>$360.00</span></ins>-->
                      </div>
                      <div class="col-md-5 col-sm-5 col-xs-12">
                        <h6>SIZE : ${dataMem[i].productScale}</font>
                        <h6>VENDER : ${dataMem[i].productVendor}</h6>
                      </div>
                      <div class="col-md-5 col-sm-5 col-xs-12">
                        <h6>Product Line	: ${dataMem[i].productLine}</h6>
                        <h6>Stock	: ${dataMem[i].quantityInStock}</h6>
                      </div>
                      <div class="product-price">
                        <ins><span>$${dataMem[i].MSRP}</span></ins>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
									<!-- End Item -->`;
    }
  }
  catch (err) { }
  var bar = document.createElement('div');
  bar.className = 'pagi-bar';
  var add = 0;
  console.log((page + 5 < maxpage));
  if (page < 6 || maxpage < 11) add = 0;
  else if (page - 0 + 5 < maxpage) add = page - 5;
  else if (maxpage > 10) add = maxpage - 10;
  for (var i = 1 + add; i <= 10 + add; i++) {
    if (i > maxpage) break;
    else if (i == page) {
      bar.innerHTML += `
										<a class="current-page" onclick='pageclick(this)'
											href="#">${i}</a>`;
    } else {
      bar.innerHTML += `
										<a onclick='pageclick(this)'
											href="#">${i}</a>`;
    }
  }
  if (page < maxpage) {
    bar.innerHTML += `
                    <a class="next-page" onclick='nextpage()'
											href="#"><i
                        aria-hidden="true" class="fa fa-caret-right"></i></a>`;
  }
  list1.appendChild(bar);
  pagi.innerHTML = bar.innerHTML;
}

function updateFilther(data) {
  dataMem = [];
  for (var i = 0; i < data.length; i++) {
    if ((sizes.length > 0 ? findSizes(data[i]) : true) && (vendors.length > 0 ? findVendors(data[i]) : true) && (data[i].productName.toUpperCase().search(textSearch.toUpperCase()) != -1)) {
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

