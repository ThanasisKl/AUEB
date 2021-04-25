// Exercise 8
window.onload = function() {
    document.getElementById("submit").addEventListener("click", emailHandler);
    document.getElementById("submit").addEventListener("click", dateHandler);
    document.getElementById("submit").addEventListener("click", passwordHandler);    
}

function passwordHandler(){
    let password1 = document.getElementById("password1");
    let password2 = document.getElementById("password2");

    if(password1.value === password2.value){
        password2.setCustomValidity('');
    }else{
        password2.setCustomValidity('Οι κωδικοί πρέπει να ταιριάζουν μεταξύ τους');
    }
}

function dateHandler(){
    let userDate = document.getElementById("date");
    let currentDate = new Date();
    let array = userDate.value.split("-");

    let currentYear = currentDate.getFullYear();
    let userYear = parseInt(array[0]);
    if(currentYear - userYear > 110 || currentYear - userYear < 0){
        userDate.setCustomValidity('Παρακαλώ βάλτε έγκυρες τιμές');
    }else{
        let flag = true;
        if(currentYear - userYear > 18){
            flag = true;
        }else if(currentYear - userYear === 18){
            let userMonth = parseInt(array[1]);
            let currentMonth = currentDate.getMonth()+1;
            if(userMonth > currentMonth){
                flag = false;
            }else if(userMonth === currentMonth){
                let userDay = parseInt(array[2]);
                let currentDay = currentDate.getDate();
                if(userDay > currentDay){
                    flag = false;
                }else{
                    flag = true;
                }
            }else{
                flag = true;
            }
        }else{
            flag = false;
        }

        if(flag){
            userDate.setCustomValidity('');
        }else{
            userDate.setCustomValidity('Είσαι κάτω από 18 δεν μπορείς να δημιουργήσεις λογιαριασμό');
        }
    }
}

function emailHandler(){
    let email = document.getElementById("mail");
    if(email.value.trim() === "p3180079@aueb.gr"){
        email.setCustomValidity('Αυτό το email δεν είναι δικό σου');
    }else{
        email.setCustomValidity('');
    }
}