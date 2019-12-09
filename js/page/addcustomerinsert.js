$(document).ready(function () {
    $(document).on("click", ".updatevalue", function(){      
          console.log("Am in");
      const requestURL1 = '/customer/insert/';				
      console.log('making ajax request to:', requestURL1);
      
      var memvalue = {									
          customerNumber :$('#cnumber').val(), 			
          contactFirstName : $('#cfname').val(), 
          contactLastName : $('#clname').val(),
          customerName : $('#cname').val(),
          addressLine1 : $('#caddr1').val(),
          addressLine2 : $('#caddr2').val(),
          salesRepEmployeeNumber : $('#sen').val(),
          city : $('#city').val(),
          state : $('#state').val(),
          phone : $('#phone').val(),
          postalCode : $('#postal').val(),
          country : $('#country').val(),
          customerNumbers :$('#cnumbers').val(),
          creditLimit : $('#ccredit').val()
      };
      console.log($('#cnumber').val().toString());
      $.ajax({												
      // all URLs are relative to http://localhost:3000/
      url: requestURL1,										
      type: 'POST',											
      data: memvalue,											
      dataType: 'json', // this URL returns data in JSON format  
      });
      console.log(memvalue);
      memvalue.customerNumber
      linkpage = $('#cnumbers').val();
      window.location.href = "/customerInfo="+linkpage;
    });
  $(document).on("click", ".cancle", function(){		
      location.reload(true);
  });
  
  });