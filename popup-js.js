console.log("Hello from popup-js.js")

function addFolder() {
  var button = document.createElement("button");
  button.innerHTML = "New Button";
  document.getElementById("folder-container").appendChild(button);
}