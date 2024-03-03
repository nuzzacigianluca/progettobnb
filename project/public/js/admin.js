document.getElementById("add_bnb").onclick=()=>{
    showAddBnBForm();
};
document.getElementById("log-out").onclick=()=>{
    logOut();
  };

document.getElementById("view_bnb").onclick=()=>{
    showBnb();
};
document.getElementById("back-button").onclick=()=>{
    backToHome();
}
const logOut = () => {
    Cookies.set('logged','false');
    document.getElementById("map").style.display = "none";
    document.getElementById("loginform").style.display = "block";
    document.getElementById("add_form").style.display = "none";
    document.getElementById("bnb_div").style.display = "none";  
    document.getElementById("log-out").style.display = "none";
    document.getElementById("add_bnb").style.display="none";
    document.getElementById("view_bnb").style.display="none"; 
}
const backToHome = () => {
    document.getElementById("manage-button-a").style.display = "block";
    document.getElementById("title-name-detail").innerText = 'Home page - BnB';
    document.getElementById("admin").style.display = "none";
    document.getElementById("map").style.display = "block";
    document.getElementById("loginform").style.display = "none";
    document.getElementById("add_form").style.display = "none";
    document.getElementById("bnb_div").style.display = "none";
    document.getElementById("log-out").style.display = "none"; 
    document.getElementById("add_bnb").style.display="none";
    document.getElementById("view_bnb").style.display="none";
}
const showAddBnBForm = () => {
    document.getElementById("add_form").style.display = "block";
    document.getElementById("bnb_div").style.display = "none";
}
const showBnb = () => {
    document.getElementById("bnb_div").style.display = "block";
    document.getElementById("add_form").style.display = "none";
};
const loggedUser = () => {
    document.getElementById("map").style.display = "none";
    document.getElementById("loginform").style.display = "none";
    document.getElementById("add_form").style.display = "none";
    document.getElementById("admin").style.display = "block";
    document.getElementById("log-out").style.display = "block"; 
    document.getElementById("bnb_div").style.display = "none";  
    document.getElementById("add_bnb").style.display="block";
    document.getElementById("view_bnb").style.display="block";
};
const notLoggedUser = () => {
    document.getElementById("map").style.display = "none";
    document.getElementById("loginform").style.display = "block";
    document.getElementById("add_form").style.display = "none";
    document.getElementById("bnb_div").style.display = "none";  
};
document.getElementById("manage-button-a").onclick=()=>{
    document.getElementById("title-name-detail").innerText = 'Admin page - BnB';
    document.getElementById("manage-button-a").style.display = "none";  
    const logged = Cookies.get('logged');
    if(logged=='true'){
        loggedUser()
    }else{
        notLoggedUser()
    };
};


/*
document.getElementById("home_page").onclick=()=>{
    document.getElementById("map").style.display = "block";
    document.getElementById("loginform").style.display = "none";
    document.getElementById("log-out").style.display = "none";
    document.getElementById("add_form").style.display = "none";
    document.getElementById("bnb_div").style.display = "none";
};*/