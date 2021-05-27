

window.onload = function(){

    document.getElementById("button").addEventListener("click", function(){
        let keyword = document.getElementById("search").value;
        if(keyword.trim()!==""){
            let url ="https://reststop.randomhouse.com/resources/works?search="+keyword
            console.log(url);
            getFetch(url)
            .then(data => data.json())
            .then(data => {
                console.log(`Results for Search ${keyword}:`);
                try{
                    console.log(data);
                    for(var i = 0; i < data.work.length; i++) {
                        var source   = document.getElementById('text-template').innerHTML;
                        var template = Handlebars.compile(source);
                        var html = template(data);
                        let li = document.getElementById('search_results') ;
                        li.innerHTML = html;
                    }
                    createListeners2Buttons();
                }catch(err){
                    console.log("No results for this Search");
                    document.getElementById("search_results").innerHTML = "<h2>No Results</h2>"
                }
            })
        }else{
            keyword = document.getElementById("search2").value;
            if(keyword.trim()!==""){
                let url = "https://reststop.randomhouse.com/resources/authors?lastName="+keyword;
                console.log(url);
                getFetch(url)
                .then(data => data.json())
                .then(data => {
                    console.log(`Results for Search ${keyword}:`);
                    let work_ids;
                    try{
                        work_ids = findWorkIds(data);
                        var search = '{"results_list" : []}';
                        const obj = JSON.parse(search);
                        for(var x = 0; x < work_ids.length; x++) {
                            url = "https://reststop.randomhouse.com/resources/works/"+work_ids[x];
                            getFetch(url)
                            .then(data => data.json())
                            .then(data => {
                                console.log(data.workid);
                                obj["results_list"].push({"search": data.titleAuth,"id":data.workid});
                            })
                            
                            
                        }   

                        setTimeout(function() {
                            console.log("-------------->");
                            var source   = document.getElementById('text-template2').innerHTML;
                            var template = Handlebars.compile(source);
                            console.log(obj);
                            var html = template(obj);
                            let li = document.getElementById('search_results') ;
                            li.innerHTML = html;
                            createListeners2Buttons();
                        }, 3000);
                    }catch(err){
                        console.log("No results for this Search")
                        document.getElementById("search_results").innerHTML = "<h2>No Results</h2>"
                    }
                })
            }else{
                console.log("Empty Fields");
            }
        }
        });

        // var x=document.getElementsByClassName("save")
        // console.log(x);
        // //.addEventListener("click", function(){console.log("SAVE");});
}

async function getFetch(url){
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    return response;
}

function findWorkIds(data){
    work_ids = [];
    for(var i = 0; i < data.author.length; i++) {
        if(data.author[i].works!==null){
            if(Array.isArray(data.author[i].works.works)){
                for(var j = 0; j < data.author[i].works.works.length; j++){
                    work_ids.push(data.author[i].works.works[j]);
                }
            }else{
                work_ids.push(data.author[i].works.works);
            }
            
        }
    }
    return work_ids;
}

function createListeners2Buttons(){
    let elements = document.getElementsByClassName("save");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click',function(){
            console.log("SAVED id: " + this.id)
            let x = document.getElementById(this.id+'_');
            console.log(x.textContent)
            saveBook(this.id,x.textContent);
        });
    }
}

async function saveBook(bookid,titleAuth){
let responseJSON = {
    method: 'POST',
    mode: 'cors', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: parseInt(bookid),
      title_auth :titleAuth
    })
  };
  console.log(responseJSON.body);
  let response = await fetch('http://localhost:3000/api/FaveBooks',responseJSON);
  if(response.ok){
      let statusResponse = await response.json();
      console.log(statusResponse);
  }
}