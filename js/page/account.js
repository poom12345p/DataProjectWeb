let list03 = document.querySelector('.account-login');
let list04 = document.querySelector('.AccountInfo');

if (sessionStorage.getItem('USER')) {
    var username = JSON.parse(sessionStorage.getItem('USER'));
    }
    else
    {
      location.replace(location.origin + "/login")
    }
list03.innerHTML=`<a href="http://localhost:9000/employeeInfo?employeeNumber=${username.employeeNumber}">${username.firstName} ${username.lastName}</a>`;
console.log(username.firstName);

list04.innerHTML=`<a class="fa fa-user" href="http://localhost:9000/employeeInfo?employeeNumber=${username.employeeNumber}"> Account Info</a>`;
