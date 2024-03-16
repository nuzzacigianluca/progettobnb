document.getElementById("map").style.display = "block";
document.getElementById("loginform").style.display = "none";
document.getElementById("log-out").style.display = "none";
document.getElementById("admin").style.display = "none";
document.getElementById("add_bnb").style.display="none";
document.getElementById("view_bnb").style.display="none";


// const getCoords = () => {
//     return new Promise((resolve, reject) => {
//         fetch("/coords")
//         .then((response) => response.json())
//         .then((json) => {
//           renderMarkers(json.coords)
//            resolve(json);
//         });
//     });
// };

// const renderMarkers=(coords)=>{
//     coords.forEach(element => {
//       console.log(element)
//        addMarker(coords.longitute)
//     });
// }

// getCoords();



// const deleteCoords = (id) => {
//     return new Promise((resolve, reject) => {
//        fetch("/deleteCoords/"+id, {
//           method: 'DELETE',
//           headers: {
//              "Content-Type": "application/json"
//           },
//        })
//        .then((response) => response.json())
//        .then((json) => {
//           resolve(json);
//        });
//     });
// } ;