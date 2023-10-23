$valid = true;
$validselect = false;

window.addEventListener("load", function() {
    const form = document.querySelector("form");
    form.addEventListener("input", function validate(event) {
        $valid = true;
        let nameInput = document.querySelector("#name");
        if (new RegExp("^([^0-9]+)$").test(nameInput.value)) {  //no digits, no empty
            //change validity flag on regular expression mismatch for name field
        }else {
            $valid = false;
        }
        let surnameInput = document.querySelector("#surname");
        if (new RegExp("^([^0-9]+)$").test(surnameInput.value)) {   //no digits, no empty
            //change validity flag on regular expression mismatch for surname field
        }else {
            $valid = false;
        }
        let mailInput = document.querySelector("#email");
        if (new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$").test(mailInput.value)) {    //any symbol or dot one+ times @ any symbol or dot one+ more times and from 2 to 4 symbols in the end
            //change validity flag on regular expression mismatch for email field
        }else {
            $valid = false;
        }
        let adrInput = document.querySelector("#location");
        if (new RegExp(".+").test(adrInput.value)) {        //one+ character
            //change validity flag on regular expression mismatch for address field
        }else {
            $valid = false;
        }
        let zipInput = document.querySelector("#zip");
        if (new RegExp("^[a-zA-Z0-9]{6}$").test(zipInput.value)) {  //6 symbols only
            //change validity flag on regular expression mismatch for zip field
        }else {
            $valid = false;
        }
    });
    //
    //individual appearance validators by adding needed style classes and also enabling or hiding error message
    //
    document.querySelector('#name').addEventListener('input',function(){
        let nameInput = document.querySelector("#name");
        let if1 = document.querySelector("#if1");
        if (new RegExp("^([^0-9]+)$").test(nameInput.value)) {
            nameInput.classList.remove('invalid');
            nameInput.classList.add('valid');
            if1.classList.add("d-none");
        }else {
            nameInput.classList.remove('valid');
            nameInput.classList.add('invalid');
            if1.classList.remove('d-none');
        }
    })
    document.querySelector('#surname').addEventListener('input',function(){
        let surnameInput = document.querySelector("#surname");
        let if2 = document.querySelector("#if2");
        if (new RegExp("^([^0-9]+)$").test(surnameInput.value)) {
            surnameInput.classList.remove('invalid');
            surnameInput.classList.add('valid');
            if2.classList.add("d-none");
        }else {
            surnameInput.classList.remove('valid');
            surnameInput.classList.add('invalid');
            if2.classList.remove('d-none');
        }
    })
    document.querySelector('#email').addEventListener('input',function(){
        let mailInput = document.querySelector("#email");
        let if3 = document.querySelector("#if3");
        if (new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$").test(mailInput.value)) {
            mailInput.classList.remove('invalid');
            mailInput.classList.add('valid');
            if3.classList.add("d-none");
        }else {
            mailInput.classList.remove('valid');
            mailInput.classList.add('invalid');
            if3.classList.remove('d-none');
        }
    })
    document.querySelector('#location').addEventListener('input',function(){
        let adrInput = document.querySelector("#location");
        let if5 = document.querySelector("#if5");
        if (new RegExp(".+").test(adrInput.value)) {
            adrInput.classList.remove('invalid');
            adrInput.classList.add('valid');
            if5.classList.add("d-none");
        }else {
            adrInput.classList.remove('valid');
            adrInput.classList.add('invalid');
            if5.classList.remove('d-none');
        }
    })
    document.querySelector('#zip').addEventListener('input',function (){
        let zipInput = document.querySelector("#zip");
        let if6 = document.querySelector("#if6");
        if (new RegExp("^[a-zA-Z0-9]{6}$").test(zipInput.value)) {
            zipInput.classList.remove('invalid');
            zipInput.classList.add('valid');
            if6.classList.add("d-none");
        }else {
            zipInput.classList.remove('valid');
            zipInput.classList.add('invalid');
            if6.classList.remove('d-none');
        }
    })
    //
    //separate validator for a select element
    //it was added because it uses another event type
    //it must not be default option
    //
    document.querySelector('.form-select').addEventListener('change',function (){
        let selectInput = document.querySelector(".form-select");
        let if4 = document.querySelector("#if4");
        if (selectInput.value!=="default") {
            $validselect = true;
            selectInput.classList.remove('invalid');
            selectInput.classList.add('valid');
            if4.classList.add("d-none");
        }else {
            $validselect = false;
            selectInput.classList.remove('valid');
            selectInput.classList.add('invalid');
            if4.classList.remove('d-none');
        }
    })
    //
    //validation on submit
    //it checks everything again and restrict submitting if something is wrong
    //it return a notification on success (may not work for some reason)
    //
    form.addEventListener('submit',function (e){
        if (!$valid || !$validselect) {
            alert("Check your inputs!");
            e.preventDefault();
            e.stopPropagation();
            let reevent1 = new CustomEvent('input');
            form.dispatchEvent(reevent1);
            let reevent2 = new CustomEvent('change');
            document.querySelector('.form-select').dispatchEvent(reevent2);
            document.querySelector('#name').dispatchEvent(reevent1);
            document.querySelector('#surname').dispatchEvent(reevent1);
            document.querySelector('#email').dispatchEvent(reevent1);
            document.querySelector('#location').dispatchEvent(reevent1);
            document.querySelector('#zip').dispatchEvent(reevent1);
        } else {
            let permission = Notification.permission;
            if(permission === "granted"){
                let notification = new Notification("You have successfully purchased!",{
                    tag:"noti",
                    body:"Check your profile or mail to see details...",
                    icon:"img/favicon.png"
                });
                notification.onclick = () => {
                    notification.close();
                    window.parent.focus();
                }
            } else if(permission === "default"){
                Notification.requestPermission(function (permission) {
                    let notification = new Notification("You have successfully purchased!", {
                        tag: "noti",
                        body: "Check your profile or mail to see details...",
                        icon: "img/empty.png"
                    });
                    notification.onclick = () => {
                        notification.close();
                        window.parent.focus();
                    };
                })
            } else {
                alert("Something gone wrong. Ask administrator.");
            }
            e.preventDefault();
            e.stopPropagation();
        }
    })
});