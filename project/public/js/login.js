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
  getBnbs();
  Cookies.set('username',document.getElementById("username-input").value);
  Cookies.set('password',document.getElementById("password-input").value);
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
    <td><button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="del btn btn-danger" id="delete_%ID">Rimuovi</button></td>
</tr>
`;

const renderTable = (json) => {
  console.log("rendering");
  let html = "";
  let row="";
  document.getElementById("tbody").innerHTML ="";
  json.forEach((element)=>{
    console.log(element);
    row = templateTable.replace("%NAME",element.name)
    .replace("%ADDRESS", element.address)
    .replace("%DESCRIPTION", element.description)
    .replace("%ID", element.id);
   html += row 
  })
  document.getElementById("tbody").innerHTML += html;
  
  document.querySelectorAll(".del").forEach((button)=>{
    button.onclick=()=>{
      const id = button.id.split("_")[1];
      $('#exampleModal').modal('show');
      document.getElementById("no").onclick=()=>{
        $('#exampleModal').modal('toggle');
    };
    document.getElementById("no1").onclick=()=>{
      $('#exampleModal').modal('toggle');
  };
      document.getElementById("conf").onclick=()=>{
        $('#exampleModal').modal('toggle');
        deleteElement(id).then(()=>{
          getBnbs();
        });
      };
    };
  });
};

let bnbs = [];
const getBnbs = () => {
  return new Promise((resolve, reject) => {
      fetch("/bnbs")
      .then((response) => response.json())
      .then((json) => {
        renderTable(json.bnbs)
         resolve(json);
      });
   });
};

const deleteElement = (id) => {
  return new Promise((resolve, reject) => {
     fetch("/delete/"+id, {
        method: 'DELETE',
        headers: {
           "Content-Type": "application/json"
        },
     })
     .then((response) => response.json())
     .then((json) => {
        resolve(json);
     });
  });
};