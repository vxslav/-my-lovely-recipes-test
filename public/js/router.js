window.addEventListener("load", pageLoad);
window.addEventListener("hashchange", pageLoad);

function pageLoad() {
    let hash = window.location.hash.slice(1);
    loginRegButtonsShow()
    switch(hash) {
        case "":
            ALL.style.display       = "flex";
            FAV.style.display       = "none";
            CREATE.style.display    = "none"; 
            PROFILE.style.display   = "none";
            ERROR.style.display     = "none";
            FILTER.style.display    = "flex";
            LOGREG.style.display    = "none";
            displayAll()
            break;
        case "all": 
            ALL.style.display       = "flex";
            FAV.style.display       = "none";
            CREATE.style.display    = "none"; 
            PROFILE.style.display   = "none";
            ERROR.style.display     = "none";
            FILTER.style.display    = "flex";
            LOGREG.style.display    = "none";
            displayAll()
            break;
        case "favs":
            ALL.style.display       = "none";
            FAV.style.display       = "flex";
            CREATE.style.display    = "none"; 
            PROFILE.style.display   = "none";
            ERROR.style.display     = "none";
            FILTER.style.display    = "none";
            LOGREG.style.display    = "none";
            displayFavs()
            break;
        case "create":
            ALL.style.display       = "none";
            FAV.style.display       = "none";
            CREATE.style.display    = "flex"; 
            PROFILE.style.display   = "none";
            ERROR.style.display     = "none";
            FILTER.style.display    = "none";
            LOGREG.style.display    = "none";
            checkInputs(RECIPE_INPUTS,SUBMIT_RECIPE);
            break;
        case "profile":
            ALL.style.display       = "none";
            FAV.style.display       = "none";
            CREATE.style.display    = "none"; 
            PROFILE.style.display   = "flex";
            ERROR.style.display     = "none";
            FILTER.style.display    = "none";
            LOGREG.style.display    = "none";
            printProfile();
            displayCooked();
            checkInputs(PROFILE_INPUTS, EDIT_INFO);
            break;
        case "login": 
            ALL.style.display           = "none";
            FAV.style.display           = "none";
            CREATE.style.display        = "none"; 
            PROFILE.style.display       = "none";
            LOGREG.style.display        = "flex";
            LOGIN_FORM.style.display    = "flex";
            REGISTER_FORM.style.display = "none";
            ERROR.style.display         = "none";
            FILTER.style.display        = "none";
            ERROR_MSG[1].style.display  = "none";
            break;
        case "logout": 
            ALL.style.display           = "none";
            FAV.style.display           = "none";
            CREATE.style.display        = "none"; 
            PROFILE.style.display       = "none";
            LOGREG.style.display        = "flex";
            LOGIN_FORM.style.display    = "flex";
            REGISTER_FORM.style.display = "none";
            ERROR.style.display         = "none";
            FILTER.style.display        = "none";
            LOGIN_USER_FIELD.value      = "";
            LOGIN_USER_PASS.value       = "";
            userStorage.logout();
            user = getUser();
            break;    
        case "register":
            ALL.style.display           = "none";
            FAV.style.display           = "none";
            CREATE.style.display        = "none"; 
            PROFILE.style.display       = "none";
            LOGREG.style.display        = "flex";
            LOGIN_FORM.style.display    = "none";
            REGISTER_FORM.style.display = "flex";
            ERROR.style.display         = "none";
            FILTER.style.display        = "none";
            break;    
        default:
            ALL.style.display       = "none";
            FAV.style.display       = "none";
            CREATE.style.display    = "none"; 
            PROFILE.style.display   = "none";
            ERROR.style.display     = "flex";
            FILTER.style.display    = "none";
            LOGREG.style.display    = "none";
            break;    
    }
}