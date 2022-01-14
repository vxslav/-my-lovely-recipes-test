LOGINBTN.addEventListener("click", (e) => {
    e.preventDefault();
    let username = LOGIN_USER_FIELD.value;
    let password = LOGIN_USER_PASS.value;
    if (userStorage.login(username, password)) {
        user = getUser();
        ERROR_MSG[1].style.display = "none";
    }
    else {
        ERROR_MSG[1].style.display = "block";
        setTimeout(() => {
            ERROR_MSG[1].style.display = "none"
        }, 3000);
    }
})
function loginRegButtonsShow() {
    let login = document.getElementById('loginRegLinks');
    let logout = document.getElementById('logoutLink');
    if (userStorage.loggedIn()) {
        login.style.display = "none";
        logout.style.display = "inline";
        DEL_PROFILE.setAttribute("enabled", true);
        PASS_CHANGE_BTN.setAttribute("enabled", true);
        DEL_PROFILE.removeAttribute("disabled");
        PASS_CHANGE_BTN.removeAttribute("disabled");
    }
    else {
        login.style.display = "inline";
        logout.style.display = "none";
        DEL_PROFILE.setAttribute("disabled", true);
        PASS_CHANGE_BTN.setAttribute("disabled", true);
        getById("changePass").style.display = "none";
    }
}