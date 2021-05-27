window.onload = function(){
    getAllBooks();
}


async function getAllBooks(){
    let responseJSON = {
        method: 'GET',
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json'
        }
    };

    let response = await fetch('http://localhost:3000/api/FaveBooks',responseJSON);
    if(response.ok){
        let statusResponse = await response.json();
        //console.log(statusResponse);

        var books = '{"fav_books" : []}';
        const JSONobj = JSON.parse(books);
        for(let i=0;i<statusResponse.length;i++){
            //console.log(statusResponse[i]);
            JSONobj["fav_books"].push(statusResponse[i]);
        }
        console.log(JSONobj);

        // const obj = JSON.parse(statusResponse);
        var source   = document.getElementById('text-template').innerHTML;
        var template = Handlebars.compile(source);
        var html = template(JSONobj);
        let li = document.getElementById('search_results') ;
        li.innerHTML = html;
    }
}