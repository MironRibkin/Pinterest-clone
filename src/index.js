import {getCardData} from "./components/main/main";

let locked = false;

window.addEventListener("scroll", () => {
    if (!locked && window.scrollY > document.getElementById("parent").offsetHeight - 1000) {
        getCardData()
        locked = true;
        setTimeout(() => {
            locked = false;
        }, 1000)
    }
})

