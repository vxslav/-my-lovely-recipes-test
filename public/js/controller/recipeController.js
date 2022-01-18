// add all recipes to storage
for (let i = 0; i < allRecipes.length; i++) {
    let recipe = new Recipe(
        i,
        allRecipes[i].title,
        allRecipes[i].href,
        allRecipes[i].ingredients,
        allRecipes[i].thumbnail,
        0
    );
    handler.add(recipe);
}
//submit a new recipe
function submitRecipe() {
    let recipesArray = JSON.parse(localStorage.recipes);
    let createRecipe = new Recipe(
        recipesArray.length,
        RECIPE_INPUTS[0].value,
        RECIPE_INPUTS[2].value,
        RECIPE_INPUTS[1].value,
        RECIPE_INPUTS[3].value
    );
    RECIPE_INPUTS[0].value = "";
    RECIPE_INPUTS[1].value = "";
    RECIPE_INPUTS[2].value = "";
    RECIPE_INPUTS[3].value = "";
    checkInputs(RECIPE_INPUTS, SUBMIT_RECIPE);
    handler.add(createRecipe);
}
// search and filter functions
function search() {
    let text = SEARCH.value.trim().toLowerCase();
    let results = handler.recipes.filter(el => el.title.toLowerCase().includes(text));
    displayAll(results);
}
function fillIngredients() {
    let options = [];
    for (let i = 0; i < handler.recipes.length; i++) {
        let ingr = handler.recipes[i].ingredients.split(", ");
        for (let j = 0; j < ingr.length; j++) {
            if (options.indexOf(ingr[j]) === -1) {
                options.push(ingr[j]);
            }
        }
    }
    options.sort();
    for (let k = 0; k < options.length; k++) {
        let option = document.createElement("option");
        option.innerText = options[k];
        SELECT.appendChild(option);
    }
}
function filterByIngredients(e) {
    if (e.target.options[e.target.selectedIndex].text === "all") {
        displayAll();
    }
    else {
        let filter = e.target.options[e.target.selectedIndex].text.toLowerCase().trim();
        let results = handler.recipes.filter(el => el.ingredients.toLowerCase().includes(filter));
        displayAll(results);
    }
}
SEARCH.addEventListener("keyup", search)
window.addEventListener("load", fillIngredients)
SELECT.addEventListener("change", e => filterByIngredients(e))
FORM.addEventListener("keyup", () => checkInputs(RECIPE_INPUTS, SUBMIT_RECIPE));
SUBMIT_RECIPE.addEventListener("click", e => {
    e.preventDefault();
    submitRecipe();
})