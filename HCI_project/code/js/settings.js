window.onload = function() {
    data_initialization();
    
    let zones = JSON.parse(localStorage.getItem('zones') || "[]");

    for(let i=0;i<zones.length;i++){
        document.getElementById("zones").innerHTML += `<option id="${i}" value="${i}">${zones[i].zone}</option>`;
    }

    document.getElementById("back-icon").addEventListener("click", () => {
        window.location.href = 'index.html'
    });

    document.getElementById("change_password").addEventListener("click", () => {
        window.location.href = 'change_password.html'
    });

    document.getElementById("activation_time").addEventListener("click", () => {
        document.getElementById("popup2").style.display = "flex";
    });

    document.getElementById("change_zone_name").addEventListener("click", () => {
        document.getElementById("popup4").style.display = "flex";
    });

    document.getElementById("info-icon").addEventListener("click", () => {
        if(document.getElementById("popup").style.display === "flex"){
            document.getElementById("popup").style.display = "none";
        }else{
            document.getElementById("popup").style.display = "flex";
        }
    });

    document.getElementById("x-icon").addEventListener("click", () => {
        document.getElementById("popup").style.display = "none";
    });

    document.getElementById("x-icon4").addEventListener("click", () => {
        document.getElementById("popup4").style.display = "none";
    });

    document.getElementById("x-icon5").addEventListener("click", () => {
        document.getElementById("popup5").style.display = "none";
    });

    document.getElementById("x-icon2").addEventListener("click", () => {
        document.getElementById("popup2").style.display = "none";
        window.location.href = 'settings.html'
    });

    document.getElementById("x-icon3").addEventListener("click", () => {
        document.getElementById("popup3").style.display = "none";
        window.location.href = 'settings.html'
    });

    document.getElementById("save_time").addEventListener("click", () => {
        localStorage.removeItem('alarm_time');
        localStorage.setItem('alarm_time', document.getElementById("time").value);
        document.getElementById("popup2").style.display = "none";
        document.getElementById("popup3").style.display = "flex";
        document.getElementById("successful_action").innerHTML = "Επιτυχής Ενημέρωση Καθυστέρησης Ενεργοποιήσης Συναγερμού";
    });

    document.getElementById("save_zone_name").addEventListener("click",() => {
       
        console.log(document.getElementById("zones").value);
        const new_zone_name = document.getElementById("new_zone_name").value;

        if(new_zone_name.trim() !== ""){
            zones[document.getElementById("zones").value].zone = document.getElementById("new_zone_name").value;
            console.log(zones[document.getElementById("zones").value]);
            localStorage.removeItem('zones');
            localStorage.setItem('zones',JSON.stringify(zones));
            document.getElementById("popup4").style.display = "none";
            document.getElementById("popup3").style.display = "flex";
            document.getElementById("successful_action").innerHTML = "Επιτυχής Ενημέρωση Ονόματος Ζώνης";
        }else{
            document.getElementById("popup5").style.display = "flex";
        }
    });
}

function data_initialization(){
    if (localStorage.getItem("zones") === null) {
        localStorage.setItem('zones', JSON.stringify([
            {
                zone: 'Ζώνη 1',
                status: 'not_secured'
            },
            {
                zone: 'Ζώνη 2',
                status: 'secured'
            },
            {
                zone: 'Ζώνη 3',
                status: 'secured'//not_secured
            },
            {
                zone: 'Ζώνη 4',
                status: 'secured'
            }])
        );
    }

    if (localStorage.getItem("password") === null) {
        localStorage.setItem('password','1234');
    }

    if (localStorage.getItem("alarm_time") === null) {
        localStorage.setItem('alarm_time','20');
    }

    if (localStorage.getItem("alarm") === null) {
        localStorage.setItem('alarm','inactive');
    }

    if (localStorage.getItem("problem") === null) {
        localStorage.setItem('problem',false);
    }
}