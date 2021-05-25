window.onload = function() {
    let paragraphs = document.querySelectorAll("p"); //DOM query 1
    console.log(`Total p tags in this page: ${paragraphs.length}`);

    console.log("All h3 tags in this page: ");
    let h3s =document.querySelectorAll("h3");  //DOM query 2
    for (let h3 of h3s){
        console.log(h3);
    }

    const d = new Date();     // Date obeject use
    let dayname = "";
    if(d.getDay() === 0){
        dayname = "Sunday";
    }else if (d.getDay() === 1){
        dayname = "Monday";
    }else if (d.getDay() === 2){
        dayname = "Tuesday";
    }else if (d.getDay() === 3){ 
        dayname = "Wednesday";
    }else if (d.getDay() === 4){  
        dayname = "Thursday";
    }else if (d.getDay() === 5){  
        dayname = "Friday";
    }else{
        dayname = "Saturday";
    }

    let month = d.getMonth()+1;
    document.getElementById("pfooter").innerHTML = "Current Date: "+ dayname + " " + d.getDate() +" - " + month + " - " + d.getFullYear(); //footer changes every day 
}


function change2Blue(){    //CSS Change
    let e = document.querySelector("header");
    e.style.backgroundColor = "#2b307e";
    document.getElementById("h1").style.color = "#ffff00";
    changeHTML1();
}

function change2Yellow(){    //CSS Change
    let e = document.querySelector("header");
    e.style.backgroundColor = "#ffff00";
    document.getElementById("h1").style.color = "#3776ab";
    changeHTML2();
}

function changeHTML1(){    //HTML Change
    document.getElementById("input").innerHTML = "<input type='submit' onclick='change2Yellow()' id='sumbit' name='submit' value='Make it Yellow'>";
}

function changeHTML2(){   //HTML Change
    document.getElementById("input").innerHTML = "<input type='submit' onclick='change2Blue()' id='sumbit' name='submit' value='Make it Blue'>";
}

