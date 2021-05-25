//const { json } = require("express");

window.onload = function(){

    document.getElementById("button").addEventListener("click", function(){
        let keyword = document.getElementById("search").value;
        if(keyword.trim()!==""){
            let url ="https://reststop.randomhouse.com/resources/works?search="+keyword
            //let url = "https://reststop.randomhouse.com/resources/authors?lastName="+keyword
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
                    let work_ids = [];
                    try{
                        for(var i = 0; i < data.author.length; i++) {
                            if(data.author[i].works!==null){
                                if(Array.isArray(data.author[i].works.works)){
                                    for(var j = 0; j < data.author[i].works.works.length; j++){
                                        //console.log(" "+ data.author[i].works.works[j]);
                                        work_ids.push(data.author[i].works.works[j]);
                                    }
                                }else{
                                    //console.log(" "+ data.author[i].works.works);
                                    work_ids.push(data.author[i].works.works);
                                }
                                
                            }
                        }

                        //getAuthors(work_ids);
                        
                        //console.log(work_ids);
                        var search = '{"results_list" : []}';
                        //const obj = JSON.parse(search);
                        const obj = JSON.parse(search);
                        for(var x = 0; x < work_ids.length; x++) {
                            //console.log(work_ids[x]);
                            url = "https://reststop.randomhouse.com/resources/works/"+work_ids[x];
                            getFetch(url)
                            .then(data => data.json())
                            .then(data => {
                                // console.log("Title, Author: "+ data.titleAuth);
                                // search_list.push(data.titleAuth);
                                obj["results_list"].push({"search": data.titleAuth});
                                // search = JSON.stringify(obj);
                                //console.log(search);
                                //console.log(data);
                                // var source   = document.getElementById('text-template2').innerHTML;
                                // var template = Handlebars.compile(source);
                                //console.log(obj);
                                // var html = template(data.titleAuth);
                                // let li = document.getElementById('search_results') ;
                                // li.innerHTML = html;
                            })
                            
                            
                        }   

                        setTimeout(function() {
                            console.log("-------------->");
                            var source   = document.getElementById('text-template2').innerHTML;
                            var template = Handlebars.compile(source);
                            //console.log(obj);
                            var html = template(obj);
                            let li = document.getElementById('search_results') ;
                            li.innerHTML = html;
                        }, 3000);
                        

                        
                
                        // var source   = document.getElementById('text-template').innerHTML;
                        // var template = Handlebars.compile(source);
                        // console.log(obj);
                        // var html = template(obj);
                        // let li = document.getElementById('search_results') ;
                        // li.innerHTML = html;

                        
    
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