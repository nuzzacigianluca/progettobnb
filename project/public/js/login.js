document.getElementById("map").style.display = "none";

document.getElementById("login-button").onclick=()=>{
    const user = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    checkLogin(user, password).then((data)=>{
        console.log(data)
    })
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
            console.log(json.result)
           resolve(json)
        });
     });
}


