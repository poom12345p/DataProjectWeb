$(document).ready(function () {
    $(document).on("click", ".updatevalue", function(){      
          console.log("Am in");
      const requestURL1 = '/employee/insert/';				
      console.log('making ajax request to:', requestURL1);
      
      var memvalue = {									
        employeeNumber :$('#enumbers').val(), 			//ดึงข้อมูลในช่องอินพุท ของ id = enumber มาใส่ในตัวแปร employeeNumber
		firstName : $('#efname').val(), 
        lastName : $('#elname').val(),
        reportsTo : $('#report').val(),
        OfficeCode : $('#ofc').val(),
		jobTitle : $('#etitle').val(),
        email : $('#eemail').val(),
        password : $('#pass').val(),
		extension : $('#eexten').val(),
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
  $(document).on("click", ".cancle", function(){		
      location.reload(true);
  });
  
  });