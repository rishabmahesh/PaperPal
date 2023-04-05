console.log("Hello from popup-js.js")
const folderContainer = getElementById("folder-container");
const addFolderButton = getElementById("add-folder-button");

function addFolder() {
  console.log("Hello from popup-js.js")
  let button = document.createElement("button");

  const newtext = document.createTextNode("New Button");
  button.appendChild(newtext);

  //button.innerHTML = "New Button";
  document.getElementById("folder-container").appendChild(button);
}

//addFolderButton.addEventListener("click", addFolder);