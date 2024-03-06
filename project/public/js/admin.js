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
    Cookies.set('username','');
    Cookies.set('password','');
    document.querySelectorAll(".logged").forEach((element)=>{element.style.display = "none"});
    
    document.getElementById("username-input").style = "border-bottom: .2em solid lightblue";
    document.getElementById("password-input").style = "border-bottom: .2em solid lightblue";
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
    document.querySelectorAll(".logged").forEach((element)=>{element.style.display = "block"});
    document.getElementById("username-input").value=Cookies.get('username');
    document.getElementById("username-input").value=Cookies.get('password');
    
    document.getElementById("username-input").style = "background-color:lightgreen;";
    document.getElementById("password-input").style = "background-color:lightgreen;";

    document.getElementById("map").style.display = "none";
    document.getElementById("loginform").style.display = "block";
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
    const username = Cookies.get('username');
    const password = Cookies.get('password');
    
    if(username && password){
        loggedUser()
    }else{
        notLoggedUser()
    };
};