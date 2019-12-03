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
let titles = [];
if (urlParams.get('titles') != null && urlParams.get('titles') != '') urlParams.get('titles').split(',').forEach(title => {
  titles.push(title);
  console.log('ti ' + title);
});

$(document).ready(function () {

  //let list=$("");
  var user = JSON.parse(localStorage.getItem('User'));
  console.log(user);
  console.log(list1);
  const requestURL = '/data/employee';

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

function findTitles(data) {
  let find = false;
  titles.forEach(title => {
    if (data.jobTitle == title) {
      console.log(`${data.jobTitle}|${title}`);
      find = true;
    }
  });
  return find;
}



function titleclick(click) {
  console.log(click.value + '  ' + click.checked);
  if (click.checked == true) titles.push(click.value);
  else {
    let temp = [];
    titles.forEach(value => {
      if (click.value != value) temp.push(value);
    });
    titles = temp;
  }
  console.log('titles ' + titles);
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
      list1.innerHTML += `<div class="item-product-list">
                <div class="row">
                    <div class="col-md-3 col-sm-4 col-xs-12">
                        <div class="item-pro-color">
                            <div class="product-thumb">
                            <a href="http://demo.7uptheme.com/html/kuteshop/detail.html"
                            class="product-thumb-link">
                            <img data-color="black" class="active"
                              src="./image/2(1).png"
                              alt="">
                            <img data-color="purple"
                              src="./image/3(1).jpg"
                              alt="">
                            <img data-color="blue"
                              src="./image/4(1).jpg"
                              alt="">
                            <img data-color="cyan"
                              src="./image/5.jpg"
                              alt="">
                          </a>
                                <a href="http://demo.7uptheme.com/html/kuteshop/quick-view.html"
                                    class="quickview-link plus fancybox.iframe"><span>quick
                                        view</span></a>
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-md-9 col-sm-8 col-xs-12">
                        <div class="product-info">
                            <h3 class="product-title"><a
                                    href="">${dataMem[i].firstName} ${dataMem[i].lastName}</a></h3>
                            <div class="product-price">
                                <ins><span>${dataMem[i].jobTitle}</span></ins>
                            </div>
                            <p class="desc">Employee Number : ${dataMem[i].employeeNumber}</p>
                <div class="product-rate">
                    <div class="product-rating" style="width:90%"></div>
                </div>
                
                        </div>
                    </div>
                </div>
            </div>`

    }
  }
  catch (err) { }
  var bar = document.createElement('div');
  bar.className = 'pagi-bar';
  var add = 0;
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
    let fullName = `${data[i].firstName} ${data[i].lastName}`
    if ((titles.length > 0 ? findTitles(data[i]) : true) && (fullName.toUpperCase().search(textSearch.toUpperCase()) != -1)) {
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