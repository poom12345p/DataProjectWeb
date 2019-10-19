var urlParams = new URLSearchParams(location.search);
let list1 =document.querySelector('.list-pro-color')
let vendors=[];
let sizes=['1:10','1:12'];
$(document).ready(function() {

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
      dataType : 'json', // this URL returns data in JSON format
      success: (data) => {
       console.log(vendors.length);
       // console.log('You received some data!', data);
        for(var i=0;i<data.length;i++)
        {   
           if( (sizes.length>0?findSizes(data[i]):true) && (vendors.length>0?findVendors(data[i]):true))
           {
             //ex. http://localhost:9000/productslist?page=1
           // var page =urlParams.get('page');
              //list1.innerHTML+=`${data[i].productName}|${data[i].productScale} <br>`;
              list1.innerHTML+=`<div class="item-product-list">
              <div class="row">
              <div class="col-md-3 col-sm-4 col-xs-12">
                <div class="item-pro-color">
                  <div class="product-thumb">
                    <a href="http://demo.7uptheme.com/html/kuteshop/detail.html"
                      class="product-thumb-link">
                      <img data-color="black" class="active"
                        src="./image/2(1).jpg"
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
                  <div class="list-color">
                    <a href="http://demo.7uptheme.com/html/kuteshop/list-boxed-banner.html?fbclid=IwAR3bGgzDp0aoxFFwGK01YrX-6IVDNNt_V0Ion1EgNuFPIHEl1LARLv8wsvI#"
                      data-color="black" style="background:#404040"></a>
                    <a href="http://demo.7uptheme.com/html/kuteshop/list-boxed-banner.html?fbclid=IwAR3bGgzDp0aoxFFwGK01YrX-6IVDNNt_V0Ion1EgNuFPIHEl1LARLv8wsvI#"
                      data-color="purple" style="background:#ff8ff8"></a>
                    <a href="http://demo.7uptheme.com/html/kuteshop/list-boxed-banner.html?fbclid=IwAR3bGgzDp0aoxFFwGK01YrX-6IVDNNt_V0Ion1EgNuFPIHEl1LARLv8wsvI#"
                      data-color="blue" style="background:#868fff"></a>
                    <a href="http://demo.7uptheme.com/html/kuteshop/list-boxed-banner.html?fbclid=IwAR3bGgzDp0aoxFFwGK01YrX-6IVDNNt_V0Ion1EgNuFPIHEl1LARLv8wsvI#"
                      data-color="cyan" style="background:#80e6ff"></a>
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
            </div>`;
           }
           if(i==data.length-1){
            list1.innerHTML+= `<div class="pagi-bar bottom">
            <a class="current-page"
              href="http://demo.7uptheme.com/html/kuteshop/list-boxed-banner.html?fbclid=IwAR3bGgzDp0aoxFFwGK01YrX-6IVDNNt_V0Ion1EgNuFPIHEl1LARLv8wsvI#">1</a>
            <a
              href="http://demo.7uptheme.com/html/kuteshop/list-boxed-banner.html?fbclid=IwAR3bGgzDp0aoxFFwGK01YrX-6IVDNNt_V0Ion1EgNuFPIHEl1LARLv8wsvI#">2</a>
            <a class="next-page"
              href="http://demo.7uptheme.com/html/kuteshop/list-boxed-banner.html?fbclid=IwAR3bGgzDp0aoxFFwGK01YrX-6IVDNNt_V0Ion1EgNuFPIHEl1LARLv8wsvI#"><i
                aria-hidden="true" class="fa fa-caret-right"></i></a>
          </div>`
          }
        }
      }
    });

    $("#submit").click(function(){
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

function findSizes(data){
  let find=false;
  sizes.forEach(size => {
    if(data.productScale==size)
    {
      console.log(`${data.productScale}|${size}`);
      find=true;
  
    }
    
  });
  return find;
}

function findVendors(data){
  let find=false;
  vendors.forEach(vendor => {
    if(data.productVendor==vendor)
    {
        find=true;
        
    }
  });
  return find;
}

