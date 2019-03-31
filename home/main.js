audio = new Audio("button.mp3")

setTimeout(function() {
    buttons = document.querySelectorAll(".fancy-button");
    for(i=0;i<buttons.length;i++) {
        buttons[i].classList.remove("down");
    }
    caption = document.querySelector("p");
    caption.classList.remove("hide");
}, 750)
