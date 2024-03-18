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
        document.getElementById("wrongi").style.display="none";
        document.getElementById("loading").style.display="block";
        setTimeout(() => {
            const address = document.getElementById("type").value 
        +" "+ document.getElementById("address").value
        +" "+ document.getElementById("civic").value
        +" "+ document.getElementById("city").value;
        getCoordinates(address)
        }, 1000);
        

    }else{
        document.getElementById("loading").style.display="none";
        document.getElementById("ok").style.display = "none";
        document.getElementById("wrongi").style.display = "block";
    };
};
const logOut = () => {
    Cookies.set('username','');
    Cookies.set('password','');
    document.querySelectorAll(".logged").forEach((element)=>{element.style.display = "none"});
    document.getElementById("username-input").style = "border-bottom: .2em solid lightblue";
    document.getElementById("password-input").style = "border-bottom: .2em solid lightblue";
    document.getElementById("map").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("add_form").style.display = "none";
    document.getElementById("bnbs").style.display = "none";
    document.getElementById("log-out").style.display = "none";
    document.getElementById("add_bnb").style.display="none";
    document.getElementById("view_bnb").style.display="none";  
    document.getElementById("bnbs").classList.remove("rising-animation");
    document.getElementById("bnbs").classList.remove("falling-animation");


};
const backToHome = () => {
    document.getElementById("manage-button-a").style.display = "block";
    document.getElementById("title-name-detail").innerText = 'Home page - BnB';
    document.getElementById("admin").style.display = "none";
    document.getElementById("map").style.display = "block";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("add_form").style.display = "none";
    document.getElementById("log-out").style.display = "none"; 
    document.getElementById("add_bnb").style.display="none";
    document.getElementById("view_bnb").style.display="none";
}
const showAddBnBForm = () => {
    document.getElementById("add_form").classList.remove("rising-animation");
    document.getElementById("add_form").classList.remove("falling-animation");
    document.getElementById("bnbs").classList.remove("falling-animation");
    document.getElementById("bnbs").classList.add("rising-animation");
    setTimeout(() => {
        document.getElementById("add_form").style.display = "block";
        document.getElementById("add_form").classList.add("falling-animation");
        document.getElementById("bnbs").style.display = "none";
    }, 1000);
    

};
const showBnb = () => {
    getBnbs();
    document.getElementById("bnbs").classList.remove("rising-animation");
    document.getElementById("bnbs").classList.remove("falling-animation");
    document.getElementById("add_form").classList.remove("falling-animation");
    document.getElementById("add_form").classList.add("rising-animation");
    setTimeout(() => {
        document.getElementById("add_form").classList.remove("rising-animation");
        document.getElementById("bnbs").classList.add("falling-animation");
        document.getElementById("add_form").style.display = "none";
        document.getElementById("bnbs").style.display = "block";
    }, 500);
    
};
const loggedUser = () => {
    document.querySelectorAll(".logged").forEach((element)=>{element.style.display = "block"});
    document.getElementById("username-input").value=Cookies.get('username');
    document.getElementById("password-input").value=Cookies.get('password');
    document.getElementById("username-input").style = "background-color:lightgreen;";
    document.getElementById("password-input").style = "background-color:lightgreen;";
    document.getElementById("map").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("add_form").style.display = "none";
    document.getElementById("admin").style.display = "none";
    document.getElementById("log-out").style.display = "none"; 
    document.getElementById("add_bnb").style.display="none";
    document.getElementById("view_bnb").style.display="none";
};
const notLoggedUser = () => {
    document.getElementById("map").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("add_form").style.display = "none";
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
            "coordinates": coordinates,
            "longitude": coordinates.long,
            "latitude": coordinates.lat,
        };
        saveBnB(bnb);
        addMarker(bnb);
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
            if(json.Response){
                document.getElementById("ok").style.display = "block";
                document.getElementById("wrongi").style.display = "none";
                document.getElementById("loading").style.display="none";
                setTimeout(() => {
                    document.getElementById("ok").style.display = "none";
                    document.getElementById("add_form").reset();
                }, 2000);
            }else{
                document.getElementById("loading").style.display="none";
                document.getElementById("ok").style.display = "none";
                document.getElementById("wrongi").style.display = "block";
            };
           resolve(json);
        });
     });
};

  