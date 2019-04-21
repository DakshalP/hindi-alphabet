//audio
var audio = new Audio("../letters/letterSounds/क.mp3")
var correctSound = new Audio("sounds/correct.mp3")
var wrongSound = new Audio("sounds/wrong.mp3")
var wrongAlert = new Audio("sounds/wrongAnswerAlert.mp3")

var counter = 0;

var lettersArr = [];
var vowels = "अ आ इ ई उ ऊ ऋ ए ऐ ओ औ";
var letters = "क ख ग घ ङ च च छ झ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह";

var correctLetter;

function playAudio(audio) {
    audio.play();
    //stop and reset the audio clip quickly
    setTimeout(function(){
        audio.pause();
        audio.currentTime = 0;
    }, 1000);
}

function playLetter(l) {
    try {
        var letterFile = "../letters/letterSounds/" + l + ".mp3";
        var letterAudio = new Audio(letterFile);
        playAudio(letterAudio);
    }
    catch(err){
        console.log("Error on playLetter(): " + err.message);
    }
}

function wrongAnswerAlert(l) {
    wrongAlert.play();
    setTimeout(function(){
        playLetter(l)
    }, 2700);
}

//inclusive of max
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//used to reset buttons (also runs once at start)
function reset() {
    //pick a new correct
    var letters = getLetters(4);
    var randIndex = randInt(0, letters.length-1); //random letter   
    correctLetter = letters[randIndex];

    buttons = document.querySelectorAll(".fancy-button");
    for(i=0;i<buttons.length;i++) {
        //reset color and also class that signifies which button is correct
        buttons[i].classList.remove("green", "red", "correct", "down");
        //set new letters
        buttons[i].innerHTML = letters[i];
    }

    playLetter(correctLetter);

    buttons[randIndex].classList.add("correct"); //set the correct button


}

function showCount() {
    document.querySelector("#counter").innerHTML = counter + " Points"
}
function countChange(str = "up") {
    if(str == "down" && counter != 0) {
        counter--;
    }
    else {
        counter++;
    }

    if(counter == 15) {
        document.querySelector("#counter").style.color = "yellowgreen";
    }
    showCount();
}

function getLetters(num) {
    var letters2 = lettersArr.slice(); //clones letterArr
    var output = [];
    for(let i = 0; i<num; i++) {
        index = randInt(0,letters2.length-1);
        output.push(letters2.splice(index, 1));
    }
    return output;
}

//add letters to letterArr
var allLetters = vowels+letters;
for(c in allLetters) {
    if(allLetters[c] != " ") {
        lettersArr.push(allLetters[c])
    }
}

document.querySelector("#playLetter").addEventListener('click', function(){
    playLetter(correctLetter);
})

//play starting animation and add click listeners to all buttons
setTimeout(function() {
    buttons = document.querySelectorAll(".fancy-button");
    for(i=0;i<buttons.length;i++) {
        //pop-up animation
        buttons[i].classList.remove("down");
        //click listeners
        buttons[i].addEventListener('click', function() {
            if(this.classList.contains("correct")) {
                this.classList.add("green");
                playAudio(correctSound);
                countChange();
                setTimeout(reset,1000)
            }
            else {
                this.classList.add("red", "down");
                playAudio(wrongSound);
                countChange("down");
                if(document.querySelector("#sayWrong").checked) {
                    wrongAnswerAlert(this.innerHTML);
                }
            }
        })
    }
}, 750)

reset();