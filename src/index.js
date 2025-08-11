import "./style.css";

document.addEventListener("DOMContentLoaded",()=>{
    console.log("DOM LOADED!");
    const dom = require("./dom/DOM")();
    console.log("DOMCONTROLLER CREATED:",dom);
});