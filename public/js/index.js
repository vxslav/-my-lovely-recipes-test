function displayCooked() {
    TABLE.innerHTML = `
            <tr>
                <th colspan="2">My cooked meals</th>
            </tr>
    `;
    for (let i = 0; i < user.cooked.length; i++) {
        let item = document.createElement("tr");
        TABLE.appendChild(item);
        item.innerHTML = `
            <td>${user.cooked[i].title}</td>
            <td>${user.cooked[i].timesCooked}</td>
        `;
    }
}
function checkInputs(inputs, btn) {
    let areFilled = true;
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            areFilled = false;
            break;
        }
    }
    areFilled ? btn.removeAttribute("disabled", true) : btn.setAttribute("disabled", true);
}
function displayAll(recipes = recipesAll) {
    user = userStorage.loggedIn() ? userStorage.users.find(u => 
        u.username === sessionStorage.getItem("user")
        ) : user;
    let templateHTML = getById("recipe-card-all").innerHTML;
    const template = Handlebars.compile(templateHTML);
    let htmlCard = template(recipes);
    ALL.innerHTML = htmlCard;
    let cookBtns = Array.from(getByClass("cook"));
    let favsBtns = Array.from(getByClass("add"));
    if (userStorage.loggedIn()) {
        favsBtns.forEach(btn => btn.setAttribute("enabled", true));
        favsBtns.forEach(btn => btn.removeAttribute("disabled"));
        cookBtns.forEach(btn => btn.setAttribute("enabled", true));
        cookBtns.forEach(btn => btn.removeAttribute("disabled"));
    }
    else {
        favsBtns.forEach(btn => btn.setAttribute("disabled", true));
        favsBtns.forEach(btn => btn.removeAttribute("enabled"));
        cookBtns.forEach(btn => btn.setAttribute("disabled", true));
        cookBtns.forEach(btn => btn.removeAttribute("enabled"));
    }
    cookBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            userStorage.cook.call(user, recipes[i])
        })
    })
    favsBtns.forEach((btn, i) => {
        btn.addEventListener("click", e => {
            if (user.favourites.find(obj => obj.id == recipes[i].id)) {
                e.target.innerText = "Add to Favourites";
                userStorage.removeFromFavs.call(user, recipes[i]);
            }
            else {
                e.target.innerText = "Remove from Favourites";
                userStorage.addToFavs.call(user, recipes[i]);
            }
        })
    })
}
function displayFavs() {
    user = userStorage.loggedIn() ? userStorage.users.find(u => 
        u.username === sessionStorage.getItem("user")
        ) : user;
    let favsHTML = getById("recipe-card-fav").innerHTML;
    const template = Handlebars.compile(favsHTML);
    let htmlCard = template(recipesFav);
    FAV.innerHTML = htmlCard;
    let cookBtns = Array.from(getByClass("cookFav"));
    let favsBtns = Array.from(getByClass("remove"));
    cookBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            userStorage.cook.call(user, recipesFav[i])
        })
    })
    favsBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            userStorage.removeFromFavs.call(user, recipesFav[i]);
        })
    })
}