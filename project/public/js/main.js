document.getElementById("map").style.display = "block";
document.getElementById("loginform").style.display = "none";
document.getElementById("back-button").style.display = "none";
document.getElementById("log-out").style.display = "none";
document.getElementById("admin").style.display = "none";

document.getElementById("manage-button-a").onclick=()=>{
    document.getElementById("map").style.display = "none";
    document.getElementById("loginform").style.display = "block";
    document.getElementById("back-button").style.display = "block";
};


document.getElementById("back-button").onclick=()=>{
    document.getElementById("map").style.display = "block";
    document.getElementById("loginform").style.display = "none";
    document.getElementById("back-button").style.display = "none";
};