$(document).ready(function () {
    $(document).on("click", ".savevalue", function(){      
          console.log("Am in");
      const requestURL1 = '/product/update/';				
      console.log('making ajax request to:', requestURL1);
      
      var memvalue = {									
          productCode :$('#pcode').val(), 
          productName :$('#pname').val(), 
          productCodes :$('#pcodes').val(),			
          productDescription : $('#pdes').val(), 
          productScale : $('#pscale').val(),
          productVendor : $('#pven').val(),
          productLine: $('#pline').val(),
          quantityInStock : $('#pstock').val(),
          buyPrice : $('#pprice').val(),
          MSRP : $('#pmsrp').val()
      };
      
      $.ajax({												
      // all URLs are relative to http://localhost:3000/
      url: requestURL1,										
      type: 'POST',											
      data: memvalue,											
      dataType: 'json', // this URL returns data in JSON format  
      });
      console.log(memvalue);
      location.reload(true);
    });
  $(document).on("click", ".deletevalue", function(){      
      console.log("Am in");
  const requestURL2 = '/product/delete/';
  console.log('making ajax request to:', requestURL2);
  
  var memvalue = {
      productCodes :$('#pcode').val()};
  $.ajax({
  url: requestURL2,
  type: 'DELETE',
  data: memvalue,
  dataType: 'json', // this URL returns data in JSON format
  });
  location.reload(true);
  console.log(memvalue);
  });
  $(document).on("click", ".cancle", function(){		
      location.reload(true);
  });
  
  });