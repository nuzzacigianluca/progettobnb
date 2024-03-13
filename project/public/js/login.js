document.getElementById("wrong").style.display = "none";

document.getElementById("login-button").onclick=()=>{
    const user = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    return checkLogin(user, password);
    
};



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
              logIn()
            }else{
                document.getElementById("wrong").style.display = "block";
            };
           resolve(json);
        });
     });
};

document.getElementById("username-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("login-button").click();
    };
  });


  document.getElementById("password-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("login-button").click();
    };
  });


const logIn = () => {
  Cookies.set('username',document.getElementById("username-input").value);
  Cookies.set('password',document.getElementById("password-input").value);
  getBnbs()
  document.getElementById("loginform").style.display = "none";
  document.getElementById("admin").style.display = "block";
  document.getElementById("log-out").style.display = "block";
  document.getElementById("username-input").value="";
  document.getElementById("password-input").value="";
  document.getElementById("add_bnb").style.display="block";
  document.getElementById("view_bnb").style.display="block";
};


const templateTable = `
<tr>
    <th scope="row">%NAME</th>
    <td>%ADDRESS</td>
    <td>%DESCRIPTION</td>
    <td><button type="button" class="btn btn-danger" id="delete_%ID">Elimina</button></td>
</tr>
`;

const renderTable = (name, address, description, id) => {
  let html = ""
  html = templateTable.replace("%NAME",name)
  .replace("%ADDRESS", address)
  .replace("%DESCRIPTION", description)
  .replace("%ID", id);
  document.getElementById("tbody").innerHTML += html;
};


const getBnbs = () => {
  return new Promise((resolve, reject) => {
      fetch("/bnbs")
      .then((response) => response.json())
      .then((json) => {
          console.log(json)
          //renderTable()
         resolve(json);
      });
   });
};