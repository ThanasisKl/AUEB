window.onload = function() {
    data_initialization();
    let zones = JSON.parse(localStorage.getItem('zones') || "[]");
    let alarm = localStorage.getItem('alarm');
    let problem = localStorage.getItem('problem');
    let flag = true;
    let correct_password = localStorage.getItem("password")
    let password_given = []
    for (let i=0;i<zones.length;i++){
        if(zones[i].status === "not_secured"){
            flag = false;
            break;
        }
    }

    document.getElementById("password_panel").innerHTML = ''

    document.getElementById("x-icon2").addEventListener("click", () => {
        document.getElementById("popup2").style.display = "none";
    });

    if(!flag){
        document.getElementById("house-div").innerHTML = '<i class="fa-solid fa-house-circle-xmark row_icon red"></i>';
    }else{
        document.getElementById("house-div").innerHTML = '<i class="fa-solid fa-house-circle-check row_icon green" id="house"></i>';
    }

    document.getElementById("back-icon").addEventListener("click", () => {
        window.location.href = 'index.html'
    });

    if(alarm === 'active'){
        document.getElementById("lock-div").innerHTML = '<i class="fa-solid fa-lock row_icon green" id="lock"></i>';
    }else{
        document.getElementById("lock-div").innerHTML = '<i class="fa-solid fa-lock-open row_icon red" id="lock"></i>';
    }

    if(problem == "true"){
        document.getElementById("danger-div").innerHTML = ' <i class="fa-solid fa-plug-circle-exclamation row_icon red" id="danger"></i>';
    }else{
        document.getElementById("danger-div").innerHTML = ' <i class="fa-solid fa-plug-circle-check row_icon green" id="danger"></i>';
    }

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

    document.getElementById("remove_button").addEventListener("click", () =>{
        let password = document.getElementById("password_panel").textContent
        if (password.length >0){
            password_given.pop()
            if (password.length == 1){
                document.getElementById("password_panel").innerHTML = ''
            } else if (password.length == 2){
                document.getElementById("password_panel").innerHTML = '*'
            }else if (password.length == 3){
                document.getElementById("password_panel").innerHTML = '**'
            }else if (password.length == 4){
                document.getElementById("password_panel").innerHTML = '***'
            }
        }
    })

    const number_buttons = document.querySelectorAll(".number")

    number_buttons.forEach(button =>{
        button.addEventListener("click", () =>{
            let password = document.getElementById("password_panel").textContent
            if(password=="ΕΞΟΠΛΙΣΤΗΚΕ" || password=="ΑΦΟΠΛΙΣΤΗΚΕ"){
                password_given = []
                password_given.push(button.value)
                console.log(password_given)
                document.getElementById("password_panel").style.fontSize = "5em";
                document.getElementById("password_panel").innerHTML = "*"
            }
            if  (password.length <=3){
                password_given.push(button.value)
                document.getElementById("password_panel").innerHTML += '*'
            }
        })
    })


    document.getElementById("secure_button").addEventListener("click", () =>{

        if(alarm =='inactive'){
            if (flag){
                if (password_given.length == 4){
                    let password_given_string = password_given[0] + password_given[1] + password_given[2] + password_given[3] 
                    if (password_given_string === correct_password){
                        alarm = 'active'
                        localStorage.setItem('alarm','active')
                        document.getElementById("lock-div").innerHTML = '<i class="fa-solid fa-lock row_icon green" id="lock"></i>';
                        document.getElementById("password_panel").style.fontSize = "2.3em";
                        document.getElementById("password_panel").innerHTML = "ΕΞΟΠΛΙΣΤΗΚΕ"
                        password_given = []
                    }else{
                        document.getElementById("popup2").style.display = "flex";
                        document.getElementById("info-text2").innerHTML = "Λάθος κωδικός συναγερμού παρακαλώ προσπαθήστε ξανά";
                        password_given = []
                        document.getElementById("password_panel").innerHTML = ''
                    }
                }
            }else{
                document.getElementById("popup2").style.display = "flex";
                document.getElementById("info-text2").innerHTML = "Οι ζώνες του συναγερμού δεν είναι ασφαλησμένες ώστε να ενεργοποιηθεί ο συναγερμός. Παρακαλώ ασφαλίστε όλες τις ζώνες και μετά προσπαθήστε να ενεργοποιήσετε τον συναγερμό";
            }
        } else {
            if (password_given.length == 4){
                let password_given_string = password_given[0] + password_given[1] + password_given[2] + password_given[3] 
                if (password_given_string === correct_password){
                    alarm = 'inactive'
                    localStorage.setItem('alarm','inactive')
                    document.getElementById("lock-div").innerHTML = '<i class="fa-solid fa-lock-open row_icon red" id="lock"></i>';
                    document.getElementById("password_panel").style.fontSize = "2.3em";
                    document.getElementById("password_panel").innerHTML = "ΑΦΟΠΛΙΣΤΗΚΕ";
                    password_given = []

                }else{
                    document.getElementById("popup2").style.display = "flex";
                    document.getElementById("info-text2").innerHTML = "Λάθος κωδικός συναγερμού παρακαλώ προσπαθήστε ξανά";
                    password_given = []
                    document.getElementById("password_panel").innerHTML = ''
                }
            }
        }
    })


    document.getElementById("arm_empty_house_button").addEventListener("click", () =>{
        if (alarm == 'inactive'){
            if(flag){
                alarm = 'active'
                localStorage.setItem('alarm','active')
                document.getElementById("lock-div").innerHTML = '<i class="fa-solid fa-lock row_icon green" id="lock"></i>';
                document.getElementById("password_panel").style.fontSize = "2.3em";
                document.getElementById("password_panel").innerHTML = "ΕΞΟΠΛΙΣΤΗΚΕ";
            }else{
                document.getElementById("popup2").style.display = "flex";
                document.getElementById("info-text2").innerHTML = "Οι ζώνες του συναγερμού δεν είναι ασφαλησμένες ώστε να ενεργοποιηθεί οσυναγερμός. Παρακαλώ ασφαλίστε όλες τις ζώνες και μετά προσπαθήστε να ενεργοποιήσετε τον συναγερμό";
            }
        }
    })

    document.getElementById("arm_full_house_button").addEventListener("click", () =>{
        if (alarm == 'inactive'){
            if(flag){
                alarm = 'active'
                localStorage.setItem('alarm','active')
                document.getElementById("lock-div").innerHTML = '<i class="fa-solid fa-lock row_icon green" id="lock"></i>';
                document.getElementById("password_panel").style.fontSize = "2.3em";
                document.getElementById("password_panel").innerHTML = "ΕΞΟΠΛΙΣΤΗΚΕ";
            }else{
                document.getElementById("popup2").style.display = "flex";
                document.getElementById("info-text2").innerHTML = "Οι ζώνες του συναγερμού δεν είναι ασφαλησμένες ώστε να ενεργοποιηθεί οσυναγερμός. Παρακαλώ ασφαλίστε όλες τις ζώνες και μετά προσπαθήστε να ενεργοποιήσετε τον συναγερμό";
            }
        }
    })
    

    document.getElementById("fire_alarm_button").addEventListener("click", () =>{
        document.getElementById("popup2").style.display = "flex";
        document.getElementById("info-text2").innerHTML = "Η Πυροσβεστική ενημερώθηκε και είναι καθοδόν!";
    })

    document.getElementById("police_alarm_button").addEventListener("click", () =>{
        document.getElementById("popup2").style.display = "flex";
        document.getElementById("info-text2").innerHTML = "Η Αστυνομία ενημερώθηκε και είναι καθοδόν!";
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