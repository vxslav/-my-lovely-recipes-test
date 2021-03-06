const ALL              = getById("all");
const FAV              = getById("favs");
const CREATE           = getById("create");
const PROFILE          = getById("profile");
const LOGREG           = getById("loginReg");
const ERROR            = getById("error");
const TABLE            = getById("cooked-table")
const FILTER           = getById("filter");
const SEARCH           = getById("search");
const SUBMIT_RECIPE    = getById("submit-recipe");
const RECIPE_INPUTS    = getByClass("recipe-form");
const PROFILE_INPUTS   = getByClass("profile-inputs");
const FORM             = getById("create-recipe");
const FORM_PROFILE     = getById("edit-profile");
const SELECT           = getById("select");
const EDIT_INFO        = getById("edit-profile-btn");
const INFOBOX          = getById("profile-box");
const LOGIN_FORM       = getById("loginForm");
const REGISTER_FORM    = getById("registerForm");
const DEL_PROFILE      = getById("delete-profile-btn");
const REGBTN           = getById("register-btn");
const LOGINBTN         = getById("login-btn");
const LOGIN_USER_FIELD = getById("log-username");
const LOGIN_USER_PASS  = getById("log-pass");
const REG_USER_FIELD   = getById("reg-username");
const REG_USER_PASS    = getById("reg-password");
const REG_PASS_CONFIRM = getById("reg-password2");
const ERROR_MSG        = document.querySelectorAll(".error-msg");
const SUCCESS          = getById("success-msg");
const PASS_CHANGE_BTN  = getById("changePassBtn");
const recipesAll         = JSON.parse(localStorage.getItem("recipes"));
const recipesFav         = user.favourites;