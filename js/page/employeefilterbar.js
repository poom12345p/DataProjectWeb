let list = document.querySelector('.widget-content');
let user;;

$(document).ready(function () {

  if (sessionStorage.getItem('USER')) {
  user = sessionStorage.getItem('USER');
  }
  else
  {
    location.replace(location.origin + `/login`)
  }
  console.log(list1);
  const requestURL1 = '/search/employees/allTitle';
  
  console.log('making ajax request to:', requestURL1);
  // From: http://learn.jquery.com/ajax/jquery-ajax-methods/
  // Using the core $.ajax() method since it's the most flexible.
  // ($.get() and $.getJSON() are nicer convenience functions)
  $.ajax({
    // all URLs are relative to http://localhost:3000/
    url: requestURL1,
    type: 'GET',
    dataType: 'json', // this URL returns data in JSON format
    success: (data) => {
      console.log('You received some data!', data);
      for (var i = 0; i < data.length; i++) {
        let status = false;
        titles.forEach(title => {
          if (data[i].jobTitle== title) status = true;
        });
        if (status == true) {
          var checkbox = "<input type='checkbox'name ='scale' value='" + data[i].jobTitle + "'onclick ='titleclick(this)' autocomplete='off' checked='true' />"

          document.querySelector('.widget-content').innerHTML += checkbox +`   `+ data[i].jobTitle + "<br/>"
        } else {
          var checkbox = "<input type='checkbox'name ='scale' value='" + data[i].jobTitle + "'onclick ='titleclick(this)' autocomplete='off' />"

          document.querySelector('.widget-content').innerHTML += checkbox +`   `+data[i].jobTitle + "<br/>"
        }
      }

      console.log(list1);
    }
  });
  
});

