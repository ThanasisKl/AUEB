window.onload = function() {
    data_initialization();
    
    document.getElementById("back-icon").addEventListener("click", () => {
        window.location.href = 'settings.html'
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

    document.getElementById("x-icon2").addEventListener("click", () => {
        document.getElementById("popup2").style.display = "none";
    });
    
    document.getElementById("x-icon3").addEventListener("click", () => {
        document.getElementById("popup3").style.display = "none";
    })

    document.getElementById("save_password").addEventListener("click", () => {
        let old_password = localStorage.getItem("password");
        let user_old_password =  document.getElementById("old_password").value;
        let new_password =  document.getElementById("new_password").value;
        let new_password2 =  document.getElementById("new_password2").value;

        console.log(old_password,user_old_password,new_password,new_password2);

        if(old_password === user_old_password && new_password === new_password2 && new_password.length === 4  && !isNaN(new_password)){
            localStorage.removeItem('password');
            localStorage.setItem('password',new_password);
            document.getElementById("popup3").style.display = "flex";
        }else{
            document.getElementById("popup2").style.display = "flex";
            if(new_password !== new_password2){
                document.getElementById("info-text2").innerHTML = "Οι καινούργιοι κωδικοί που δώσατε δεν ταιριάζουν μεταξύ τους";
            }else if(old_password !== user_old_password){
                document.getElementById("info-text2").innerHTML = "Λάθος κωδικός πρόσβασης";
            }else{
                document.getElementById("info-text2").innerHTML = "Ο κωδικός πρόσβασης μπορεί να είναι 4 ψηφία τα οποία να είναι αριθμοί";
            }
        }
        document.getElementById("old_password").value = null;
        document.getElementById("new_password").value = null;
        document.getElementById("new_password2").value = null;
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