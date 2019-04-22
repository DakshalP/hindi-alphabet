var lettersArr = [];
var vowelsArr = [];
var consonantsArr = [];
var vowels = "अ आ इ ई उ ऊ ऋ ए ऐ ओ औ";
var consonants = "क ख ग घ ङ च छ झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह";
var specialVowels = ["अं", "अः"] //each one takes up two characters

/* Audio functionality */
function playAudio(audio) {
        audio.play();
        //stop and reset the audio clip quickly
        setTimeout(function(){
            audio.pause();
            audio.currentTime = 0;
        }, 6500);
}
function playLetter(l) {
    try {
        var letterFile = "../letters/letterSounds/" + l + ".mp3";
        var letterAudio = new Audio(letterFile);
        letterAudio.preload = "metadata" //can be used to check duration
        playAudio(letterAudio);
    }
    catch(err){
        console.log("Error on playLetter(): " + err.message);
    }
}

function strToArr(str, arr) {
    for(let i in str) {
        if(str[i] != " ") {
            arr.push(str[i])
        }
    }
}

//shake animation for html element
function shake(element) {
    element.classList.add("shake");
    setTimeout(function() {
        element.classList.remove("shake")
    }, 200)
}

//takes the LETTERS out of a LETTER array and puts them in a div with an id like "vowels"
//ex displayArray(vowelsArray, "vowles")
//gives each the class "letter"
function displayArray(arr, div) {
    var letterElement;
    var letter;
    var element;
    for(let i in arr) {
        letterElement = document.createElement("h3");
        letterElement.classList.add("letter", "rotate", "animate");
        letter = document.createTextNode(arr[i]);
        letterElement.appendChild(letter);
        
        element = document.getElementById(div);
        element.appendChild(letterElement);
    }
}


//add letters to letterArr
var allLetters = vowels+consonants;
strToArr(allLetters, lettersArr)

//vowels to array
strToArr(vowels, vowelsArr)
for(i in specialVowels) {vowelsArr.push(specialVowels[i])}

//consonants to array
strToArr(consonants, consonantsArr)


// display vowels on page
displayArray(vowelsArr, "vowels");
displayArray(consonantsArr, "consonants")


//add click listeners to letters & intro animation
setTimeout(function(){
    var letterElements = document.querySelectorAll(".letter");
    for(let i=0;i<letterElements.length;i++) {
        letterElements[i].addEventListener("click", function() {
            shake(letterElements[i]);
            playLetter(this.innerText);
        })
        letterElements[i].classList.remove("rotate")
    }
}, 300);
