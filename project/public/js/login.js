document.getElementById("wrong").style.display = "none";
document.getElementById("map").style.display = "none";

document.getElementById("login-button").onclick=()=>{
    const user = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    return checkLogin(user, password)
}


const checkLogin = (user, password) => {
    const data=({
        "username": user,
        "password": password
    });
    return new Promise((resolve, reject) => {
        fetch("/login", {
           method: 'POST',
           headers: {
              "Content-Type": "application/json"
           },
           body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.result){
                document.getElementById("loginform").style.display = "none";
                document.getElementById("map").style.display = "block";
            }else{
                document.getElementById("wrong").style.display = "block";
            }
           resolve(json)
        });
     });
};