// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/




window.addEventListener("load", function() {
   let form = document.getElementById("launchForm");
   let pilotName = document.querySelector("#pilotName");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let launchStatus = document.getElementById("launchStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let faultyItems = document.querySelector("#faultyItems");
   form.addEventListener("submit", function(event) {

      event.preventDefault();
      if (pilotName.value === '' || !isNaN(pilotName.value)) {
         alert("Pilot name must be entered as a string!");
         event.preventDefault();
      };
      if (copilotName.value === '' || !isNaN(copilotName.value)) {
         alert("Co-pilot name must be entered as a string!");
         event.preventDefault();
      }; 
      if (fuelLevel.value === '' || isNaN(fuelLevel.value)) {
         alert("Fuel level must be entered as an integer!");
         event.preventDefault();
      };
      if (cargoMass.value === '' || isNaN(cargoMass.value)) {
         alert("Cargo mass must be entered as an integer!");
         event.preventDefault();
      };
      faultyItems.style.visibility = "visible";
      if (fuelLevel.value < 10000 || cargoMass.value > 10000) {
         // faultyItems.style.visibility = "visible";
         pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
            if (fuelLevel.value < 10000) {
               fuelStatus.innerHTML = "Fuel level too low!"
            };
            if (cargoMass.value > 10000) {
               cargoStatus.innerHTML = "Cargo mass too high!"
            };
      } else {
         launchStatus.innerHTML = "Shuttle is ready for launch";
         fuelStatus.innerHTML = "Fuel level high enough for launch";
         cargoStatus.innerHTML = "Cargo mass low enough for launch"
         launchStatus.style.color = "green";
      };
   });

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         const missionTarget = document.getElementById("missionTarget");
         let pickPlanet = function (num) {
            return Math.floor(Math.random()*(num));
         };
         let planet = pickPlanet(json.length);
         missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[planet].name}</li>
            <li>Diameter: ${json[planet].diameter}</li>
            <li>Star: ${json[planet].star}</li>
            <li>Distance from Earth: ${json[planet].distance}</li>
            <li>Number of Moons: ${json[planet].moons}</li>
         </ol>
         <img src=${json[planet].image}></img>
         `;
      });
   });
});