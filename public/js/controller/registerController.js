REGBTN.addEventListener("click", e => {
    e.preventDefault()
    let username = REG_USER_FIELD.value.trim();
    let password = REG_USER_PASS.value.trim();
    let confirm = REG_PASS_CONFIRM.value.trim();
    if(username.length >= 3 && password.length >= 3) {
        if (!userStorage.exists(username)) {
            if (password === confirm) {
                userStorage.register(username, password);
                REG_USER_FIELD.value = "";
                REG_USER_PASS.value = "";
                REG_PASS_CONFIRM.value = "";
                window.location.hash = "#login";
                SUCCESS.style.display = "block";
                ERROR_MSG[0].style.display = "none";
                setTimeout(function () {
                    SUCCESS.style.display = "none";
                }, 3000);
            }
            else {
                ERROR_MSG[0].innerText = "Password missmatch!";
                ERROR_MSG[0].style.display = "block";
            }
        }
        else {
            ERROR_MSG[0].innerText = "User already exists!";
            ERROR_MSG[0].style.display = "block";
        }
    }
    else {
        ERROR_MSG[0].innerText = "Invalid Data!";
        ERROR_MSG[0].style.display = "block";
    }
});

