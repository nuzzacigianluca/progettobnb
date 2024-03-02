document.getElementById("add_bnb").onclick=()=>{
    document.getElementById("add_form").style.display = "block";
    document.getElementById("bnb_div").style.display = "none";

};
document.getElementById("view_bnb").onclick=()=>{
    document.getElementById("bnb_div").style.display = "block";
    document.getElementById("add_form").style.display = "none";

};

document.getElementById("home_page").onclick=()=>{
    document.getElementById("map").style.display = "block";
    document.getElementById("loginform").style.display = "none";
    document.getElementById("back-button").style.display = "none";
    document.getElementById("log-out").style.display = "none";
    document.getElementById("admin").style.display = "none";
    document.getElementById("add_form").style.display = "none";
    document.getElementById("bnb_div").style.display = "none";



    document.getElementById("manage-button-a").onclick=()=>{
        document.getElementById("map").style.display = "none";
        document.getElementById("loginform").style.display = "block";
        document.getElementById("back-button").style.display = "block";
        document.getElementById("add_form").style.display = "none";
        document.getElementById("bnb_div").style.display = "none";


    };
};

