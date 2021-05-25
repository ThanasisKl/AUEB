
window.onload = function(){
    list = [];
    list.push({"search1":2});
    var template = document.getElementById('search_list_template').innerHTML;                  
    var render = Handlebars.compile(template);
    document.getElementById('search_list').innerHTML = render({
        search: list,
    });
}