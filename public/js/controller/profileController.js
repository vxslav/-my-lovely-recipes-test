// edit profile
FORM_PROFILE.addEventListener("keyup", () => { checkInputs(PROFILE_INPUTS, EDIT_INFO) })
function printProfile() {
    user = userStorage.loggedIn() ? userStorage.users.find(u => u.username === sessionStorage.getItem("user")) : user;
    let templateHTML = getById(`user-info`).innerHTML;
    const template = Handlebars.compile(templateHTML);
    let htmlCard = template(user);
    INFOBOX.innerHTML = htmlCard;
}
EDIT_INFO.addEventListener("click", e => {
    e.preventDefault();
    editProfile();
})
function editProfile() {
    INFOBOX.innerHTML = "";
    let profileBox = document.createElement("div");
    INFOBOX.appendChild(profileBox);
    let username = PROFILE_INPUTS[0].value;
    let age = PROFILE_INPUTS[1].value;
    let address = PROFILE_INPUTS[2].value;
    let avatar = PROFILE_INPUTS[3].value;
    getById("nav-avatar").src = avatar;
    //clear inputs
    PROFILE_INPUTS[0].value = "";
    PROFILE_INPUTS[1].value = "";
    PROFILE_INPUTS[2].value = "";
    PROFILE_INPUTS[3].value = "";
    userStorage.editUser.call(user, username, age, address, avatar);
    printProfile();
}
// password change
function changeUserPass() {
    let current = getById("currentPass");
    let newPass = getById("newPass");
    let confirmNewPass = getById("confirmNewPass");
    let msg = getById("pass-change-msg");
    if (current.value === user.password) {
        if (newPass.value === confirmNewPass.value) {
            userStorage.changePassword(user, current.value, newPass.value, confirmNewPass.value);
            msg.innerText = "Password successfully updated!";
            msg.style.display = "block";
            msg.style.color = "green";
            msg.style.backgroundColor = "rgba(38, 240, 105,.4)";
            current.value = "";
            newPass.value = "";
            confirmNewPass.value = "";
        }
        else {
            msg.innerText = "Password missmatch!";
            msg.style.display = "block";
            msg.style.color = "rgb(156, 4, 4)";
            msg.style.backgroundColor = "rgba(223, 52, 52,.4);";
        }
    }
    else {
        msg.innerText = "Wrong credentials!";
        msg.style.display = "block";
        msg.style.color = "rgb(156, 4, 4)";
        msg.style.backgroundColor = "rgba(223, 52, 52,.4)";
    }
}
getById("changePassBtn").addEventListener("click", (e) => {
    e.preventDefault();
    let box = getById("changePass");
    getById("pass-change-msg").style.display = "none";
    box.style.display = box.style.display == "block" ? "none" : "block";
})
getById("changePassForm").addEventListener("submit", (e) => {
    e.preventDefault();
    changeUserPass();
})
// delete profile
DEL_PROFILE.addEventListener("click", (e) => {
    let pass = prompt("Enter your password to confirm and delete your profile: ");
    if (pass === user.password) {
        userStorage.deleteUser(user.username, pass);
        window.location.hash = "";
    }
    else {
        e.preventDefault();
        if (pass != null) {
            alert("Wrong credentials!");
        }
    }
})