window.onload = function(){
    let book = localStorage.getItem("book");
    let id = localStorage.getItem("id");
    localStorage.clear();

    let h2 = document.getElementById("book_id");
    h2.innerHTML = `<span>Processing:</span> ${book}`;

    changeTitleAuthor(id);
}

function changeTitleAuthor(id){
    
    document.getElementById("submit").addEventListener("click", async function(){
        let newTitleAuthor = document.getElementById("new").value;
        var responseJSON;
        if (newTitleAuthor.trim() === ""){
            newTitleAuthor=null;
        }
        responseJSON = {
            method: 'PUT',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: parseInt(id),
                title_auth: newTitleAuthor,
                comments:document.getElementById("com").value
            })
        };
        
        console.log(responseJSON.body);
        console.log("ID: "+id);
        let response = await fetch('http://localhost:3000/api/FaveBooks/'+ id,responseJSON);
        if(response.ok){
            let statusResponse = await response.json();
            console.log("UPDATED");
        }
        
    })
}
