//const { json } = require("express");

window.onload = function(){

    document.getElementById("button").addEventListener("click", function(){
        let keyword = document.getElementById("search").value;
        search_list = [];
        if(keyword.trim()!==""){
            let url ="https://reststop.randomhouse.com/resources/works?search="+keyword
            //let url = "https://reststop.randomhouse.com/resources/authors?lastName="+keyword
            console.log(url);
            getFetch(url)
            .then(data => data.json())
            .then(data => {
                console.log(`Results for Search ${keyword}:`);
                try{
                    for(var i = 0; i < data.work.length; i++) {
                        console.log("Title, Author: "+ data.work[i].titleAuth);
                    }
                }catch(err){
                    console.log("No results for this Search")
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
                        //console.log(work_ids);
                        list=[];
                        for(var x = 0; x < work_ids.length; x++) {
                            //console.log(work_ids[x]);
                            url = "https://reststop.randomhouse.com/resources/works/"+work_ids[x];
                            getFetch(url)
                            .then(data => data.json())
                            .then(data => {
                                console.log("Title, Author: "+ data.titleAuth);
                                search_list.push(data.titleAuth);
                                list.push({"search":data.titleAuth});
                            })
                            
                            
                        }
                        console.log("->");
                        console.log(list);

                        list = [];
                        list.push({"search1":2});
                        var template = document.getElementById('search_list_template').innerHTML;
                        var render = Handlebars.compile(template);
                        document.getElementById('search_list').innerHTML = render({
                        search: list,
                        });
                    }catch(err){
                        console.log("No results for this Search")
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
