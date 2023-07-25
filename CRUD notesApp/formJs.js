
// this js is for slide animation of the forms 
const formsContainer = document.getElementById("internal-forms-container");
const slideBtn1 = document.getElementById("signup-btn");
const slideBtn2 = document.getElementById("login-btn");

slideBtn1.onclick = function(){
    formsContainer.style.transform = "translateX(-402px)";
}
slideBtn2.onclick = function(){
    formsContainer.style.transform = "translateX(0)";
}


