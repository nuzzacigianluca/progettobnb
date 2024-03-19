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
              document.getElementById("wrong").style.display="none";
              document.getElementById("login-form").classList.add("rising-animation");
              setTimeout(() => {
                document.getElementById("login-form").classList.remove("rising-animation"); 
                logIn()
            }, 1000);
              
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

document.getElementById("eye_button").onclick=()=>{
  const val = document.getElementById("eye_button").value
  if(val==="false"){
      document.getElementById("eye_button").innerHTML=`<i class="fi fi-br-eye-crossed"></i>`;
      document.getElementById("eye_button").value = true;
      document.getElementById("password-input").type="text";
  }else{
      document.getElementById("eye_button").innerHTML=`<i class="fi fi-br-eye"></i>`;
      document.getElementById("eye_button").value = false;
      document.getElementById("password-input").type="password";
  }
}

const logIn = () => {
  getBnbs();
  Cookies.set('username',document.getElementById("username-input").value);
  Cookies.set('password',document.getElementById("password-input").value);
  document.getElementById("login-form").style.display = "none";
  document.getElementById("bnbs").style.display = "block";
  document.getElementById("bnbs").classList.remove("rising-animation");
  document.getElementById("bnbs").classList.remove("falling-animation");
  document.getElementById("bnbs").classList.add("falling-animation");
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
  let html = "";
  let row="";
  document.getElementById("tbody").innerHTML ="";
  json.forEach((element)=>{
    row = templateTable.replace("%NAME",element.name)
    .replace("%ADDRESS", element.address)
    .replace("%DESCRIPTION", element.description)
    .replace("%ID", element.id+","+element.coordinates);
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
        deleteElement(parseInt(id.split(",")[0])).then(()=>{
          deleteCoords(parseInt(id.split(",")[1]));
          remove_marker(parseInt(id.split(",")[0]));
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

const deleteCoords = (id) => {
  return new Promise((resolve, reject) => {
     fetch("/deleteCoords/"+id, {
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
} ;


