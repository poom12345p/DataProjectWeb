$(document).ready(function () {
  $(document).on("click", ".updatevalue", function(){      //ถ้า คลาส updatevalue มีการคลิ๊ก ก็จะทำข้างล่าง ในฟังชันของมัน
        console.log("Am in");
	const requestURL1 = '/employee/update/';				//ลิ้งข้อมูลกับส่วนของ route
	console.log('making ajax request to:', requestURL1);
	
	var memvalue = {									//สร้างตัวแปลมาเก็บข้อมูลแบบ json
		employeeNumber :$('#enumber').val(), 			//ดึงข้อมูลในช่องอินพุท ของ id = enumber มาใส่ในตัวแปร employeeNumber
		firstName : $('#efname').val(), 
		lastName : $('#elname').val(),
		reportsTo : $('#report').val(),
        officeCode : $('#ofc').val(),
		jobTitle : $('#etitle').val(),
		email : $('#eemail').val(),
		employeeNumbers :$('#enumbers').val(),
		extension : $('#eexten').val(),
	};
	console.log($('#enumber').val().toString());
	$.ajax({												//สร้าง ajax เพื่อส่งข้อมูลไป ยัง route
	// all URLs are relative to http://localhost:3000/
	url: requestURL1,										//ใส่ที่ลิ้งกับ route
	type: 'POST',											// post คือ อัพเดจ delete คือ ลบ
	data: memvalue,											// เอาข้อมูลมาใส่จากตัวแปลที่สร้างเมื่อกี้
	dataType: 'json', // this URL returns data in JSON format  //ชนิดข้อมูล json
	});
    console.log(memvalue);
    location.reload(true);
  });
$(document).on("click", ".deletevalue", function(){      // ถ้า คลาส ที่ ปุ่ม delete อยู่ ถูกคลิ๊กก็ทำตามข้างล่างในฟังชัน
    console.log("Am in");
const requestURL2 = '/employee/delete/';
console.log('making ajax request to:', requestURL2);

var memvalue = {
    employeeNumber :$('#enumber').val()};
$.ajax({
url: requestURL2,
type: 'DELETE',
data: memvalue,
dataType: 'json', // this URL returns data in JSON format
});
location.reload(true);
console.log(memvalue);
});
$(document).on("click", ".cancle", function(){		// ถ้า คลาส ที่ ปุ่ม cancle อยู่ ถูกคลิ๊กก็จะรีเฟรชหน้า 
    location.reload(true);
});

});