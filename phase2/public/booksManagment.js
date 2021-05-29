window.onload = function(){
    getAllBooks(false);
    document.getElementById("filter").addEventListener('keyup',function(){
        setTimeout(function() {
            getAllBooks(true);
        }, 500);
    });
}


async function getAllBooks(flag){ //
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

        var books = '{"fav_books" : []}';
        const JSONobj = JSON.parse(books);
        for(let i=0;i<statusResponse.length;i++){
            if (flag){
                if(statusResponse[i].title_auth.includes(document.getElementById("filter").value)){
                    JSONobj["fav_books"].push(statusResponse[i]);
                } 
            }else{
                JSONobj["fav_books"].push(statusResponse[i]);
            }            
        }
        var source   = document.getElementById('text-template').innerHTML;
        var template = Handlebars.compile(source);
        var html = template(JSONobj);
        let li = document.getElementById('search_results') ;
        li.innerHTML = html;
        createListeners2DelButtons();
        createListeners2ProcButtons();
    }
}

function createListeners2DelButtons(){
    let elements = document.getElementsByClassName("delete");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click',function(){
            deleteBook(this.id);
        });
    }
}

async function deleteBook(bookid){

    console.log("ID "+bookid);
    let responseJSON = {
        method: 'DELETE',
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: parseInt(bookid)
        })
    };
    console.log(responseJSON.body);
    let response = await fetch('http://localhost:3000/api/FaveBooks/'+ bookid,responseJSON);
    if(response.ok){
        let statusResponse = await response.json();
        console.log(statusResponse);
        console.log("DELETED id:"+bookid);

        let div = document.getElementById(bookid+"div");
        setTimeout(function(){div.innerHTML = "";},500);
    }
}

function createListeners2ProcButtons(){
    let elements = document.getElementsByClassName("process");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click',function(){
            
            let linkid = this.id;
            var pos = linkid.search("a");        // linkid : 12345a
            let bookid = linkid.slice(0,pos);    // bookid : 12345
            localStorage.setItem("book",document.getElementById(bookid+'_').textContent)
            localStorage.setItem("id",bookid);
        });
    }
}

function addRating(id,rating){
    // document.getElementById(id+"rating").innerHTML = rating;
    console.log("ID " + id);
    console.log("RATING " + rating);
    let x =id+"r";
    console.log(document.getElementById("10860r"));
    //document.getElementsByClassName(id+"c")[0].innerHTML = rating;
}