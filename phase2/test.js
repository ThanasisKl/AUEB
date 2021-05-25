window.onload = function(){
  function say_hi() {
      // var fname = document.getElementById('first_name').value;
      // var lname = document.getElementById('last_name').value;
  
      // var source   = document.getElementById('text-template').innerHTML;
      // var template = Handlebars.compile(source);
      // var context = {first_name: fname, last_name: lname};
      // var html    = template(context);
  
      // document.getElementById('result').innerHTML = html;
      data = [];
      data.push({"search1":2});
      data.push({"search1":4});
      var text = '{ "employees" : [' +
                  '{ "firstName":"John"},' +
                  '{ "firstName":"Anna"},' +
                  '{ "firstName":"Peter"} ]}';
      const obj = JSON.parse(text);
      obj["employees"].push({firstName: "Thanasis"});

      var source   = document.getElementById('text-template').innerHTML;
      var template = Handlebars.compile(source);
      console.log(text);
      var html    = template(obj);
      let x = document.getElementById('result') ;
      x.innerHTML = html;
  }
  
  document.getElementById('say').addEventListener('click', say_hi);
}
