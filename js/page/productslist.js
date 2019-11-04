var urlParams = new URLSearchParams(location.search);
let list1 = document.querySelector('.list-pro-color');
let pagi = document.querySelector('.pagi-bar');
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
      console.log(urlParams.get('vendors') + ' vvd ' + vendors);
      console.log(vendors.length);
      // console.log('You received some data!', data);
      {
        let filther = [];
        for (var i = 0; i < data.length; i++) {
          if ((sizes.length > 0 ? findSizes(data[i]) : true) && (vendors.length > 0 ? findVendors(data[i]) : true)) {
            filther.push(data[i]);
          }
        }
        data = filther;
      }
      var page = urlParams.get('page');
      var maxpage = (data.length % numberRow == 0 ? data.length / numberRow : (data.length - (data.length % numberRow)) / numberRow + 1);
      console.log('page ' + page);
      try {
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
                      <h5 class="product-title"><a
                        href="http://demo.7uptheme.com/html/kuteshop/detail.html"><font size="4"><b>${data[i].productName}</b></font></h5><font size="3.5">Product Code : ${data[i].productCode}</font></a>
                      <div class="product-price">
                        <!--<ins><span>$360.00</span></ins>-->
                      </div>
                      <div class="col-md-5 col-sm-5 col-xs-12">
                        <h6>SIZE : ${data[i].productScale}</font>
                        <h6>VENDER : ${data[i].productVendor}</h6>
                      </div>
                      <div class="col-md-5 col-sm-5 col-xs-12">
                        <h6>Product Line	: ${data[i].productLine}</h6>
                        <h6>Stock	: ${data[i].quantityInStock}</h6>
                      </div>
                      <div class="product-price">
                        <ins><span>$${data[i].MSRP}</span></ins>
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
      console.log('mp ' + maxpage);
      var add = 0;
      if (page < 6 || maxpage < 11) add = 0;
      else if (page + 5 < maxpage) add = page - 5;
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
  });

  $("#submit").click(function () {
    // $.ajax({
    //   // all URLs are relative to http://localhost:3000/
    //   url: requestURL,
    //   type: 'GET',
    //   dataType : 'json', // this URL returns data in JSON format
    //   success: (data) => {
    //    console.log(vendors.length);
    //    // console.log('You received some data!', data);
    //     for(var i=0;i<data.length;i++)
    //     {   
    //        if( (sizes.length>0?findSizes(data[i]):true) && (vendors.length>0?findVendors(data[i]):true))
    //        {

    //           list.innerHTML+=`${data[i].productName}|${data[i].productScale} <br>`;
    //        }
    //     }
    //   }
    // });
  });
});

function pageclick(page) {
  console.log('pc ' + page.innerHTML);
  console.log(location.hostname);
  location.href = `/Productslist?page=${page.innerHTML}&sizes=${sizes}&vendors=${vendors}`;
}

function nextpage() {
  var current = parseInt(document.querySelector('.current-page').innerHTML) + 1;
  console.log('np ' + current);
  location.href = `/Productslist?page=${current}&sizes=${sizes}&vendors=${vendors}`;
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
  location.href = `/Productslist?page=1&sizes=${sizes}&vendors=${vendors}`;
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
  location.href = `/Productslist?page=1&sizes=${sizes}&vendors=${vendors}`;

}