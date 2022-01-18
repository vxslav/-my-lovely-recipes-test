function displayCooked() {
    TABLE.innerHTML = `
            <tr>
                <th colspan="2">My cooked meals</th>
            </tr>
    `;
    user.cooked.forEach((e,i) => {
        let item = document.createElement("tr");
        TABLE.appendChild(item);
        let recipe = recipesAll.find(el => el.id === e.id);
         item.innerHTML = `
            <td>${recipe.title}</td>
            <td>${user.cooked[i].timesCooked}</td>
        `;
    })
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
            userStorage.cook.call(user, recipes[i].id)
        })
    })
    favsBtns.forEach((btn, i) => {
        btn.addEventListener("click", e => {
            if(user.favourites.indexOf(recipes[i].id) > -1){    
                e.target.innerText = "Add to Favourites";
                userStorage.removeFromFavs.call(user, recipes[i].id);
            }
            else {
                e.target.innerText = "Remove from Favourites";
                userStorage.addToFavs.call(user, recipes[i].id);
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
    const recipesIds = user.favourites;
    let userFavs = recipesAll.filter(e => recipesIds.indexOf(e.id) > -1)
    let htmlCard = template(userFavs);
    FAV.innerHTML = htmlCard;
    let cookBtns = Array.from(getByClass("cookFav"));
    let favsBtns = Array.from(getByClass("remove"));
    cookBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            userStorage.cook.call(user, userFavs[i].id)
        })
    })
    favsBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            userStorage.removeFromFavs.call(user, userFavs[i].id);
        })
    })
}