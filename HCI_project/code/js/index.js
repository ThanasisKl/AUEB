window.onload = function() {
    data_initialization();
    
    document.getElementById("zones").addEventListener("click", () => {
        window.location.href = 'zones.html'
    });

    document.getElementById("alarm").addEventListener("click", () => {
        window.location.href = 'alarm.html'
    });

    document.getElementById("settings").addEventListener("click", () => {
        document.getElementById("popup2").style.display = "flex";
    });

    document.getElementById("password4settings").addEventListener("keyup",() => {
        if(document.getElementById("password4settings").value === localStorage.getItem("password")){
            window.location.href = 'settings.html'
        }
    })

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

    document.getElementById("x-icon2").addEventListener("click", () => {
        document.getElementById("popup2").style.display = "none";
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