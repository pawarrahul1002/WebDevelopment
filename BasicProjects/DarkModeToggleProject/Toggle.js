function darkMode() {
  let element = document.body;
  let content = document.getElementById("DarkModetext");
  element.className = "dark-mode";
}

function lightMode() {
  let element = document.body;
  let content = document.getElementById("DarkModetext");
  element.className = "light-mode";
}

function myFunction() {

  if (checkBox.checked == true) {
    console.log("Checked");
    darkMode();
  } else {
    console.log("UnChecked");
    lightMode();
  }
}

const checkBox = document.getElementById("myCheck");
checkBox.addEventListener("click",myFunction);








