window.onload = function(){
    let bookid = localStorage.getItem("bookid");
    localStorage.clear();
    let h2 = document.getElementById("book_id");
    h2.innerHTML = `Book ${bookid} Processing`;

    changeTitleAuthor(bookid);
}

function changeTitleAuthor(id){
    
    document.getElementById("submit").addEventListener("click", async function(){
        let responseJSON = {
            method: 'PUT',
            mode: 'cors', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            id: parseInt(id),
            title_auth: document.getElementById("new").value
            })
        };
        console.log(responseJSON.body);
        console.log("ID: "+id);
        let response = await fetch('http://localhost:3000/api/FaveBooks/'+ id,responseJSON);
        if(response.ok){
            let statusResponse = await response.json();
            console.log(statusResponse);
            console.log("UPDATED id:"+id);
        }
        localStorage.setItem("rating",document.getElementById("com").value)
        localStorage.setItem("id",id)
    })
}