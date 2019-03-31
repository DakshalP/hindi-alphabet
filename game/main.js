var audio = new Audio("sounds/button.mp3")
var correctSound = new Audio("sounds/correct.mp3")
var wrongSound = new Audio("sounds/wrong.mp3")

var counter = 0;

function playAudio(audio) {
    audio.play();
    //stop and reset the audio clip quickly
    setTimeout(function(){
        audio.pause();
        audio.currentTime = 0;
    }, 1000);
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function reset() {
    buttons = document.querySelectorAll(".fancy-button");
    for(i=0;i<buttons.length;i++) {
        //reset color and also class that signifies which button is correct
        buttons[i].classList.remove("green", "red", "correct", "down");
    }

    //pick a new correct
    var index = randInt(0, buttons.length-1);
    buttons[index].classList.add("correct");


}

function showCount() {
    document.querySelector("#counter").innerHTML = counter + " Points"
}
function counterUp() {
    counter++;
    showCount();
}
function counterDown() {
    if(counter != 0) {
        counter--;
    }
    showCount();
}


setTimeout(function() {
    buttons = document.querySelectorAll(".fancy-button");
    for(i=0;i<buttons.length;i++) {
        buttons[i].classList.remove("down");
        buttons[i].addEventListener('click', function() {
            if(this.classList.contains("correct")) {
                this.classList.add("green");
                playAudio(correctSound);
                counterUp();
                setTimeout(reset,1000)
            }
            else {
                this.classList.add("red", "down");
                playAudio(wrongSound);
                counterDown();
            }
            //playAudio(audio);
        })
    }
}, 750)

