class User {
    constructor(username, password) {
        this.username = username,
            this.password = password,
            this.cooked = [],
            this.favourites = [],
            this.avatar = "public/img/guest.png",
            this.name = username,
            this.age = 0,
            this.address = "City"
    }
}
//all user-related functions and storage
let userStorage = (function () {
    class UserStorage {
        constructor() {
            if (!localStorage.getItem("users")) {
                let users = [];
                localStorage.setItem("users", JSON.stringify(users));
            }
            this.users = JSON.parse(localStorage.getItem('users'))
            this.users.forEach(obj => Object.setPrototypeOf(obj, User.prototype));
        }
        // profile-related functions
        exists(username) {
            return this.users.some(u => u.username === username);
        }
        validate(username, password) {
            return this.users.some(u => u.username === username && u.password === password)
        }
        register(username, password) {
            if (!this.exists(username)) {
                this.users.push(new User(username, password));
                localStorage.setItem("users", JSON.stringify(this.users));
            }
        }
        editUser(username, age, address, avatar) {
            this.name = username;
            this.age = age;
            this.address = address;
            this.avatar = avatar;
            localStorage.setItem("users", JSON.stringify(userStorage.users));
        }
        deleteUser(username, password) {
            let i = this.users.findIndex(obj => obj.username === username && obj.password === password);
            this.users.splice(i, 1);
            localStorage.setItem("users", JSON.stringify(this.users));
            this.logout();
        }
        loggedIn() {
            return sessionStorage.getItem('status') != null ? true : false;
        }
        logout() {
            sessionStorage.removeItem('status');
            sessionStorage.removeItem('user');
            window.location.hash = "";
            window.location.reload();
        }
        login(username, password) {
            if (this.validate(username, password)) {
                sessionStorage.setItem('status', 'loggedIn');
                sessionStorage.setItem('user', username);
                window.location.hash = "#profile";
                window.location.reload();
                return true;
            }
        }
        changePassword(user, oldPass, newPass, confirmNewPass) {
            if (oldPass === user.password && newPass === confirmNewPass) {
                user.password = newPass;
                localStorage.setItem('users', JSON.stringify(this.users))
            }
        }
        // recipe-related functions ==========================================================
        addToFavs(recipe) {
            if (this.favourites.findIndex(obj => obj.id === recipe.id) === -1) {
                this.favourites.unshift(recipe);
                localStorage.setItem("users", JSON.stringify(userStorage.users));
                pageLoad();
            }
        }
        removeFromFavs(recipe) {
            let i = this.favourites.findIndex(obj => obj.id === recipe.id);
            if (i > -1) {
                this.favourites.splice(i, 1);
                localStorage.setItem("users", JSON.stringify(userStorage.users));
                pageLoad();
            }
        }
        cook(recipe) {
            let recipeObj = this.cooked.find(obj => obj.recipe_id === recipe.id);
            if (recipeObj) {
                recipeObj.timesCooked++;
            }
            else {
                this.cooked.unshift({
                    recipe_id: recipe.id,
                    title: recipe.title,
                    timesCooked: 1
                });
            }
            localStorage.setItem("users", JSON.stringify(userStorage.users));
            pageLoad();
        }
    }
    return new UserStorage();
})() ;