// const container = document.getElementById('popup');
// const closer = document.getElementById('popup-closer');
// let overlay;
// let markers = [];
// let map; 

// function setLayers(map) {
//   const layers = [new ol.layer.Tile({ source: new ol.source.OSM() })];
//   map.addLayer(new window.ol.layer.Group({ layers }));
// }

// function setCenter(map, lonlat) {
//   const center = window.ol.proj.fromLonLat(lonlat);
//   map.getView().setCenter(center);
// }

// function setZoom(map, zoom) {
//   map.getView().setZoom(zoom);
// }

// // all'aggiunta del poi viene ridimensionata la mappa affinchè tutti i marcatori siano visibili
// function updateMapExtent() {
//   const extent = ol.extent.createEmpty();
//   markers.forEach((marker) => {
//     ol.extent.extend(extent, marker.feature.getGeometry().getExtent());
//   });

//   map.getView().fit(extent, {
//     padding: [255, 255, 255, 255],
//   });
// }

// // funzione per aggiungere un marcatore
// const addMarker = (bnb) => {
//   const feature = new ol.Feature({
//     geometry: new ol.geom.Point(ol.proj.fromLonLat([bnb.longitude,bnb.latitude])),
//   });
//   feature.name=bnb.name;
//   feature.address=bnb.address;
//   feature.description=bnb.description;
//   feature.id=bnb.id;
//   feature.latitude=bnb.latitude;
//   feature.longitude=bnb.longitude;
  
//   const layer = new ol.layer.Vector({
//     source: new ol.source.Vector({
//       features: [feature],
//     }),
//     style: new ol.style.Style({
//       image: new ol.style.Icon({
//         anchor: [0.5, 1],
//         crossOrigin: 'anonymous',
//         src: 'https://i.postimg.cc/KcNTTRTt/marker-map.png',
//       }),
//     }),
//   });
//   map.addLayer(layer);
//   markers.push({ feature, layer });
//   if(markers.length>1){
//     updateMapExtent(); 
//   }

// };

// // funzione per rimuovere un marcatore
// const remove_markers = () => {
//   markers.forEach((marker)=>{
//     map.removeLayer(marker.layer);
//   });
//   getBnBs();
  
// };

// function initOverlay(map, points) {
//   overlay = new ol.Overlay({
//     element: container,
//     autoPan: true,
//     autoPanAnimation: {
//       duration: 250,
//     },
//   });
//   map.addOverlay(overlay);
//   closer.onclick = function () {
//     overlay.setPosition(undefined);
//     closer.blur();
//     return false;
//   };

  
//   map.on('singleclick', function (event) {
//     // console.log(event.coordinate);
//     if (map.hasFeatureAtPixel(event.pixel)) {
//       map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
//         const coordinate = event.coordinate;
//         console.log(coordinate,"coordinate",feature.values_.geometry.flatCoordinates,"feature")
//         Swal.fire({
//           title: 'NOME:\n ' + feature.name + '\n\nINDIRIZZO:\n ' +feature.address + '\n\nDESCRIZIONE:\n ' + feature.description,
//           position: 'top',
//           background: 'white',
//           showConfirmButton: true,
//           showCancelButton: false,
//         });
//         overlay.setPosition(coordinate);
//       });
//     } 
//   });
// }

// // create map
// map = new ol.Map({ target: document.querySelector('.map') });
// map.height = screen.height / 1.5;
// map.getViewport().style.height = map.height + 'px';  
// setLayers(map);
// setCenter(map, [9.2415, 45.4965]);
// setZoom(map, 10);
// initOverlay(map);

// const renderMarkers=(bnbs)=>{
//   for(let i=0; i<bnbs.length; i++){
//     addMarker(bnbs[i]);
//   }
// }


// const getBnBs = () => {
//   return new Promise((resolve, reject) => {
//       fetch("/bnbs")
//       .then((response) => response.json())
//       .then((json) => {
//         renderMarkers(json.bnbs);
//         resolve(json);
//       });
//    });
// };


// getBnBs();

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');
let overlay;
let map;
let vectorSource;
let vectorLayer;

function updateMapExtent() {
  const extent = vectorSource.getExtent();
  map.getView().fit(extent, {
    padding: [255, 255, 255, 255],
  });
}

function setLayers(map) {
  const layers = [new ol.layer.Tile({source: new ol.source.OSM()})]; 
  map.addLayer(new window.ol.layer.Group({layers})); //aggiungo il layer alla mappa

  vectorSource = new ol.source.Vector();
  vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        crossOrigin: 'anonymous',
        src: 'https://i.postimg.cc/KcNTTRTt/marker-map.png',
      })
    })
  });
  map.addLayer(vectorLayer);
}

function setCenter(map, lonlat) {
  const center = window.ol.proj.fromLonLat(lonlat);
  map.getView().setCenter(center); //centro mappa 
}

function setZoom(map, zoom) {
  map.getView().setZoom(zoom); //zoom
}

//aggiungo il marcatore
function addMarker(bnb) {
  const feature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([bnb.longitude, bnb.latitude])),
  });
  feature.setProperties({
    name: bnb.name,
    address: bnb.address,
    description: bnb.description,
    id: bnb.id,
    latitude: bnb.latitude,
    longitude: bnb.longitude,
  });
  vectorSource.addFeature(feature);
}

// rimuovo il marcatore
const remove_marker = (id) => {
  const features = vectorSource.getFeatures();
  features.forEach((feature)=> {
    if(feature.values_.id===id){
      vectorSource.removeFeature(feature);
    }
  })
};

// apertura pop-up
function initOverlay(map, points) {
  overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  });
  map.addOverlay(overlay);
  closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };

  map.on('singleclick', function (event) {
    if (map.hasFeatureAtPixel(event.pixel) === true) { // rileva la presenza di un marker
      map.forEachFeatureAtPixel(event.pixel, (feature, layer) => { 
        const coordinate = event.coordinate; //coordinate marker
        Swal.fire({
          title: 'NOME:\n ' + feature.get('name') + '\n\nINDIRIZZO:\n ' + feature.get('address') + '\n\nDESCRIZIONE:\n ' + feature.get('description'),
          position: 'top',
          background: 'white',
          showConfirmButton: true,
          showCancelButton: false,
        });
        overlay.setPosition(coordinate); 
      })
    } else {
      overlay.setPosition(undefined);
      closer.blur();
    }
  });

}

// create map
const init = () => {
  map = new ol.Map({target: document.querySelector('.map')});
  setLayers(map);
  setCenter(map, [9.2415, 45.4965]);
  setZoom(map, 12);
  initOverlay(map);
  getBnBs();
}

const renderMarkers = (bnbs) => {
  vectorSource.clear();
  for (let i = 0; i < bnbs.length; i++) {
    addMarker(bnbs[i]);
  }
}

const getBnBs = () => {
  return new Promise((resolve, reject) => {
    fetch("/bnbs")
      .then((response) => response.json())
      .then((json) => {
        renderMarkers(json.bnbs);
        resolve(json);
      });
  });
};

init();
