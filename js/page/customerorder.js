let list =document.querySelector('.list-pro-color')
$(document).ready(function() {
    const requestURL = '/data/customerorder';
    console.log('making ajax request to:', requestURL);
     $.ajax({
    // all URLs are relative to http://localhost:3000/
     url: requestURL,
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      success: (data) => {
        console.log('You received some data!', data);
        for(var i=0;i<data.length;i++)
                {      
                    list.innerHTML+=`${data[i].customerNumber},${data[i].orderNumber} <br>`
                }
                console.log(list);
      }
    });
});