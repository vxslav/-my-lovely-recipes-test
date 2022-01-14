let user = getUser();
function getUser() {
    let user = userStorage.users.find(u => u.username === sessionStorage.getItem("user")) || new User("guest", "000");
    getById("nav-avatar").setAttribute("src", `${user.avatar || "public/img/guest.png"} `);
    return user;
}
function getById(id) {
    return document.getElementById(id);
}
function getByClass(className) {
    return document.getElementsByClassName(className);
}
Handlebars.registerHelper('isFavourite', function (id) {
   return user.favourites.find(obj => obj.id === id) ? true : false;
})