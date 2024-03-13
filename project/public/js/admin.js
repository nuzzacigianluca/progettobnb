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
};
document.getElementById("confirm_add").onclick=()=>{
    if(document.getElementById("input_name").value 
    && document.getElementById("type").value!="select" 
    && document.getElementById("address").value 
    && document.getElementById("civic").value 
    && document.getElementById("city").value
    && document.getElementById("description").value){
        const address = document.getElementById("type").value 
        +" "+ document.getElementById("address").value
        +" "+ document.getElementById("civic").value
        +" "+ document.getElementById("city").value;
        getCoordinates(address)
    }else{
        document.getElementById("wrongi").style.display = "block";
        document.getElementById("ok").style.display = "none";
    };
};
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
};
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
    document.getElementById("bnbs").style.display = "none";
};
const showBnb = () => {
    getBnbs();
    document.getElementById("bnbs").style.display = "block";
    document.getElementById("add_form").style.display = "none";
};
const loggedUser = () => {
    document.querySelectorAll(".logged").forEach((element)=>{element.style.display = "block"});
    document.getElementById("username-input").value=Cookies.get('username');
    document.getElementById("password-input").value=Cookies.get('password');
    document.getElementById("username-input").style = "background-color:lightgreen;";
    document.getElementById("password-input").style = "background-color:lightgreen;";
    document.getElementById("map").style.display = "none";
    document.getElementById("loginform").style.display = "block";
    document.getElementById("add_form").style.display = "none";
    document.getElementById("admin").style.display = "none";
    document.getElementById("log-out").style.display = "none"; 
    document.getElementById("bnb_div").style.display = "none";  
    document.getElementById("add_bnb").style.display="none";
    document.getElementById("view_bnb").style.display="none";
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
        loggedUser();
    }else{
        notLoggedUser();
    };
};


let coordinates = {};
const getCoordinates=(address) =>{
    coordinates = {};
    const geocodingUrl = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address);
    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latitude = data[0].lat;
          const longitude = data[0].lon;
          coordinates = {"lat": latitude, "long": longitude};
          const bnb = {
            "name": document.getElementById("input_name").value,
            "address": address,
            "description": document.getElementById("description").value,
            "coordinates": coordinates
        };
        saveBnB(bnb);
        
        };
      })
      .catch(error => {
        console.error('Error fetching geocoding data:', error);
      });
    };


const saveBnB = (bnb) => {
    const data=bnb;
    return new Promise((resolve, reject) => {
        fetch("/savebnb", {
           method: 'POST',
           headers: {
              "Content-Type": "application/json"
           },
           body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.result){
                document.getElementById("ok").style.display = "block";
                document.getElementById("wrongi").style.display = "none";
                document.getElementById("add_form").reset;
            }else{
                document.getElementById("ok").style.display = "none";
                document.getElementById("wrongi").style.display = "block";
            };
           resolve(json);
        });
     });
};