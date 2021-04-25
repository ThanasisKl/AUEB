window.onload = function() {
   
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
    document.getElementById("pfooter").innerHTML = "Current Date: "+ dayname + " " + d.getDate() +" - " + month + " - " + d.getFullYear(); // website changes footer based on the day of the week
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
    document.getElementById("input").innerHTML = "<input type='submit' onclick='change2Yellow()' id='sumbit' name='submit' value='Light Theme'>";
}

function changeHTML2(){   //HTML Change
    document.getElementById("input").innerHTML = "<input type='submit' onclick='change2Blue()' id='sumbit' name='submit' value='Dark Theme'>";
}