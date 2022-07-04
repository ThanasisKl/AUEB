window.onload = function() {
    data_initialization();
    let zones = JSON.parse(localStorage.getItem('zones') || "[]");
    
    document.getElementById("back-icon").addEventListener("click", () => {
        window.location.href = 'index.html'
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

    let flag = true;
    for (let i=0;i<zones.length;i++){
        console.log(zones[i].status)
        if(zones[i].status === "not_secured"){
            flag = false;
            break;
        }
    }

    if(!flag){
        document.getElementById("status").innerHTML = `Ο χώρος σας δεν είναι ασφαλισμένος`;
        document.getElementById("status").style.color = "red";
    }else{
        document.getElementById("status").innerHTML = "Ο χώρος σας είναι ασφαλισμένος";
        document.getElementById("status").style.color = "green";
    }

    for (let i=0;i<zones.length;i++){
        let color = "red";
        if(zones[i].status === "secured") color = "green";
        if (i===0){
            document.getElementById("zones").innerHTML += `<p class='zones'><i id="change_bullet" class="fa-solid fa-circle ${color}"></i> ${zones[i].zone}</p>`
        }else{
            document.getElementById("zones").innerHTML += `<p class='zones'><i class="fa-solid fa-circle ${color}"></i> ${zones[i].zone}</p>` ;
        }
    }


    document.getElementById("change_bullet").addEventListener("click", () =>{
        let new_zones = zones;
        localStorage.removeItem("zones");

        if(new_zones[0].status === "not_secured"){
            new_zones[0] = {
                zone:new_zones[0].zone,
                status:"secured"
            };
        }else{
            new_zones[0] = {
                zone:new_zones[0].zone,
                status:"not_secured"
            };
        }
        console.log(new_zones)
        localStorage.setItem("zones", JSON.stringify(new_zones));
        window.location.href = 'zones.html';
    })
   

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