class Recipe {
    constructor(id, title, url, ingredients, img) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.ingredients = ingredients;
        this.img = img;
    }
}
// recipes storage and handler
let handler = (function() {
    class Handler {
        constructor() {
            if (!localStorage.getItem("recipes")) {
                let recipes = [];
                localStorage.setItem("recipes", JSON.stringify(recipes));
            }
            this.recipes = JSON.parse(localStorage.getItem("recipes"));
            this.recipes.forEach(obj => Object.setPrototypeOf(obj, Recipe.prototype));
        }
        add(recipe) {
            if (!this.recipes.some(obj => obj.title == recipe.title) && recipe instanceof Recipe) {
                this.recipes.unshift(recipe);
                localStorage.setItem("recipes", JSON.stringify(this.recipes));
                window.location.hash = "#all";
                window.location.reload();
            }
        }
    }
    return new Handler();
})(); 