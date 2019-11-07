let list =document.querySelector('.list-pro-color');
$(document).ready(function() {
    // const requestURL = '/sreach/productlines';
    // console.log('making ajax request to:', requestURL);
    // // From: http://learn.jquery.com/ajax/jquery-ajax-methods/
    // // Using the core $.ajax() method since it's the most flexible.
    // // ($.get() and $.getJSON() are nicer convenience functions)
    // $.ajax({
    //   // all URLs are relative to http://localhost:3000/
    //   url: requestURL,
    //   type: 'GET',
    //   dataType : 'json', // this URL returns data in JSON format
    //   success: (data) => {
    //     console.log('You received some data!', data);
    //     for(var i=0;i<data.length;i++)
    //             {      
    //                 list.innerHTML+=`${data[i].productLine} <br>`
    //             }
    //             console.log(list);
    //   }
    // });
    $("#login-btn").click(function ( event ) {
        event.preventDefault();
        console.log("login");
        let data ={
            username:$("#username").val(),
            password:$("#password").val()
        }
        $.ajax({
            type: "POST",
            url: "/login",
            data: data,
            dataType: "json",
            success: (user)=>{
              console.log(user);
            //   if (localStorage.getItem('contacts') === null) {
            //     var contacts = [];
            //     contacts.push(myContact);
            //     localStorage.setItem('contacts', JSON.stringify(contacts));
            //   } else {
            //     var contacts = JSON.parse(localStorage.getItem('contacts'));
            //     contacts.push(myContact);
            //     localStorage.setItem('contacts', JSON.stringify(contacts));
            //   }
            sessionStorage.setItem('USER', JSON.stringify(user));
             location.replace(location.origin + `/productslist`)
            },
          

          });
    });

});